let reply_to_id = null;
let loading = false;

function createReply(data) {
  let { name, created, content } = data;

  let reply = document.createElement("div");
  reply.classList.add("reply");

  // comment children
  let reply_top = document.createElement("div");
  reply_top.classList.add("reply-top");
  reply.appendChild(reply_top);

  // comment-top children
  let name_site_container = document.createElement("div");
  reply_top.appendChild(name_site_container);

  // -- name
  let name_span = document.createElement("span");
  name_span.classList.add("comment-name");
  name_span.textContent = name;
  name_site_container.appendChild(name_span);

  if (data.site) {
    // -- site url
    let site_link = document.createElement("span");
    // this is OK because the api won't accept anything other than valid URLs as comment.site
    site_link.innerHTML = ` (<a class="comment-site" href="${data.site}">Site</a>)`;
    name_site_container.appendChild(site_link);
  }

  let date_span = document.createElement("span");
  date_span.classList.add("reply-date");
  reply_top.appendChild(date_span);
  // end comment-top children

  let reply_content = document.createElement("div");
  reply_content.classList.add("reply-content");
  reply.appendChild(reply_content);
  // end comment children

  name_span.textContent = name;
  date_span.textContent = new Date(created).toLocaleString();
  reply_content.textContent = content;

  return reply;
}

function createComment(data) {
  let { id, name, created, content } = data;
  let comment = document.createElement("div");
  comment.classList.add("comment");

  // comment children
  let comment_top = document.createElement("div");
  comment_top.classList.add("comment-top");
  comment.appendChild(comment_top);

  // comment-top children
  let name_site_container = document.createElement("div");
  comment_top.appendChild(name_site_container);

  // -- name
  let name_span = document.createElement("span");
  name_span.classList.add("comment-name");
  name_span.textContent = name;
  name_site_container.appendChild(name_span);

  if (data.site) {
    // -- site url
    let site_link = document.createElement("span");
    // this is OK because the api won't accept anything other than valid URLs as comment.site
    site_link.innerHTML = ` (<a class="comment-site" href="${data.site}">Site</a>)`;
    name_site_container.appendChild(site_link);
  }

  // -- comment date
  let date_span = document.createElement("span");
  date_span.classList.add("comment-date");
  date_span.textContent = new Date(created).toLocaleString();
  comment_top.appendChild(date_span);

  // end comment-top children

  // -- comment content
  let comment_content = document.createElement("div");
  comment_content.classList.add("comment-content");
  comment_content.textContent = content;
  comment.appendChild(comment_content);

  let reply_button = document.createElement("button");
  reply_button.innerText = "Reply";
  comment.appendChild(reply_button);

  if (data.reply_count > 0) {
    let show_replies_button = document.createElement("button");
    show_replies_button.innerText = `Toggle replies (${data.reply_count})`;
    show_replies_button.classList.add("comment-show-replies");
    comment.appendChild(show_replies_button);

    let toggle_icon = document.createElement("span");
    toggle_icon.innerText = "[+] ";
    toggle_icon.class = "comment-toggle-icon";
    show_replies_button.insertBefore(toggle_icon, show_replies_button.firstChild);

    show_replies_button.addEventListener("click", () => {
      if (reply_children.style.display == "none") {
        reply_children.style.display = "block";
        toggle_icon.innerText = "[-] ";
      } else {
        reply_children.style.display = "none";
        toggle_icon.innerText = "[+] ";
      }
    });

    let reply_children = document.createElement("div");
    reply_children.classList.add("comment-replies");
    comment.appendChild(reply_children);

    data.replies.forEach((reply) => {
      reply_children.appendChild(createReply(reply));
    });
  }

  // end comment children

  reply_button.addEventListener("click", () => {
    reply_to_id = id;
    document.querySelector("#reply-text").innerText = `Replying to ${name}`;
  });

  return comment;
}

{
  /* <div class="comment">
  <div class="comment-top">
    <span class="comment-name">Name (<a class="comment-site">Site</a>)</span>
    <span class="comment-date">Date</span>
  </div>
  <div class="comment-content">Content</div>

  <button>Reply</button>
  <button><span class="comment-toggle-icon">[+]</span> Show replies</button>

  <div class="comment-replies">
    <div class="reply">
      <div class="reply-top">
        <span class="reply-name">Name (<a class="reply-site">Site</a>)</span>
        <span class="reply-date">Date</span>
      </div>
      <div class="reply-content">Content</div>
    </div>
  </div>
</div> */
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function startLoading() {
  let comment_container = document.querySelector("#comments");
  loading = true;

  comment_container.innerText = "Loading comments";

  while (loading) {
    if (comment_container.innerText == "Loading comments...") {
      comment_container.innerText = "Loading comments";
    }

    comment_container.innerText += ".";
    await delay(400);
  }
}

function stopLoading() {
  loading = false;
}

async function main() {
  startLoading();
  let comment_container = document.querySelector("#comments");

  try {
    let comment_response = await fetch("https://api.furshark.net/guestbook", {
      method: "GET",
      accept: "application/json",
    });

    if (!comment_response.ok) {
      let response_text = await comment_response.text();
      console.log(comment_response.status, comment_response.statusText);
      console.log(response_text);

      comment_container.innerHTML = `Error loading, API response NOT ok! (${comment_response.status}) ${response_text}`;

      throw new Error("unexpected API response");
    }

    let comment_data = await comment_response.json();

    stopLoading();
    comment_container.innerHTML = "";

    comment_data.entries.forEach((comment) => {
      let comment_element = createComment(comment);
      comment_container.appendChild(comment_element);
    });
  } catch (error) {
    stopLoading();
    comment_container.innerText = `An error occoured (${error}), check the browser console for more info.`;
    comment_container.style.color = "red";
  }
}

async function sendComment() {
  let name = document.querySelector("#gb-nickname");
  let site_url = document.querySelector("#gb-site");
  let content = document.querySelector("#gb-content");
  let status = document.querySelector("#form-status");
  let submit_btn = document.querySelector("#guestbook-form-submit");

  status.innerText = "Sending...";
  status.classList = ["status-normal"];
  status.style.display = "block";

  if (!name.value) {
    status.innerText = "Error: Nickname is missing!";
    status.classList = ["status-error"];
    status.style.display = "block";
  }

  if (!content) {
    status.innerText = "Error: Comment is missing!";
    status.classList = ["status-error"];
    status.style.display = "block";
  }

  let response = await fetch("https://api.furshark.net/guestbook", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name.value, content: content.value, site: site_url.value, reply_to: reply_to_id }),
  });

  if (!response.ok) {
    console.log(response.status);
    console.log(response.statusText);
    console.log(await response.json());
    status.innerText = `Server error (${response.status}): ${await response.json()}`;
    status.classList = ["status-error"];
    status.style.display = "block";
  } else {
    status.innerText = "Success!";
    status.classList = ["status-success"];
    status.style.display = "block";

    name.value = "";
    content.value = "";
    site_url.value = "";
    reply_to_id = null;
    document.querySelector("#reply-text").innerText = ``;
  }

  submit_btn.disabled = true;
  setTimeout(() => {
    status.style.display = "none";
    submit_btn.disabled = false;
  }, 3000);
}

const form = document.querySelector("#guestbook-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendComment();
});

main();

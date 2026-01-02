let reply_to_id = null;

function createReply(data) {
  let { name, created, content } = data;

  let reply = document.createElement("div");
  reply.classList.add("reply");

  // comment children
  let reply_top = document.createElement("div");
  reply_top.classList.add("reply-top");
  reply.appendChild(reply_top);

  // comment-top children
  let name_span = document.createElement("span");
  name_span.classList.add("reply-name");
  reply_top.appendChild(name_span);

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
  let name_span = document.createElement("span");
  name_span.classList.add("comment-name");
  comment_top.appendChild(name_span);

  let date_span = document.createElement("span");
  date_span.classList.add("comment-date");
  comment_top.appendChild(date_span);
  // end comment-top children

  let comment_content = document.createElement("div");
  comment_content.classList.add("comment-content");
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

  name_span.textContent = name;
  date_span.textContent = new Date(created).toLocaleString();
  comment_content.textContent = content;

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

async function main() {
  let comment_container = document.getElementById("comments");
  let comment_response = await fetch("https://api.furshark.net/guestbook", {
    method: "GET",
    accept: "application/json",
  });

  if (!comment_response.ok) {
    console.log(comment_response.status, comment_response.statusText);
    console.log(await comment_response.text());
    throw new Error("unexpected API response");
  }

  let comment_data = await comment_response.json();

  comment_container.innerHTML = "";

  comment_data.entries.forEach((comment) => {
    let comment_element = createComment(comment);
    comment_container.appendChild(comment_element);
  });
}

async function sendComment() {
  let name = document.querySelector("#gb-nickname").value;
  let site_url = document.querySelector("#gb-site").value;
  let content = document.querySelector("#gb-content").value;
  let status = document.querySelector("#form-status");
  status.innerText = "Sending...";
  status.classList = ["status-normal"];
  status.style.display = "block";

  if (!name) {
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
    body: JSON.stringify({ name: name, content: content, site: site_url, reply_to: reply_to_id }),
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
}

const form = document.querySelector("#guestbook-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendComment();
});

main();

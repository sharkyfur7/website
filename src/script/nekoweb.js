import { setCookieMinutes, getCookie } from "./module/cookie.js";

const cookieMinutes = 5;
let data = {
  view: 0,
  follow: 0,
  update: 0,
};

function createCounter(number, padding = 5) {
  let str = number.toString();
  str = str.padStart(padding, "0");

  // first get image filenames
  let images = [];
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    images.push(`${char}.jpg`);
  }

  // "main loop"
  let img_elements = [];
  let num_start = false;
  images.forEach((filename) => {
    // check if we encountered a leading digit
    if (filename != "0.jpg") {
      num_start = true;
    }

    let img = document.createElement("img");
    img.src = `/assets/counter/${filename}`;
    img.height = 20;
    img.width = 15;

    // if this is still a padding zero make it somewhat transparent
    if (!num_start) {
      img.style.opacity = "25%";
    }

    img_elements.push(img);
  });

  return img_elements;
}

async function checkCookies() {
  if (!getCookie("nw-view")) {
    let response = await fetch(
      "https://nekoweb.org/api/site/info/furshark.net"
    );
    response = await response.json();

    setCookieMinutes("nw-view", response.views, cookieMinutes);
    setCookieMinutes("nw-follow", response.followers, cookieMinutes);
    setCookieMinutes("nw-update", response.updates, cookieMinutes);
  }
}

try {
  await checkCookies();
} catch (e) {}

data.view = getCookie("nw-view");
data.follow = getCookie("nw-follow");
data.update = getCookie("nw-update");

let views = document.getElementById("nw-view");
createCounter(data.view).forEach((digit) => {
  views.appendChild(digit);
});

let follows = document.getElementById("nw-follow");
createCounter(data.follow).forEach((digit) => {
  follows.appendChild(digit);
});

let updates = document.getElementById("nw-update");
createCounter(data.update).forEach((digit) => {
  updates.appendChild(digit);
});

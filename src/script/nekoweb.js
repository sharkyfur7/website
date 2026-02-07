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
    let response = await fetch("https://nekoweb.org/api/site/info/furshark.net");
    response = await response.json();

    setCookieMinutes("nw-view", response.views, cookieMinutes);
    setCookieMinutes("nw-follow", response.followers, cookieMinutes);
    setCookieMinutes("nw-update", response.updates, cookieMinutes);
  }
}

try {
  await checkCookies();
} catch (e) {
  console.log(e);
}

data.view = getCookie("nw-view");
data.follow = getCookie("nw-follow");
data.update = getCookie("nw-update");

let views = document.getElementsByClassName("nw-view");
for (let i = 0; i < views.length; i++) {
  views[i].innerText = "";

  createCounter(data.view).forEach((digit) => {
    views[i].appendChild(digit);
  });
}

let follows = document.getElementsByClassName("nw-follow");

for (let i = 0; i < follows.length; i++) {
  follows[i].innerText = "";

  createCounter(data.follow).forEach((digit) => {
    follows[i].appendChild(digit);
  });
}

let updates = document.getElementsByClassName("nw-update");

for (let i = 0; i < updates.length; i++) {
  updates[i].innerText = "";

  createCounter(data.update).forEach((digit) => {
    updates[i].appendChild(digit);
  });
}

let views_text = document.getElementsByClassName("nw-view-text");
for (let i = 0; i < views_text.length; i++) {
  views_text[i].innerText = data.view;
}

let follows_text = document.getElementsByClassName("nw-follow-text");

for (let i = 0; i < follows_text.length; i++) {
  follows_text[i].innerText = data.follow;
}

let updates_text = document.getElementsByClassName("nw-update-text");

for (let i = 0; i < updates_text.length; i++) {
  updates_text[i].innerText = data.update;
}

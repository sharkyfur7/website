import { setCookieMinutes, getCookie } from "./module/cookie.js";

const cookie_name = "scafe";
const cookie_minutes = 5;

function getSCafeCookie() {
  return JSON.parse(getCookie(cookie_name));
}

async function getSCafeData() {
  let cookie = getSCafeCookie();

  if (cookie) {
    return cookie;
  }

  let response = await fetch("https://status.cafe/users/sharky/status.json");
  response = await response.json();

  let data = {
    author: response.author,
    timeAgo: response.timeAgo,
    content: response.content,
  };

  setCookieMinutes(cookie_name, JSON.stringify(data), cookie_minutes);

  return data;
}

let data = await getSCafeData();

document.getElementById("statuscafe-username").innerHTML =
  '<a href="https://status.cafe/users/sharky" target="_blank">' +
  data.author +
  "</a> ";
document.getElementById("statuscafe-stuff").innerHTML = data.timeAgo;
document.getElementById("statuscafe-content").innerHTML = `"${data.content}"`;

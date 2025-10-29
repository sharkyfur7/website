import { setCookieMinutes, getCookie } from "./module/cookie.js";

const cookieMinutes = 5;

async function checkCookies() {
  if (getCookie("nw-view") === null) {
    let response = await fetch(
      "https://nekoweb.org/api/site/info/furshark.net"
    );
    response = await response.json();

    setCookieMinutes("nw-view", response.views, cookieMinutes);
    setCookieMinutes("nw-follow", response.followers, cookieMinutes);
    setCookieMinutes("nw-update", response.updates, cookieMinutes);
  }
}

await checkCookies();

document.getElementById("nw-view").innerText = getCookie("nw-view") || "----";
document.getElementById("nw-follow").innerText =
  getCookie("nw-follow") || "----";
document.getElementById("nw-update").innerText =
  getCookie("nw-update") || "----";

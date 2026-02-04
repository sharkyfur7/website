import { getCookie, setCookieMinutes } from "./module/cookie.js";

const recent_tracks_api_url = "https://api.furshark.net/lastfm/recent?user=sharkyblacktip";
const info_api_url = "https://api.furshark.net/lastfm/info?user=sharkyblacktip";

const cookie_name = "lastfm";

function formatAgo(seconds) {
  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 3600) {
    return Math.round(seconds / 60) + " minutes ago";
  } else if (seconds < 86400) {
    return Math.round(seconds / 60 / 60) + " hours ago";
  } else {
    return Math.round(seconds / 60 / 60 / 24) + " days ago";
  }
}

function getDataCookie() {
  return getCookie(cookie_name);
}

async function getData() {
  let fmcookie = getDataCookie();
  if (fmcookie) {
    return JSON.parse(fmcookie);
  }

  const tracks = await (await fetch(recent_tracks_api_url)).json();
  const info = await (await fetch(info_api_url)).json();

  const data = {
    last_track: tracks["recenttracks"]["track"][0],
    info: info,
  };

  if (data.last_track["@attr"] && data.last_track["@attr"]["nowplaying"]) {
    data.date = "right now";
  } else {
    data.date = data.last_track["date"]["uts"];
    data.date = formatAgo(Date.now() / 1000 - data.date);
  }

  setCookieMinutes(cookie_name, JSON.stringify(data), 1);

  return data;
}

async function main() {
  const data = await getData();
  const artist_name = data.last_track["artist"]["#text"];
  const track_name = data.last_track["name"];
  const coverurl = data.last_track["image"][2]["#text"]; // 0 = small, 1 = medium, 2 = large, 3 = extralarge

  // elements that change their contents
  const lastfm = {};
  lastfm["trackname"] = document.getElementById("trackname");
  lastfm["artist"] = document.getElementById("artist");
  lastfm["albumname"] = document.getElementById("albumname");
  lastfm["cover"] = document.getElementById("cover");
  lastfm["bg-cover"] = document.getElementById("bg-cover");
  lastfm["cover-link"] = document.getElementById("cover-link");
  lastfm["fmtime"] = document.getElementById("fmtime");
  lastfm["lastfm-scrobbles"] = document.getElementById("lastfm-scrobbles");

  // Now we do stuff :3

  if (data.date == "right now") {
    document
      .getElementById("cover")
      .setAttribute("data-tooltip", "I'm listening to this song right now");
  } else {
    document
      .getElementById("cover")
      .setAttribute("data-tooltip", `I listened to this song ${data.date}`);
  }

  lastfm.trackname.innerText = track_name;
  lastfm.trackname.href = data.last_track["url"];
  lastfm.artist.innerText = artist_name;
  lastfm.albumname.innerText = data.last_track["album"]["#text"];
  lastfm.cover.src = coverurl;
  lastfm["bg-cover"].src = coverurl;
  lastfm["cover-link"].href = data.last_track["url"];
  lastfm.fmtime.innerHTML = "(" + data.date + ")";
  lastfm["lastfm-scrobbles"].innerText = data.info["user"]["playcount"];
}

main();

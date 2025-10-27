const recent_tracks_api_url =
  "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
  "sharkyblacktip" +
  "&api_key=" +
  "8093eae1b06820d1d900400320d5f8f9" +
  "&format=json";

const info_api_url =
  "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" +
  "sharkyblacktip" +
  "&api_key=" +
  "8093eae1b06820d1d900400320d5f8f9" +
  "&format=json";

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

async function getData() {
  const tracks = await (await fetch(recent_tracks_api_url)).json();
  const info = await (await fetch(info_api_url)).json();

  const data = {
    last_track: tracks["recenttracks"]["track"][0],
    info: info,
  };

  try {
    data.nowplaying = data.last_track["@attr"]["nowplaying"];
  } catch (e) {}

  try {
    data.date = data.last_track["date"]["uts"];
  } catch (e) {}

  if (data.nowplaying) {
    data.date = "right now";
  } else {
    data.date = formatAgo(Date.now() / 1000 - data.date);
  }

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

  try {
    if (data.date == "right now") {
      document
        .getElementById("cover")
        .setAttribute("data-tooltip", "I'm listening to this song right now");
    } else {
      document
        .getElementById("cover")
        .setAttribute("data-tooltip", `I listened to this song ${data.date}`);
    }
  } catch {}

  try {
    lastfm.trackname.innerText = track_name;
    lastfm.trackname.href = data.last_track["url"];
  } catch {}

  try {
    lastfm.artist.innerText = artist_name;
  } catch {}

  try {
    lastfm.albumname.innerText = data.last_track["album"]["#text"];
  } catch {}

  try {
    lastfm.cover.src = coverurl;
  } catch {}

  try {
    lastfm["bg-cover"].src = coverurl;
  } catch {}

  try {
    lastfm["cover-link"].href = data.last_track["url"];
  } catch {}

  try {
    lastfm.fmtime.innerHTML = "(" + data.date + ")";
  } catch {}

  try {
    lastfm["lastfm-scrobbles"].innerText = data.info["user"]["playcount"];
  } catch {}
}

main();

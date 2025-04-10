const api_url =
  "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
  "sharkyblacktip" +
  "&api_key=" +
  "8093eae1b06820d1d900400320d5f8f9" +
  "&format=json";

function formatAgo(seconds) {
  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 3600) {
    return Math.round(seconds / 60) + "min ago";
  } else if (seconds < 86400) {
    return Math.round(seconds / 60 / 60) + "h ago";
  } else {
    return Math.round(seconds / 60 / 60 / 24) + " days ago";
  }
}

const resp = fetch(api_url)
  .then((response) => {
    if (!response.ok) {
      const response = {
        ok: false,
      };

      return json(response);
    }
    return response.json();
  })
  .then((data) => {
    const last_track = data["recenttracks"]["track"][0];

    const artist_name = last_track["artist"]["#text"];
    const track_name = last_track["name"];
    const coverurl = last_track["image"][3]["#text"]; // 0 = small, 1 = medium, 2 = large, 3 = extralarge
    let nowplaying;
    let date; // seconds since unix epoch, valid only when !nowplaying

    try {
      nowplaying = last_track["@attr"]["nowplaying"];
    } catch (e) {}

    try {
      date = last_track["date"]["uts"];
    } catch (e) {}

    if (nowplaying) {
      date = "right now";
    } else {
      date = formatAgo(Date.now() / 1000 - date);
    }

    document.getElementById("trackname").innerText = track_name;
    document.getElementById("artist").innerText = artist_name;
    document.getElementById("trackname").href = last_track["url"];
    document.getElementById("cover").src = coverurl;
    document.getElementById("fmtime").innerHTML = "(" + date + ")";

    // RAVEPOP has an 18+ album cover on last.fm... plz fix :(
    if (
      last_track["album"]["#text"] == "RAVEPOP" &&
      artist_name == "r u s s e l b u c k"
    ) {
      document.getElementById("cover").style.filter = "blur(8px)";
    }

    if (artist_name == "Nirvana") {
      const kurt = document.createElement("img");
      kurt.src = "/assets/kurt.png";
      kurt.loading = "lazy";
      kurt.id = "kurt";
      document.getElementById("lastfm").appendChild(kurt);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

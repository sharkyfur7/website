const username_input = document.getElementById("username");
const period_select = document.getElementById("period");
const button = document.getElementById("request");
const album_container = document.getElementById("album_container");

function getLastfmData(username, period) {
  const api =
    "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" +
    username +
    "&api_key=8093eae1b06820d1d900400320d5f8f9" +
    "&format=json&limit=15" +
    "&period=" +
    period;

  const response = fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
}

function createAlbumElement(name, artist, url, img_src, listencount, rank) {
  const container = document.createElement("div");
  const img_el = document.createElement("img");
  const name_el = document.createElement("a");
  const artist_el = document.createElement("div");
  const info_el = document.createElement("div");

  img_el.loading = "lazy";

  container.classList.add("album");
  name_el.classList.add("albumname");
  artist_el.classList.add("artistname");
  info_el.classList.add("info");

  container.appendChild(img_el);
  container.appendChild(info_el);
  container.appendChild(name_el);
  container.appendChild(artist_el);

  name_el.innerHTML = name;
  name_el.href = url;
  artist_el.innerHTML = artist;
  img_el.src = img_src;

  info_el.innerHTML =
    "<span>#" + rank + "</span><span>" + listencount + " listens</span>";

  return container;
}

async function onRequest() {
  const username = username_input.value;
  const period = period_select.value;

  const data = await getLastfmData(username, period);
  console.log(data);
  const albums = data["topalbums"]["album"];

  album_container.innerHTML = "";

  albums.forEach((album) => {
    const element = createAlbumElement(
      album["name"],
      album["artist"]["name"],
      album["url"],
      album["image"][3]["#text"],
      album["playcount"],
      album["@attr"]["rank"]
    );

    album_container.appendChild(element);
  });
}

button.onclick = onRequest;

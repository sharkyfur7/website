import { getCookie, setCookie } from "./module/cookie.js";
import { getRandomInt, getRandomArbitrary } from "./module/random.js";

var checkbox = document.getElementById("catsounds");

function toggleCatSounds() {
  if (checkbox.checked) {
    setCookie("catsound", true, 10);
  } else {
    setCookie("catsound", false, 10);
  }
}

if (checkbox) {
  checkbox.checked = getCookie("catsound") || false;
  checkbox.addEventListener("change", toggleCatSounds, false);
}

document.addEventListener("keydown", (event) => {
  if (checkbox && checkbox.checked) {
    return;
  }

  var i = getRandomInt(1, 29);
  i = i.toString().padStart(2, "0");
  var filename = i + ".wav"; // i am a horrible person

  var audio = new Audio("/assets/cat_noises/" + filename);
  audio.playbackRate = getRandomArbitrary(1, 1.5);
  audio.preservesPitch = false;
  audio.volume = 0.2;
  audio.play();
});

var checkbox = document.getElementById("catsounds");

// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function toggleCatSounds() {
  if (checkbox.checked) {
    setCookie("catsound", true, 10);
  } else {
    setCookie("catsound", false, 10);
  }
}

checkbox.checked = getCookie("catsound") || false;

checkbox.addEventListener("change", toggleCatSounds, false);

document.addEventListener("keydown", (event) => {
  if (checkbox.checked) {
    return;
  }

  var i = getRandomInt(1, 29);
  i = i.toString().padStart(2, "0");
  var filename = i + ".wav"; // i am a horrible person
  console.log(filename);

  var audio = new Audio("/assets/cat_noises/" + filename);
  audio.playbackRate = getRandomArbitrary(1, 1.5);
  audio.preservesPitch = false;
  audio.volume = 0.2;
  audio.play();
});

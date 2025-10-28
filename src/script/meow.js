function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("keydown", (event) => {
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

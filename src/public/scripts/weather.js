async function loadWeather() {
  let res = await fetch("https://wttr.in?format=1");
  document.querySelector(".topbar--weather").textContent = await res.text();
}

loadWeather();

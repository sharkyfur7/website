const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function updateTime() {
  let e = document.querySelector(".topbar--time");
  let t = new Date();

  let hours = t.getHours().toString().padStart(2, 0);
  let minutes = t.getMinutes().toString().padStart(2, 0);

  e.textContent = `${hours}:${minutes}`;
}

async function loop() {
  while (true) {
    updateTime();
    await delay(5000);
  }
}

loop();

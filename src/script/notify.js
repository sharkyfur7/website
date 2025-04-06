const input = document.getElementById("notifyinput");
const button = document.getElementById("notifysend");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendNotification() {
  if (input.value == "") {
    return;
  }

  fetch("https://ntfy.sh/sharky-notif", {
    method: "POST",
    body: input.value,
  });

  input.value = "";

  const beforetext = button.innerHTML;
  button.innerHTML = "sent! :)";
  button.disabled = true;

  await sleep(3000);

  button.innerHTML = beforetext;
  button.disabled = false;

  onNotifyInput();
}

function onNotifyInput() {
  if (input.value == "") {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

button.onclick = sendNotification;
input.oninput = onNotifyInput;

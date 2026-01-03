const input = document.getElementById("notifyinput");
const button = document.getElementById("notifysend");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendNotification() {
  const beforetext = button.innerHTML;
  if (input.value == "") {
    return;
  }

  button.innerHTML = "Sending...";
  button.disabled = true;

  let resp = await fetch("https://api.furshark.net/ntfy", {
    method: "POST",
    body: JSON.stringify({ text: input.value, agent: navigator.userAgent }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  input.value = "";

  if (!resp.ok) {
    button.innerHTML = "Failed... server error :(";
    button.disabled = true;

    await sleep(3000);

    button.innerHTML = beforetext;
    button.disabled = false;

    onNotifyInput();
  } else {
    button.innerHTML = "Sent! :)";
    button.disabled = true;

    await sleep(3000);

    button.innerHTML = beforetext;
    button.disabled = false;

    onNotifyInput();
  }
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

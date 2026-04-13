let time_element = document.querySelector(".mytime");

let my_time = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  hour: "2-digit",
  minute: "2-digit",
}).format(new Date());

time_element.textContent = `${my_time}`;

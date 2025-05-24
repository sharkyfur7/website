const url = "https://nekoweb.org/api/site/info/lowtide";
const cookie_expiration_minutes = 15;

let options = {
  method: "GET",
};

// getCookie && setCookie source: https://www.w3schools.com/js/js_cookies.asp
// nekoweb api docs https://nekoapi.nekoweb.org/#tag/Site

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exminutes) {
  const d = new Date();
  d.setTime(d.getTime() + exminutes * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function updateStats() {
  let result = await fetch(url, options);
  let json = await result.json();

  let views = json["views"];
  let updates = json["updates"];
  let last_update = json["updated_at"];

  setCookie("stat-views", views, cookie_expiration_minutes);
  setCookie("stat-updates", updates, cookie_expiration_minutes);
  setCookie("stat-last-update", last_update, cookie_expiration_minutes);
}

async function main() {
  let views = getCookie("stat-views");
  let updates = getCookie("stat-updates");
  let last_update = getCookie("stat-last-update");

  if (views == "" || updates == "" || last_update == "") {
    await updateStats();

    views = getCookie("stat-views");
    updates = getCookie("stat-updates");
    last_update = getCookie("stat-last-update");
  }

  // I only want the YYYY-MM-DD portion of the full iso date
  let iso_date = new Date(parseInt(last_update)).toISOString().substring(0, 10);

  document.getElementById("stat-views").innerText = views;
  document.getElementById("stat-updates").innerText = updates;
  document.getElementById("stat-last-update").innerText = iso_date;
}

// default values
document.getElementById("stat-views").innerText = "n";
document.getElementById("stat-updates").innerText = "n";
document.getElementById("stat-last-update").innerText = "n";

// Do this so I can use await
main();

function formatAgo(seconds) {
  if (seconds < 60) {
    return Math.round(seconds) + " seconds ago";
  } else if (seconds < 3600) {
    return Math.round(seconds / 60) + " minutes ago";
  } else if (seconds < 86400) {
    return Math.round(seconds / 60 / 60) + " hours ago";
  } else {
    return Math.round(seconds / 60 / 60 / 24) + " days ago";
  }
}

const buildDate = new Date(document.getElementById("buildTime").innerText);
const now = new Date();
const diff = now.getTime() - buildDate.getTime();
const formatted = formatAgo(diff / 1000);

document.getElementById("buildAgo").innerText = ` (${formatted})`;

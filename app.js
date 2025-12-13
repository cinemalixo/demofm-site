const loading = document.getElementById("loading");
const app = document.getElementById("app");
const enter = document.getElementById("enter");
const playBtn = document.getElementById("play");

let player;
let deviceId;

enter.onclick = async () => {
  loading.style.display = "none";
  app.hidden = false;
  loadData();
};

function loadData() {
  fetch("data/news.json")
    .then(r => r.json())
    .then(items => {
      const ul = document.getElementById("news");
      items.forEach(i => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${i.link}" target="_blank">${i.title}</a>`;
        ul.appendChild(li);
      });
    });

  fetch("data/events.json")
    .then(r => r.json())
    .then(items => {
      const ul = document.getElementById("events");
      items.forEach(i => {
        const li = document.createElement("li");
        li.innerText = `${i.date} — ${i.name}`;
        ul.appendChild(li);
      });
    });
}

/* Spotify */
window.onSpotifyWebPlaybackSDKReady = () => {
  player = new Spotify.Player({
    name: "DEMO FM",
    getOAuthToken: cb => {
      cb("YOUR_SPOTIFY_TOKEN_HERE");
    },
    volume: 0.8
  });

  player.addListener("ready", ({ device_id }) => {
    deviceId = device_id;
  });

  player.connect();
};

playBtn.onclick = () => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: "spotify:playlist:YOUR_PLAYLIST_ID",
      shuffle: true
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_SPOTIFY_TOKEN_HERE"
    }
  });
};
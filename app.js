const enter = document.getElementById("enter");
const loading = document.getElementById("loading");
const app = document.getElementById("app");
const playBtn = document.getElementById("play");

const iframe = document.getElementById("sc-player");
const widget = SC.Widget(iframe);

let playing = false;

enter.onclick = () => {
  loading.style.display = "none";
  app.hidden = false;

  widget.play();
  playing = true;
  playBtn.innerText = "Pause";
};

playBtn.onclick = () => {
  if (playing) {
    widget.pause();
    playBtn.innerText = "Play";
  } else {
    widget.play();
    playBtn.innerText = "Pause";
  }
  playing = !playing;
};

widget.bind(SC.Widget.Events.PLAY, () => {
  widget.getCurrentSound(sound => {
    if (!sound) return;
    document.getElementById("track-title").innerText = sound.title;
    document.getElementById("track-artist").innerText = sound.user.username;
  });
});
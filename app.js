const enter = document.getElementById("enter");
const loading = document.getElementById("loading");
const app = document.getElementById("app");

enter.onclick = () => {
  loading.style.display = "none";
  app.hidden = false;
};
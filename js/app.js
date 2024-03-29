let ammoElement = document.getElementById("ammo");
let pointsElement = document.getElementById("points");
let gameField = document.getElementById("background");
let copyBtn = document.getElementById("copy");
let catapult = document.getElementById("catapult");

let ammo = parseInt(localStorage.getItem("ammo")) || 0;
let points = parseInt(localStorage.getItem("points")) || 0;
let lastAmmoUpdate =
  parseInt(localStorage.getItem("lastAmmoUpdate")) || Date.now();
let max_ammo = 5000;

currentTime = Date.now();
ammo = 0;
ammoElement.textContent = `+${ammo}`;
localStorage.setItem("ammo", ammo);
localStorage.setItem("lastAmmoUpdate", currentTime);

let points_per_tap = 5;
let ammo_points = 5;

console.log(ammo, points, lastAmmoUpdate);

pointsElement.textContent = points;
ammoElement.textContent = `+${ammo}`;

function updatePoints() {
  if (ammo - ammo_points < 0) return;
  ammo -= ammo_points;
  ammoElement.textContent = `+${ammo}`;
  points += points_per_tap;
  pointsElement.textContent = points;
  catapultAnimate();

  localStorage.setItem("ammo", ammo);
  localStorage.setItem("points", points);
  localStorage.setItem("lastAmmoUpdate", Date.now());
}

function updateAmmo() {
  ammo += ammo_points;
  ammoElement.textContent = `+${ammo}`;

  localStorage.setItem("ammo", ammo);
  localStorage.setItem("lastAmmoUpdate", Date.now());
}

function toggleCopyBlock() {
  copyBtn.classList.toggle("hidden");
}

function copyText() {
  navigator.clipboard.writeText("https://youtube.com");
  copyBtn.classList.toggle("hidden");
}

function initialAmmoUpdate() {
  let currentTime = Date.now();
  let timeDifference = currentTime - lastAmmoUpdate;

  let ammoIncrement = Math.floor(timeDifference / 1000);
  if (ammo + ammoIncrement <= max_ammo) ammo += ammoIncrement * ammo_points;
  else ammo = max_ammo;
  ammoElement.textContent = `+${ammo}`;
  localStorage.setItem("ammo", ammo);
  localStorage.setItem("lastAmmoUpdate", currentTime);
}

function catapultAnimate() {
  catapult.classList.add("active");
  setTimeout(function () {
    catapult.classList.remove("active");
  }, 400);
}

initialAmmoUpdate();

setInterval(updateAmmo, 1000);
gameField.addEventListener("click", updatePoints);

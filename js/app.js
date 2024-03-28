let ammoElement = document.getElementById("ammo");
let pointsElement = document.getElementById("points");
let gameField = document.getElementById("background");
let copyBtn = document.getElementById("copy");

let ammo = parseInt(localStorage.getItem("ammo")) || 0;
let points = parseInt(localStorage.getItem("points")) || 0;
let lastAmmoUpdate =
  parseInt(localStorage.getItem("lastAmmoUpdate")) || Date.now();

console.log(ammo, points, lastAmmoUpdate);

pointsElement.textContent = points;
ammoElement.textContent = `+${ammo}`;

function updatePoints() {
  if (ammo <= 0) return;
  ammo--;
  ammoElement.textContent = `+${ammo}`;
  points += 12;
  pointsElement.textContent = points;

  localStorage.setItem("ammo", ammo);
  localStorage.setItem("points", points);
  localStorage.setItem("lastAmmoUpdate", Date.now());
}

function updateAmmo() {
  ammo++;
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
  ammo += ammoIncrement;
  ammoElement.textContent = `+${ammo}`;
  localStorage.setItem("ammo", ammo);
  localStorage.setItem("lastAmmoUpdate", currentTime);
}

initialAmmoUpdate();

setInterval(updateAmmo, 1000);
gameField.addEventListener("click", updatePoints);

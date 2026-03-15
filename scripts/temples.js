const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
  mainNav.classList.toggle("open");

  if (mainNav.classList.contains("open")) {
    menuButton.textContent = "X";
  } else {
    menuButton.textContent = "☰";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count++;

  localStorage.setItem("reviewCount", count);

  document.querySelector("#reviewCount").textContent = count;

  document.querySelector("#lastModified").textContent =
    "Last Modification: " + document.lastModified;
});
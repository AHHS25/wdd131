document.addEventListener("DOMContentLoaded", () => {
  let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
  reviewCount++;
  localStorage.setItem("reviewCount", reviewCount);

  document.querySelector("#reviewCount").textContent = reviewCount;
  document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
});
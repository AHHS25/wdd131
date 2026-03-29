const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  /* Added temples based on the names from your previous page */
  {
    templeName: "Mérida Mexico",
    location: "Mérida, Yucatán, Mexico",
    dedicated: "2000, July, 8",
    area: 10700,
    imageUrl: "images/merida_mexico_temple.jpg"
  },
  {
    templeName: "Puebla Mexico",
    location: "Puebla, Puebla, Mexico",
    dedicated: "2024, May, 19",
    area: 35865,
    imageUrl: "images/puebla_mexico_temple.jpg"
  },
  {
    templeName: "Colonia Juárez Chihuahua Mexico",
    location: "Colonia Juárez, Chihuahua, Mexico",
    dedicated: "1999, March, 6",
    area: 6800,
    imageUrl: "images/colonia_juarez_mexico_temple.jpg"
  },
  {
    templeName: "Guatemala City Guatemala",
    location: "Guatemala City, Guatemala",
    dedicated: "1984, December, 14",
    area: 11610,
    imageUrl: "images/guatemala_temple.jpg"
  }
];

const container = document.querySelector("#temple-cards");
const pageTitle = document.querySelector("#page-title");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

function displayTemples(templeList) {
  container.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("article");
    card.classList.add("temple-card");

    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
      <div class="temple-info">
        <h2>${temple.templeName}</h2>
        <p><span class="label">Location:</span> ${temple.location}</p>
        <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
        <p><span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function getTempleYear(temple) {
  return parseInt(temple.dedicated.split(",")[0]);
}

document.querySelector("#home").addEventListener("click", (e) => {
  e.preventDefault();
  pageTitle.textContent = "Home";
  displayTemples(temples);
});

document.querySelector("#old").addEventListener("click", (e) => {
  e.preventDefault();
  pageTitle.textContent = "Old Temples";
  const oldTemples = temples.filter((temple) => getTempleYear(temple) < 1900);
  displayTemples(oldTemples);
});

document.querySelector("#new").addEventListener("click", (e) => {
  e.preventDefault();
  pageTitle.textContent = "New Temples";
  const newTemples = temples.filter((temple) => getTempleYear(temple) > 2000);
  displayTemples(newTemples);
});

document.querySelector("#large").addEventListener("click", (e) => {
  e.preventDefault();
  pageTitle.textContent = "Large Temples";
  const largeTemples = temples.filter((temple) => temple.area > 90000);
  displayTemples(largeTemples);
});

document.querySelector("#small").addEventListener("click", (e) => {
  e.preventDefault();
  pageTitle.textContent = "Small Temples";
  const smallTemples = temples.filter((temple) => temple.area < 10000);
  displayTemples(smallTemples);
});

menuButton.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  menuButton.textContent = mainNav.classList.contains("open") ? "✖" : "☰";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

displayTemples(temples);

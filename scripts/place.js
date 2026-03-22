const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const windChillElement = document.querySelector("#windchill");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const temperature = 8; // Celsius
const windSpeed = 12; // km/h

function calculateWindChill(tempC, speedKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(speedKmh, 0.16) +
    0.3965 * tempC * Math.pow(speedKmh, 0.16)
  ).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
  windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillElement.textContent = "N/A";
}
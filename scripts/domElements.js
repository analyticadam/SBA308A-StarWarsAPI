// domElements.js

// ======= Element References =======
export const starWarsPeople = document.getElementById("starWarsPeople");
export const swBtn = document.getElementById("swBtn");
export const starPics = document.getElementById("starPics");
export const birthYear = document.getElementById("birthYear");
export const eyeColor = document.getElementById("eyeColor");
export const hairColor = document.getElementById("hairColor");
export const homeworld = document.getElementById("homeworld");
export const species = document.getElementById("species");
export const starships = document.getElementById("starships");
export const vehicles = document.getElementById("vehicles");
export const films = document.getElementById("films");

/**
 * Updates the character details in the UI.
 * @param {Object} details - Object containing the character details to display.
 */
export const updateDetails = (details) => {
  starPics.src = details.image || "";
  birthYear.textContent = details.birthYear || "Unknown";
  eyeColor.textContent = details.eyeColor || "Unknown";
  hairColor.textContent = details.hairColor || "Unknown";
  homeworld.textContent = details.homeworld || "Unknown";
  species.textContent = details.species || "None";
  starships.textContent = details.starships || "None";
  vehicles.textContent = details.vehicles || "None";
  films.textContent = details.films || "None";
};

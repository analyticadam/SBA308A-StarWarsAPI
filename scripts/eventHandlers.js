// eventHandlers.js

// Import necessary modules
import { starWarsPeople, swBtn, updateDetails } from "./domElements.js";
import {
  fetchCharacters,
  fetchCharacterDetails,
  fetchHomeworld,
  fetchDetailsList,
} from "./apiCalls.js";

/**
 * Populates the dropdown menu with character names.
 */
export const populateDropdown = async () => {
  try {
    console.log("Fetching characters...");
    const data = await fetchCharacters();
    starWarsPeople.innerHTML =
      '<option value="" disabled selected>Choose a Character</option>';
    data.results.forEach((character, index) => {
      const option = document.createElement("option");
      option.value = index + 1; // Use 1-based index
      option.textContent = character.name;
      starWarsPeople.appendChild(option);
    });
    console.log("Dropdown populated.");
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
};

/**
 * Handles the "Get Character" button click.
 */
export const handleButtonClick = async () => {
  const selectedId = starWarsPeople.value; // Get the selected character ID
  if (!selectedId) {
    alert("Please select a character!");
    return;
  }

  swBtn.disabled = true; // Prevent multiple clicks while fetching
  try {
    console.log("Fetching character details...");
    const data = await fetchCharacterDetails(selectedId);
    const homeworld = await fetchHomeworld(data.homeworld);
    const species = await fetchDetailsList(data.species);
    const films = await fetchDetailsList(data.films);
    const starships = await fetchDetailsList(data.starships);
    const vehicles = await fetchDetailsList(data.vehicles);

    updateDetails({
      image: `https://starwars-visualguide.com/assets/img/characters/${selectedId}.jpg`,
      birthYear: data.birth_year,
      eyeColor: data.eye_color,
      hairColor: data.hair_color,
      homeworld: homeworld.name,
      species: species.join(", "),
      starships: starships.join(", "),
      vehicles: vehicles.join(", "),
      films: films.join(", "),
    });
    console.log("Character details updated.");
  } catch (error) {
    console.error("Error fetching character details:", error);
  } finally {
    swBtn.disabled = false; // Re-enable the button
  }
};

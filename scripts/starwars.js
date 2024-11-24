// starwars.js

// Import modules
import { populateDropdown, handleButtonClick } from "./eventHandlers.js";
import { swBtn } from "./domElements.js";
import { initializeStarCanvas } from "./starCanvas.js";

// Initialize the starry background
initializeStarCanvas();

// Initialize the app
populateDropdown();

// Add event listener to the button
swBtn.addEventListener("click", handleButtonClick);

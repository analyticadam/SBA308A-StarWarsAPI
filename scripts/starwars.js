// ======= Element References =======
const starWarsPeople = document.getElementById("starWarsPeople");
const swBtn = document.getElementById("swBtn");
const starPics = document.getElementById("starPics");
const birthYear = document.getElementById("birthYear");
const eyeColor = document.getElementById("eyeColor");
const hairColor = document.getElementById("hairColor");
const homeworld = document.getElementById("homeworld");
const species = document.getElementById("species");
const starships = document.getElementById("starships");
const vehicles = document.getElementById("vehicles");
const films = document.getElementById("films");

// Confirm elements are found
console.log("Button element:", swBtn);
console.log("Dropdown element:", starWarsPeople);

// ======= Populate Dropdown =======
const populateCharacterDropdown = async () => {
  try {
    console.log("Fetching characters from SWAPI...");
    const res = await fetch("https://swapi.dev/api/people/");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    console.log("Characters successfully fetched:", data.results);

    starWarsPeople.innerHTML =
      '<option value="" disabled selected>Choose a Character</option>';
    console.log("Dropdown cleared.");

    data.results.forEach((character, index) => {
      const option = document.createElement("option");
      option.value = index + 1; // Use character index as the value (1-based)
      option.textContent = character.name;
      starWarsPeople.appendChild(option);
    });

    console.log(
      "Dropdown populated successfully. Current options:",
      starWarsPeople.innerHTML
    );
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
};

// ======= Load Character Details =======
const loadStarWarsCharacter = async (id) => {
  try {
    console.log(`Fetching details for character ID: ${id}`);
    starPics.src = ""; // Reset previous image
    birthYear.textContent = "Loading...";
    eyeColor.textContent = "Loading...";
    hairColor.textContent = "Loading...";
    homeworld.textContent = "Loading...";
    species.textContent = "Loading...";
    starships.textContent = "Loading...";
    vehicles.textContent = "Loading...";
    films.textContent = "Loading...";

    // Fetch character data
    const res = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    console.log("Character data successfully fetched:", data);

    // Fetch additional details
    const homeworldRes = await fetch(data.homeworld);
    const homeworldData = await homeworldRes.json();
    console.log("Homeworld fetched:", homeworldData.name);

    const speciesList = [];
    for (const speciesUrl of data.species) {
      const speciesRes = await fetch(speciesUrl);
      const speciesData = await speciesRes.json();
      speciesList.push(speciesData.name);
    }
    console.log("Species fetched:", speciesList);

    const filmsList = [];
    for (const filmUrl of data.films) {
      const filmRes = await fetch(filmUrl);
      const filmData = await filmRes.json();
      filmsList.push(filmData.title);
    }
    console.log("Films fetched:", filmsList);

    const starshipsList = [];
    for (const starshipUrl of data.starships) {
      const starshipRes = await fetch(starshipUrl);
      const starshipData = await starshipRes.json();
      starshipsList.push(starshipData.name);
    }
    console.log("Starships fetched:", starshipsList);

    const vehiclesList = [];
    for (const vehicleUrl of data.vehicles) {
      const vehicleRes = await fetch(vehicleUrl);
      const vehicleData = await vehicleRes.json();
      vehiclesList.push(vehicleData.name);
    }
    console.log("Vehicles fetched:", vehiclesList);

    // Update the UI with fetched data
    starPics.src = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`; // Character image
    birthYear.textContent = data.birth_year || "Unknown";
    eyeColor.textContent = data.eye_color || "Unknown";
    hairColor.textContent = data.hair_color || "Unknown";
    homeworld.textContent = homeworldData.name || "Unknown";
    species.textContent = speciesList.join(", ") || "None";
    starships.textContent = starshipsList.join(", ") || "None";
    vehicles.textContent = vehiclesList.join(", ") || "None";
    films.textContent = filmsList.join(", ") || "None";

    console.log("UI updated with character details.");
  } catch (error) {
    console.error("Error loading character details:", error);
    alert("Failed to load character details. Please try again.");
  }
};

// ======= Event Listener for Button Click =======
swBtn.addEventListener("click", async () => {
  console.log("Button clicked!");
  const selectedId = starWarsPeople.value; // Get the selected character ID
  console.log("Selected character ID:", selectedId);
  if (!selectedId) {
    alert("Please select a character!");
    console.log("No character selected. Aborting.");
    return;
  }

  swBtn.disabled = true; // Disable button to prevent multiple clicks
  await loadStarWarsCharacter(selectedId); // Load character details
  swBtn.disabled = false; // Re-enable button
  console.log("Character details loaded and button re-enabled.");
});

// ======= Dropdown Selection Logging =======
starWarsPeople.addEventListener("change", () => {
  console.log(
    "Dropdown selection changed. Selected value:",
    starWarsPeople.value
  );
});

// ======= Initialize App =======
populateCharacterDropdown();

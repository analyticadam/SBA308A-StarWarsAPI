// ======= Element References =======
const starWarsPeople = document.getElementById("starWarsPeople");
const swBtn = document.getElementById("swBtn");
const personName = document.getElementById("personName");
const starPics = document.getElementById("starPics");
const starLinks = document.querySelector(".starLinks");

// ======= Function to Fetch a Single Character =======
/**
 * Fetches character details from the SWAPI and combines with Visual Guide images.
 * @param {number} id - The ID of the Star Wars character.
 * @returns {object|null} - Returns an object with the character's name, image, and link, or null on error.
 */
const loadStarWarsPeople = async (id) => {
  try {
    const res = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} (${res.statusText})`);
    }

    const data = await res.json();

    // Combine data with Visual Guide image URL
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

    return {
      name: data.name, // Character's name
      image: imageUrl, // URL for the character's image
      link: `https://swapi.dev/api/people/${id}/`, // Link to SWAPI details
    };
  } catch (err) {
    console.error("Error fetching Star Wars data:", err);
    alert("Unable to fetch data. Please try again.");
    return null; // Return null to indicate failure
  }
};

// ======= Function to Populate Dropdown Menu =======
/**
 * Populates the dropdown menu with Star Wars characters from SWAPI.
 */
const populateCharacterDropdown = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // Loop through the character list and add each as an option to the dropdown
    data.results.forEach((character, index) => {
      const option = document.createElement("option"); // Create a new <option> element
      option.value = index + 1; // Use 1-based IDs for compatibility with Visual Guide
      option.textContent = character.name; // Set the visible name in the dropdown
      starWarsPeople.appendChild(option); // Append the option to the dropdown
    });
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
};

// ======= Event Listener for Button Click =======
/**
 * Handles the button click event to display the selected character's details.
 */
swBtn.addEventListener("click", async () => {
  const selectedId = starWarsPeople.value; // Get the selected character ID from the dropdown

  // Validate the selection
  if (!selectedId) {
    alert("Please select a character!");
    return;
  }

  // Fetch the selected character's details
  const character = await loadStarWarsPeople(selectedId);
  if (character) {
    // Update the UI with the character's details
    personName.textContent = character.name; // Set the character's name
    starPics.src = character.image; // Set the character's image
    starLinks.href = character.link; // Set the link to more details
    starLinks.textContent = "Learn More"; // Add link text
  }
});

// ======= Initialize Dropdown on Page Load =======
/**
 * Fetches and populates the dropdown with character names when the page loads.
 */
populateCharacterDropdown();

// ======= Starry Background Animation =======
const canvas = document.createElement("canvas"); // Create canvas dynamically
canvas.id = "starCanvas"; // Assign ID for styling consistency
document.body.appendChild(canvas); // Append canvas to the body

const ctx = canvas.getContext("2d");

// Resize canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to create a single star
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random() * 0.8 + 0.2,
  };
}

const stars = Array.from({ length: 200 }, createStar);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

function animateStars() {
  stars.forEach((star) => {
    star.y += 0.5;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  drawStars();
  requestAnimationFrame(animateStars);
}

animateStars();

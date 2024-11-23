const starWarsPeople = document.getElementById(`starWarsPeople`);
const swBtn = document.getElementById(`swBtn`);
const personName = document.getElementById("personName");
const starPics = document.getElementById(`starPics`);
const starLinks = document.querySelector(".starLinks");

// Function to pull data from the API
const loadStarWarsPeople = async (number) => {
  try {
    const res = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${number}.json`
    );
    if (!res.ok) {
      throw new Error(`HTTP ERROR! Status: ${res.status} (${res.statusText})`);
    }
    const data = await res.json();
    const name = data.name;
    console.log(name);

    // Sends the data to swName in the Event Listener function
    return { name: data.name, img: data.image, link: data.wiki };
    // console.log(data.name);
    // console.log(data.height);
    // console.log(data.films[1]);
    // console.log(data);
  } catch (err) {
    console.log("Space Wizard Farm boy took out an Armada", err);
  }
};

loadStarWarsPeople(3);

// Event Listener for when the button is clicked
swBtn.addEventListener(`click`, async () => {
  // This variable is calling the particular Star Wars person
  const starName = starWarsPeople.value;
  const swName = await loadStarWarsPeople(starName);
  personName.textContent = swName.name;
  starPics.src = swName.img;
  starLinks.href = swName.link;
});

// Starry Background Functionality
const canvas = document.createElement("canvas"); // Create canvas dynamically
canvas.id = "starCanvas"; // Assign ID for styling consistency
document.body.appendChild(canvas); // Append canvas to the body

const ctx = canvas.getContext("2d");

// Resize canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  // Adjust canvas size dynamically if the window resizes
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to create a single star
function createStar() {
  return {
    x: Math.random() * canvas.width, // Random horizontal position
    y: Math.random() * canvas.height, // Random vertical position
    radius: Math.random() * 1.5, // Random star size
    alpha: Math.random() * 0.8 + 0.2, // Random brightness
  };
}

// Create an array of stars
const stars = Array.from({ length: 200 }, createStar); // Adjust star density if needed

// Function to draw stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`; // White color with varying brightness
    ctx.fill();
  });
}

// Function to animate the star field
function animateStars() {
  stars.forEach((star) => {
    star.y += 0.5; // Move stars downward
    if (star.y > canvas.height) {
      // Reset position when a star goes off-screen
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  drawStars(); // Redraw stars
  requestAnimationFrame(animateStars); // Continue animation loop
}

// Start the star animation
animateStars();

// Existing Star Wars Functionality
document.getElementById("swBtn").addEventListener("click", () => {
  const personNumber = document.getElementById("starWarsPeople").value;

  // Validate input
  if (!personNumber || personNumber < 1 || personNumber > 83) {
    alert("Please enter a number between 1 and 83");
    return;
  }

  // Fetch data from the Star Wars API
  fetch(`https://swapi.dev/api/people/${personNumber}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the UI with the retrieved data
      document.getElementById("personName").textContent = data.name;
      document.getElementById("infoContainer");
    });
});

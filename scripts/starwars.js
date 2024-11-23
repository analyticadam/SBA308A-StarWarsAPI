// Element References
const starWarsPeople = document.getElementById("starWarsPeople");
const swBtn = document.getElementById("swBtn");
const personName = document.getElementById("personName");
const starPics = document.getElementById("starPics");
const starLinks = document.querySelector(".starLinks");

// Function to pull data from the Star Wars API
const loadStarWarsPeople = async (number) => {
  try {
    const res = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${number}.json`
    );
    if (!res.ok) {
      throw new Error(`HTTP ERROR! Status: ${res.status} (${res.statusText})`);
    }
    const data = await res.json();
    return { name: data.name, img: data.image, link: data.wiki };
  } catch (err) {
    console.error("Error fetching Star Wars data:", err);
    alert("Unable to fetch data. Please try again.");
  }
};

// Event Listener for the button click
swBtn.addEventListener("click", async () => {
  const starName = starWarsPeople.value;

  // Validate input
  if (!starName || starName < 1 || starName > 83) {
    alert("Please enter a number between 1 and 83");
    return;
  }

  // Fetch data and update UI
  const swName = await loadStarWarsPeople(starName);
  if (swName) {
    personName.textContent = swName.name;
    starPics.src = swName.img;
    starLinks.href = swName.link;
  }
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

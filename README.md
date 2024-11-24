# 🌌 Star Wars Character Viewer

Explore your favorite **Star Wars** characters with this interactive application! ✨ This project uses the [Star Wars API (SWAPI)](https://swapi.dev/) to fetch data about characters, including their **homeworld**, **species**, **starships**, **vehicles**, and appearances in **films**. 🌟

---

## 🔍 Features

- 🧑‍🚀 **Interactive Dropdown**: Select your favorite Star Wars character.
- 🌐 **API Integration**: Fetch real-time data from the SWAPI.
- 🎥 **Film Appearances**: View all the films a character appeared in.
- 🚀 **Starry Background Animation**: Enjoy a dynamic starry sky in the background.
- 🔄 **Caching**: Optimized for performance with caching and parallel data fetching.

---

## 🚀 Technologies Used

- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML**
- ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white) **CSS**
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **JavaScript**
- ![SWAPI](https://img.shields.io/badge/API-SWAPI-001E2B?style=flat-square&logo=data:image/png;base64,iVBORw0KG...) **Star Wars API**

---

## 📂 Project Structure

📦 Project Root ├── 📁 scripts │ ├── apiCalls.js # API interaction logic │ ├── domElements.js # DOM element references and UI updates │ ├── eventHandlers.js # Event listeners and app interactions │ ├── starwars.js # Main entry point │ ├── starCanvas.js # Starry background animation ├── 📁 styles │ └── style.css # Main styles ├── index.html # Main HTML file └── README.md # Project documentation

---

## 🌠 How It Works

1. **Starry Background**: The dynamic **starry background** gives an immersive space theme.
2. **Character Selection**: Choose a character from the dropdown menu.
3. **Character Details**: Click "Get Character" to view detailed information.
4. **Data Sources**: Real-time data fetched from the **Star Wars API**:
   - 🌍 **Homeworld**
   - 🧬 **Species**
   - 🎥 **Films**
   - 🚀 **Starships**
   - 🚗 **Vehicles**

---

## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/analyticadam/star-wars-character-viewer.git
   ```
2. Navigate to the project directory:
   cd star-wars-character-viewer
3. Open index.html in your browser.

💡 Optimizations

Caching: Reduces API calls for previously fetched data.
Parallel Fetching: Enhances performance by fetching multiple resources simultaneously.

🎨 Starry Background
Enjoy a dynamic starry canvas animation implemented using the <canvas> element and JavaScript. ✨

📸 Screenshots
🔻 Dropdown & Details

🌌 Starry Background

📊 Performance Improvements
Before Optimization

🌐 Multiple redundant API calls.
🕒 Slower data fetching due to sequential requests.
After Optimization
✅ Caching for repeated requests.
✅ Parallel Fetching for faster data loading.

🤝 Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature-name
3. Commit your changes:
   git commit -m "Add feature name"
4. Push to your fork:
   git push origin feature-name
5. Open a Pull Request.

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgments
SWAPI: The Star Wars API for providing data.
Font Awesome: For the icons used in the project.

🛡️ Badges

🚀

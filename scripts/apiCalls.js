// apiCalls.js

/**
 * Cache for storing fetched data to avoid redundant API calls.
 * Keys are URLs, values are fetched results.
 */
const cache = new Map();

/**
 * Fetches the list of characters from the SWAPI for the dropdown menu.
 * The results are cached to improve performance.
 * @returns {Promise<Object>} - The fetched character data.
 */
export const fetchCharacters = async () => {
  const url = "https://swapi.dev/api/people/";
  if (cache.has(url)) {
    console.log("Using cached character data.");
    return cache.get(url); // Return cached data
  }
  console.log("Fetching character data from API...");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  cache.set(url, data); // Cache the fetched result
  return data;
};

/**
 * Fetches detailed information about a specific character.
 * The result is cached to improve performance for repeated requests.
 * @param {number} id - The character's ID.
 * @returns {Promise<Object>} - The fetched character details.
 */
export const fetchCharacterDetails = async (id) => {
  const url = `https://swapi.dev/api/people/${id}/`;
  if (cache.has(url)) {
    console.log(`Using cached details for character ID: ${id}`);
    return cache.get(url); // Return cached data
  }
  console.log(`Fetching details for character ID: ${id}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  cache.set(url, data); // Cache the fetched result
  return data;
};

/**
 * Fetches additional details (e.g., homeworld, species, films) from a given URL.
 * The result is cached to avoid redundant requests.
 * @param {string} url - The URL to fetch the resource.
 * @returns {Promise<Object>} - The fetched resource.
 */
export const fetchHomeworld = async (url) => {
  if (cache.has(url)) {
    console.log(`Using cached homeworld data for URL: ${url}`);
    return cache.get(url); // Return cached data
  }
  console.log(`Fetching homeworld data from URL: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  cache.set(url, data); // Cache the fetched result
  return data;
};

/**
 * Fetches a list of resources (e.g., species, films, starships) from an array of URLs.
 * Each URL is fetched in parallel, and the results are cached to improve performance.
 * @param {string[]} urls - Array of resource URLs to fetch.
 * @returns {Promise<string[]>} - List of names or titles for the resources.
 */
export const fetchDetailsList = async (urls) => {
  const fetchPromises = urls.map(async (url) => {
    if (cache.has(url)) {
      console.log(`Using cached data for URL: ${url}`);
      return cache.get(url); // Return cached data
    }
    try {
      console.log(`Fetching data from URL: ${url}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      const nameOrTitle = data.name || data.title; // Use 'name' or 'title' field
      cache.set(url, nameOrTitle); // Cache the result
      return nameOrTitle;
    } catch (error) {
      console.error(`Error fetching data for URL: ${url}`, error);
      return "Unavailable"; // Fallback in case of error
    }
  });

  return Promise.all(fetchPromises); // Wait for all fetches to complete
};

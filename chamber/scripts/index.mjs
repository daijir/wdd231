import { setYearAndLastModified } from "./yearModifcation.mjs";
import { setupHamburgerMenu } from "./hamburger.mjs";
import { getMembers, createBusinessCard, displayMembers } from "./businessCard.mjs";
import { displayWeather } from "./weather.mjs";
import { displayForecast } from "./forecast.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  setYearAndLastModified();
  setupHamburgerMenu();

  const directory = document.getElementById("business-cards");
  try {
    const businesses = await getMembers();
    const filtered = businesses.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 2) + 2;
    const randomMembers = shuffled.slice(0, count);
    displayMembers(randomMembers, directory, createBusinessCard);
  } catch (error) {
    directory.innerHTML = "<p>Business data could not be loaded.</p>";
  }

  displayWeather();
  displayForecast();
});

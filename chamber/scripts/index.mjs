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
    const filtered = businesses.filter(member => member.membershipLevel === 3);
    displayMembers(filtered, directory, createBusinessCard);
  } catch (error) {
    directory.innerHTML = "<p>Business data could not be loaded.</p>";
  }

  displayWeather();
  displayForecast();
});

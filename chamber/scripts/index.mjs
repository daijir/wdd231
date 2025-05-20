import { setYearAndLastModified } from "./YearModifcation.mjs";
import { setupHamburgerMenu } from "./Hamburger.mjs";
import { getMembers, createBusinessCard, displayMembers } from "./BusinessCard.mjs";
import { displayWeather } from "./Weather.mjs";
import { displayForecast } from "./Forecast.mjs";

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

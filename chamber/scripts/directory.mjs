import { setYearAndLastModified } from "./YearModifcation.mjs";
import { setupHamburgerMenu } from "./Hamburger.mjs";
import { getMembers, createBusinessCard, displayMembers } from "./BusinessCard.mjs";


document.addEventListener("DOMContentLoaded", async () => {
  setYearAndLastModified();
  setupHamburgerMenu();

  const directory = document.getElementById("business-cards");
  try {
    const businesses = await getMembers();
    displayMembers(businesses, directory, createBusinessCard);
  } catch (error) {
    directory.innerHTML = "<p>Business data could not be loaded.</p>";
  }
});

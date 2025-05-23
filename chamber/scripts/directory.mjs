import { setYearAndLastModified } from "./yearModifcation.mjs";
import { setupHamburgerMenu } from "./hamburger.mjs";
import { getMembers, createBusinessCard, displayMembers } from "./businessCard.mjs";


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

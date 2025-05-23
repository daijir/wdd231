export function setupHamburgerMenu(buttonId = "myButton", navClass = "menuLinks") {
  // Set up the hamburger menu toggle functionality
  const hamburgerElement = document.querySelector(`#${buttonId}`);
  const navElement = document.querySelector(`.${navClass}`);
  if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener("click", () => {
      navElement.classList.toggle("open");
    });
  }
}
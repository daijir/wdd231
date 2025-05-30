export function setupHamburgerMenu(buttonId = "myButton", navClass = "menuLinks") {
  // Set up the hamburger menu toggle functionality
  const hamburgerElement = document.querySelector(`#${buttonId}`);
  const navElement = document.querySelector(`.${navClass}`);
  const overlay = document.querySelector(".menu-overlay");
  // console.log(overlay);

  if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener("click", () => {
      navElement.classList.toggle("open");
      // console.log(navElement);
    });
  }

  overlay.addEventListener("click", () => {
    navElement.classList.remove("open");
  });
}
export function setupHamburgerMenu(buttonId = "myButton", navClass = "menuLinks") {
  const hamburgerElement = document.querySelector(`#${buttonId}`);
  const navElement = document.querySelector(`.${navClass}`);
  if (hamburgerElement && navElement) {
    hamburgerElement.addEventListener("click", () => {
      navElement.classList.toggle("open");
    });
  }
}
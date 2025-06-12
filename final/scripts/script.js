import { menuData } from '../data/menu.js';

document.addEventListener("DOMContentLoaded", () => {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    const hamburgerButton = document.querySelector('.hamburger-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('nav a');

    // Menu Tab Switching Logic (e.g., Dinner/Lunch tabs)
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab; // Gets 'dinner' or 'lunch' 

            // Remove 'active' class from all tabs, then add to the clicked one
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Hide all menu content sections, then show the relevant one
            menuContents.forEach(content => content.classList.remove('active'));
            const targetMenuContent = document.getElementById(tabId + '-menu');
            if (targetMenuContent) { // Check if the target content exists
                targetMenuContent.classList.add('active');
            }
        });
    });

    // --- Hamburger Menu Toggle Logic ---
    hamburgerButton.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        hamburgerButton.classList.toggle('open');
    });

    // --- Navigation Link Smooth Scrolling & Mobile Menu Auto-Close ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Only close the mobile menu if the screen width is less than 769px
            if (window.innerWidth < 769) {
                mainNav.classList.remove('open');
                hamburgerButton.classList.remove('open');
            }

            event.preventDefault(); // Prevent default anchor link behavior (i.e., jumping directly)

            const targetId = this.getAttribute('href'); // Get the section ID (e.g., "#about")
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Menu Data Rendering Logic ---
    const dinnerMenuContainer = document.getElementById("dinner-menu");
    const lunchMenuContainer = document.getElementById("lunch-menu");

    function renderMenu(menuItems, containerElement) {
        // Exit if the container element doesn't exist to prevent errors
        if (!containerElement) return;

        // Group menu items by their category (e.g., "Noodles", "Toppings")
        const categorizedMenu = menuItems.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});

        // Iterate through each category to build its section
        for (const category in categorizedMenu) {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("menu-category");

            const categoryButton = document.createElement("button");
            categoryButton.classList.add("menu-category-title");
            categoryButton.textContent = category;
            categoryDiv.appendChild(categoryButton);

            const menuGrid = document.createElement("div");
            menuGrid.classList.add("menu-grid", "menu-category-content");

            // Iterate through items within the current category
            categorizedMenu[category].forEach((item) => {
                const menuItemDiv = document.createElement("div");
                menuItemDiv.classList.add("menu-item");

                const menuItemHeader = document.createElement("div");
                menuItemHeader.classList.add("menu-item-header");

                const itemName = document.createElement("h4");
                itemName.textContent = item.name;
                menuItemHeader.appendChild(itemName);

                const itemPrice = document.createElement("span");
                itemPrice.classList.add("price");
                // Format price: add a '+' for "A La Carte Set" items
                itemPrice.textContent = item.category === "A La Carte Set" ? `+${item.price} yen` : `${item.price} yen`;
                menuItemHeader.appendChild(itemPrice);

                menuItemDiv.appendChild(menuItemHeader);

                // Add optional sub-text (like descriptions for lunch sets)
                if (item.subText) {
                    const subTextPara = document.createElement("p");
                    subTextPara.classList.add("sub-text");
                    subTextPara.textContent = item.subText;
                    menuItemDiv.appendChild(subTextPara);
                }

                // Add item photo if available
                if (item.photo) {
                    const itemPhoto = document.createElement("img");
                    itemPhoto.src = item.photo;
                    itemPhoto.alt = item.name; // Good for accessibility
                    itemPhoto.classList.add("menu-item-photo"); // For styling
                    menuItemDiv.appendChild(itemPhoto);
                }

                menuGrid.appendChild(menuItemDiv);
            });

            categoryDiv.appendChild(menuGrid);
            containerElement.appendChild(categoryDiv);
        }
    }

    // Filter menuData to separate dinner and lunch items
    const dinnerItems = menuData.filter(item => item.time === "dinner");
    const lunchItems = menuData.filter(item => item.time === "lunch");

    // Render the menus into their respective containers
    renderMenu(dinnerItems, dinnerMenuContainer);
    renderMenu(lunchItems, lunchMenuContainer);

    // --- IMPORTANT: Category Title Event Listeners must be applied AFTER rendering ---
    // Re-select categoryTitles after they've been dynamically added to the DOM.
    // This ensures your accordion-like behavior works for the generated menu.
    const categoryTitles = document.querySelectorAll('.menu-category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            this.classList.toggle('open'); // Toggles 'open' class on the button itself
            const content = this.nextElementSibling; // Selects the .menu-grid (category content)
            content.classList.toggle('open'); // Toggles 'open' class on the content
        });
    });
});
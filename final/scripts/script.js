document.addEventListener("DOMContentLoaded", () => {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    const hamburgerButton = document.querySelector('.hamburger-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('nav a');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;

            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            menuContents.forEach(content => content.classList.remove('active'));
            const targetMenuContent = document.getElementById(tabId + '-menu');
            if (targetMenuContent) {
                targetMenuContent.classList.add('active');
            }
        });
    });

    hamburgerButton.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        hamburgerButton.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (window.innerWidth < 769) {
                mainNav.classList.remove('open');
                hamburgerButton.classList.remove('open');
            }
        });
    });

    let fetchedMenuData = null;

    const dinnerMenuContainer = document.getElementById("dinner-menu");
    const lunchMenuContainer = document.getElementById("lunch-menu");

    async function fetchAndRenderMenu() {
        try {
            const response = await fetch('https://daijir.github.io/wdd231/final/data/menu.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchedMenuData = await response.json();
            console.log('Menu data loaded:', fetchedMenuData);

            if (dinnerMenuContainer) dinnerMenuContainer.innerHTML = '';
            if (lunchMenuContainer) lunchMenuContainer.innerHTML = '';

            const dinnerItems = fetchedMenuData.filter(item => item.time === "dinner");
            const lunchItems = fetchedMenuData.filter(item => item.time === "lunch");

            renderMenu(dinnerItems, dinnerMenuContainer);
            renderMenu(lunchItems, lunchMenuContainer);

            const categoryTitles = document.querySelectorAll('.menu-category-title');
            categoryTitles.forEach(title => {
                title.addEventListener('click', function() {
                    this.classList.toggle('open');
                    const content = this.nextElementSibling;
                    content.classList.toggle('open');
                });
            });

            if (menuTabs.length > 0) {
                const initialTab = document.querySelector('.menu-tab[data-tab="dinner"]') || menuTabs[0];
                initialTab.click();
            }

        } catch (error) {
            console.error('Error fetching or parsing menu data:', error);
            const menuDisplayArea = document.querySelector('.menu-sections') || document.body;
            if (menuDisplayArea) {
                menuDisplayArea.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Failed to load menu. Please try again later.</p>';
            }
        }
    }


    function renderMenu(menuItems, containerElement) {
        if (!containerElement) return;

        containerElement.innerHTML = '';

        const categorizedMenu = menuItems.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});

        for (const category in categorizedMenu) {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("menu-category");

            const categoryButton = document.createElement("button");
            categoryButton.classList.add("menu-category-title");
            categoryButton.textContent = category;
            categoryDiv.appendChild(categoryButton);

            const menuGrid = document.createElement("div");
            menuGrid.classList.add("menu-grid", "menu-category-content");

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
                itemPrice.textContent = item.category === "A La Carte Set" ? `+${item.price} yen` : `${item.price} yen`;
                menuItemHeader.appendChild(itemPrice);

                menuItemDiv.appendChild(menuItemHeader);

                if (item.photo) {
                    const itemPhoto = document.createElement("img");
                    itemPhoto.src = item.photo;
                    itemPhoto.alt = item.name;
                    itemPhoto.classList.add("menu-item-photo");
                    menuItemDiv.appendChild(itemPhoto);
                }

                menuGrid.appendChild(menuItemDiv);
            });

            categoryDiv.appendChild(menuGrid);
            containerElement.appendChild(categoryDiv);
        }
    }

    fetchAndRenderMenu();
});
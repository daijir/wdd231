document.addEventListener('DOMContentLoaded', () => {
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

    const allMenuContainer = document.querySelector('.all-menu');
    const menuDialog = document.getElementById('menuDialog');
    const dialogPhoto = document.getElementById('dialogPhoto');
    const dialogName = document.getElementById('dialogName');
    const dialogPrice = document.getElementById('dialogPrice');
    const dialogDescription = document.getElementById('dialogDescription');
    const dialogAllergens = document.getElementById('dialogAllergens');
    const closeDialogButton = document.getElementById('closeDialog');

    async function fetchAndRenderAllMenu() {
        try {
            const response = await fetch('../data/menu.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const menuData = await response.json();

            const uniqueMenu = [];
            const seenNames = new Set();

            menuData.forEach(item => {
                if (!seenNames.has(item.name)) {
                    uniqueMenu.push(item);
                    seenNames.add(item.name);
                }
            });

            if (allMenuContainer) {
                allMenuContainer.innerHTML = '';
            }

            uniqueMenu.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('menu-card');

                card.innerHTML = `
                    <img src="${item.photo}" alt="${item.name} - Discover our delicious menu item">
                    <div class="menu-card-content">
                        <h3>${item.name}</h3>
                        <p>¥${item.price}</p>
                    </div>
                `;

                card.addEventListener('click', () => {
                    dialogPhoto.src = item.photo;
                    dialogPhoto.alt = item.name;
                    dialogName.textContent = item.name;
                    dialogPrice.textContent = `¥${item.price}`;
                    dialogDescription.textContent = item.description;

                    if (item.allergens && item.allergens.length > 0) {
                        dialogAllergens.textContent = `Allegies: ${item.allergens.join(', ')}`;
                    } else {
                        dialogAllergens.textContent = 'Allegies: None';
                    }

                    menuDialog.showModal();
                });

                allMenuContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching or rendering all menu data:', error);
            if (allMenuContainer) {
                allMenuContainer.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Failed to load menu. Please try again later.</p>';
            }
        }
    }

    closeDialogButton.addEventListener('click', () => {
        menuDialog.close();
    });

    menuDialog.addEventListener('click', (event) => {
        if (event.target === menuDialog) {
            menuDialog.close();
        }
    });

    fetchAndRenderAllMenu();
});
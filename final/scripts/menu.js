document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('nav a');

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
            const response = await fetch('data/menu.json');

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

            const fragment = document.createDocumentFragment();

            uniqueMenu.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('menu-card');

                card.innerHTML = `
                        <picture>
                        <source type="image/webp" srcset="${item.photo.replace(/\.\w+$/, '.webp')}">
                        <img
                            src="${item.photo}"
                            alt="${item.name}"
                            width="400" height="400"
                            load="lazy"
                        >
                        </picture>
                        <div class="menu-card-content">
                        <h2>${item.name}</h2>
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

                fragment.appendChild(card);
            });

            allMenuContainer.appendChild(fragment);

        } catch (error) {
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
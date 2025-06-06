import {places} from '../data/places.js'
import { setYearAndLastModified } from "./yearModifcation.js";
import { setupHamburgerMenu } from "./hamburger.js";


document.addEventListener("DOMContentLoaded", async () => {
    setYearAndLastModified();
    setupHamburgerMenu();

    const showPlaces = document.querySelector('#show-places');

    function displayPlaces(data) {
        showPlaces.innerHTML = "";
        data.forEach(place => {
            const section = document.createElement("section");
            section.classList.add('place-card');
            section.innerHTML = `
            <figure class="place-figure">
                <img src="${place.photo_url}" alt="${place.name}"> 
            </figure>
            <h2 class="place-name">${place.name}</h2>
            <address>Address: ${place.address}</address>
            <p class="place-cost">Cost: ${place.cost}</p>
            <p class="place-description">${place.description}</p>
            `;
            showPlaces.appendChild(section);
        })
    }

    displayPlaces(places);

    const messageDiv = document.querySelector('#message');
    console.log(messageDiv);

    function displayLastVisitMessage() {
        const lastVisit = localStorage.getItem('lastVisitDate');
        console.log('Value of lastVisit from localStorage:', lastVisit);
        const now = Date.now();

        let message = "";

        if (lastVisit === null) {
            message = "Welcome! Let us know if you have any questions.";
            console.log('Branch: First Visit'); 
        } else {
            const lastVisitDate = parseInt(lastVisit, 10);
            const timeDifference = now - lastVisitDate;

            const millisecondsInADay = 1000 * 60 * 60 * 24;
            const daysDifference = Math.floor(timeDifference / millisecondsInADay);
            
            if (daysDifference < 1) {
                message = "Back so soon! Awesome!";
            } else if (daysDifference === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysDifference} days ago.`
            }
        }

        console.log('Branch: Subsequent Visit');
        console.log(messageDiv);
        messageDiv.textContent = message;
        console.log('Final messageDiv content:', messageDiv.textContent);
        localStorage.setItem('lastVisitDate', now.toString());
    };

    displayLastVisitMessage();
})
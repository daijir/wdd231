import { setYearAndLastModified } from "./yearModifcation.js";
import { setupHamburgerMenu } from "./hamburger.js";


document.addEventListener("DOMContentLoaded", async () => {
    setYearAndLastModified();
    setupHamburgerMenu();

    const mydialog = document.querySelector('#mydialog');
    const mytitle = document.querySelector('#mydialog h2');
    const myclose = document.querySelector('#mydialog button');
    const description = document.querySelector('#mydialog p');

    const memberships = [
    {
        title: 'NP Membership',
        benefit1: 'No fee (for non-profit organizations)',
        benefit2: 'Access to community events',
        benefit3: 'Basic training sessions',
        benefit4: 'Networking opportunities'
    },
    {
        title: 'Bronze Membership',
        benefit1: 'All NP Membership benefits',
        benefit2: 'Discounted event tickets',
        benefit3: 'Access to member-only workshops',
        benefit4: 'Business listing in our directory'
    },
    {
        title: 'Silver Membership',
        benefit1: 'All Bronze Membership benefits',
        benefit2: 'Spotlight advertising on the home page',
        benefit3: 'Priority event registration',
        benefit4: 'Free training sessions'
    },
    {
        title: 'Gold Membership',
        benefit1: 'All Silver Membership benefits',
        benefit2: 'Exclusive invitations to special events',
        benefit3: 'Premium advertising',
        benefit4: 'Personalized business support'
    }
];

    myclose.addEventListener('click', () => {
        mydialog.close();
    });

    const sections = document.querySelectorAll('section');
    sections.forEach( section => {
        section.querySelector('div').addEventListener("click", () => {
        mydialog.showModal();
        const cardTitle = section.querySelector('h2').textContent;
        // console.log(cardTitle);
        const membership = memberships.find(membership => membership.title === cardTitle);
        // console.log(membership.title);

        mytitle.textContent = membership ? membership.title : 'No title available';
        if (membership) {
            // console.log(membership.benefit1);
            description.innerHTML = `
                <ul>
                    <li>${membership.benefit1}</li>
                    <li>${membership.benefit2}</li>
                    <li>${membership.benefit3}</li>
                    <li>${membership.benefit4}</li>
                </ul>
            `;
        } else {
            description.textContent = 'No description available';
        }
    });
    })

    sections.forEach((section, i) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, i * 250);
    })

        
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('form label input:not([type="submit"])');
    const select = document.querySelector('form label select');
    const textArea = document.querySelector('form label textarea');
    const submitBtn = document.querySelector('form input[type="submit"]');

    submitBtn.addEventListener('mouseenter', () => {
        form.style.backgroundColor = '#fff';
        form.style.transition = 'background-color 0.3s ease';
        form.style.borderColor ='var(--secondary-color)';
        inputs.forEach(input => input.style.borderColor = 'var(--secondary-color)');
        select.style.borderColor ='var(--secondary-color)';
        textArea.style.borderColor ='var(--secondary-color)';
    });

    submitBtn.addEventListener('mouseleave', () => {
        form.style.backgroundColor = 'rgb(227, 227, 227)';
        form.style.borderColor = 'var(--primary-color)';
        inputs.forEach(input => input.style.borderColor = 'var(--primary-color)');
        select.style.borderColor ='var(--primary-color)';
        textArea.style.borderColor ='var(--primary-color)'
    });


    const timestamp = document.querySelector('#timestamp');
    form.addEventListener('submit', () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        timestamp.value = formattedDate;
    });
});
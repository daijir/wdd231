import {temples} from '../data/temples.js';   
// console.log(temples);

import {url} from '../data/temples.js';   
// console.log(url);

const showHere = document.querySelector('#showHere');
const mydialog = document.querySelector('#mydialog');
const mytitle = document.querySelector('#mydialog h2');
const myclose = document.querySelector('#mydialog button');
const myinfo = document.querySelector('#mydialog p');

myclose.addEventListener("click", () => {
    mydialog.close();
});

function displayTemples(data) {
    console.log(data);
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img');
        photo.src = `${url}${x.path}`;
        photo.alt = x.name;

        photo.addEventListener('click', () => showStuff(x)); 
        showHere.appendChild(photo);
    })
}

displayTemples(temples);

function showStuff(x) {
    mytitle.innerHTML = x.name;
    myinfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`;
    console.log(myinfo.innnerHTML);
    mydialog.showModal();
}
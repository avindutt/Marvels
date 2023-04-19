const public_key = '9e289d6dbf62a99ce844996c06c0c2fa';
const private_key = '217fc0f4c9fb0236efac1c094e7f0f93d2ca3a7f';

const ts = Date.now().toString();
const hash = CryptoJS.MD5(ts + private_key + public_key).toString();

const id = new URLSearchParams(window.location.search).get("id");

async function superheroDetails() {
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${public_key}&hash=${hash}`);
    const newData = await response.json();
    const myHero = newData.data.results[0];
    console.log(myHero);
    theSuperhero(myHero);
}

superheroDetails();

const nameElement = document.querySelector("#name");
const imageElement = document.getElementById("image");
const comics = document.getElementById("comics");
const series = document.getElementById("series");
const desc = document.getElementById("description");
const stories = document.getElementById('stories');

function theSuperhero(hero) {

    nameElement.innerHTML = `--${hero.name}--`;

    desc.innerHTML = `<h2>Description:</h2>${hero.description}`;

    const thumbnail = document.createElement('div');
    thumbnail.innerHTML =  `<img src = "${hero.thumbnail.path}.${hero.thumbnail.extension}">` 
    imageElement.appendChild(thumbnail);

    comics.innerHTML = `<h2>Comics:</h2>${hero.comics.available}`;

    series.innerHTML = `<h2>Series:</h2>${hero.series.available}`;  
    
    stories.innerHTML = `<h2>Stories:</h2>${hero.stories.available}`;
}
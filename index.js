const public_key = '9e289d6dbf62a99ce844996c06c0c2fa';
const private_key = '217fc0f4c9fb0236efac1c094e7f0f93d2ca3a7f';

const ts = Date.now().toString();
const hash = CryptoJS.MD5(ts + private_key + public_key).toString();

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search");
const resultsList = document.querySelector("#results");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value;
    console.log(searchInput.value);
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${public_key}&hash=${hash}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        searchedResults(data.data.results);
    })
})

function searchedResults(myHero){
    myHero.map((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src = "${item.thumbnail.path}.${item.thumbnail.extension}">
    <h3>${item.name}</h3>`;
    const favBtn = document.createElement('button');
    favBtn.innerHTML = `<i class="fa-solid fa-heart fa-shake fa-lg"></i>`;

    li.onclick = () => {
        window.location.href = `superhero.html?id=${item.id}`;
    }

    favBtn.onclick = () => {addingFavourites(item)};

    resultsList.appendChild(li);
    resultsList.appendChild(favBtn);
    });
}

function addingFavourites(hero) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    const existingHero = favourites.find((item) => item.id === hero.id);
    if (existingHero) {
        console.log(`"${hero.name}" is already in favourites!`);
        window.alert(`"${hero.name}" is already in favourites!`);
        return;
    }

    favourites.push(hero);

    localStorage.setItem('favourites', JSON.stringify(favourites));
    console.log(`${hero.name} added to favourites`);
    window.alert(`${hero.name} added to favourites`);
    console.log(favourites);
}
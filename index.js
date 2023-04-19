//created public and private keys from Marvels website
const public_key = '9e289d6dbf62a99ce844996c06c0c2fa';
const private_key = '217fc0f4c9fb0236efac1c094e7f0f93d2ca3a7f';

const ts = Date.now().toString();
//created hash code using crypto js whose script has been added at the bottom of index.html page
const hash = CryptoJS.MD5(ts + private_key + public_key).toString();

//capturing all the features from the elements
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search");
const resultsList = document.querySelector("#results");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //capturing the input from the form
    const query = searchInput.value;
    console.log(searchInput.value);
    //sending the API request including the query, timestamp, public key and hash code
        const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${public_key}&hash=${hash}`
            fetch(url)
            //capturing the response as a promise from marvels
            .then((response) => response.json())
            //resolving the promise
            .then((data) => {
                //calling the function to render the search results by passing returned data as the argument
                searchedResults(data.data.results);
            })
    })

function searchedResults(myHero) {
    myHero.map((item) => {
    //creating li element using createElement that will show the items
    const li = document.createElement('li');
    //adding html into it
    li.innerHTML = `<img src = "${item.thumbnail.path}.${item.thumbnail.extension}">
    <h3>${item.name}</h3>`;
    //initialised a favourite button
    const favBtn = document.createElement('button');
    favBtn.innerHTML = `<i class="fa-solid fa-heart fa-shake fa-lg"></i>`;

    //clicking on list items will take to that superhero page
    li.onclick = () => {
        window.location.href = `superhero.html?id=${item.id}`;
    }

    favBtn.onclick = () => {addingFavourites(item)};

    //appending the li and favBtn elements to the resultList
    resultsList.appendChild(li);
    resultsList.appendChild(favBtn);
    });
}

function addingFavourites(hero) {

    //using localstorage attribute to store favourites items locally in the browser
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    //checking if the same item is present already in the local storage
    const existingHero = favourites.find((item) => item.id === hero.id);
    if (existingHero) {
        console.log(`"${hero.name}" is already in favourites!`);
        window.alert(`"${hero.name}" is already in favourites!`);
        return;
    }

    //if it is not then push the desired item into the array
    favourites.push(hero);

    //setting the items into the favourites array in the local storage
    localStorage.setItem('favourites', JSON.stringify(favourites));
    console.log(`${hero.name} added to favourites`);
    //adding the alert when an item is added to the list
    window.alert(`${hero.name} added to favourites`);
    console.log(favourites);
}
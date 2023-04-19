const container = document.getElementById('container');

// parsing the data already present as favourites in the local storage
const localData = JSON.parse(localStorage.getItem('favourites'));

// mapping over the array and adding html
localData.map((hero) => {
    const superhero = document.createElement('div');
    const removeBtn = document.createElement('button');
    superhero.innerHTML = `
    <div id = 'cards'>
    <img src= "${hero.thumbnail.path}.${hero.thumbnail.extension}">
    <div class= 'elements'><h2>ID:</h2>${hero.id}</div>
    <div class= 'elements'><h2>Comics:</h2>${hero.comics.available}</div>
    <div class= 'elements'><h2>Series:</h2>${hero.series.available}</div>
    <div class= 'elements'><h2>Stories:</h2>${hero.stories.available}</div>
    `;

    // remove button to remove a particular hero from the list in local storage
    removeBtn.innerHTML = `Remove from Favourites`
    container.appendChild(superhero);
    superhero.appendChild(removeBtn);

    superhero.onclick = () => {
        window.location.href = `superhero.html?id=${hero.id}`;
    };

    removeBtn.addEventListener('click', ()=>removeFavourite(hero));
})

function removeFavourite(hero) {
    console.log(hero);
    const fav = JSON.parse(localStorage.getItem('favourites'));
    // using filter function to filter out the matching with the id of argument and collected in a const
    const updatedFav = fav.filter((item) => {
       return item.id !== hero.id;
    });
    // passing the const (by changing it first into string format using stringify) to the favourites array to set the remaining elements again
    localStorage.setItem('favourites', JSON.stringify(updatedFav));
    console.log(`${hero.name} has been removed from favourites`);
    window.alert(`${hero.name} removed from favourites`);
}
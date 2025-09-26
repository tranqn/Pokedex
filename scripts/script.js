const pokemonContainerRef = document.getElementById('pokemon-container');
const searchInputRef = document.getElementById('search-input');


let pokemonList = [];
let currentPokemon;
let id = 1;



const typeColors = {
  normal:   "#A8A77A",
  fire:     "#EE8130",
  water:    "#6390F0",
  electric: "#F7D02C",
  grass:    "#7AC74C",
  ice:      "#96D9D6",
  fighting: "#C22E28",
  poison:   "#A33EA1",
  ground:   "#E2BF65",
  flying:   "#A98FF3",
  psychic:  "#F95587",
  bug:      "#A6B91A",
  rock:     "#B6A136",
  ghost:    "#735797",
  dragon:   "#6F35FC",
  dark:     "#705746",
  steel:    "#B7B7CE",
  fairy:    "#D685AD"
};

// async function test() {
//     let response = await fetch("https://pokeapi.co/api/v2/pokemon/1")
//     console.table(response);
//     console.log(response);
// }

// test();

function init(){
    // render 20 pokemon
    renderNextPokemons();
    console.log('test');
}

function renderNextPokemons(){
    for(let i = 0; i < 20;i++){
        renderPokemon(id);
        id++;
    }
}

async function renderPokemon(id){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    fetchedPokemon = await fetchedPokemon.json();
    pokemonList.push(fetchedPokemon);
    pokemonContainerRef.innerHTML += pokemonCardTemplate(fetchedPokemon, id);
    loadPokemonType(fetchedPokemon, id);
}

function pokemonCardTemplate(fetchedPokemon, id){
    return `
    <div class="pokemon-card">
        <div class="details">
            <div class="name" >${fetchedPokemon.forms[0].name}</div>
            <div class="id" >id: ${id}</div>
            <div class="types" id="types${id}"></div>
        </div>
        <div class="image-container">
            <img class="pokemon-card-image" src="${fetchedPokemon.sprites.other['official-artwork'].front_default}" alt="">
        </div>      
       </div>
    `
}

function loadPokemonType(fetchedPokemon, id){
    const typesContainerRef = document.getElementById(`types${id}`);
    for(let i = 0; i < fetchedPokemon.types.length; i++){
        typesContainerRef.innerHTML += typeTemplate(fetchedPokemon, i, id);
        loadTypeColor(fetchedPokemon, i, id);
    }
}

function typeTemplate(fetchedPokemon, i, id){
    return `
    <div class="type" id="${id}-${i}">${fetchedPokemon.types[i].type.name}</div>
    `
}

function loadTypeColor(fetchedPokemon, i, id){
    const typeIdRef = document.getElementById(`${id}-${i}`);
    const convertedColor = searchTypeColor(fetchedPokemon);
    typeIdRef.style.background = convertedColor;
}

function searchTypeColor(fetchedPokemon){
    const colorname = fetchedPokemon.types[0].type.name;
    const returnCode = typeColors[colorname];
    return returnCode;
}


// -------------------------------------------

async function getAllNames(){
    let allNames1 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    let allNames2 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=10277');
}
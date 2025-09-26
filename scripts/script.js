const pokemonContainerRef = document.getElementById('pokemon-container');
const searchInputRef = document.getElementById('search-input');
const overlayRef = document.getElementById('overlay');
const bigCardRef = document.getElementById('big-card');
const bigCardImageBackgroundRef = document.getElementById('big-card_image-background');
const bigCardImageRef = document.getElementById('big-card-image');
const bigCardDetailsRef = document.getElementById('big-card-details');

let pokemonList = [];
let pokemonNames = [];
let start = 1;

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

function init(){
    // render 20 pokemon
    renderNextPokemons();
    getAllNames();
}

function reset(){
    pokemonList = [];
    pokemonNames = [];
    start = 1;
    pokemonContainerRef.innerHTML = '';
    init();
}

function renderNextPokemons(){
    for(let i = 0; i < 40;i++){
        renderPokemon(start);
        start++;
    }
}

async function renderPokemon(id){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    fetchedPokemon = await fetchedPokemon.json();
    pokemonList.push(fetchedPokemon);
    pokemonContainerRef.innerHTML += pokemonCardTemplate(fetchedPokemon, id);
    loadPokemonType(fetchedPokemon, id);
}

function loadPokemonType(fetchedPokemon, id){
    const typesContainerRef = document.getElementById(`types${id}`);
    for(let i = 0; i < 2; i++){
        if(fetchedPokemon.types[i] != undefined){
            typesContainerRef.innerHTML += typeTemplate(fetchedPokemon, i, id);
            loadTypeColor(fetchedPokemon, i, id);
        }else{
            typesContainerRef.innerHTML += typeFakeTemplate();
        }
    }
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
    let allNames = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0');
    allNames = await allNames.json();
    
    loadAllNames(allNames);
}

function loadAllNames(allNames){
    for(let i = 0; i < allNames.results.length; i++){
        pokemonNames.push(allNames.results[i].name);
    }
}

function searchPokemons(){
    const word = document.getElementById('search-input').value.toLowerCase();
    if(word.length >= 3){
        const matchedPokemons = compareWord(word);
        renderSearchResult(matchedPokemons);
    }
}

function compareWord(word){
    let pokemonIds = [];
    for(let i = 0; i < pokemonNames.length; i++){
        if(pokemonNames[i].includes(word)){
            if(i > 1024){
                pokemonIds.push(i - 1024 + 10000);
                console.log(i);
            }else{
                pokemonIds.push(i+1);
            }
        }
    }
    return pokemonIds;
}

function renderSearchResult(matchedPokemons){
    pokemonContainerRef.innerHTML = '';
    console.log(matchedPokemons);
    if(matchedPokemons.length != 0){
        for(let i = 0; i < matchedPokemons.length; i++){
            renderPokemon(matchedPokemons[i]);
        }
    }
}

function openOverlay(id){
    overlayRef.style.display = 'block';
    OverlayEventListeners();
    document.body.style.overflow = 'hidden';
    loadOverlay(id);
}

function closeOverlay(){
    overlayRef.style.display = 'none';
    document.body.style.overflow = '';
}

function loadOverlay(id){

    bigCardImageBackgroundRef.style.background = searchTypeColor(pokemonList[id]);
    bigCardImageRef.src = `${pokemonList[id].sprites.other['official-artwork'].front_default}`;
    renderAbout();
}

function renderAbout(){

}

function OverlayEventListeners(){
    bigCardRef.addEventListener('click', (event)=>{
        event.stopPropagation;
    });
}
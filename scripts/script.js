// References to IDs without template References
const searchInputRef = document.getElementById('search-input');
const overlayRef = document.getElementById('overlay');
const bigCardRef = document.getElementById('big-card');
const bigCardImageBackgroundRef = document.getElementById('big-card_image-background');
const bigCardImageRef = document.getElementById('big-card-image');
const bigCardDetailsRef = document.getElementById('big-card-details');
const liAboutRef = document.getElementById('li-about');
const liStatsRef = document.getElementById('li-stats');
const liMovesRef = document.getElementById('li-moves');
const liEvolutionRef = document.getElementById('li-evolution');
const searchOverlayRef = document.getElementById('search-overlay');
const pokemonContainerRef = document.getElementById('pokemon-container');

// Global Variables
let pokemonList = [];       //Store Pokemon-JSON    apiIndex not index of PokeList!!!
let pokemonNames = [];      //Array with all Pokemon Names
let apiIndex = 1;          //Iterate through Pokedex
let pokemonStats = [];

//Typecolors
const typeColors = {
  normal:   "#A8A77A",
  fire:     "#EE8130",
  water:    "#6390F0",
  electric: "#F7D02C",
  grass:    "#7AC74C",
  ice:      "#96D9D6",
  fighting: "#e0be23ff",
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
    renderNextPokemons();
    getAllNames();
}

async function renderNextPokemons(){
    if(apiIndex <= 1025){
        for(let i = 0; i < 40;i++){
            await renderPokemon(apiIndex);
            apiIndex++;
        }
    }else{
        apiIndex = 10001;
        for(let i = 0; i < 277;i++){
            await renderPokemon(apiIndex);
            apiIndex++;
        }
    }
}


//--------------------- Create Pokemon-card ------------------
async function renderPokemon(apiIndex){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiIndex}`);
    fetchedPokemon = await fetchedPokemon.json();
    pokemonContainerRef.innerHTML += pokemonCardTemplate(fetchedPokemon, apiIndex);
    loadPokemonType(fetchedPokemon, apiIndex);
}

async function renderPokemonSearch(apiIndex){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiIndex}`);
    fetchedPokemon = await fetchedPokemon.json();
    searchOverlayRef.innerHTML += pokemonCardTemplate(fetchedPokemon, apiIndex);
    loadPokemonType(fetchedPokemon, apiIndex);
}

function loadPokemonType(fetchedPokemon, apiIndex){
    const typesContainerRef = document.getElementById(`types${apiIndex}`);
    for(let i = 0; i < 2; i++){
        if(fetchedPokemon.types[i] != undefined){
            typesContainerRef.innerHTML += typeTemplate(fetchedPokemon, i, apiIndex);
            loadTypeColor(fetchedPokemon, i, apiIndex);
        }else{
            typesContainerRef.innerHTML += typeFakeTemplate();
        }
    }
}

function loadTypeColor(fetchedPokemon, i, apiIndex){
    const typeIdRef = document.getElementById(`${apiIndex}-${i}`);
    typeIdRef.style.background = searchTypeColor(fetchedPokemon,i);
}

function searchTypeColor(fetchedPokemon,i){
    const colorname = fetchedPokemon.types[i].type.name;
    const returnCode = typeColors[colorname];
    return returnCode;
}

//----------- Get all Pokemon Names in PokemonNames ------------------
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

//----------------- Search Pokemon -------------------------------------
function searchPokemons(){
    const word = document.getElementById('search-input').value.toLowerCase();
    if(word.length >= 3){
        clearSearchContainer();
        searchOverlayRef.style.display = 'flex';
        renderSearchResult(compareWord(word));
    } else{
        clearSearchContainer();
        searchOverlayRef.style.display = 'none';
    }
}

function compareWord(word){
    let pokemonIds = [];
    for(let i = 0; i < pokemonNames.length; i++){
        if(pokemonNames[i].includes(word)){
            if(i > 1024){
                pokemonIds.push(i - 1024 + 10000);
            }else{
                pokemonIds.push(i+1);
            }
        }
    }
    return pokemonIds;
}

//matchedPokemons is a array with Pokemon IDs
async function renderSearchResult(matchedPokemons){
    // clearPokemonContainer();
    if(matchedPokemons.length != 0){
        for(let i = 0; i < matchedPokemons.length; i++){
            await renderPokemonSearch(matchedPokemons[i]);
        }
    }
}

function clearPokemonContainer(){
    pokemonContainerRef.innerHTML = '';
}

function clearSearchContainer(){
    searchOverlayRef.innerHTML = '';
}

function reset(){
    pokemonList = [];
    pokemonNames = [];
    apiIndex = 1;
    pokemonContainerRef.innerHTML = '';
    searchOverlayRef.style.display = 'none';
    init();
}

//Overlay
function openOverlay(apiIndex){
    overlayRef.style.display = 'block';
    overlayStopPropagation();
    document.body.style.overflow = 'hidden';
    loadOverlay(apiIndex);
    overlayNavEvents(apiIndex);
}

function closeOverlay(){
    overlayRef.style.display = 'none';
    document.body.style.overflow = '';
}

function overlayStopPropagation(){
    bigCardRef.addEventListener('click', function (e) {
        e.stopPropagation( );
    });
}

async function loadOverlay(apiIndex){
    let pokemonJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiIndex}`);
    pokemonJson = await pokemonJson.json();
    bigCardImageBackgroundRef.style.background = searchTypeColor(pokemonJson, 0);
    bigCardImageRef.src = `${pokemonJson.sprites.other['official-artwork'].front_default}`;
    renderAbout(pokemonJson);
}

function renderAbout(pokemonJson){
    bigCardDetailsRef.innerHTML = '';
    bigCardDetailsRef.innerHTML += aboutTemplate(pokemonJson);
}

function renderStats(pokemonJson){
    bigCardDetailsRef.innerHTML = '';
    bigCardDetailsRef.innerHTML += statsTemplate(pokemonJson);
}

function renderMoves(pokemonJson){
    bigCardDetailsRef.innerHTML = '';
    bigCardDetailsRef.innerHTML += movesTemplate(pokemonJson);
}

function renderEvolution(pokemonJson){
    bigCardDetailsRef.innerHTML = '';
    bigCardDetailsRef.innerHTML += evolutionTemplate(pokemonJson);
}

async function overlayNavEvents(apiIndex){
    let pokemonJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiIndex}`);
    pokemonJson = await pokemonJson.json();

    liAboutRef.addEventListener('click', function () {
        renderAbout(pokemonJson);
    });

    liStatsRef.addEventListener('click', function () {
        renderStats(pokemonJson);
    });

    liMovesRef.addEventListener('click', function () {
        renderMoves(pokemonJson);
    });

    liEvolutionRef.addEventListener('click', function () {
        renderEvolution(pokemonJson);
    });
}
// References to IDs without template References
const searchInputRef = document.getElementById('search-input');
const overlayRef = document.getElementById('overlay');
const bigCardRef = document.getElementById('big-card');
const bigCardImageBackgroundRef = document.getElementById('big-card_image-background');
const bigCardImageRef = document.getElementById('big-card-image');
const bigCardDetailsRef = document.getElementById('big-card-details');
const liAboutRef = document.getElementById('li-about');
const liStatsRef = document.getElementById('li-stats');
// const liMovesRef = document.getElementById('li-moves');
// const liEvolutionRef = document.getElementById('li-evolution');
const searchOverlayRef = document.getElementById('search-overlay');
const pokemonContainerRef = document.getElementById('pokemon-container');
const loadingspinnerRef = document.getElementById('loadingspinner');
const previousButtonRef = document.getElementById('previous-button');
const nextButtonRef = document.getElementById('next-button');
const moreButtonRef = document.getElementById('more');

// Global Variables
let pokemonNames = [];      //Array with all Pokemon Names
let apiIndex = 1;           //Iterate through Pokedex
let currentOverlayIndex = null;
let currentPokemonJson = null;

function init(){
    renderNextPokemons();
    getAllNames();
    initOverlayEvents();
}

async function renderNextPokemons(){
    openloadingSpinner();
    if(apiIndex <= 1025){
        for(let i = 0; i < 20;i++){
            await renderPokemon(apiIndex);
            apiIndex++;
        }
    }else{
        moreButtonRef.disabled = true;
    }
    closeloadingSpinner();
}


//----------------------------------------- Create Pokemon-card ------------------

async function renderPokemon(apiIndex){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiIndex}`);
    fetchedPokemon = await fetchedPokemon.json();
    pokemonContainerRef.innerHTML += pokemonCardTemplate(fetchedPokemon, apiIndex);
    loadPokemonBg(loadPokemonType(fetchedPokemon, apiIndex),apiIndex);
}

function loadPokemonType(fetchedPokemon, apiIndex){
    const typesContainerRef = document.getElementById(`types${apiIndex}`);
    const colorArray = [];
    let html = '';
    for(let i = 0; i < 2; i++){
        if(fetchedPokemon.types[i] != undefined){
            html += typeTemplate(fetchedPokemon, i, apiIndex);
        }else{
            html += typeFakeTemplate();
        }
    }
    typesContainerRef.innerHTML = html;

    for(let i = 0; i < 2; i++){
        if(fetchedPokemon.types[i] != undefined){
            colorArray.push(loadTypeColor(fetchedPokemon, i, apiIndex));
        }
    }
    return colorArray;
}

function loadTypeColor(fetchedPokemon, i, apiIndex){
    const typeIdRef = document.getElementById(`${apiIndex}-${i}`);
    let color = searchTypeColor(fetchedPokemon,i);
    typeIdRef.style.background = color;
    color = searchTypeColorBg(fetchedPokemon,i);
    return color;
}

function searchTypeColor(fetchedPokemon,i){
    const colorname = fetchedPokemon.types[i].type.name;
    const returnCode = typeColors[colorname];
    return returnCode;
}

function searchTypeColorBg(fetchedPokemon,i){
    const colorname = fetchedPokemon.types[i].type.name;
    const returnCode = typeColorsBg[colorname];
    return returnCode;
}

function loadPokemonBg(colorArray, Index){
    const PokemonIdRef = document.getElementById(`pokemon${Index}`);
    const bg = createGradient(colorArray);
    PokemonIdRef.style.background = bg;
}

function createGradient(colorArray){
    if(colorArray.length == 1){
        return `linear-gradient(45deg,${colorArray[0]} 45%, ${colorArray[0]} 55%)`;
    } else{
        return `linear-gradient(45deg,${colorArray[0]} 45%, ${colorArray[1]} 55%)`
    }
}

//----------------------------- Get all Pokemon Names in PokemonNames ------------------

async function getAllNames(){
    let allNames = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    allNames = await allNames.json();
    
    loadAllNames(allNames);
}

function loadAllNames(allNames){
    for(let i = 0; i < allNames.results.length; i++){
        pokemonNames.push(allNames.results[i].name);
    }
}

//----------------------------------- Search Pokemon -------------------------------------

function searchPokemons(){
    const word = document.getElementById('search-input').value.toLowerCase();
    if(word.length >= 3){
        clearSearchContainer();
        searchOverlayRef.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        renderSearchResult(compareWord(word),word);
    } else{
        clearSearchContainer();
        searchOverlayRef.style.display = 'none';
        document.body.style.overflow = ''
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
async function renderSearchResult(matchedPokemons, word){
    if (matchedPokemons.length === 0) {
        renderNoResult(word);
        return;
    }

    let allHTML = '';
    let allPokemon = [];

    // Schritt 1: Pokemon-Daten nacheinander laden
    for (let i = 0; i < matchedPokemons.length; i++) {
        let id = matchedPokemons[i];
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            console.warn("Fehler beim Laden von Pokemon:", id);
            continue;
        }
        let pokemon = await response.json();
        allPokemon.push(pokemon);

        // HTML gleich dazu bauen
        allHTML += pokemonCardTemplate(pokemon, id);
    }

    // Schritt 2: Alles auf einmal ins DOM schreiben
    searchOverlayRef.innerHTML = allHTML;

    // Schritt 3: Types und Backgrounds setzen
    for (let i = 0; i < allPokemon.length; i++) {
        let pokemon = allPokemon[i];
        let colorArray = loadPokemonType(pokemon, pokemon.id);
        loadPokemonBg(colorArray, pokemon.id);
    }
}

async function renderPokemonSearch(Index){
    let fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${Index}`);
    fetchedPokemon = await fetchedPokemon.json();
    searchOverlayRef.innerHTML += pokemonCardTemplate(fetchedPokemon, Index);
    loadPokemonBg(loadPokemonType(fetchedPokemon, Index),Index);
}

function renderNoResult(){
    searchOverlayRef.innerHTML += noResultTemplate();
}

function clearPokemonContainer(){
    pokemonContainerRef.innerHTML = '';
}

function clearSearchContainer(){
    searchOverlayRef.innerHTML = '';
}

function reset(){
    pokemonNames = [];
    apiIndex = 1;
    pokemonContainerRef.innerHTML = '';
    searchOverlayRef.style.display = 'none';
    init();
}

//------------------------------------------ Overlay ---------------------------------
function openOverlay(ID){
    overlayRef.style.display = 'block';
    overlayStopPropagation();
    document.body.style.overflow = 'hidden';
    document.body.style.width = '98%';
    loadOverlay(ID);
}

function closeOverlay(){
    overlayRef.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.width = '100%'
}

function overlayStopPropagation(){
    bigCardRef.addEventListener('click', function (e) {
        e.stopPropagation( );
    });
}

async function loadOverlay(ID){
    currentOverlayIndex = ID; // merken
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    if (!response.ok) {
        console.error("Pokémon nicht gefunden:", ID);
        return;
    }
    currentPokemonJson = await response.json();

    bigCardImageBackgroundRef.style.background = searchTypeColor(currentPokemonJson, 0);
    bigCardImageRef.src = currentPokemonJson.sprites.other['official-artwork'].front_default;
    renderAbout(currentPokemonJson);

    // Button-Status aktualisieren
    previousButtonRef.disabled = (currentOverlayIndex === 1);
    nextButtonRef.disabled = (currentOverlayIndex === 1025);
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

function initOverlayEvents(){
    previousButtonRef.addEventListener('click', () => {
        if (currentOverlayIndex > 1) {
            loadOverlay(currentOverlayIndex - 1);
        }
    });

    nextButtonRef.addEventListener('click', () => {
        loadOverlay(currentOverlayIndex + 1);
    });

    liAboutRef.addEventListener('click', () => renderAbout(currentPokemonJson));
    liStatsRef.addEventListener('click', () => renderStats(currentPokemonJson));
    // liMovesRef.addEventListener('click', () => renderMoves(currentPokemonJson));
    // liEvolutionRef.addEventListener('click', () => renderEvolution(currentPokemonJson));
}

//------------------------------------------- loadingspinner -----------------------
function openloadingSpinner(){
    loadingspinnerRef.style.display = 'flex';
}

function closeloadingSpinner(){
    loadingspinnerRef.style.display = 'none';
}

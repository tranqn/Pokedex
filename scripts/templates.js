function pokemonCardTemplate(fetchedPokemon, apiIndex){
    return `
    <div class="pokemon-card" id="pokemon${apiIndex}" onclick="openOverlay(${apiIndex})">
        <div class="pokemon-card-name">
            <div class="name" >${fetchedPokemon.forms[0].name.toUpperCase()}</div>
        </div>
        <div class="pokemon-card-bottom">
            <div class="pokemon-cards-details">
                <div class="id" >ID: ${apiIndex}</div>
                <div class="types" id="types${apiIndex}"></div>
            </div>
            <img class="pokemon-card-image" src="${fetchedPokemon.sprites.other['official-artwork'].front_default}" alt="" loading="lazy">
        </div>      
       </div>
    `
}

function typeFakeTemplate(){
    return `
    <div class="type-fake"></div>
    `
}

//i is type in 0! and 1!
function typeTemplate(fetchedPokemon, i, apiIndex){
    return `
    <div class="type" id="${apiIndex}-${i}">${fetchedPokemon.types[i].type.name}</div>
    `
}

function aboutTemplate(pokemonJson){
    return `
    <div class="about-card">
        <div class="stats-line">
            <div class="about-line-left">Spicie: </div><div class="stat-value">${pokemonJson.species.name}</div>
        </div>
        <div class="stats-line">
            <div class="about-line-left">Height: </div><div class="stat-value">${(pokemonJson.height /10).toFixed(0)} m</div>
        </div>
        <div class="stats-line">
            <div class="about-line-left">Weight: </div><div class="stat-value">${(pokemonJson.weight / 10).toFixed(0)} kg</div>
        </div>
        <div class="stats-line">
            <div class="about-line-left">Abilities: </div><div class="stat-value">${pokemonJson.abilities[0].ability.name}, 
                            ${pokemonJson.abilities[1] == undefined? '' : pokemonJson.abilities[1].ability.name}</div>
        </div>
    </div>
    `
}

function statsTemplate(pokemonJson){
    return `
    <div class="stats-card">
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[0].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[0].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[0].base_stat)/2.55)}%"></div>
            </div>
        </div>
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[1].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[1].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[1].base_stat)/1.81)}%"></div>
            </div>
        </div>
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[2].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[2].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[2].base_stat)/2.3)}%"></div>
            </div>
        </div>
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[3].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[3].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[3].base_stat)/1.73)}%"></div>
            </div>
        </div>
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[4].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[4].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[4].base_stat)/2.3)}%"></div>
            </div>
        </div>
        <div class="stats-line">
            <div class="stats-line-left">${pokemonJson.stats[5].stat.name}</div>
            <div class="stat-value">${pokemonJson.stats[5].base_stat}</div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${((pokemonJson.stats[5].base_stat)/2.3)}%"></div>
            </div>
        </div>

    </div>
    `
}

function movesTemplate(pokemonJson){
    return `
    <div class="about-card">
        <p>Move: ${pokemonJson.species.name}</p>
        <p>Height: ${(pokemonJson.height /10).toFixed(0)} m</p>
        <p>Weight: ${(pokemonJson.weight / 10).toFixed(0)} kg</p>
        <p></p>
    </div>
    `
}

function evolutionTemplate(pokemonJson){
    return `
    <div class="about-card">
        <p>Evo: ${pokemonJson.species.name}</p>
        <p>Height: ${(pokemonJson.height /10).toFixed(0)} m</p>
        <p>Weight: ${(pokemonJson.weight / 10).toFixed(0)} kg</p>
        <p></p>
    </div>
    `
}

function noResultTemplate(word){
    return `
    <div class="no-result">cant find Pokemons with: ${word}</div> 
    `
}
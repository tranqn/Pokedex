function pokemonCardTemplate(fetchedPokemon, id){
    return `
    <div class="pokemon-card" onclick="openOverlay(${id})">
        <div class="pokemon-card-name">
            <div class="name" >${fetchedPokemon.forms[0].name}</div>
        </div>
        <div class="pokemon-card-bottom">
            <div class="pokemon-cards-details">
                <div class="id" >id: ${id}</div>
                <div class="types" id="types${id}"></div>
            </div>
            <img class="pokemon-card-image" src="${fetchedPokemon.sprites.other['official-artwork'].front_default}" alt="">
        </div>      
       </div>
    `
}

function typeFakeTemplate(){
    return `
    <div class="type-fake"></div>
    `
}

function typeTemplate(fetchedPokemon, i, id){
    return `
    <div class="type" id="${id}-${i}">${fetchedPokemon.types[i].type.name}</div>
    `
}
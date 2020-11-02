const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainBox = document.querySelector("main")

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
function grabTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
}

function renderTrainers(json){
    json.forEach(trainer => {
     const div = document.createElement("div")
     div.setAttribute("class", "card")
     div.setAttribute("data-id", `${trainer.id}`)
     div.innerHTML = `<p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
        </ul>`
     mainBox.appendChild(div)                     // could have just made a <ul> connector after

     trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon)
        })
    })
}

function renderPokemon(poke){
    const li = document.createElement("li")
    li.innerHTML = `${poke.nickname} <button class="release" data-pokemon-id=${poke.id}>Release</button>`
    document.querySelector(`[data-id='${poke.trainer_id}'] ul`).appendChild(li)
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function addPokemon(){
    mainBox.addEventListener("click", function(event){
        if (event.target.dataset['trainerId']){                          // if the event HAS a dataset trainer-id
            const myNum = event.target.nextElementSibling.childElementCount     // childElementCount is READ ONLY
            if (myNum < 6) {                                           // if the surrounding node's ul has <6 pokemon
                requestPokemon(event.target.dataset['trainerId'])
            }
        } else if (event.target.className === "release") {
            deletePokemon(event.target.dataset['pokemonId'])
        }
    })
}

function requestPokemon(trainerId){

    const configPokemon = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          trainer_id: trainerId
        })
      }
    fetch(POKEMONS_URL, configPokemon)
    .then(resp => resp.json())
    .then(json => renderPokemon(json))

}

function deletePokemon(pokeId){

    fetch(POKEMONS_URL+ '/' + `${pokeId}`, {method: "DELETE"})
    .then(resp => resp.json())
    .then(function(json){
        const thePoke = document.querySelector(`[data-pokemon-id='${pokeId}']`).parentElement
        thePoke.remove()
    })

}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function main() {
    grabTrainers()
    addPokemon()
}

main()

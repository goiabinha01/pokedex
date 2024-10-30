const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const input = document.querySelector(".input__search");
const form = document.querySelector(".form");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;



//CONECTAR E CAPTURAR AS INFORMAÇOES DA POKEAPI
const fetchPokemon = async (pokemon) => {

   const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

   if (APIResponse.status == 200) {
       
          const data =  await APIResponse.json();
          return data;
   }
   
    
};

const renderPokemon = async (pokemon) => {
    pokemonName.textContent = "Loading...";
    pokemonNumber.textContent = "😊";
    const data = await fetchPokemon(pokemon);
    pokemonImage.src = "https://flipanim.com/gif/9/c/9czwuOXy.gif";

    console.log(data);

    if (data) {
        pokemonImage.style.width = "25%";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not Found:c";
        pokemonImage.src = "https://media0.giphy.com/media/UHAYP0FxJOmFBuOiC2/200w.gif?cid=6c09b952l8mmx31kbhu67oq0p9smmcxyc4ayqp3il7u4b90u&ep=v1_gifs_search&rid=200w.gif&ct=g";
        pokemonImage.style.width = "35%";
    }




}

form.addEventListener("submit", (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {

        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        
    }

    
})

buttonNext.addEventListener("click", () => {

    searchPokemon += 1;
    
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon);
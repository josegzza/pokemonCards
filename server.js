const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express();
app.use(cors())
app.use(express.json())
const port = 8080;

app.get('/:pokemonName', (req, res, next) => {
  let pokemon_name = req.params.pokemonName;
  axios
    .get(`http://pokeapi.co/api/v2/pokemon/${pokemon_name}`) 
    .then(pokemon_response => {
        //Save data in dictionary
        //pokemons[pokemon_name] = pokemon_response.data;
        //console.log(pokemon_response.data); 
        //return dictionary with pokemons
        res.send(pokemon_response.data);
        //Aquí está la data del pokemon
    }).catch(function(error) {
        console.log(error)
    });
})

app.listen(port)

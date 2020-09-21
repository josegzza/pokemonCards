//Format the cards with the data
let get_element_li  = (name, id, weight, height, exp, types, img) => {
    return `
    <div class="column">
    <div class="card">
    <img src=${img} width="100px" height="100px">
      <div class="container_card">
        <h4><b>${name}</b></h4>
        <h3>id: #${id}</h3> 
        <p>weight: ${weight} height: ${height}</p>
        <p>base experience: ${exp}</p>
        <p>Types: ${types}</p>
      </div>
      <button class="remove-pokemon">remove</button>
    </div>
    </div>
    `
}


let pokemons = {} //Dictionary of pokemons

//Extract key of the dictionary from the node
let extractNameFromNode = (node) => {
  return node.childNodes[1].childNodes[3].childNodes[1].textContent;
}

//add data to front
let add_item_to_list_with_template = (name, id, weight, height, exp, types, img) => {

    console.log("pokemon: "+name+" weight: "+weight+" img: "+img);
    let element = get_element_li(name, id, weight, height, exp, types, img);
    document.getElementById("list-items").innerHTML += element;
    
    //Adding listeners to buttons
    let removeButtons = document.getElementsByClassName("remove-pokemon");
    for(let i=0; i<removeButtons.length;i++){
        removeButtons[i].addEventListener("click", (event)=>
            remove_element_event(event.target.parentNode.parentNode)
        );
    }

}

//Remove card
let remove_element_event = (node_to_remove) => {
  //console.log("inside remove list "+ name)
  //Erase from dictionary
  delete pokemons[extractNameFromNode(node_to_remove)]; 
  let list = document.getElementById("list-items")
  list.removeChild(node_to_remove);
}


let thenable_handle_for_the_result_of_the_pokemon_request = (result) => {
    //save pokemon in the dictionary
    pokemons[result.name]=result.data;
    /*
    console.log(result.id)
    console.log(result.name);
    console.log(result.weight)*/

    //Save types of the pokemon
    let typesNames = []
    result.types.forEach((typeData)=>{
      typesNames.push(typeData.type.name);
    })
    //Extract image
    let pokeID= result.id;
    let img = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

    // console.log(typesNames)
    // console.log(result.height)
    // console.log(result.base_experience)
    add_item_to_list_with_template(result.name, result.id, result.weight, result.height, result.base_experience, typesNames, img);
}

document.addEventListener("DOMContentLoaded", function(_){  
    
  let event_handler = (event) =>{
      let pokemonName = document.getElementsByClassName("pokemon")[0].value.trim().toLowerCase();
        //console.log(pokemonName);
      if(!(pokemonName in pokemons)){  
      axios
        .get(`http://localhost:8080/${pokemonName}`) 
        .then(resp => {
          //console.log(resp.data); 
          thenable_handle_for_the_result_of_the_pokemon_request(resp.data) //return pokemon data
        }).catch(function(error) {
            console.log(error)
        });  
    } 
  }
  
  let boton = document.getElementById("search"); 
  boton.addEventListener("click", event_handler);
}); 



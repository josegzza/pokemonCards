let get_element_li  = (name, weight,img) => {
    //return `<li class="added-pokemon">name: ${name}  weight: <span class="weight">${weight} <img src="${img}"></img></span> <button class="remove-pokemon">remove</button></li>`
    return `<div class="card">
    <img src=${img} alt="Avatar">
      <div class="container_card">
        <h4><b>${name}</b></h4>
        <p>${weight}</p>
      </div>
      <button class="remove-pokemon">remove</button>
    </div>`
}

let pokemons = {}

let add_item_to_list_with_template = (name, weight, img) => {

    console.log("pokemon: "+name+" weight: "+weight+" img: "+img);
    let element = get_element_li(name, weight, img);
    document.getElementById("list-items").innerHTML += element;
    
    //Adding listeners to buttons
    let removeButtons = document.getElementsByClassName("remove-pokemon");
    for(let i=0; i<removeButtons.length;i++){
        removeButtons[i].addEventListener("click", (event)=>
            remove_element_event(event.target.parentNode)
        );
    }

}

let remove_element_event = (node_to_remove) => {
  //console.log("inside remove list")
  let list = document.getElementById("list-items")
  //console.log(node_to_remove.children[0].textContent)
  //totalWeight -= parseFloat(node_to_remove.children[0].textContent);
  //document.getElementById("total").innerHTML = "Total: "+totalWeight;
  list.removeChild(node_to_remove);
}


let thenable_handle_for_the_result_of_the_pokemon_request = (result) => {
    //save pokemon in the dictionary
    pokemons[result.name]=result.data;
    console.log(result.id)
    console.log(result.name);
    console.log(result.weight)
    let typesNames = []
    
    result.types.forEach((typeData)=>{
      typesNames.push(typeData.type.name);
    })
    let pokeID= result.id;
    let img = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

    console.log(typesNames)
    console.log(result.height)
    console.log(result.base_experience)
    add_item_to_list_with_template(result.name, result.weight, img);
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


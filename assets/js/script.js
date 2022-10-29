let busqueda = document.getElementById("busqueda")
let divBusqueda = document.getElementById("divBusqueda")
let barraBuscadora = document.getElementById("barraBuscadora");


function createInput(){
    let input=document.createElement("input")
    input.id = "barraBuscadora"
    input.placeholder = "Búsqueda"
    divBusqueda.appendChild(input)
}

busqueda.addEventListener("mouseover",function(e){
    busqueda.hidden=true;
    barraBuscadora.hidden=false
})

barraBuscadora.addEventListener("mouseout",function(e){
    barraBuscadora.hidden=true;
    busqueda.hidden=false;
})


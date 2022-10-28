window.addEventListener("load", function(){
    let form=document.querySelector("form")
    let nombre=document.getElementById("nombre");
    let apellido=document.getElementById("apellido");
    let mail=document.getElementById("mail");
    let recetas=document.querySelectorAll(".form-check-input");
    let mailHelp= document.getElementById("emailHelp")
    let finRecetas = document.getElementById("finRecetas")
    let errors = []


    //si el campo esta vacio/incompleto/sin checkear ninguna opción devuelve true
    function nombreVacio(){
        return (nombre.value=="")
    }
    function apellidoVacio(){
        return (apellido.value=="")
    }
    function emailVacio(){
        return (mail.value=="")
    }
    function emailIncompleto(){
        let incluye = "@ .com mail"
        incluye = incluye.split(" ")
        let noIncluye = ", < > * ° | ¬ ^ / \\ ? ¿ ¡ ! ' # $ % & / ( ) = ´ ~ ` { } [ ] ¨ ; :"
        noIncluye = noIncluye.split(" ")
        let correcto = false
        if (!emailVacio()){
            correcto = true
            for (let item of incluye){
                correcto=correcto && mail.value.includes(item)
            }
            if(correcto){
                for (let item of noIncluye){
                    correcto= correcto && !mail.value.includes(item)
                }
            }
        }
        return !correcto
    }
    function recetasVacias(){
        let vacias=true
        for (let i=0; i<recetas.length; i++){
            if(recetas[i].checked==true){
                vacias=false
            }
        }
        return vacias
    }

    //elimina la label de error, saca el id inputError de "input" y saca el error "id" del array
    function removeError(input,id){
        if (errors.includes(id)){
            input.classList.remove("inputError")
            document.getElementById(id).remove()
            errors = errors.filter(function(item) {
                return item !== id
            })
        }
    }

    //elimina la label de error de las recetas, saca el id inputError de recetas y saca el error del array
    function removeRecetasError(){
        if(errors.includes("recetasError")){
            for (i=0; i<recetas.length; i++){
                recetas[i].classList.remove("inputError")
            }
            document.getElementById("recetasError").remove();
            errors = errors.filter(function(item) {
                return item !== "recetasError"
            })
        }
    }

    //en caso de que ese elemento no haya dado error previamente crea e inserta una label con el texto
    //"text", después del elemento "place", y con el id "id", y pushea el id en el array errors
    function insertLabel(place,text,id){
        if (!errors.includes(id)){
            const label = document.createElement("label");
            label.classList.add("error")
            label.id = id
            label.innerHTML=text
            place.insertAdjacentElement("afterend",label)
            errors.push(id)
        }
    }

    //aplica insertLabel, y ademas añade la clase inputError a "place" (no sirve para recetas ni para mail)
    function insertErrorLabel(place, text,id){
        if (!errors.includes(id)){
            insertLabel(place,text,id)
            place.classList.add("inputError")
        }
    }

    // nombre.addEventListener("keypress", function(e){
    //     if (!errors.includes("nombreError")){
    //         if (nombreVacio()){
    //             errors.push("nombreError")
    //         }
    //     }
    //     else if (!nombreVacio()){
    //         errors.remove("nombreError")
    //     }
    // })
    
    // apellido.addEventListener("keypress", function(e){
    //     if (!errors.includes("nombreError")){
    //         if (nombreVacio()){
    //             errors.push("nombreError")
    //         }
    //     }
    //     else if (!nombreVacio()){
    //         errors.remove("nombreError")
    //     }
    // })

    form.addEventListener("submit",function(e){
        if (nombreVacio()){
            insertErrorLabel(nombre,"Ingrese su nombre","nombreError")
        } else {
            removeError(nombre,"nombreError");
        }
        if (apellidoVacio()){
            insertErrorLabel(apellido,"Ingrese su apellido","apellidoError")
        }
        else{
            removeError(apellido,"apellidoError");
        }
        if (emailVacio()){
            insertLabel(mailHelp,"Ingrese su mail","mailError")
            mail.classList.add("inputError")
        }
        else if (emailIncompleto()){
            insertLabel(mailHelp,"Ingrese una dirección de email correcta","mailError")
            mail.classList.add("inputError")
        }
        else{
            removeError(mail,"mailError");
        }
        if (recetasVacias()){
            for (i=0; i<recetas.length; i++){
                recetas[i].classList.add("inputError")
            }
            insertLabel(finRecetas,"Elija alguna receta","recetasError")
        }
        else{
            removeRecetasError();
        }
        if(errors.length >0){
            e.preventDefault()
        }
    })
    
    form.addEventListener("reset", function(e){
        removeError(nombre,"nombreError");
        removeError(apellido,"apellidoError");
        removeError(mail,"mailError");
        removeRecetasError();
    })
})
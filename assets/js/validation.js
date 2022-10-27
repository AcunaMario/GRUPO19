window.addEventListener("load", function(){
    let form=document.querySelector("form")
    let nombre=document.getElementById("nombre");
    let apellido=document.getElementById("apellido");
    let mail=document.getElementById("mail");
    let recetas=document.querySelectorAll(".form-check-input");
    let nombreError = document.getElementById("nombreError")
    let apellidoError = document.getElementById("apellidoError")
    let mailError = document.getElementById("mailError")
    let recetasError = document.getElementById("recetasError")
    
    form.addEventListener("submit",function(e){
        e.preventDefault();
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
            return (!(emailVacio())&&(!(mail.value.includes("@")) || !(mail.value.includes(".com"))))
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

        if (nombreVacio()){
            nombre.classList.add("inputError")
            nombreError.classList.add("error")
            nombreError.innerHTML="Ingrese su nombre"
        }
        else{
            nombre.classList.remove("inputError")
            nombreError.classList.remove("error")
            nombreError.innerHTML=""
        }
        if (apellidoVacio()){
            apellido.classList.add("inputError")
            apellidoError.classList.add("error")
            apellidoError.innerHTML="Ingrese su apellido"
        }
        else{
            apellido.classList.remove("inputError")
            apellidoError.classList.remove("error")
            apellidoError.innerHTML=""
        }
        if (emailVacio()){
            mail.classList.remove("inputError")
            mailError.classList.add("error")
            mailError.innerHTML="Ingrese su mail"
        }
        else{
            mail.classList.remove("inputError")
            mailError.classList.remove("error")
            mailError.innerHTML=""
        }
        if (recetasVacias()){
            for (let i=0; i<recetas.length; i++){
                recetas[i].classList.add("error")
            }
            recetasError.classList.add("error")
            recetasError.innerHTML="Elija alguna receta"
        }
        else{
            recetasError.classList.add("error")
            recetasError.innerHTML=""
        }
        if (emailIncompleto()){
            document.getElementById("mail").classList.add("inputError")
            mailError.classList.add("error")
            mailError.innerHTML="Ingrese una direccíón de email correcta"
        }
        else{
            document.getElementById("mail").classList.remove("inputError")
            mailError.classList.remove("error")
            mailError.innerHTML=""
        }
    })
})
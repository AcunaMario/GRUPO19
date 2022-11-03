window.addEventListener("load", function () {
    const $form = document.querySelector("form")
    const $nombre = document.getElementById("nombre");
    const $apellido = document.getElementById("apellido");
    const $mail = document.getElementById("mail");
    const $recetas = document.querySelectorAll(".form-check-input");
    const $mailHelp = document.getElementById("emailHelp")
    const $recetasContainer = document.getElementById("recetas")
    const $finRecetas = document.getElementById("finRecetas")
    const $textArea = document.getElementById("comentario")
    let errors = []


    //si el campo esta vacio/incompleto/sin checkear ninguna opción devuelve true
    function nombreVacio() {
        return ($nombre.value == "")
    }

    function apellidoVacio() {
        return ($apellido.value == "")
    }

    function emailVacio() {
        return ($mail.value == "")
    }

    function emailIncompleto() {
        let incluye = "@ .com mail"
        incluye = incluye.split(" ")
        let noIncluye = ", < > * ° | ¬ ^ / \\ ? ¿ ¡ ! ' # $ % & / ( ) = ´ ~ ` { } [ ] ¨ ; :"
        noIncluye = noIncluye.split(" ")
        let correcto = false
        if (!emailVacio()) {
            correcto = true
            for (let item of incluye) {
                correcto = correcto && $mail.value.includes(item)
            }
            if (correcto) {
                for (let item of noIncluye) {
                    correcto = correcto && !$mail.value.includes(item)
                }
            }
        }
        return !correcto
    }

    function recetasVacias() {
        let vacias = true
        for (let item of $recetas) {
            if (item.checked == true) {
                vacias = false
            }
        }
        return vacias
    }


    //elimina la label de error, saca el id inputError de "input" y saca el error "id" del array
    function removeError(input, id) {
        if (errors.includes(id)) {
            input.classList.remove("inputError")
            document.getElementById(id).remove()
            errors = errors.filter(function (item) {
                return item !== id
            })
        }
    }

    //elimina la label de error de las recetas, saca el id inputError de recetas y saca el error del array
    function removeRecetasError() {
        if (errors.includes("recetasError")) {
            for (let item of $recetas) {
                item.classList.remove("inputError")
            }
            document.getElementById("recetasError").remove();
            errors = errors.filter(function (item) {
                return item !== "recetasError"
            })
        }
    }


    //en caso de que ese elemento no haya dado error previamente crea e inserta una label con el texto
    //"text", después del elemento "place", y con el id "id", y pushea el id en el array errors
    function insertLabel(place, text, id) {
        if (!errors.includes(id)) {
            const label = document.createElement("label");
            label.classList.add("error")
            label.id = id
            label.innerHTML = text
            place.insertAdjacentElement("afterend", label)
            errors.push(id)
        }
    }

    //aplica insertLabel, y ademas añade la clase inputError a "place" (no sirve para recetas ni para mail)
    function insertErrorLabel(place, text, id) {
        insertLabel(place, text, id)
        place.classList.add("inputError")
    }


    //Se fija si hay que poner error, y en caso de que haya que hacerlo, hace todo el proceso
    function checkNombre() {
        if (nombreVacio()) {
            insertErrorLabel($nombre, "Ingrese su nombre", "nombreError")
        } else {
            removeError($nombre, "nombreError");
        }
    }

    function checkApellido() {
        if (apellidoVacio()) {
            insertErrorLabel($apellido, "Ingrese su apellido", "apellidoError")
        }
        else {
            removeError($apellido, "apellidoError");
        }
    }

    function checkMail() {
        if (emailVacio()) {
            removeError($mail, "mailIncompletoError")
            insertLabel($mailHelp, "Ingrese su mail", "mailError")
            $mail.classList.add("inputError")
        }
        else if (emailIncompleto()) {
            removeError($mail, "mailError")
            insertLabel($mailHelp, "Ingrese una dirección de email correcta", "mailIncompletoError")
            $mail.classList.add("inputError")
        }
        else {
            removeError($mail, "mailError");
            removeError($mail, "mailIncompletoError")
        }
    }

    function checkRecetas() {
        if (recetasVacias()) {
            for (let item of $recetas) {
                item.classList.add("inputError")
            }
            insertLabel($finRecetas, "Elija alguna receta", "recetasError")
        }
        else {
            removeRecetasError();
        }
    }


    //cada vez que se levanta el dedo de una tecla llama a la función check... correcta
    $nombre.addEventListener("input", function (e) {
        checkNombre();
        InsertErrorList()
    })

    $apellido.addEventListener("input", function (e) {
        checkApellido();
        InsertErrorList()
    })

    $mail.addEventListener("input", function (e) {
        checkMail();
        InsertErrorList()
    })

    $recetasContainer.addEventListener("click", function (e) {
        checkRecetas();
        InsertErrorList()
    })


    function stringErrores() {
        let aux = "Por favor complete los siguientes campos: <br>";
        for (let error of errors) {
            switch (error) {
                case "nombreError": aux += "Nombre<br>"; break
                case "apellidoError": aux += "Apellido<br>"; break
                case "mailError": aux += "Email<br>"; break
                case "mailIncompletoError": aux += "Email<br>"; break
                case "recetasError": aux += "Recetas<br>"; break
                default: aux += ""
            }
        }
        console.log()
        return aux
    }

    function InsertErrorList() {
        removeError($textArea, "errorList");
        if (errors.length > 0) {
            insertLabel($textArea, stringErrores(), "errorList");
        }
    }


    //cuando se apreta enviar, si hay errores se los coloca (si no fueron colocados previamente)
    //y no se envía el formulario, en caso contrario, sí se envía
    $form.addEventListener("submit", function (e) {
        checkNombre();
        checkApellido();
        checkMail();
        checkRecetas();
        InsertErrorList();
        if (errors.length > 0) {
            e.preventDefault()
        }
    })


    //al apretar el boton reset se eliminan todos los errores del formulario
    $form.addEventListener("reset", function (e) {
        removeError($nombre, "nombreError");
        removeError($apellido, "apellidoError");
        removeError($mail, "mailError");
        removeError($mail, "mailIncompletoError");
        removeError($textArea, "errorList");
        removeRecetasError();
    })
})
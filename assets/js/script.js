window.addEventListener("load", function () {
    let busqueda = document.getElementById("busqueda")
    let divBusqueda = document.getElementById("divBusqueda")
    let barraBuscadora = document.getElementById("barraBuscadora");
    let lupa = document.getElementById("lupa");
    let barraYLupa = document.getElementById("barraYLupa");
    let puedeSacar = true

    function ocultarbarraYLupa() {
        barraYLupa.hidden = true;
        busqueda.hidden = false;
    }


    busqueda.addEventListener("mouseover", function (e) {
        busqueda.hidden = true;
        barraYLupa.hidden = false
        barraBuscadora.addEventListener("focus", function (ev) {
            puedeSacar = false
        })
    })

    barraYLupa.addEventListener("mouseleave", function (e) {
        if (puedeSacar) {
            ocultarbarraYLupa();
        }
    })

    barraBuscadora.addEventListener("blur", function (e) {
        ocultarbarraYLupa();
        puedeSacar = true
    })

    lupa.addEventListener("click", function (e) {
        barraBuscadora.value = ""
        puedeSacar = true
    })
})
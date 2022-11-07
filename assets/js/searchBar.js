window.addEventListener("load", function () {
    const busqueda = document.getElementById("busqueda")
    const divBusqueda = document.getElementById("divBusqueda")
    const barraBuscadora = document.getElementById("barraBuscadora");
    const lupa = document.getElementById("lupa");
    const barraYLupa = document.getElementById("barraYLupa");
    let puedeSacar = true
    const $menuButton = document.getElementById("menuButton");

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

    barraBuscadora.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            barraBuscadora.value = ""
            puedeSacar = true;
            $menuButton.classList.toggle("active");
        }
    })

    lupa.addEventListener("click", function (e) {
        barraBuscadora.value = ""
        puedeSacar = true
        $menuButton.classList.toggle("active");
    })
})
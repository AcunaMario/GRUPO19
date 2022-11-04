window.addEventListener('load', function () {
    // const fetchAppNutrition = (ingredientes) => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '63404edba9msh74e5984caaebdd5p150272jsna30639747041',
    //             'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    //         }
    //     };

    //     const urlNutritionAPI = 'https://calorieninjas.p.rapidapi.com/v1/nutrition?query='

    //     return fetch(urlNutritionAPI + ingredientes, options)
    //         .then(response => response.json())
    //         .catch(err => console.error(err));
    //     // calories
    //     // carbohydrates_total_g
    //     // cholesterol_mg
    //     // fat_saturated_g
    //     // fat_total_g
    //     // fiber_g
    //     // name
    //     // potassium_mg
    //     // protein_g
    //     // serving_size_g
    //     // sodium_mg
    //     // sugar_g
    // }

    // async function appNutrition() {
    //     const ingredientes = $searchBar.value
    //     const { items } = await fetchAppNutrition(ingredientes)
    //     let aux = ""
    //     for (let item of items) {
    //         aux += "Alimento: " + item.name + "\n";
    //         aux += "Cantidad: " + item.serving_size_g + "g\n";
    //         aux += "Calorias: " + item.calories + "cal\n";
    //         aux += "Proteínas: " + item.protein_g + "g\n\n";
    //     }
    //     console.log(aux);
    // }

    const $lupa = document.getElementById("lupa");
    const $searchBar = document.getElementById("barraBuscadora");
    const $tableBody = document.getElementById('tableBody');
    const $main = document.querySelector("main");
    const $loading = document.getElementById("loading");
    const $searchIcon = document.getElementById("searchIcon");

    const fetchAppRecipes = () => {
        const urlRecipesAPI = 'https://api.sampleapis.com/recipes/recipes'
        return fetch(urlRecipesAPI)
            .then(response => response.json())
            .catch(err => console.error(err));
        // calories
        // carbohydrate
        // categoryname
        // cholesterol
        // cooktime
        // cuisine
        // description
        // fat
        // fiber
        // title
    }

    function createTableData(info) {
        let td = document.createElement("td")
        if (info === "") {
            td.innerHTML = "No info"
        }
        else {
            td.innerHTML = info;
        }
        return td;
    }

    function createLink(recipe) {
        let td = document.createElement("td")
        let a = document.createElement("a")
        a.href = recipe.url;
        a.target = "blank"
        a.innerHTML = recipe.title;
        td.append(a)
        td.id = "celdaAcortada"
        return td;
    }

    function createImg(url) {
        let td = document.createElement("td")
        let img = document.createElement("img")
        img.src = url;
        img.width = "100"
        img.height = "100"
        td.appendChild(img)
        return td;
    }

    function createTableRow(recipe) {
        let tr = document.createElement("tr")
        let tdTitulo = createTableData(recipe.title)
        tdTitulo.id = "celdaAcortada"
        tr.append(tdTitulo)
        tr.append(createTableData(recipe.calories))
        tr.append(createTableData(recipe.fat))
        tr.append(createTableData(recipe.carbohydrate))
        tr.append(createTableData(recipe.cholesterol))
        tr.append(createTableData(recipe.fiber))
        tr.append(createTableData(recipe.sugar))
        tr.append(createTableData(recipe.protein))
        tr.append(createTableData(recipe.sodium))
        tr.append(createLink(recipe))
        tr.append(createImg(recipe.photoUrl))
        return tr;
    }

    async function iniciarRecetas() {
        $loading.style.display = "var(--fa-display, inline-block)";
        const infoApp = await fetchAppRecipes();
        $loading.style.display = "none";
        appRecipes(infoApp)
    }
    iniciarRecetas();

    function appRecipes(infoApp) {
        for (recipe of infoApp) {
            $tableBody.append(createTableRow(recipe))
        }
        document.getElementById("tableContainer").hidden = false
        document.getElementById("footerHidden").hidden = false
    }

    function deleteRecipes() {
        let tableRows = $tableBody.querySelectorAll("tr")
        for (tr of tableRows) {
            $tableBody.removeChild(tr)
        }
        let h3 = $main.querySelector("h3");
        if (h3 !== null) {
            $main.removeChild(h3);
        }
    }

    async function filterRecipes() {
        let { value } = $searchBar
        $searchIcon.classList.remove("fa-magnifying-glass")
        $searchIcon.classList.add("fa-circle-notch", "fa-spin")
        const infoApp = await fetchAppRecipes();
        $searchIcon.classList.add("fa-magnifying-glass")
        $searchIcon.classList.remove("fa-circle-notch", "fa-spin")
        if (value === "") {
            deleteRecipes()
            appRecipes(infoApp)
        }
        else {
            deleteRecipes()
            let recetasBuscadas = infoApp.filter(function (recipe) {
                return recipe.title.trim().toLowerCase().includes(value.trim().toLowerCase()) || (recipe.ingredients.trim().toLowerCase().includes(value.trim().toLowerCase()));
            })
            console.log(recetasBuscadas)
            if (recetasBuscadas.length !== 0) {
                appRecipes(recetasBuscadas)
            }
            else {
                document.getElementById("tableContainer").hidden = true;
                let h3 = document.createElement("h3");
                h3.innerHTML = 'Receta "' + value + '" no encontrada';
                $main.appendChild(h3);
            }
        }
    }


    $lupa.addEventListener("click", function (e) {
        filterRecipes()
        appNutrition()
    });

    $searchBar.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            filterRecipes()
            appNutrition();
        }
    });
})
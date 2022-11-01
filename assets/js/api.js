const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '63404edba9msh74e5984caaebdd5p150272jsna30639747041',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    }
};
const urlNutritionAPI = 'https://calorieninjas.p.rapidapi.com/v1/nutrition?query='

const fetchAppNutrition = (ingredientes) => {
    return fetch(urlNutritionAPI + ingredientes, options)
        .then(response => response.json())
        .catch(err => console.error(err));
    // calories
    // carbohydrates_total_g
    // cholesterol_mg
    // fat_saturated_g
    // fat_total_g
    // fiber_g
    // name
    // potassium_mg
    // protein_g
    // serving_size_g
    // sodium_mg
    // sugar_g
}

const urlRecipesAPI = 'https://api.sampleapis.com/recipes/recipes'

const fetchAppRecipes = () => {
    fetch(urlRecipesAPI)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            for (recipe of response) {
                const $tableBody = document.getElementById('tableBody');
                let tr = document.createElement("tr")
                let td = document.createElement("td")
                td.innerHTML = recipe.title;
                tr.append(td)
                td = document.createElement("td")
                td.innerHTML = recipe.calories;
                tr.append(td)
                td = document.createElement("td")
                td.innerHTML = recipe.fat;
                tr.append(td)
                td = document.createElement("td")
                td.innerHTML = recipe.carbohydrate;
                tr.append(td)
                td = document.createElement("td")
                let a = document.createElement("a")
                a.href = recipe.url;
                a.target = "blank"
                a.innerHTML = recipe.title;
                td.append(a)
                tr.append(td)
                $tableBody.append(tr)
            }
        })
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

const $lupa = document.getElementById("lupa");
const $searchBar = document.getElementById("barraBuscadora");

async function appNutrition(e) {
    $lupa.ariaBusy = true
    const ingredientes = $searchBar.value
    const { items } = await fetchAppNutrition(ingredientes)
    let aux = ""
    for (let item of items) {
        aux += "Alimento: " + item.name + "\n";
        aux += "Cantidad: " + item.serving_size_g + "g\n";
        aux += "Calorias: " + item.calories + "cal\n";
        aux += "Proteínas: " + item.protein_g + "g\n\n";
    }
    console.log(aux);
}

$lupa.addEventListener("click", appNutrition);

$searchBar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        appNutrition();
    }
});


async function appRecipes() {
    const infoApp = await fetchAppRecipes();
    console.log(infoApp);

}


$lupa.addEventListener("click", appRecipes);

$searchBar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        appRecipes();
    }
});

fetchAppRecipes();
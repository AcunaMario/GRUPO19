const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '63404edba9msh74e5984caaebdd5p150272jsna30639747041',
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    }
};
const url = 'https://calorieninjas.p.rapidapi.com/v1/nutrition?query='

const fetchApp = (ingredientes) => {
    return fetch(url + ingredientes, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

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

const $lupa = document.getElementById("lupa");
const $searchBar = document.getElementById("barraBuscadora");


$lupa.addEventListener("click", async function (e) {
    $lupa.ariaBusy = true
    const ingredientes = $searchBar.value
    const { items } = await fetchApp(ingredientes)
    let aux = ""
    for (let item of items) {
        aux += "Alimento: " + item.name + "\n";
        aux += "Cantidad: " + item.serving_size_g + "g\n";
        aux += "Calorias: " + item.calories + "cal\n";
        aux += "Proteínas: " + item.protein_g + "g\n\n";
    }
    console.log(aux);
})

$searchBar.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
        $lupa.ariaBusy = true
        const ingredientes = $searchBar.value
        const { items } = await fetchApp(ingredientes)
        let aux = ""
        for (let item of items) {
            aux += "Alimento: " + item.name + "\n";
            aux += "Cantidad: " + item.serving_size_g + "g\n";
            aux += "Calorias: " + item.calories + "cal\n";
            aux += "Proteínas: " + item.protein_g + "g\n\n";
        }
        console.log(aux);
    }
})


// API RECETAS: https://api.sampleapis.com/recipes/recipes
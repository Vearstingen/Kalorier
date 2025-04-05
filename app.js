
const form = document.getElementById('food-form');
const resultDiv = document.getElementById('result');

let totalCalories = 0;
let totalProtein = 0;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const food = document.getElementById('food').value;
    
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${amount} ${food}`, {
        headers: { 'X-Api-Key': 'YOUR_API_KEY' }
    });
    const data = await response.json();
    
    if (data.items.length > 0) {
        const item = data.items[0];
        totalCalories += item.calories;
        totalProtein += item.protein_g;

        resultDiv.innerHTML += `<p>${amount} ${food} = ${item.calories} kcal, ${item.protein_g} g protein</p>`;
        resultDiv.innerHTML += `<strong>Totalt: ${totalCalories.toFixed(2)} kcal, ${totalProtein.toFixed(2)} g protein</strong><br>`;
    } else {
        resultDiv.innerHTML += `<p>Ingen data hittades för ${amount} ${food}.</p>`;
    }
});

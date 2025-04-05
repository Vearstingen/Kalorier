```javascript
const mealData = {
  "ägg": { calories: 80, protein: 7 },
  "banan": { calories: 90, protein: 1 },
  // Lägg till fler livsmedel här
};

let dailyTotalCalories = 0;
let dailyTotalProtein = 0;
const dailyIntakeHistory = [];

document.getElementById('currentDate').innerText = new Date().toLocaleDateString('sv-SE');

async function addMeal() {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  const unit = document.getElementById('unitSelect').value;
  const input = document.getElementById('foodInput').value.trim().toLowerCase();

  if (isNaN(quantity) || quantity <= 0) {
    alert("Ange ett giltigt antal!");
    return;
  }

  let caloriesPerUnit, proteinPerUnit;

  if (mealData[input]) {
    caloriesPerUnit = mealData[input].calories;
    proteinPerUnit = mealData[input].protein;
  } else {
    const { calories, protein } = await fetchCaloriesAndProtein(input);
    caloriesPerUnit = calories;
    proteinPerUnit = protein;
  }

  // Konvertera till gram baserat på enhet
  let totalQuantityInGrams = quantity;
  if (unit === 'dl') totalQuantityInGrams *= 100; // Anta att 1 dl är 100 gram
  else if (unit === 'kilo') totalQuantityInGrams *= 1000; // Kilo till gram

  const totalCalories = (totalQuantityInGrams * caloriesPerUnit) / 100;
  const totalProtein = (totalQuantityInGrams * proteinPerUnit) / 100;

  dailyTotalCalories += totalCalories;
  dailyTotalProtein += totalProtein;

  updateDisplay();

  const mealList = document.getElementById('mealList');
  const listItem = document.createElement('li');
  listItem.textContent = `${quantity} ${unit} ${input} = ${totalCalories.toFixed(2)} kcal, ${totalProtein.toFixed(2)} g protein`;
  mealList.appendChild(listItem);

  dailyIntakeHistory.push({ date: new Date().toLocaleDateString('sv-SE'), calories: totalCalories, protein: totalProtein });

  document.getElementById('quantityInput').value = "";
  document.getElementById('foodInput').value = "";
}

function updateDisplay() {
  document.getElementById('dailyCalories').textContent = dailyTotalCalories.toFixed(2);
  document.getElementById('dailyProtein').textContent = dailyTotalProtein.toFixed(2);
}

function resetCalories() {
  dailyTotalCalories = 0;
  dailyTotalProtein = 0;
  document.getElementById('mealList').innerHTML = "";
  dailyIntakeHistory.length = 0; // Tömma historiken
  updateDisplay();
  alert("Dagens kalorier och protein har nollställts!");
}

function removeLastDay() {
  if (dailyIntakeHistory.length > 0) {
    const lastEntry = dailyIntakeHistory.pop();
    dailyTotalCalories -= lastEntry.calories;
    dailyTotalProtein -= lastEntry.protein;
    updateDisplay();
    alert(`Tagit bort intag från ${lastEntry.date}.`);
    // Uppdatera listan
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = ""; // Rensa listan och återställa den
    dailyIntakeHistory.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.date}: ${entry.calories.toFixed(2)} kcal, ${entry.protein.toFixed(2)} g protein`;
      mealList.appendChild(listItem);
    });
  } else {
    alert("Ingen historik att ta bort.");
  }
}

async function fetchCaloriesAndProtein(food) {
  try {
    const response = await fetch('https://world.openfoodfacts.org/api/v0/product/' + food + '.json');
    if (!response.ok) throw new Error('Nätverksfel');

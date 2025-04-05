
const mealCalories = {
  "lasagne": 600,
  "mellanmjölk": 100,
  "kycklingsallad": 400,
  "havregrynsgröt": 300,
  "banan": 90,
  "ägg": 80,
  "smörgås": 250,
  "pizza": 900,
  "hamburgare": 800,
  "smoothie": 250
};

let dailyTotal = 0;
let weeklyTotal = 0;
let monthlyTotal = 0;

function addMeal() {
  const input = document.getElementById('foodInput').value.trim().toLowerCase();
  const calories = mealCalories[input];
  if (calories) {
    dailyTotal += calories;
    weeklyTotal += calories;
    monthlyTotal += calories;
    updateDisplay();
    const mealList = document.getElementById('mealList');
    const listItem = document.createElement('li');
    listItem.textContent = input + " - " + calories + " kcal";
    mealList.appendChild(listItem);
  } else {
    alert("Måltid inte hittad. Lägg till fler i koden!");
  }
  document.getElementById('foodInput').value = "";
}

function updateDisplay() {
  document.getElementById('dailyCalories').textContent = dailyTotal;
  document.getElementById('weeklyCalories').textContent = weeklyTotal;
  document.getElementById('monthlyCalories').textContent = monthlyTotal;
}

function resetCalories() {
  dailyTotal = 0;
  document.getElementById('mealList').innerHTML = "";
  updateDisplay();
  alert("Dagens kalorier har nollställts!");
}

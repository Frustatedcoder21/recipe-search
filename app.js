// Select the input box and the search button
const textbox = document.querySelector('#textbox');
const searchButton = document.querySelector('#search-button');

// Add an event listener to the search button
searchButton.addEventListener('click', function() {
    // Get the value from the textbox
    const query = textbox.value.trim();

    // Check if the textbox is empty
    if (query === "") {
        alert("Please enter a search term.");
    } else {
        // Construct the API URL with the user's search query
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

        // Fetch data from the API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Process and display the data
                if (data.meals) {
                    displayResults(data.meals);
                } else {
                    alert("No results found.");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert("An error occurred while fetching data.");
            });

        // Clear the textbox after search
        textbox.value = "";
    }
});

// Function to display the results
function displayResults(meals) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ""; // Clear previous results

    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.classList.add('meal');

        const mealName = document.createElement('h2');
        mealName.textContent = meal.strMeal;

        const mealImage = document.createElement('img');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;

        const mealInstructions = document.createElement('p');
        mealInstructions.textContent = meal.strInstructions;

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('ingredients');

        // Get ingredients and measures
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                const listItem = document.createElement('li');
                listItem.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(listItem);
            }
        }

        mealElement.appendChild(mealName);
        mealElement.appendChild(mealImage);
        mealElement.appendChild(ingredientsList);
        mealElement.appendChild(mealInstructions);
        resultsContainer.appendChild(mealElement);
    });
}

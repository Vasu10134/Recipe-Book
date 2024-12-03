// Load stored recipes or initialize an empty array
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// Set initial theme from localStorage
document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";

const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");
const ingredientsInput = document.getElementById("ingredients");
const instructionsInput = document.getElementById("instructions");
const categoryInput = document.getElementById("category");
const ratingInput = document.getElementById("rating");
const recipeList = document.getElementById("recipe-list");
const searchInput = document.getElementById("search-input");

// Handle form submission to add a new recipe
recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const recipeName = recipeNameInput.value.trim();
    const ingredients = ingredientsInput.value.trim();
    const instructions = instructionsInput.value.trim();
    const category = categoryInput.value;
    const rating = ratingInput.value;

    if (!recipeName || !ingredients || !instructions || !rating) {
        alert("All fields are required!");
        return;
    }

    const newRecipe = {
        id: Date.now(),
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
        rating: rating
    };

    recipes.push(newRecipe);
    saveToLocalStorage();
    displayRecipes();

    recipeForm.reset();
});

// Display all recipes
function displayRecipes() {
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        const li = document.createElement("li");
        li.classList.add("recipe-item");
        li.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
            <p><strong>Rating:</strong> ${recipe.rating}/5</p>
            <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
            <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
        `;
        recipeList.appendChild(li);
    });
}

// Save recipes to localStorage
function saveToLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Delete a recipe
function deleteRecipe(id) {
    recipes = recipes.filter(recipe => recipe.id !== id);
    saveToLocalStorage();
    displayRecipes();
}

// Edit a recipe
function editRecipe(id) {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);

    recipeNameInput.value = recipeToEdit.name;
    ingredientsInput.value = recipeToEdit.ingredients;
    instructionsInput.value = recipeToEdit.instructions;
    categoryInput.value = recipeToEdit.category;
    ratingInput.value = recipeToEdit.rating;

    deleteRecipe(id);
}

// Search recipes
function searchRecipe() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.toLowerCase().includes(searchTerm) ||
        recipe.instructions.toLowerCase().includes(searchTerm)
    );
    displayFilteredRecipes(filteredRecipes);
}

// Display filtered recipes
function displayFilteredRecipes(filteredRecipes) {
    recipeList.innerHTML = "";
    filteredRecipes.forEach(recipe => {
        const li = document.createElement("li");
        li.classList.add("recipe-item");
        li.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
            <p><strong>Rating:</strong> ${recipe.rating}/5</p>
            <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
            <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
        `;
        recipeList.appendChild(li);
    });
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
}

// Initialize app
displayRecipes();

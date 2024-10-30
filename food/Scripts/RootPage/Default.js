$(document).ready(function () {
    const recipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/all'; // 取得所有食譜 API
    const categoriesApiUrl = 'http://internal.hochi.org.tw:8082/api/Categories/categories'; // 取得烹飪方式 API
    const recipeDetailApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes'; // 單一食譜 API

    let mainIngredients = []; // 儲存主食材資料
    let categories = []; // 儲存烹飪方式資料
    let recipes = []; // 儲存食譜資料

    // 初始化
    loadMainIngredients();
    loadCategories();
    loadRecipes();

    // 取得主食材資料
    function loadMainIngredients() {
        // 根據實際需求取得主食材 API 並更新 mainIngredients
        // 範例資料載入到主食材區域
    }

    // 取得烹飪方式資料
    function loadCategories() {
        $.get(categoriesApiUrl, function (response) {
            categories = response.$values;
        });
    }

    // 取得食譜資料
    function loadRecipes() {
        $.get(recipesApiUrl, function (response) {
            recipes = response.$values;
        });
    }

    // 當滑鼠移到主食材時顯示烹飪方式 icon
    $('#mainIngredientList').on('mouseenter', '.ingredient-item', function () {
        const ingredientId = $(this).data('id');
        $('#cookingMethodIcons').empty().show();

        categories.forEach(function (category) {
            $('#cookingMethodIcons').append(`
                <img src="${category.icon}" alt="${category.category_name}" class="cooking-icon" data-ingredient-id="${ingredientId}" data-category-id="${category.category_id}">
            `);
        });
    });

    // 當滑鼠移到烹飪方式 icon 上時顯示食譜清單
    $('#cookingMethodIcons').on('mouseenter', '.cooking-icon', function () {
        const ingredientId = $(this).data('ingredient-id');
        const categoryId = $(this).data('category-id');

        $('#recipeItems').empty().show();

        const filteredRecipes = recipes.filter(recipe =>
            recipe.main_ingredient_id === ingredientId && recipe.category_id === categoryId
        );

        filteredRecipes.forEach(function (recipe) {
            $('#recipeItems').append(`
                <li>${recipe.recipe_name} <span class="viewRecipeDetail" data-id="${recipe.recipe_id}">🗒️</span></li>
            `);
        });
    });

    // 點擊 🗒️ 顯示食譜詳情
    $('#recipeItems').on('click', '.viewRecipeDetail', function () {
        const recipeId = $(this).data('id');
        loadRecipeDetails(recipeId);
    });

    // 加載食譜詳細資訊
    function loadRecipeDetails(recipeId) {
        $.get(`${recipeDetailApiUrl}/${recipeId}`, function (recipe) {
            $('#detailRecipeName').text(recipe.recipe_name);
            $('#detailCategory').text(recipe.category);
            $('#detailChef').text(recipe.chef_id);
            $('#detailDescription').text(recipe.description);
        });

        $.get(`${recipeDetailApiUrl}/steps/${recipeId}`, function (response) {
            $('#detailStepsList').empty();
            response.$values.forEach(function (step) {
                $('#detailStepsList').append(`<li>${step.step_number}. ${step.description}</li>`);
            });
        });

        $.get(`${recipeDetailApiUrl}/ingredients/${recipeId}`, function (response) {
            $('#detailIngredientsList').empty();
            response.$values.forEach(function (ingredient) {
                $('#detailIngredientsList').append(`<li>${ingredient.ingredient_name} - ${ingredient.amount} ${ingredient.unit}</li>`);
            });
        });

        $.get(`${recipeDetailApiUrl}/seasonings/${recipeId}`, function (response) {
            $('#detailSeasoningsList').empty();
            response.$values.forEach(function (seasoning) {
                $('#detailSeasoningsList').append(`<li>${seasoning.seasoning_name} - ${seasoning.amount} ${seasoning.unit}</li>`);
            });
        });

        $('#recipeDetailModal').modal('show');
    }
});

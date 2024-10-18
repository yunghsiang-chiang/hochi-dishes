$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/recipes'; // 修正后的食谱 API
    const ingredientApiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients'; // 修正后的主食材 API
    const chefApiUrl = 'http://internal.hochi.org.tw:8082/api/chefs/chefs'; // 修正后的厨师 API
    const categoryApiUrl = 'http://internal.hochi.org.tw:8082/api/categories/categories'; // 修正后的分类 API

    loadRecipes();
    loadIngredients();
    loadChefs();
    loadCategories();

    $('#submitRecipe').click(function () {
        var recipeId = $('#recipeId').val();
        var recipeName = $('#recipeName').val();
        var recipeDescription = $('#recipeDescription').val();
        var mainIngredientId = $('#mainIngredient').val();
        var category = $('#recipeCategory').val();
        var chefId = $('#chef').val();

        const recipeData = {
            recipe_name: recipeName,
            description: recipeDescription,
            main_ingredient_id: parseInt(mainIngredientId),
            category: category,
            chef_id: parseInt(chefId)
        };

        if (recipeId) {
            recipeData.recipe_id = parseInt(recipeId);
        }

        $.ajax({
            type: "POST",
            url: apiUrl, // 修正后的食谱 API
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(recipeData),
            success: function (response) {
                alert('Recipe saved successfully!');
                loadRecipes();
                resetForm();
            },
            error: function (xhr) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    $('#deleteRecipe').click(function () {
        var recipeId = $('#recipeId').val();
        if (!recipeId) {
            alert('Please select a recipe to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete this recipe?')) {
            $.ajax({
                type: "DELETE",
                url: `${apiUrl}/${recipeId}`, // 修正后的食谱删除 API
                success: function () {
                    alert('Recipe deleted successfully!');
                    loadRecipes();
                    resetForm();
                },
                error: function (xhr) {
                    alert('Error: ' + xhr.responseText);
                }
            });
        }
    });

    function loadRecipes() {
        $.ajax({
            type: "GET",
            url: apiUrl, // 修正后的获取食谱 API
            success: function (recipes) {
                renderRecipes(recipes);
            },
            error: function (xhr) {
                alert('Failed to load recipes: ' + xhr.responseText);
            }
        });
    }

    function renderRecipes(recipes) {
        var rows = '';
        recipes.forEach(function (recipe) {
            rows += `<tr data-id="${recipe.recipe_id}">
                        <td>${recipe.recipe_id}</td>
                        <td>${recipe.recipe_name}</td>
                        <td>${recipe.description}</td>
                        <td>${recipe.main_ingredient?.main_ingredient_name || 'N/A'}</td>
                        <td>${recipe.category || 'N/A'}</td>
                        <td>${recipe.chef?.name || 'N/A'}</td>
                        <td>
                            <button class="btn btn-secondary edit" data-id="${recipe.recipe_id}">Edit</button>
                        </td>
                    </tr>`;
        });
        $('#recipeTable tbody').html(rows);

        $('.edit').click(function () {
            var recipeId = $(this).data('id');
            loadRecipeDetails(recipeId);
        });
    }

    function loadRecipeDetails(recipeId) {
        $.ajax({
            type: "GET",
            url: `${apiUrl}/${recipeId}`, // 修正后的获取单个食谱 API
            success: function (recipe) {
                $('#recipeId').val(recipe.recipe_id);
                $('#recipeName').val(recipe.recipe_name);
                $('#recipeDescription').val(recipe.description);
                $('#mainIngredient').val(recipe.main_ingredient_id);
                $('#recipeCategory').val(recipe.category);
                $('#chef').val(recipe.chef_id);
            },
            error: function (xhr) {
                alert('Failed to load recipe details: ' + xhr.responseText);
            }
        });
    }

    function loadIngredients() {
        $.get(ingredientApiUrl, function (ingredients) { // 修正后的获取主食材 API
            ingredients.forEach(function (ingredient) {
                $('#mainIngredient').append(`<option value="${ingredient.main_ingredient_id}">${ingredient.main_ingredient_name}</option>`);
            });
        });
    }

    function loadChefs() {
        $.get(chefApiUrl, function (chefs) { // 修正后的获取厨师 API
            chefs.forEach(function (chef) {
                $('#chef').append(`<option value="${chef.chef_id}">${chef.name}</option>`);
            });
        });
    }

    function loadCategories() {
        $.get(categoryApiUrl, function (categories) { // 修正后的获取分类 API
            categories.forEach(function (category) {
                $('#recipeCategory').append(`<option value="${category.category_name}">${category.category_name}</option>`);
            });
        });
    }

    function resetForm() {
        $('#recipeId').val('');
        $('#recipeName').val('');
        $('#recipeDescription').val('');
        $('#mainIngredient').val('');
        $('#recipeCategory').val('');
        $('#chef').val('');
    }
});

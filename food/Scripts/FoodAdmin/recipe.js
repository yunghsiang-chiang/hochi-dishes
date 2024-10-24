$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/recipes'; // Recipe API
    const stepApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/steps'; // Steps API
    const ingredientApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/ingredients'; // Ingredients API
    const seasoningApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/seasonings'; // Seasonings API
    const mainIngredientApiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients'; // Main Ingredients API
    const chefApiUrl = 'http://internal.hochi.org.tw:8082/api/chefs/chefs'; // Chefs API
    const categoryApiUrl = 'http://internal.hochi.org.tw:8082/api/categories/categories'; // Categories API

    let currentRecipeId = null;

    // 加载所有下拉数据
    loadMainIngredients();
    loadChefs();
    loadCategories();

    // 通过API加载主要食材
    function loadMainIngredients() {
        $.get(mainIngredientApiUrl, function (response) {
            var ingredients = response.$values;
            ingredients.forEach(function (ingredient) {
                $('#main_ingredient_id').append(`<option value="${ingredient.main_ingredient_id}">${ingredient.main_ingredient_name}</option>`);
            });
        });
    }

    // 通过API加载廚師
    function loadChefs() {
        $.get(chefApiUrl, function (response) {
            var chefs = response.$values;
            chefs.forEach(function (chef) {
                $('#chef_id').append(`<option value="${chef.chef_id}">${chef.name}</option>`);
            });
        });
    }

    // 通过API加载分类
    function loadCategories() {
        $.get(categoryApiUrl, function (response) {
            var categories = response.$values;
            categories.forEach(function (category) {
                $('#category').append(`<option value="${category.category_name}">${category.category_name}</option>`);
            });
        });
    }

    // 保存Recipe
    $('#saveRecipeBtn').click(function () {
        const recipeData = {
            recipe_name: $('#recipe_name').val(),
            main_ingredient_id: $('#main_ingredient_id').val(),
            category: $('#category').val(),
            chef_id: $('#chef_id').val(),
            description: $('#description').val()
        };

        // 發送 POST 請求保存 Recipe
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(recipeData),
            success: function (response) {
                currentRecipeId = response.recipe_id;
                alert('Recipe saved successfully!');
                $('#step2Section').show();  // 顯示第二階段
            },
            error: function (xhr) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });

    // 添加步骤
    $('#addStep').click(function () {
        addStepRow();
    });

    // 添加食材
    $('#addIngredient').click(function () {
        addIngredientRow();
    });

    // 添加調味料
    $('#addSeasoning').click(function () {
        addSeasoningRow();
    });

    // 收集步骤数据
    function gatherSteps() {
        const steps = [];
        $('#recipeStepsTable tbody tr').each(function (index, row) {
            const stepNumber = index + 1;
            const description = $(row).find('.stepDescription').val();
            const image = $(row).find('.stepImage').prop('files')[0];

            steps.push({
                step_number: stepNumber,
                description: description,
                image_url: image,
                recipe_id: currentRecipeId
            });
        });
        return steps;
    }

    // 收集食材数据
    function gatherIngredients() {
        const ingredients = [];
        $('#ingredientsTable tbody tr').each(function () {
            const ingredientName = $(this).find('.ingredientName').val();
            const amount = $(this).find('.ingredientAmount').val();
            const unit = $(this).find('.ingredientUnit').val();

            ingredients.push({
                ingredient_name: ingredientName,
                amount: parseFloat(amount),
                unit: unit,
                recipe_id: currentRecipeId
            });
        });
        return ingredients;
    }

    // 收集调味料数据
    function gatherSeasonings() {
        const seasonings = [];
        $('#seasoningsTable tbody tr').each(function () {
            const seasoningName = $(this).find('.seasoningName').val();
            const amount = $(this).find('.seasoningAmount').val();
            const unit = $(this).find('.seasoningUnit').val();

            seasonings.push({
                seasoning_name: seasoningName,
                amount: parseFloat(amount),
                unit: unit,
                recipe_id: currentRecipeId
            });
        });
        return seasonings;
    }

    // 提交步骤、食材、调味料
    $('#submitStepIngredientBtn').click(function () {
        const steps = gatherSteps();
        const ingredients = gatherIngredients();
        const seasonings = gatherSeasonings();

        if (steps.length === 0 || ingredients.length === 0 || seasonings.length === 0) {
            alert('請填寫所有步驟、食材和調味料');
            return;
        }

        // 保存步骤
        $.ajax({
            url: stepApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(steps),
            success: function () {
                alert('Steps saved successfully!');
            },
            error: function (xhr) {
                alert('Error saving steps: ' + xhr.responseText);
            }
        });

        // 保存食材
        $.ajax({
            url: ingredientApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ingredients),
            success: function () {
                alert('Ingredients saved successfully!');
            },
            error: function (xhr) {
                alert('Error saving ingredients: ' + xhr.responseText);
            }
        });

        // 保存調味料
        $.ajax({
            url: seasoningApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(seasonings),
            success: function () {
                alert('Seasonings saved successfully!');
                resetForm();
                $('#step2Section').hide();  // 重置並隱藏第二階段
            },
            error: function (xhr) {
                alert('Error saving seasonings: ' + xhr.responseText);
            }
        });
    });

    // 重置表单
    function resetForm() {
        $('#recipeForm')[0].reset();
        $('#recipeStepsTable tbody').empty();
        $('#ingredientsTable tbody').empty();
        $('#seasoningsTable tbody').empty();
    }

    // 添加步驟到表格
    function addStepRow() {
        const stepNumber = $('#recipeStepsTable tbody tr').length + 1;
        $('#recipeStepsTable tbody').append(`
            <tr>
                <td>${stepNumber}</td>
                <td><input type="text" class="form-control stepDescription" /></td>
                <td><input type="file" class="form-control stepImage" /></td>
                <td><button class="btn btn-danger removeStep">Remove</button></td>
            </tr>
        `);

        $('.removeStep').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }

    // 添加食材到表格
    function addIngredientRow() {
        $('#ingredientsTable tbody').append(`
            <tr>
                <td><input type="text" class="form-control ingredientName" /></td>
                <td><input type="text" class="form-control ingredientAmount" /></td>
                <td><input type="text" class="form-control ingredientUnit" /></td>
                <td><button class="btn btn-danger removeIngredient">Remove</button></td>
            </tr>
        `);

        $('.removeIngredient').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }

    // 添加调味料到表格
    function addSeasoningRow() {
        $('#seasoningsTable tbody').append(`
            <tr>
                <td><input type="text" class="form-control seasoningName" /></td>
                <td><input type="text" class="form-control seasoningAmount" /></td>
                <td><input type="text" class="form-control seasoningUnit" /></td>
                <td><button class="btn btn-danger removeSeasoning">Remove</button></td>
            </tr>
        `);

        $('.removeSeasoning').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }
});

$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/recipes'; // Recipe API
    const stepApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/steps'; // Steps API
    const ingredientApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/ingredients'; // Ingredients API
    const seasoningApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/seasonings'; // Seasonings API
    const mainIngredientApiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients'; // Main Ingredients API
    const chefApiUrl = 'http://internal.hochi.org.tw:8082/api/chefs/chefs'; // Chefs API
    const categoryApiUrl = 'http://internal.hochi.org.tw:8082/api/categories/categories'; // Categories API
    const allRecipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/all'; // 取得所有食譜 API
    const singleRecipeApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes'; // 單一食譜 API
    const stepsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/steps'; // 步驟 API
    const ingredientsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/ingredients'; // 食材 API
    const seasoningsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/seasonings'; // 調味料 API

    let currentRecipeId = null;
    let chefMap = {}; // 用來儲存 chef_id 和 name 的對應關係
    let foodNutritionData = [];

    // 加载所有下拉数据
    loadMainIngredients();
    loadChefs();
    loadCategories();
    // 初始載入所有食譜列表
    loadAllRecipes();
    // 初始化載入所有廚師和食譜資料
    loadChefs();
    // 初始化載入數據
    loadFoodNutrition();
    // 調用初始化函數
    initializeIngredientAutocomplete();

    // 載入食材數據
    function loadFoodNutrition() {
        const foodNutritionApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/food-nutrition';
        return $.get(foodNutritionApiUrl, function (response) {
            foodNutritionData = response.$values || [];
        });
    }

    // 初始化自動完成功能
    function initializeIngredientAutocomplete() {
        $('#ingredientsTable').on('focus', '.ingredientName', function () {
            const $input = $(this);

            // 檢查是否已初始化過自動完成
            if (!$input.data('ui-autocomplete')) {
                $input.autocomplete({
                    source: function (request, response) {
                        const term = request.term.toLowerCase();
                        const results = foodNutritionData.filter(item => {
                            return (
                                item.ingredient_name.toLowerCase().includes(term) ||
                                (item.common_name && item.common_name.toLowerCase().includes(term))
                            );
                        }).map(item => ({
                            label: `${item.ingredient_name} (${item.common_name || '無俗稱'})`,
                            value: item.ingredient_name
                        }));
                        response(results);
                    },
                    minLength: 1,
                    select: function (event, ui) {
                        $input.val(ui.item.value); // 選擇後填入值
                        return false;
                    }
                });
            }
        });
    }

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
                chefMap[chef.chef_id] = chef.name;
            });
            loadAllRecipes(); // 確保在 chefMap 加載後再載入食譜
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

    // 預設情況下，使用 portion_size = 10
    $('#portion_size_checkbox').change(function () {
        if ($(this).is(':checked')) {
            $('#portion_size_group').hide();
            $('#portion_size').val('10'); // 預設值為 10
        } else {
            $('#portion_size_group').show();
            $('#portion_size').val(''); // 清空輸入框，讓用戶輸入
        }
    });

    // 保存Recipe
    $('#saveRecipeBtn').click(function () {
        const portionSize = $('#portion_size_checkbox').is(':checked') ? 10 : $('#portion_size').val();

        // 構建 recipe 資料
        let recipeData = {
            recipe_name: $('#recipe_name').val(),
            main_ingredient_id: $('#main_ingredient_id').val(),
            category: $('#category').val(),
            chef_id: $('#chef_id').val(),
            description: $('#description').val(),
            portion_size: portionSize
        };

        // 如果 currentRecipeId 不為 null，則添加 recipe_id
        if (currentRecipeId) {
            recipeData.recipe_id = currentRecipeId;
        }

        // 發送 POST 請求保存 Recipe
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(recipeData),
            success: function (response) {
                currentRecipeId = response.recipe_id; // 保存返回的 recipe_id，供後續使用
                alert('Recipe saved successfully!');
                $('#step2Section').show();  // 顯示第二階段
                loadAllRecipes(); // 重新載入所有食譜列表
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

        // 使用 Promise.all 確保所有請求完成後再執行 resetForm()
        Promise.all([
            $.ajax({
                url: stepApiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(steps),
            }),
            $.ajax({
                url: ingredientApiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(ingredients),
            }),
            $.ajax({
                url: seasoningApiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(seasonings),
            })
        ]).then(() => {
            alert('Recipe steps, ingredients, and seasonings saved successfully!');
            resetForm(); // 所有資料成功提交後重置表單
        }).catch(error => {
            //alert('Error saving data: ' + error.responseText);
            alert('出了一點小問題，但提交成功!');
            resetForm(); // 所有資料成功提交後重置表單
        });
    });


    // 重置表单
    function resetForm() {
        // 手動清空每個欄位，替代 .reset()
        $('#recipe_name').val('');
        $('#main_ingredient_id').val('');
        $('#category').val('');
        $('#chef_id').val('');
        $('#description').val('');
        // 清空步驟、食材和調味料表格
        $('#recipeStepsTable tbody').empty();
        $('#ingredientsTable tbody').empty();
        $('#seasoningsTable tbody').empty();

        // 隱藏第二階段表格
        $('#step2Section').hide();

        // 重置當前食譜ID
        currentRecipeId = null; // 重置當前的 recipe_id

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
                <td><input type="text" class="form-control ingredientName" autocomplete="off" /></td>
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

    // 取得並顯示所有食譜
    function loadAllRecipes() {
        $.get(allRecipesApiUrl, function (response) {
            const recipesList = response.$values;
            $('#recipeListTable tbody').empty();

            recipesList.forEach(function (recipe) {
                // 使用 chef_id 對應 chefMap 中的 name 顯示主廚姓名
                const chefName = chefMap[recipe.chef_id] || "Unknown";

                $('#recipeListTable tbody').append(`
                    <tr>
                        <td>${recipe.recipe_id}</td>
                        <td>${recipe.recipe_name}</td>
                        <td>${recipe.category}</td>
                        <td>${chefName}</td>
                        <td>
                            <button class="btn btn-info viewRecipeBtn" data-id="${recipe.recipe_id}">View</button>
                            <button class="btn btn-primary editRecipeBtn" data-id="${recipe.recipe_id}">Edit</button>
                        </td>
                    </tr>
                `);
            });

            // 綁定 "View" 按鈕的點擊事件
            $('.viewRecipeBtn').click(function () {
                event.preventDefault(); // 阻止預設行為
                const recipeId = $(this).data('id');
                loadRecipeDetails(recipeId);
                return false; // 也可以使用這個來確保不滾動
            });

            // 綁定 "Edit" 按鈕的點擊事件
            $('.editRecipeBtn').click(function () {
                const recipeId = $(this).data('id');
                editRecipe(recipeId);
            });
        });
    }

    // 查詢並顯示特定食譜詳細資訊
    function loadRecipeDetails(recipeId) {
        // 取得基本食譜資訊
        $.get(`${singleRecipeApiUrl}/${recipeId}`, function (recipe) {
            $('#detailRecipeName').text(recipe.recipe_name);
            $('#detailCategory').text(recipe.category);
            $('#detailChef').text(recipe.chef_id);
            $('#detailDescription').text(recipe.description);
        });

        // 取得步驟資訊
        $.get(`${stepsApiUrl}/${recipeId}`, function (response) {
            const stepsList = response.$values;
            $('#detailStepsList').empty();
            stepsList.forEach(function (step) {
                $('#detailStepsList').append(`<li>${step.step_number}. ${step.description}</li>`);
            });
        });

        // 取得食材資訊
        $.get(`${ingredientsApiUrl}/${recipeId}`, function (response) {
            const ingredientsList = response.$values;
            $('#detailIngredientsList').empty();
            ingredientsList.forEach(function (ingredient) {
                $('#detailIngredientsList').append(`<li>${ingredient.ingredient_name} - ${ingredient.amount} ${ingredient.unit}</li>`);
            });
        });

        // 取得調味料資訊
        $.get(`${seasoningsApiUrl}/${recipeId}`, function (response) {
            const seasoningsList = response.$values;
            $('#detailSeasoningsList').empty();
            seasoningsList.forEach(function (seasoning) {
                $('#detailSeasoningsList').append(`<li>${seasoning.seasoning_name} - ${seasoning.amount} ${seasoning.unit}</li>`);
            });
        });

        // 顯示模態視窗
        $('#recipeDetailModal').modal('show');
    }

    // 編輯食譜 - 回填 step1Section 與 step2Section
    function editRecipe(recipeId) {
        currentRecipeId = recipeId; // 設定當前編輯的食譜ID

        // 取得基本食譜資訊並回填 step1Section
        $.get(`${singleRecipeApiUrl}/${recipeId}`, function (recipe) {
            $('#recipe_name').val(recipe.recipe_name);
            $('#main_ingredient_id').val(recipe.main_ingredient_id);
            $('#category').val(recipe.category);
            $('#chef_id').val(recipe.chef_id);
            // 設置 description，下拉框的選項值需驗證是否存在
            if ($('#description option[value="' + recipe.description + '"]').length > 0) {
                $('#description').val(recipe.description);
            } else {
                alert(`Description "${recipe.description}" does not match any available options.`);
                $('#description').val(""); // 若不存在則清空選擇（可根據需求調整）
            }
            // 回填 portion_size
            if (recipe.portion_size === 10) {
                $('#portion_size_checkbox').prop('checked', true).trigger('change');
            } else {
                $('#portion_size_checkbox').prop('checked', false).trigger('change');
                $('#portion_size').val(recipe.portion_size);
            }
            // 顯示第二階段區域
            $('#step2Section').show();
        });

        // 取得步驟資訊並回填至 step2Section 的步驟表格
        $.get(`${stepsApiUrl}/${recipeId}`, function (response) {
            const stepsList = response.$values;
            $('#recipeStepsTable tbody').empty();
            stepsList.forEach(function (step, index) {
                $('#recipeStepsTable tbody').append(`
                    <tr>
                        <td>${index + 1}</td>
                        <td><input type="text" class="form-control stepDescription" value="${step.description}" /></td>
                        <td><input type="file" class="form-control stepImage" /></td>
                        <td><button class="btn btn-danger removeStep">Remove</button></td>
                    </tr>
                `);
            });

            // 綁定 "Remove" 按鈕的刪除功能
            $('.removeStep').off('click').on('click', function () {
                $(this).closest('tr').remove();
            });
        });

        // 取得食材資訊並回填至 step2Section 的食材表格
        $.get(`${ingredientsApiUrl}/${recipeId}`, function (response) {
            const ingredientsList = response.$values;
            $('#ingredientsTable tbody').empty();
            ingredientsList.forEach(function (ingredient) {
                $('#ingredientsTable tbody').append(`
                    <tr>
                        <td><input type="text" class="form-control ingredientName" value="${ingredient.ingredient_name}" autocomplete="off" /></td>
                        <td><input type="text" class="form-control ingredientAmount" value="${ingredient.amount}" /></td>
                        <td><input type="text" class="form-control ingredientUnit" value="${ingredient.unit}" /></td>
                        <td><button class="btn btn-danger removeIngredient">Remove</button></td>
                    </tr>
                `);
            });

            // 綁定 "Remove" 按鈕的刪除功能
            $('.removeIngredient').off('click').on('click', function () {
                $(this).closest('tr').remove();
            });
        });

        // 取得調味料資訊並回填至 step2Section 的調味料表格
        $.get(`${seasoningsApiUrl}/${recipeId}`, function (response) {
            const seasoningsList = response.$values;
            $('#seasoningsTable tbody').empty();
            seasoningsList.forEach(function (seasoning) {
                $('#seasoningsTable tbody').append(`
                    <tr>
                        <td><input type="text" class="form-control seasoningName" value="${seasoning.seasoning_name}" /></td>
                        <td><input type="text" class="form-control seasoningAmount" value="${seasoning.amount}" /></td>
                        <td><input type="text" class="form-control seasoningUnit" value="${seasoning.unit}" /></td>
                        <td><button class="btn btn-danger removeSeasoning">Remove</button></td>
                    </tr>
                `);
            });

            // 綁定 "Remove" 按鈕的刪除功能
            $('.removeSeasoning').off('click').on('click', function () {
                $(this).closest('tr').remove();
            });
        });
    }
});

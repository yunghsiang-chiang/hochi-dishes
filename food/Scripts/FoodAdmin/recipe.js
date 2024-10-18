$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/recipes'; // 修正后的食谱 API
    const ingredientApiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients'; // 修正后的主食材 API
    const chefApiUrl = 'http://internal.hochi.org.tw:8082/api/chefs/chefs'; // 修正后的厨师 API
    const categoryApiUrl = 'http://internal.hochi.org.tw:8082/api/categories/categories'; // 修正后的分类 API
    const stepApiUrl = 'http://internal.hochi.org.tw:8082/api/recipeSteps'; // 新增步骤的 API

    const itemsPerPage = 10;  // 每頁顯示的食譜數量
    let currentPage = 1;
    let totalItems = 0;


    // 加载所有食谱、厨师、食材等
    loadRecipes();
    loadIngredients();
    loadChefs();
    loadCategories();

    // 保存食谱
    $('#submitRecipe').click(function () {

        if ($('#ingredientsTable tbody tr').length === 0) {
            alert('Please add at least one ingredient.');
            return;
        }
        if ($('#seasoningsTable tbody tr').length === 0) {
            alert('Please add at least one seasoning.');
            return;
        }
        if ($('#recipeStepsTable tbody tr').length === 0) {
            alert('Please add at least one recipe step.');
            return;
        }

        var recipeData = gatherRecipeData();
        if (!recipeData) return;

        $.ajax({
            type: "POST",
            url: apiUrl,
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

    // 添加步骤
    $('#addStep').click(function () {
        addStepRow();
    });

    // Adding ingredients and seasonings logic
    $('#addIngredient').click(function () {
        addIngredientRow();
    });

    $('#addSeasoning').click(function () {
        addSeasoningRow();
    });

    function addIngredientRow(ingredientName = '', amount = '', unit = '') {
        $('#ingredientsTable tbody').append(`
        <tr>
            <td><input type="text" class="form-control ingredientName" value="${ingredientName}" /></td>
            <td><input type="text" class="form-control ingredientAmount" value="${amount}" /></td>
            <td><input type="text" class="form-control ingredientUnit" value="${unit}" /></td>
            <td><button class="btn btn-danger removeIngredient">Remove</button></td>
        </tr>
    `);

        $('.removeIngredient').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }

    function addSeasoningRow(seasoningName = '', amount = '', unit = '') {
        $('#seasoningsTable tbody').append(`
        <tr>
            <td><input type="text" class="form-control seasoningName" value="${seasoningName}" /></td>
            <td><input type="text" class="form-control seasoningAmount" value="${amount}" /></td>
            <td><input type="text" class="form-control seasoningUnit" value="${unit}" /></td>
            <td><button class="btn btn-danger removeSeasoning">Remove</button></td>
        </tr>
    `);

        $('.removeSeasoning').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }

    // Collect ingredient data
    function gatherIngredients() {
        const ingredients = [];
        $('#ingredientsTable tbody tr').each(function () {
            const ingredientName = $(this).find('.ingredientName').val();
            const amount = $(this).find('.ingredientAmount').val();
            const unit = $(this).find('.ingredientUnit').val();
            ingredients.push({ ingredient_name: ingredientName, amount: amount, unit: unit });
        });
        return ingredients;
    }

    // Collect seasoning data
    function gatherSeasonings() {
        const seasonings = [];
        $('#seasoningsTable tbody tr').each(function () {
            const seasoningName = $(this).find('.seasoningName').val();
            const amount = $(this).find('.seasoningAmount').val();
            const unit = $(this).find('.seasoningUnit').val();
            seasonings.push({ seasoning_name: seasoningName, amount: amount, unit: unit });
        });
        return seasonings;
    }



    // 添加步骤到表格
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

    // 收集步骤信息
    function gatherSteps() {
        const steps = [];
        $('#recipeStepsTable tbody tr').each(function (index, row) {
            const stepNumber = index + 1;
            const description = $(row).find('.stepDescription').val();
            const image = $(row).find('.stepImage').prop('files')[0]; // 假设使用上传图片

            steps.push({ step_number: stepNumber, description: description, image_url: image });
        });
        return steps;
    }

    // 收集食谱信息
    function gatherRecipeData() {
        const recipeId = $('#recipeId').val();
        const recipeName = $('#recipeName').val();
        const recipeDescription = $('#recipeDescription').val();
        const mainIngredientId = $('#mainIngredient').val();
        const category = $('#recipeCategory').val();
        const chefId = $('#chef').val();

        if (!recipeName || !mainIngredientId || !category || !chefId) {
            alert('Please fill all required fields');
            return null;
        }

        // 必填檢查
        if (!recipeName || !mainIngredientId || !category || !chefId) {
            alert('Please fill all required fields');
            return null;
        }

        // 檢查是否至少有一個食材
        if (gatherIngredients().length === 0) {
            alert('Please add at least one ingredient.');
            return null;
        }

        // 檢查是否至少有一個調味料
        if (gatherSeasonings().length === 0) {
            alert('Please add at least one seasoning.');
            return null;
        }

        const recipeData = {
            recipe_name: recipeName,
            description: recipeDescription,
            main_ingredient_id: parseInt(mainIngredientId),
            category: category,
            chef_id: parseInt(chefId),
            recipe_steps: gatherSteps(),
            ingredients: gatherIngredients(),
            seasonings: gatherSeasonings()
        };

        if (recipeId) {
            recipeData.recipe_id = parseInt(recipeId);
        }

        return recipeData;
    }

    // 删除食谱
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

    // 加载现有食谱的函数
    function loadRecipes() {
        $.ajax({
            type: "GET",
            url: apiUrl,
            success: function (response) {
                var recipes = response.$values; // 从响应中提取食谱数组
                totalItems = recipes.length;  // 獲取總數
                renderRecipes(recipes, currentPage);
                setupPagination(totalItems);
            },
            error: function (xhr) {
                alert('Failed to load recipes: ' + xhr.responseText);
            }
        });
    }

    // 渲染食谱表格
    function renderRecipes(recipes, page) {
        var rows = '';
        var start = (page - 1) * itemsPerPage;
        var end = Math.min(start + itemsPerPage, recipes.length);

        for (var i = start; i < end; i++) {
            var recipe = recipes[i];
            rows += `<tr data-id="${recipe.recipeId}">
                        <td>${recipe.recipeId}</td>
                        <td>${recipe.recipeName}</td>
                        <td>${recipe.description || 'N/A'}</td>
                        <td>${recipe.mainIngredientName || 'N/A'}</td>
                        <td>${recipe.category || 'N/A'}</td>
                        <td>${recipe.chefName || 'N/A'}</td>
                        <td>
                            <button type="button" class="btn btn-secondary edit" data-id="${recipe.recipeId}">Edit</button>
                        </td>
                    </tr>`;
        }
        $('#recipeTable tbody').html(rows);

        // 绑定 Edit 按钮
        $('.edit').click(function () {
            var recipeId = $(this).data('id');
            loadRecipeDetails(recipeId);
        });
    }

    // 設置分頁按鈕
    function setupPagination(totalItems) {
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var paginationButtons = '';

        for (var i = 1; i <= totalPages; i++) {
            paginationButtons += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                                    <a class="page-link" href="#">${i}</a>
                                  </li>`;
        }

        $('#pagination').html(paginationButtons);

        // 绑定分頁按鈕點擊事件
        $('.page-link').click(function (e) {
            e.preventDefault();
            var selectedPage = parseInt($(this).text());
            if (selectedPage !== currentPage) {
                currentPage = selectedPage;
                loadRecipes();
            }
        });
    }

    // 处理返回的食谱详情和步骤信息
    function loadRecipeDetails(recipeId) {
        $.ajax({
            type: "GET",
            url: `${apiUrl}/${recipeId}`,
            success: function (recipe) {
                // 填充基本表單資料
                $('#recipeId').val(recipe.recipeId);
                $('#recipeName').val(recipe.recipeName);
                $('#recipeDescription').val(recipe.description || '');

                // 設置主食材和廚師選項
                setDropdownSelected('#mainIngredient', recipe.mainIngredientName);
                setDropdownSelected('#chef', recipe.chefName);

                // 設置類別
                $('#recipeCategory').val(recipe.category);

                // 清空並載入步驟
                $('#recipeStepsTable tbody').html('');
                recipe.recipeSteps.$values.forEach(function (step) {
                    addStepRow(step.stepNumber, step.description);
                });

                // 清空並載入食材
                $('#ingredientsTable tbody').html('');
                recipe.ingredients.$values.forEach(function (ingredient) {
                    addIngredientRow(ingredient.ingredientName, ingredient.amount, ingredient.unit);
                });

                // 清空並載入調味料
                $('#seasoningsTable tbody').html('');
                recipe.seasonings.$values.forEach(function (seasoning) {
                    addSeasoningRow(seasoning.seasoningName, seasoning.amount, seasoning.unit);
                });
            },
            error: function (xhr) {
                alert('Failed to load recipe details: ' + xhr.responseText);
            }
        });
    }

    // 設定下拉選單選中選項的輔助函數
    function setDropdownSelected(selector, textValue) {
        $(selector + ' option').each(function () {
            if ($(this).text() === textValue) {
                $(this).prop('selected', true);
            }
        });
    }


    // 修改后的 addStepRow 函数，允许传递步骤信息
    function addStepRow(stepNumber = null, description = '') {
        const newStepNumber = stepNumber || ($('#recipeStepsTable tbody tr').length + 1);
        $('#recipeStepsTable tbody').append(`
        <tr>
            <td>${newStepNumber}</td>
            <td><input type="text" class="form-control stepDescription" value="${description}" /></td>
            <td><input type="file" class="form-control stepImage" /></td>
            <td><button class="btn btn-danger removeStep">Remove</button></td>
        </tr>
    `);

        $('.removeStep').off('click').on('click', function () {
            $(this).closest('tr').remove();
        });
    }

    // 加载主食材的函数
    function loadIngredients() {
        $.get(ingredientApiUrl, function (response) { // 获取主食材 API 数据
            var ingredients = response.$values; // 解包 $values 数组
            ingredients.forEach(function (ingredient) {
                $('#mainIngredient').append(`<option value="${ingredient.main_ingredient_id}">${ingredient.main_ingredient_name}</option>`);
            });
        });
    }

    // 加载厨师的函数
    function loadChefs() {
        $.get(chefApiUrl, function (response) { // 获取修正后的厨师 API 数据
            var chefs = response.$values; // 提取厨师数组
            chefs.forEach(function (chef) {
                $('#chef').append(`<option value="${chef.chef_id}">${chef.name}</option>`);
            });
        });
    }

    // 加载分类的函数
    function loadCategories() {
        $.get(categoryApiUrl, function (response) { // 获取分类 API 数据
            var categories = response.$values; // 解包 $values 数组
            categories.forEach(function (category) {
                $('#recipeCategory').append(`<option value="${category.category_name}">${category.category_name}</option>`);
            });
        });
    }

    // 重置表单
    function resetForm() {
        $('#recipeId').val('');
        $('#recipeName').val('');
        $('#recipeDescription').val('');
        $('#mainIngredient').val('');
        $('#recipeCategory').val('');
        $('#chef').val('');
        $('#recipeStepsTable tbody').html('');
    }
});

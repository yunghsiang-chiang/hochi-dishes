$(document).ready(async function () {
    const recipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/all';
    const categoriesApiUrl = 'http://internal.hochi.org.tw:8082/api/Categories/categories';
    const recipeDetailApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes';
    const mainIngredientsApiUrl = 'http://internal.hochi.org.tw:8082/api/MainIngredients';
    const pendingActivitiesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/pending-recipes';
    const submitOrderApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meal-recipes';


    let mainIngredients = [];
    let categories = [];
    let recipes = [];
    let orderList = []; // 儲存點菜清單
    let currentUnit = 'grams'; // 預設單位

    // 初始化並載入主要資料
    await loadMainIngredients();
    await loadCategories();
    await loadRecipes();
    displayMainIngredientsByCategory(); // 顯示主食材的分類
    // 呼叫 loadPendingActivities 以載入活動清單
    await loadPendingActivities();

    // 使用 async/await 改寫載入資料的函數
    async function loadMainIngredients() {
        try {
            const response = await $.get(mainIngredientsApiUrl);
            mainIngredients = response.$values;
        } catch (error) {
            console.error('Failed to load main ingredients:', error);
        }
    }

    async function loadCategories() {
        try {
            const response = await $.get(categoriesApiUrl);
            categories = response.$values;
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }

    async function loadRecipes() {
        try {
            const response = await $.get(recipesApiUrl);
            recipes = response.$values;
        } catch (error) {
            console.error('Failed to load recipes:', error);
        }
    }

    // 載入未關聯活動清單
    async function loadPendingActivities() {
        try {
            const response = await $.get(pendingActivitiesApiUrl);
            const activities = response.$values;
            $('#activitySelector').empty().append('<option value="">請選擇活動</option>');
            activities.forEach(activity => {
                const optionText = `${activity.activity_name} - ${activity.activity_date.split('T')[0]} - ${activity.meal_type}`;
                $('#activitySelector').append(`<option value="${activity.activity_meal_id}">${optionText}</option>`);
            });
        } catch (error) {
            console.error('Failed to load pending activities:', error);
        }
    }

    // 單位換算與中文名稱
    const unitConversion = {
        grams: { factor: 1, name: '克' },
        kilograms: { factor: 0.001, name: '公斤' },
        pounds: { factor: 0.00220462, name: '磅' },
        ounces: { factor: 0.035274, name: '盎司' },
        tael: { factor: 0.0267, name: '兩' },
        catty: { factor: 0.00167, name: '台斤' }
    };

    //單位換算選擇
    $('#unitSelector').change(function () {
        currentUnit = $(this).val();
        updateIngredientDisplay(); // 更新食材顯示
    });

    // 根據分類顯示主食材清單
    function displayMainIngredientsByCategory() {
        const categorizedIngredients = {};

        // 建立分類映射
        recipes.forEach(recipe => {
            const category = recipe.description; // 使用食譜的分類描述
            const ingredient = mainIngredients.find(i => i.main_ingredient_id === recipe.main_ingredient_id);

            if (ingredient) {
                if (!categorizedIngredients[category]) {
                    categorizedIngredients[category] = [];
                }
                if (!categorizedIngredients[category].some(i => i.main_ingredient_id === ingredient.main_ingredient_id)) {
                    categorizedIngredients[category].push(ingredient);
                }
            }
        });

        // 在對應的分類區域顯示主食材
        for (const category in categorizedIngredients) {
            const section = getCategorySection(category);
            if (section) {
                categorizedIngredients[category].forEach(ingredient => {
                    section.append(`
                        <div class="col-md-4">
                            <div class="card mb-4 ingredient-item" data-id="${ingredient.main_ingredient_id}" data-category="${category}">
                                <div class="card-header bg-primary text-white">
                                    <h5>${ingredient.main_ingredient_name}</h5>
                                </div>
                            </div>
                        </div>
                    `);
                });
            }
        }

        // 綁定主食材的點擊事件顯示相關食譜
        $('.ingredient-item').on('click', function () {
            const ingredientId = $(this).data('id');
            const category = $(this).data('category');
            displayRecipesByIngredient(ingredientId, category); // 傳遞 category 以便進行篩選
        });
    }

    // 根據主食材ID顯示相關食譜
    function displayRecipesByIngredient(ingredientId, category) {
        // 根據主食材 ID 和分類 description 篩選食譜
        const filteredRecipes = recipes.filter(recipe =>
            recipe.main_ingredient_id === ingredientId && recipe.description === category // 確保 description 和分類相符
        );

        $('#recipeListItems').empty();

        // 顯示符合條件的食譜
        filteredRecipes.forEach(recipe => {
            $('#recipeListItems').append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${recipe.recipe_name}
                    <div>
                        <button type="button" class="btn btn-info btn-sm viewRecipeDetail" data-id="${recipe.recipe_id}">🗒️ View Details</button>
                        <button type="button" class="btn btn-success btn-sm addToOrder" data-id="${recipe.recipe_id}" data-name="${recipe.recipe_name}" data-category="${recipe.description}">加入點菜</button>
                    </div>
                </li>
            `);
        });

        const recipeListModal = new bootstrap.Modal(document.getElementById('recipeListModal'));

        recipeListModal.show();
    }

    // 取得分類區域的對應容器
    function getCategorySection(description) {
        switch (description) {
            case '主食': return $('#staple-section');
            case '冷盤': return $('#cold-dish-section');
            case '熱炒': return $('#stir-fry-section');
            case '主菜': return $('#main-dish-section');
            case '炸類': return $('#fried-section');
            case '時蔬': return $('#vegetables-section');
            case '麵點': return $('#noodle-section');
            case '湯品': return $('#soup-section');
            case '甜湯': return $('#dessert-soup-section');
            default: return null;
        }
    }

    // 載入特定食譜詳細資訊的函數
    async function loadRecipeDetails(recipeId) {
        try {
            const recipe = await $.get(`${recipeDetailApiUrl}/${recipeId}`);
            $('#detailRecipeName').text(recipe.recipe_name);
            $('#detailCategory').text(recipe.category);
            $('#detailChef').text(recipe.chef_id);
            $('#detailDescription').text(recipe.description);

            // 載入並顯示食譜的步驟
            const stepsResponse = await $.get(`${recipeDetailApiUrl}/steps/${recipeId}`);
            $('#detailStepsList').empty();
            stepsResponse.$values.forEach(step => {
                $('#detailStepsList').append(`<li>${step.step_number}. ${step.description}</li>`);
            });

            // 載入並顯示食譜的食材
            const ingredientsResponse = await $.get(`${recipeDetailApiUrl}/ingredients/${recipeId}`);
            $('#detailIngredientsList').empty();
            $('#detailIngredientsList').data('ingredients', ingredientsResponse.$values);
            updateIngredientDisplay();
            ingredientsResponse.$values.forEach(ingredient => {
                $('#detailIngredientsList').append(`<li>${ingredient.ingredient_name} - ${ingredient.amount} ${ingredient.unit}</li>`);
            });

            // 載入並顯示食譜的調味料
            const seasoningsResponse = await $.get(`${recipeDetailApiUrl}/seasonings/${recipeId}`);
            $('#detailSeasoningsList').empty();
            seasoningsResponse.$values.forEach(seasoning => {
                $('#detailSeasoningsList').append(`<li>${seasoning.seasoning_name} - ${seasoning.amount} ${seasoning.unit}</li>`);
            });

            // 顯示食譜詳細資訊的模態視窗
            const recipeDetailModal = new bootstrap.Modal(document.getElementById('recipeDetailModal'));
            recipeDetailModal.show();
        } catch (error) {
            console.error('Failed to load recipe details:', error);
        }
    }
    //更新食材顯示
    function updateIngredientDisplay() {
        $('#detailIngredientsList').empty();
        const ingredients = $('#detailIngredientsList').data('ingredients') || [];

        ingredients.forEach(ingredient => {
            const convertedAmount = (ingredient.amount * unitConversion[currentUnit].factor).toFixed(2);
            $('#detailIngredientsList').append(`<li>${ingredient.ingredient_name} - ${convertedAmount} ${unitConversion[currentUnit].name}</li>`);
        });
    }

    // 更新點菜清單顯示，新增「取消」按鈕
    function updateOrderListDisplay() {
        const $orderList = $('#orderList');
        $orderList.empty();

        if (orderList.length === 0) {
            $orderList.append('<li class="list-group-item">目前沒有點菜</li>');
        } else {
            orderList.forEach(order => {
                $orderList.append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${order.recipeName} - <strong>${order.recipeCategory}</strong>
                        <button type="button" class="btn btn-danger btn-sm removeFromOrder" data-id="${order.recipeId}">取消</button>
                    </li>
                `);
            });
        }
    }

    // 提交點菜清單到所選活動
    $('#submitOrder').click(async function () {
        const selectedActivityId = $('#activitySelector').val();

        if (!selectedActivityId || orderList.length === 0) {
            alert('請選擇活動並至少加入一筆食譜');
            return;
        }

        // 構建提交資料的結構
        const payload = orderList.map(order => ({
            activity_meal_id: parseInt(selectedActivityId),
            recipe_id: order.recipeId,
            recipe_category: order.recipeCategory
        }));

        try {
            await $.ajax({
                url: submitOrderApiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload),
                success: function () {
                    alert('點菜清單已成功提交！');
                    orderList = [];
                    updateOrderListDisplay();
                    loadPendingActivities(); // 重新載入活動清單以更新
                },
                error: function (xhr) {
                    alert('提交點菜清單失敗: ' + xhr.responseText);
                }
            });
        } catch (error) {
            console.error('Failed to submit order:', error);
        }
    });

    // 點擊事件：顯示特定食譜的詳細資訊
    $('#recipeListItems').on('click', '.viewRecipeDetail', function () {
        const recipeId = $(this).data('id');
        loadRecipeDetails(recipeId);
    });

    // 點擊事件：加入點菜清單
    $('#recipeListItems').on('click', '.addToOrder', function () {
        const recipeId = $(this).data('id');
        const recipeName = $(this).data('name');
        const recipeCategory = $(this).data('category');

        if (!orderList.some(order => order.recipeId === recipeId)) {
            orderList.push({ recipeId, recipeName, recipeCategory });
            updateOrderListDisplay();
        }
    });

    // 點擊事件：從點菜清單中移除食譜
    $('#orderList').on('click', '.removeFromOrder', function () {
        const recipeId = $(this).data('id');
        orderList = orderList.filter(order => order.recipeId !== recipeId); // 移除指定食譜
        updateOrderListDisplay(); // 更新顯示
    });
});

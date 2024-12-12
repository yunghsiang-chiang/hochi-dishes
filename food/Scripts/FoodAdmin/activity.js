$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals';
    const activityMealsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals';
    const activityMealRecipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meal-recipes';
    const recipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/all';

    // 单位换算与中文名称
    const unitConversion = {
        grams: { factor: 1, name: '克' },
        kilograms: { factor: 1000, name: '公斤' },
        pounds: { factor: 453.592, name: '磅' },
        ounces: { factor: 28.3495, name: '盎司' },
        tael: { factor: 37.5, name: '兩' }, // 每兩等於 37.5 克
        catty: { factor: 600, name: '台斤' } // 每台斤等於 600 克
    };

    // 當按下生成餐點選擇按鈕時
    $('#generateMeals').click(function () {
        const activityName = $('#activity_name').val();
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();

        if (!activityName || !startDate || !endDate) {
            alert('請填寫活動名稱、起始日期和結束日期。');
            return;
        }

        // 清空並顯示餐點選擇區域
        $('#mealSelectionContainer').empty();
        $('#mealSelectionArea').show();
        $('#saveActivities').show();

        // 生成日期區間
        const start = new Date(startDate);
        const end = new Date(endDate);
        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().split('T')[0];
            $('#mealSelectionContainer').append(`
                <div class="mb-2">
                    <strong>${formattedDate}</strong>
                    <div class="btn-group ms-2">
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="早餐">早餐</button>
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="午餐">午餐</button>
                        <button type="button" class="btn btn-outline-primary meal-btn" data-date="${formattedDate}" data-meal="晚餐">晚餐</button>
                    </div>
                </div>
            `);
        }

        // 切換按鈕亮/灰色狀態
        $('.meal-btn').click(function () {
            $(this).toggleClass('btn-primary');
            $(this).toggleClass('btn-outline-primary');
        });
    });

    // 收集活動資料並上傳至API
    $('#saveActivities').click(function () {
        const activityName = $('#activity_name').val();
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();
        const activities = [];

        // 遍歷所有亮色按鈕，收集餐點資料
        $('.meal-btn.btn-primary').each(function () {
            const activityDate = $(this).data('date');
            const mealType = $(this).data('meal');

            activities.push({
                activity_name: activityName,
                start_date: startDate,
                end_date: endDate,
                activity_date: activityDate,
                meal_type: mealType
            });
        });

        if (activities.length === 0) {
            alert('請至少選擇一個餐別。');
            return;
        }

        console.log(activities);

        // 發送POST請求
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(activities),
            success: function () {
                alert('活動已成功儲存！');
                resetForm();
            },
            error: function (xhr) {
                alert('儲存活動失敗: ' + xhr.responseText);
            }
        });
    });

    // 將任意單位轉換為目標單位（如 tael 或 catty），不支持的單位返回 null
    function convertUnit(amount, fromUnit, toUnit) {
        const fromFactor = unitConversion[fromUnit]?.factor;
        const toFactor = unitConversion[toUnit]?.factor;

        // 如果無法轉換，返回 null
        if (!fromFactor || !toFactor) return null;

        // 如果單位相同，直接返回原始值
        if (fromUnit === toUnit) return amount;

        // 轉換單位
        return (amount * fromFactor) / toFactor;
    }

    // 重置表單
    function resetForm() {
        $('#activity_name').val('');
        $('#start_date').val('');
        $('#end_date').val('');
        $('#mealSelectionContainer').empty();
        $('#mealSelectionArea').hide();
        $('#saveActivities').hide();
    }

    // 載入活動清單
    async function loadActivityMeals() {
        try {
            const response = await $.get(activityMealsApiUrl);
            const activities = response.$values;

            // 清空活動清單區域
            $('#activityListContainer').empty();

            // 以 activity_name、start_date 和 end_date 分組
            const groupedActivities = activities.reduce((acc, activity) => {
                const key = `${activity.activity_name}_${activity.start_date}_${activity.end_date}`;
                acc[key] = acc[key] || [];
                acc[key].push(activity);
                return acc;
            }, {});

            let index = 0; // 初始化索引计数器

            // 生成活動清單
            for (const groupKey in groupedActivities) {
                const activityGroup = groupedActivities[groupKey];
                const sanitizedGroupKey = `${groupKey.replace(/[^a-zA-Z0-9_-]/g, '_')}_${index}`;
                const { activity_name, start_date, end_date } = activityGroup[0];
                const formattedStartDate = start_date.split('T')[0];
                const formattedEndDate = end_date.split('T')[0];

                // 创建活动清单区域
                $('#activityListContainer').append(`
        <div class="list-group-item">
            <h5>${activity_name}</h5>
            <p>${formattedStartDate} 至 ${formattedEndDate}</p>
            <div id="${sanitizedGroupKey}-buttons" class="d-flex flex-wrap"></div>
        </div>
    `);

                // 检查容器是否存在
                const container = document.getElementById(`${sanitizedGroupKey}-buttons`);
                if (!container) {
                    console.error(`Container not found: ${sanitizedGroupKey}-buttons`);
                    continue; // 跳过当前循环
                }

                // 添加对应的活动按钮
                const fragment = document.createDocumentFragment();
                activityGroup.forEach(activity => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-outline-primary me-2 mt-2 activity-btn';
                    button.dataset.id = activity.activity_meal_id;
                    button.dataset.date = activity.activity_date.split('T')[0];
                    button.dataset.meal = activity.meal_type;
                    button.textContent = `${activity.activity_date.split('T')[0]} ${activity.meal_type}`;
                    fragment.appendChild(button);
                });
                container.appendChild(fragment);

                // 添加 "显示食材统计" 按钮
                $(`#${sanitizedGroupKey}-buttons`).append(`
    <button type="button" class="btn btn-info mt-2 show-ingredients-btn" data-group="${groupKey}">
        显示食材统计
    </button>
`);


                index++; // 增加索引
            }


            // 綁定按鈕點擊事件 在清空按鈕之前，先移除現有事件
            $('.activity-btn').off('click').on('click', function () {
                const activityMealId = $(this).data('id');
                loadActivityMealRecipes(activityMealId);
            });

            // 绑定 "显示食材统计" 按钮的事件
            $('.show-ingredients-btn').off('click').on('click', async function () {
                const groupKey = $(this).data('group'); // 直接使用原始的 groupKey
                const activityGroup = groupedActivities[groupKey]; // 根据 groupKey 获取活动组

                if (!activityGroup || activityGroup.length === 0) {
                    console.error(`groupedActivities[${groupKey}] is undefined or empty.`);
                    alert('無法取得該活動區間資料，請檢查後再試。');
                    return;
                }

                // 收集所有活动的 activity_meal_id
                const activityMealIds = activityGroup.map(activity => activity.activity_meal_id).join('%2C');

                if (!activityMealIds) {
                    alert('沒有可用的活動編號。');
                    return;
                }

                try {
                    // 调用两个 API 获取数据
                    const recipeCountUrl = `http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/recipe-count?activityMealIds=${activityMealIds}`;
                    const recipeIngredientsUrl = `http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/recipe-ingredients?activityMealIds=${activityMealIds}`;

                    const [recipeCountResponse, recipeIngredientsResponse] = await Promise.all([
                        $.get(recipeCountUrl),
                        $.get(recipeIngredientsUrl)
                    ]);

                    const recipeCounts = recipeCountResponse.$values;
                    const recipeIngredients = recipeIngredientsResponse.$values;

                    // 计算总食材数量
                    const ingredientTotals = {};
                    const targetUnit = 'tael'; // 目标单位，默认是 "兩"

                    recipeIngredients.forEach(ingredient => {
                        const recipeQty = recipeCounts.find(r => r.recipeId === ingredient.recipeId)?.recipeQty || 1;

                        // 嘗試轉換單位
                        const convertedAmount = convertUnit(ingredient.amount * recipeQty, ingredient.unit, targetUnit);

                        if (convertedAmount !== null) {
                            // 單位可以轉換的情況
                            if (!ingredientTotals[ingredient.ingredientName]) {
                                ingredientTotals[ingredient.ingredientName] = {
                                    ingredientName: ingredient.ingredientName,
                                    totalAmount: 0,
                                    unit: targetUnit // 統一單位
                                };
                            }
                            ingredientTotals[ingredient.ingredientName].totalAmount += convertedAmount;
                        } else {
                            // 單位無法轉換的情況
                            const key = `${ingredient.ingredientName}-${ingredient.unit}`;
                            if (!ingredientTotals[key]) {
                                ingredientTotals[key] = {
                                    ingredientName: ingredient.ingredientName,
                                    totalAmount: 0,
                                    unit: ingredient.unit // 原始單位
                                };
                            }
                            ingredientTotals[key].totalAmount += ingredient.amount * recipeQty; // 保留原始單位數值
                        }
                    });

                    // 排序和显示结果
                    const sortedIngredients = Object.values(ingredientTotals).sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));

                    $('#recipeList').empty();
                    sortedIngredients.forEach(item => {
                        $('#recipeList').append(`
                            <li class="list-group-item">
                                <strong>${item.ingredientName}</strong>: ${item.totalAmount.toFixed(2)} ${item.unit}
                            </li>
                        `);
                    });

                    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
                    recipeModal.show();
                } catch (error) {
                    console.error('Failed to calculate ingredients:', error);
                    alert('無法顯示食材統計，請稍後再試。');
                }
            });

            console.log('Generated Group Keys:', Object.keys(groupedActivities));

        } catch (error) {
            console.error('Failed to load activity meals:', error);
            alert('載入活動清單失敗，請稍後再試。');
        }

    }

    // 點擊 activity_date 和 meal_type 按鈕後，通過 API 顯示對應的食譜清單，並根據 recipe_id 對應 recipe_name
    async function loadActivityMealRecipes(activityMealId) {
        try {
            const [recipesResponse, response] = await Promise.all([
                $.get(recipesApiUrl),
                $.get(`${activityMealRecipesApiUrl}/${activityMealId}`)
            ]);

            const allRecipes = recipesResponse.$values;
            const mealRecipes = response.$values;

            // 清空並顯示對應食譜清單
            $('#recipeList').empty();
            mealRecipes.forEach(mealRecipe => {
                const recipe = allRecipes.find(r => r.recipe_id === mealRecipe.recipe_id);
                if (recipe) {
                    $('#recipeList').append(`
                        <li class="list-group-item">
                            <strong>${recipe.recipe_name}</strong> - ${mealRecipe.recipe_category}
                        </li>
                    `);
                }
            });

            // 顯示模態視窗
            const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
            recipeModal.show();
        } catch (error) {
            console.error('Failed to load activity meal recipes:', error);
            alert('載入食譜清單失敗，請稍後再試。');
        }
    }

    // 當按下查詢活動按鈕時
    $('#queryActivities').click(async function () {
        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();

        if (!startDate || !endDate) {
            alert('請填寫起始日期和結束日期。');
            return;
        }

        const queryUrl = `${activityMealsApiUrl}/date-range?startDate=${startDate}&endDate=${endDate}`;

        try {
            const response = await $.get(queryUrl);
            const activities = response.$values;

            if (activities.length === 0) {
                alert('查無符合條件的活動。');
                $('#activityListContainer').empty();
                return;
            }

            // 清空活動清單區域
            $('#activityListContainer').empty();

            // 以 activity_name、start_date 和 end_date 分組
            const groupedActivities = activities.reduce((acc, activity) => {
                const key = `${activity.activity_name}_${activity.start_date}_${activity.end_date}`;
                acc[key] = acc[key] || [];
                acc[key].push(activity);
                return acc;
            }, {});

            let index = 0; // 初始化索引計數器

            // 生成活動清單
            for (const groupKey in groupedActivities) {
                const activityGroup = groupedActivities[groupKey];
                const sanitizedGroupKey = `${groupKey.replace(/[^a-zA-Z0-9_-]/g, '_')}_${index}`;
                const { activity_name, start_date, end_date } = activityGroup[0];
                const formattedStartDate = start_date.split('T')[0];
                const formattedEndDate = end_date.split('T')[0];

                // 创建活动清单区域
                $('#activityListContainer').append(`
                <div class="list-group-item">
                    <h5>${activity_name}</h5>
                    <p>${formattedStartDate} 至 ${formattedEndDate}</p>
                    <div id="${sanitizedGroupKey}-buttons" class="d-flex flex-wrap"></div>
                </div>
            `);

                // 检查容器是否存在
                const container = document.getElementById(`${sanitizedGroupKey}-buttons`);
                if (!container) {
                    console.error(`Container not found: ${sanitizedGroupKey}-buttons`);
                    continue; // 跳过当前循环
                }

                // 添加对应的活动按钮
                const fragment = document.createDocumentFragment();
                activityGroup.forEach(activity => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'btn btn-outline-primary me-2 mt-2 activity-btn';
                    button.dataset.id = activity.activity_meal_id;
                    button.dataset.date = activity.activity_date.split('T')[0];
                    button.dataset.meal = activity.meal_type;
                    button.textContent = `${activity.activity_date.split('T')[0]} ${activity.meal_type}`;
                    fragment.appendChild(button);
                });
                container.appendChild(fragment);

                // 添加 "显示食材统计" 按钮
                $(`#${sanitizedGroupKey}-buttons`).append(`
                <button type="button" class="btn btn-info mt-2 show-ingredients-btn" data-group="${groupKey}">
                    顯示食材統計
                </button>
            `);

                index++; // 增加索引
            }

            // 綁定按鈕點擊事件 在清空按鈕之前，先移除現有事件
            $('.activity-btn').off('click').on('click', function () {
                const activityMealId = $(this).data('id');
                loadActivityMealRecipes(activityMealId);
            });

            // 綁定 "顯示食材統計" 按鈕的事件
            $('.show-ingredients-btn').off('click').on('click', async function () {
                const groupKey = $(this).data('group');
                const activityGroup = groupedActivities[groupKey];

                if (!activityGroup || activityGroup.length === 0) {
                    console.error(`groupedActivities[${groupKey}] is undefined or empty.`);
                    alert('無法取得該活動區間資料，請檢查後再試。');
                    return;
                }

                // 收集所有活动的 activity_meal_id
                const activityMealIds = activityGroup.map(activity => activity.activity_meal_id).join('%2C');

                if (!activityMealIds) {
                    alert('沒有可用的活動編號。');
                    return;
                }

                try {
                    // 调用两个 API 获取数据
                    const recipeCountUrl = `http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/recipe-count?activityMealIds=${activityMealIds}`;
                    const recipeIngredientsUrl = `http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/recipe-ingredients?activityMealIds=${activityMealIds}`;

                    const [recipeCountResponse, recipeIngredientsResponse] = await Promise.all([
                        $.get(recipeCountUrl),
                        $.get(recipeIngredientsUrl)
                    ]);

                    const recipeCounts = recipeCountResponse.$values;
                    const recipeIngredients = recipeIngredientsResponse.$values;

                    // 计算总食材数量
                    const ingredientTotals = {};

                    recipeIngredients.forEach(ingredient => {
                        const recipeQty = recipeCounts.find(r => r.recipeId === ingredient.recipeId)?.recipeQty || 1;
                        const key = `${ingredient.ingredientName}-${ingredient.unit}`;

                        if (!ingredientTotals[key]) {
                            ingredientTotals[key] = {
                                ingredientName: ingredient.ingredientName,
                                unit: ingredient.unit,
                                totalAmount: 0
                            };
                        }

                        ingredientTotals[key].totalAmount += ingredient.amount * recipeQty;
                    });

                    // 排序和显示结果
                    const sortedIngredients = Object.values(ingredientTotals).sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));

                    $('#recipeList').empty();
                    sortedIngredients.forEach(item => {
                        $('#recipeList').append(`
                        <li class="list-group-item">
                            <strong>${item.ingredientName}</strong>: ${item.totalAmount} ${item.unit}
                        </li>
                    `);
                    });

                    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
                    recipeModal.show();
                } catch (error) {
                    console.error('Failed to calculate ingredients:', error);
                    alert('無法顯示食材統計，請稍後再試。');
                }
            });

        } catch (error) {
            console.error('Failed to query activities:', error);
            alert('查詢活動失敗，請稍後再試。');
        }
    });

    // 呼叫載入活動清單
    loadActivityMeals();

});

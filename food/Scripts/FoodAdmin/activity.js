$(document).ready(function () {
    const apiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals';
    const activityMealsApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meals';
    const activityMealRecipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/activity-meal-recipes';
    const recipesApiUrl = 'http://internal.hochi.org.tw:8082/api/Recipes/all';


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

            // 生成活動清單
            for (const groupKey in groupedActivities) {
                const activityGroup = groupedActivities[groupKey];
                const { activity_name, start_date, end_date } = activityGroup[0];
                const formattedStartDate = start_date.split('T')[0];
                const formattedEndDate = end_date.split('T')[0];

                // 顯示活動名稱和起訖日期
                $('#activityListContainer').append(`
                    <div class="list-group-item">
                        <h5>${activity_name}</h5>
                        <p>${formattedStartDate} 至 ${formattedEndDate}</p>
                        <div id="${groupKey}-buttons" class="d-flex flex-wrap"></div>
                    </div>
                `);

                // 生成對應的按鈕
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
                document.getElementById(`${groupKey}-buttons`).appendChild(fragment);
            }

            // 綁定按鈕點擊事件 在清空按鈕之前，先移除現有事件
            $('.activity-btn').off('click').on('click', function () {
                const activityMealId = $(this).data('id');
                loadActivityMealRecipes(activityMealId);
            });

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


    // 呼叫載入活動清單
    loadActivityMeals();

});

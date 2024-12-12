$(document).ready(function () {
    // 初始化日期選擇器
    $(".datepicker").datepicker({
        dateFormat: "yy-mm-dd" // 設定日期格式為 年-月-日
    });

    let recipesData = []; // 用來儲存 API 返回的詳細食譜資料
    let orderList = []; // 點菜清單

    // 頁面載入後立即執行一次活動清單載入
    loadActivitySelector();

    // 加載詳細食譜資料
    $.get("http://internal.hochi.org.tw:8082/api/Recipes/detailed-recipes", function (data) {
        recipesData = data.$values; // 儲存 API 返回的食譜資料

        // 初始化主食材下拉選單
        const mainIngredients = [...new Set(recipesData.map(r => r.mainIngredientName))];
        const mainIngredientSelect = $("#mainIngredientSelect");
        mainIngredients.forEach(ingredient => {
            mainIngredientSelect.append(`<option value="${ingredient}">${ingredient}</option>`);
        });
    });

    // 當主食材變更時觸發事件
    $("#mainIngredientSelect").on("change", function () {
        const selectedIngredient = $(this).val(); // 獲取選擇的主食材
        const categorySelect = $("#categorySelect");
        const methodSelect = $("#methodSelect");
        const recipeNameSelect = $("#recipeNameSelect");

        // 清空其他選單並重新初始化
        categorySelect.empty().append('<option value="">請選擇類型</option>');
        methodSelect.empty().append('<option value="">請選擇方式</option>');
        recipeNameSelect.empty().append('<option value="">請選擇菜名</option>');

        if (!selectedIngredient) return; // 如果未選擇主食材，則退出

        // 過濾出對應的類型 (category)
        const filteredCategories = [...new Set(recipesData
            .filter(r => r.mainIngredientName === selectedIngredient)
            .map(r => r.category)
        )];

        // 將類型選項加入到下拉選單中
        filteredCategories.forEach(category => {
            categorySelect.append(`<option value="${category}">${category}</option>`);
        });
    });

    // 當類型變更時觸發事件
    $("#categorySelect").on("change", function () {
        const selectedIngredient = $("#mainIngredientSelect").val();// 獲取主食材
        const selectedCategory = $(this).val();// 獲取選擇的類型
        const methodSelect = $("#methodSelect");
        const recipeNameSelect = $("#recipeNameSelect");
        // 清空方式與菜名選單
        methodSelect.empty().append('<option value="">請選擇方式</option>');
        recipeNameSelect.empty().append('<option value="">請選擇菜名</option>');

        if (!selectedIngredient || !selectedCategory) return;// 如果未選擇主食材或類型，則退出

        // 過濾出對應的方式 (description)
        const filteredMethods = [...new Set(recipesData
            .filter(r => r.mainIngredientName === selectedIngredient && r.category === selectedCategory)
            .map(r => r.description)
        )];
        // 將方式選項加入到下拉選單中
        filteredMethods.forEach(method => {
            methodSelect.append(`<option value="${method}">${method}</option>`);
        });
    });

    // 當方式變更時觸發事件
    $("#methodSelect").on("change", function () {
        const selectedIngredient = $("#mainIngredientSelect").val();// 獲取主食材
        const selectedCategory = $("#categorySelect").val();// 獲取類型
        const selectedMethod = $(this).val();// 獲取方式
        const recipeNameSelect = $("#recipeNameSelect");

        recipeNameSelect.empty().append('<option value="">請選擇菜名</option>');// 清空菜名選單

        if (!selectedIngredient || !selectedCategory || !selectedMethod) return;// 如果未選擇完整條件，則退出

        // 過濾出對應的菜名
        const filteredRecipes = recipesData.filter(r =>
            r.mainIngredientName === selectedIngredient &&
            r.category === selectedCategory &&
            r.description === selectedMethod
        );
        // 將菜名選項加入到下拉選單中
        filteredRecipes.forEach(recipe => {
            recipeNameSelect.append(`<option value="${recipe.recipe_id}">${recipe.recipe_name}</option>`);
        });
    });

    // 提交按鈕點擊事件
    $("#searchBtn").click(function () {
        const keyword = $("#keyword").val(); // 獲取關鍵字
        const startDate = $("#startDate").val(); // 獲取開始日期
        const endDate = $("#endDate").val(); // 獲取結束日期

        // 呼叫實際的 API
        $.ajax({
            url: "http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/search",
            method: "GET",
            data: { keyword, startDate, endDate },
            success: function (response) {
                const data = response.$values; // API 回傳格式中提取 $values
                if (data.length > 0) {
                    renderTable(data); // 渲染結果表格
                    $("#resultSection").show();// 顯示結果區域
                } else {
                    alert("未找到相關班會資料！");
                }
            },
            error: function () {
                alert("搜尋失敗，請稍後再試！");
            }
        });
    });

    // 動態渲染結果表格
    function renderTable(data) {
        const tbody = $("#resultTableBody");
        tbody.empty(); // 清空表格內容

        data.forEach((item) => {
            const row = `
                <tr>
                    <td>${item.activity_meal_id}</td>
                    <td>${item.activity_name}</td>
                    <td>${item.start_date.split("T")[0]}</td>
                    <td>${item.end_date.split("T")[0]}</td>
                    <td>${item.activity_date.split("T")[0]}</td>
                    <td>${item.meal_type}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-info viewBtn"
                            data-activity-meal-id="${item.activity_meal_id}">
                            查看
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row); // 將每一列加入表格
        });
    }

    // 查看按鈕點擊事件
    $(document).off("click").on("click", ".viewBtn", function () {
        const activityMealId = $(this).data("activity-meal-id");// 獲取活動 ID
        loadActivityMealDetails(activityMealId);// 加載活動餐點詳細資料
    });

    // 加載活動餐點詳細資訊
    function loadActivityMealDetails(activityMealId) {
        $.ajax({
            url: `http://internal.hochi.org.tw:8082/api/Recipes/activity-meal/${activityMealId}/recipes`,
            method: "GET",
            success: function (response) {
                const recipes = response.$values; // 提取返回的食譜資料
                showDialog(activityMealId, recipes); // 顯示對話框
            },
            error: function () {
                alert("無法加載詳細資訊，請稍後再試！");
            }
        });
    }

    // 顯示對話框
    function showDialog(activityMealId, recipes) {
        $("#dialogItem").text(activityMealId); // 顯示活動 ID

        // 填充食譜清單
        const recipeList = recipes.map(recipe => `
            <li data-recipe-id="${recipe.recipe_id}">
                <strong>${recipe.recipe_name}</strong> (${recipe.mainIngredientName || "無主食材"}) - ${recipe.category}
                <br>
                描述: ${recipe.description || "無描述"}, 份量: ${recipe.portion_size || "未知"}
                <button class="btn btn-danger removeRecipeBtn" data-recipe-id="${recipe.recipe_id}">刪除</button>
            </li>
        `).join("");

        $("#dialogRecipeList").html(recipeList); // 將清單加入到對話框

        // 顯示活動選擇器並載入選項
        loadActivitySelector(() => {
            $("#activitySelectorContainer").show();
            $("#submitOrder").show(); // 顯示提交按鈕
        });

        // 顯示對話框
        $("#dialog").dialog({
            modal: true,
            width: 800,
            buttons: {
                Close: function () {
                    $(this).dialog("close");
                    $("#activitySelectorContainer").hide(); // 關閉時隱藏
                    $("#submitOrder").hide(); // 關閉時隱藏提交按鈕
                }
            }
        });


        // 動態生成新增菜色按鈕
        $("#dialogFooter").html(`
            <button class="btn btn-primary addRecipeBtn">新增菜色</button>
        `);

        $("#dialogFooter").off("click").on("click", ".addRecipeBtn", function () {
            showAddRecipeDialog(activityMealId);// 顯示新增菜色對話框
        });

        

        // 綁定刪除按鈕事件
        $("#dialogRecipeList").on("click", ".removeRecipeBtn", function () {
            $(this).closest("li").remove();
        });
    }

    // 加載活動選擇清單
    function loadActivitySelector(callback) {
        $.get("http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/pending-recipes")
            .done(function (data) {
                const activities = data.$values || []; // 確保資料結構符合

                const activitySelector = $("#activitySelector");

                // 清空並初始化選單
                activitySelector.empty().append('<option value="">請選擇活動</option>');

                if (activities.length === 0) {
                    console.warn("No pending activities found.");
                    alert("目前沒有可選活動！");
                    return;
                }

                // 填充活動清單
                activities.forEach(activity => {
                    const optionText = `${activity.activity_name} (${activity.activity_date.split("T")[0]}) - ${activity.meal_type}`;
                    activitySelector.append(`<option value="${activity.activity_meal_id}">${optionText}</option>`);
                });

                // 如果有回調函數，執行它
                if (callback) callback();
            })
            .fail(function (xhr, status, error) {
                console.error("Failed to load activities:", error);
                alert("無法加載活動清單，請稍後再試！");
            });
    }

    // 顯示「新增菜色」Dialog
    function showAddRecipeDialog(activityMealId) {
        $("#mainIngredientSelect").val("");
        $("#categorySelect").empty().append('<option value="">請選擇類型</option>');
        $("#methodSelect").empty().append('<option value="">請選擇方式</option>');
        $("#recipeNameSelect").empty().append('<option value="">請選擇菜名</option>');

        // 加載活動清單並初始化對話框
        loadActivitySelector(() => {
            $("#addRecipeDialog").dialog({
                title: "新增菜色",
                modal: true,
                width: 500,
                buttons: {
                    "新增": function () {
                        const mainIngredient = $("#mainIngredientSelect").val();
                        const category = $("#categorySelect").val();
                        const method = $("#methodSelect").val();
                        const recipeName = $("#recipeNameSelect").val();

                        if (!mainIngredient || !category || !method || !recipeName ) {
                            alert("請選擇完整的資訊！");
                            return;
                        }

                        // 新增到活動餐點
                        const newRecipe = {
                            recipe_id: recipeName,
                            recipe_name: $("#recipeNameSelect option:selected").text(),
                            mainIngredientName: mainIngredient,
                            category: category,
                            description: method
                        };

                        orderList.push(newRecipe); // 更新點菜清單

                        // 更新活動詳細資訊的清單
                        $("#dialogRecipeList").append(`
                            <li data-recipe-id="${newRecipe.recipe_id}">
                                <strong>${newRecipe.recipe_name}</strong> (${newRecipe.mainIngredientName || "無主食材"}) - ${newRecipe.category}
                                <br>
                                描述: ${newRecipe.description || "無描述"}
                                <button class="btn btn-danger removeRecipeBtn" data-recipe-id="${newRecipe.recipe_id}">刪除</button>
                            </li>
                        `);

                        $(this).dialog("close");
                    },
                    "取消": function () {
                        $(this).dialog("close");
                    }
                }
            });
        });
    }

    // 提交點菜清單到所選活動
    $('#submitOrder').click(async function () {
        // 獲取選擇的活動 ID
        const selectedActivityId = $('#activitySelector').val();

        // 檢查是否有選擇活動
        if (!selectedActivityId) {
            alert('請先選擇活動');
            return;
        }

        // 從 dialogRecipeList 取得所有項目
        const dialogRecipes = $('#dialogRecipeList li');
        if (dialogRecipes.length === 0) {
            alert('點菜清單為空，請至少加入一筆食譜');
            return;
        }

        // 構建提交資料的結構
        const payload = [];
        dialogRecipes.each(function () {
            const recipeId = $(this).data('recipe-id'); // 獲取食譜 ID
            const descriptionText = $(this).find('br').get(0).nextSibling.nodeValue.trim(); // 獲取描述的完整文字
            const recipeCategory = descriptionText.split(',')[0].replace('描述: ', '').trim(); // 解析類型

            payload.push({
                activity_meal_id: parseInt(selectedActivityId, 10),
                recipe_id: recipeId,
                recipe_category: recipeCategory
            });
        });

        console.log('提交資料:', payload); // 調試用，檢查提交的資料結構

        // 發送 POST 請求
        try {
            await $.ajax({
                url: "http://internal.hochi.org.tw:8082/api/Recipes/activity-meal-recipes", // 提交點菜清單的 API URL
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload), // 將資料轉為 JSON 格式
                success: function () {
                    alert('點菜清單已成功提交！');

                    // 清空 dialogRecipeList
                    $('#dialogRecipeList').empty();

                    // 重新載入活動清單
                    loadPendingActivities();

                    // 關閉對話框
                    $("#dialog").dialog("close");
                },
                error: function (xhr) {
                    alert('提交點菜清單失敗: ' + xhr.responseText); // 錯誤提示
                }
            });
        } catch (error) {
            console.error('Failed to submit order:', error); // 錯誤處理
        }
    });

    // 載入待處理的活動清單
    function loadPendingActivities() {
        $.get("http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/pending-recipes")
            .done(function (data) {
                const activities = data.$values || []; // 確保資料結構正確
                const activitySelector = $('#activitySelector');

                // 清空並重新初始化活動選單
                activitySelector.empty().append('<option value="">請選擇活動</option>');

                // 如果沒有待處理活動，顯示提示
                if (activities.length === 0) {
                    console.warn('目前沒有待處理的活動');
                    alert('目前沒有可選活動！');
                    return;
                }

                // 填充活動選單
                activities.forEach(activity => {
                    const optionText = `${activity.activity_name} (${activity.activity_date.split('T')[0]}) - ${activity.meal_type}`;
                    activitySelector.append(`<option value="${activity.activity_meal_id}">${optionText}</option>`);
                });
            })
            .fail(function (xhr, status, error) {
                console.error('無法加載待處理活動:', error);
                alert('無法加載活動清單，請稍後再試！');
            });
    }

});

$(document).ready(function () {
    // 初始化日期選擇器
    $(".datepicker").datepicker({
        dateFormat: "yy-mm-dd"
    });

    // 提交按鈕點擊事件
    $("#searchBtn").click(function () {
        const keyword = $("#keyword").val();
        const startDate = $("#startDate").val();
        const endDate = $("#endDate").val();

        // 呼叫實際的 API
        $.ajax({
            url: "http://internal.hochi.org.tw:8082/api/Recipes/activity-meals/search",
            method: "GET",
            data: { keyword, startDate, endDate },
            success: function (response) {
                const data = response.$values; // API 回傳格式中提取 $values
                if (data.length > 0) {
                    renderTable(data);
                    $("#resultSection").show();
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
        tbody.empty();

        data.forEach((item, index) => {
            // 將 activity_meal_id 填充到 "項目" 欄位
            const row = `
                <tr>
                    <td>${item.activity_meal_id}</td> <!-- 填充項目欄位 -->
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
            tbody.append(row);
        });

        // 啟用拖放排序
        $("#resultTableBody").sortable();

    }

    // 使用事件委派處理動態生成的「查看」按鈕
    $(document).on("click", ".viewBtn", function () {
        const activityMealId = $(this).data("activity-meal-id");
        loadActivityMealDetails(activityMealId);
    });

    // 加載活動餐點詳細資訊 
    function loadActivityMealDetails(activityMealId) {
        $.ajax({
            url: `http://internal.hochi.org.tw:8082/api/Recipes/activity-meal/${activityMealId}/recipes`,
            method: "GET",
            success: function (response) {
                const recipes = response.$values; // 提取返回的食譜資料
                showDialog(activityMealId, recipes);
            },
            error: function () {
                alert("無法加載詳細資訊，請稍後再試！");
            }
        });
    }

    // 顯示 Dialog
    function showDialog(activityMealId, recipes) {
        // 填充基本資訊
        $("#dialogItem").text(activityMealId);

        // 填充食譜清單，新增刪除按鈕
        const recipeList = recipes.map(recipe => `
        <li data-recipe-id="${recipe.recipe_id}">
            <strong>${recipe.recipe_name}</strong> (${recipe.mainIngredientName || "無主食材"}) - ${recipe.category}
            <br>
            描述: ${recipe.description || "無描述"}, 份量: ${recipe.portion_size || "未知"}
            <button class="btn btn-danger removeRecipeBtn">刪除</button>
        </li>
    `).join("");

        $("#dialogRecipeList").html(recipeList);

        // 綁定刪除按鈕事件
        $("#dialogRecipeList").on("click", ".removeRecipeBtn", function () {
            $(this).closest("li").remove();
        });

        // 新增按鈕
        $("#dialogFooter").html(`
        <button class="btn btn-primary addRecipeBtn">新增菜色</button>
    `);

        $("#dialog").dialog({
            modal: true,
            width: 800,
            buttons: {
                Close: function () {
                    $(this).dialog("close");
                }
            }
        });

        // 使用事件委派綁定「新增菜色」按鈕
        $("#dialogFooter").on("click", ".addRecipeBtn", function () {
            showAddRecipeDialog(activityMealId);
        });
    }


    // 移除食譜
    function removeRecipe(activityMealId, recipeId) {
        $.ajax({
            url: `http://internal.hochi.org.tw:8082/api/Recipes/activity-meal/${activityMealId}/recipes/${recipeId}`,
            method: "DELETE",
            success: function () {
                alert("已成功刪除食譜！");
                loadActivityMealDetails(activityMealId);
            },
            error: function () {
                alert("刪除失敗，請稍後再試！");
            }
        });
    }

    function showAddRecipeDialog(activityMealId) {
        // 定義主食材、類型、方式和菜名的下拉選單選項
        const mainIngredients = ["米粉", "干絲", "素雞", "大白菜", "烤麩", "竹筍"];
        const categories = ["熱炒", "涼拌", "燉滷"];
        const methods = ["乾煎", "紅燒", "清蒸", "涼拌"];
        const recipes = ["炒米粉", "涼拌干絲", "素雞炒三椒", "獅子頭白菜滷", "烤麩滷竹筍", "竹筍湯"];

        // 準備下拉選單內容
        const generateOptions = (options) =>
            options.map((option) => `<option value="${option}">${option}</option>`).join("");

        const dialogContent = `
        <div>
            <div class="form-group">
                <label for="mainIngredientSelect">主食材</label>
                <select id="mainIngredientSelect" class="form-control">
                    <option value="">請選擇主食材</option>
                    ${generateOptions(mainIngredients)}
                </select>
            </div>
            <div class="form-group">
                <label for="categorySelect">類型</label>
                <select id="categorySelect" class="form-control">
                    <option value="">請選擇類型</option>
                    ${generateOptions(categories)}
                </select>
            </div>
            <div class="form-group">
                <label for="methodSelect">方式</label>
                <select id="methodSelect" class="form-control">
                    <option value="">請選擇方式</option>
                    ${generateOptions(methods)}
                </select>
            </div>
            <div class="form-group">
                <label for="recipeNameSelect">菜名</label>
                <select id="recipeNameSelect" class="form-control">
                    <option value="">請選擇菜名</option>
                    ${generateOptions(recipes)}
                </select>
            </div>
        </div>
    `;

        // 初始化新增菜色的 Dialog
        $("<div>")
            .html(dialogContent)
            .dialog({
                title: "新增菜色",
                modal: true,
                width: 500,
                buttons: {
                    "新增": function () {
                        // 使用更精確的作用域選取，避免選取不到值
                        const mainIngredient = $(this).find("#mainIngredientSelect").val();
                        const category = $(this).find("#categorySelect").val();
                        const method = $(this).find("#methodSelect").val();
                        const recipeName = $(this).find("#recipeNameSelect").val();

                        if (!mainIngredient || !category || !method || !recipeName) {
                            alert("請選擇完整的資訊！");
                            return;
                        }

                        // 確認是否成功獲取數值
                        console.log("主食材:", mainIngredient);
                        console.log("類型:", category);
                        console.log("方式:", method);
                        console.log("菜名:", recipeName);

                        // 新增到 dialogRecipeList
                        const newRecipe = `
                        <li>
                            <strong>${recipeName}</strong> (${mainIngredient}) - ${category}
                            <br>
                            描述: ${method || "無描述"}, 份量: 10
                            <button type="button" class="btn btn-danger removeRecipeBtn">刪除</button>
                        </li>
                    `;
                        $("#dialogRecipeList").append(newRecipe);

                        // 綁定刪除按鈕事件
                        $(".removeRecipeBtn").off("click").on("click", function () {
                            $(this).closest("li").remove(); // 只刪除當前項目
                        });

                        // 關閉 Dialog
                        $(this).dialog("close");
                    },
                    "取消": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog("destroy").remove();
                }
            });
    }

});



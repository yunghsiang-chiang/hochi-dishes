$(document).ready(function () {
    // 點擊表格單元格時，跳轉到指定 URL
    $('#MainContent_gv_view tbody tr td').click(function () {
        location.replace("http://internal.hochi.org.tw:8080/New_dishes?dishes_name=" + $(this).text());
    });

    // 用於生成表格的函數
    $.makeTable = function (mydata) {
        $('#gv_view').remove(); // 移除舊表格
        var table = $('<table cellspacing="0" rules="all" class="table" border="1" id="gv_view" style="border-collapse:collapse;"><tbody>');
        var tblHeader = "<tr><th scope='col'>名稱</th><th scope='col'>順序</th><th scope='col'>手法</th><th scope='col'>食材</th></tr>";
        $(tblHeader).appendTo(table); // 添加表格頭部
        // 迭代 API 返回的每筆資料，生成表格行
        $.each(mydata, function (index, item) {
            var TableRow = '<tr class="GvGrid">';
            TableRow += "<td>" + item.dishes_name + "</td>" + "<td>" + item.dishes_type + "</td>" + "<td>" + item.cooking_method + "</td>" + "<td>" + item.material_id_names + "</td>";
            TableRow += "</tr>";
            $(table).append(TableRow); // 將行添加到表格
        });
        $(table).append('</tbody>');
        return $(table); // 返回生成的表格
    };

    // 使用 async/await 發送 API 請求來獲取菜色資料
    async function fetchDishes(api_url) {
        try {
            const response = await fetch(api_url); // 發送 GET 請求到指定的 API URL
            const data = await response.json(); // 解析 JSON 格式的響應資料
            if (data.length > 0) {
                var table = $.makeTable(data); // 生成表格
                $("#test_div").empty(); // 清空之前的內容
                $(table).appendTo("#test_div"); // 添加新的表格到頁面
            }
        } catch (error) {
            console.error("發生錯誤：", error); // 錯誤處理
        }
    }

    // 查詢菜色或材料後更新表格
    async function searchDishes() {
        // 將 select id 為 MainContent_ddl_newdishes_type 、MainContent_ddl_cooking_method 的選項移動至 "請選擇"
        $("#MainContent_ddl_newdishes_type").val('--');
        $("#MainContent_ddl_cooking_method").val('--');

        const dishesName = $("#dishes_name_text").val().trim(); // 獲取菜色名稱
        const materialText = $('#dishes_material_text').val().trim(); // 獲取材料名稱

        // 清空不相干的輸入框
        if (dishesName.length > 0) {
            $("#dishes_material_text").text(''); // 清空材料名稱輸入框
        } else if (materialText.length > 0) {
            $("#dishes_name_text").text(''); // 清空菜色名稱輸入框
        }

        // 只有當菜色名稱或材料名稱有值時才調用 API
        if (dishesName.length > 0 || materialText.length > 0) {
            let api_url;
            if (dishesName.length > 0 && materialText.length > 0) {
                // 同時有菜色名稱與材料名稱時
                api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_wordsAndMaterial/${dishesName}/${materialText}`;
            } else if (dishesName.length > 0) {
                // 只有菜色名稱時
                api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_words/${dishesName}`;
            } else {
                // 只有材料名稱時
                api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_material/${materialText}`;
            }

            // 調用 API 並更新表格
            await fetchDishes(api_url);
        }
    }

    // 監聽菜色名稱變更
    $("#dishes_name_text").change(function () {
        searchDishes();
    });

    // 監聽材料名稱變更
    $("#dishes_material_text").change(function () {
        searchDishes();
    });

    // 動態綁定表格中的點擊事件，跳轉到指定菜色頁面
    $(document).on('click', '#gv_view tbody tr td', function () {
        location.replace("http://internal.hochi.org.tw:8080/New_dishes?dishes_name=" + $(this).text());
    });
});

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
        $.each(mydata, function (index, item) {
            var TableRow = '<tr class="GvGrid">';
            TableRow += "<td>" + item.dishes_name + "</td>" + "<td>" + item.dishes_type + "</td>" + "<td>" + item.cooking_method + "</td>" + "<td>" + item.material_id_names + "</td>";
            TableRow += "</tr>";
            $(table).append(TableRow); // 生成每一行表格數據
        });
        $(table).append('</tbody>');
        return $(table);
    };

    // 將 API 查詢改為 async/await
    async function fetchDishes(api_url) {
        try {
            const response = await fetch(api_url); // 發送 GET 請求
            const data = await response.json(); // 解析 JSON
            if (data.length > 0) {
                var mydata = data;
                var table = $.makeTable(mydata); // 生成表格
                $("#test_div").empty(); // 清空之前的數據
                $(table).appendTo("#test_div"); // 添加新的表格
            }
        } catch (error) {
            console.error("發生錯誤：", error); // 錯誤處理
        }
    }

    // 查詢菜色 by 菜色名稱
    $("#dishes_name_text").change(async function () {
        let api_url;
        const dishesName = $("#dishes_name_text").val();
        const materialText = $('#dishes_material_text').val().trim();

        if (materialText.length > 0) {
            api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_wordsAndMaterial/${dishesName}/${materialText}`;
        } else {
            api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_words/${dishesName}`;
        }

        await fetchDishes(api_url); // 使用 async/await 調用
    });

    // 查詢菜色 by 材料名稱
    $("#dishes_material_text").change(async function () {
        let api_url;
        const dishesName = $("#dishes_name_text").val().trim();
        const materialText = $('#dishes_material_text').val();

        if (dishesName.length > 0) {
            api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_wordsAndMaterial/${dishesName}/${materialText}`;
        } else {
            api_url = `http://internal.hochi.org.tw:8082/api/dishes/search_dishes_by_material/${materialText}`;
        }

        await fetchDishes(api_url); // 使用 async/await 調用
    });

    // 表格點擊事件，跳轉到菜色頁面
    $(document).on('click', $('#gv_view'), function () {
        $('#gv_view tbody tr td').click(function () {
            location.replace("http://internal.hochi.org.tw:8080/New_dishes?dishes_name=" + $(this).text());
        });
    });
});

$(document).ready(function () {

    //塞資訊至網頁中
    let api_url = "http://192.168.11.51:8082/api/dishes/get_seasoning";
    var myAPI = api_url;
    $.getJSON(myAPI, {
        format: "json"
    })
        .done(function (data) {
            let table_infor = '<thead><tr><th scope="col"></th><th scope="col">調味名稱</th><th scope="col">說明</th></tr></thead><tbody>';
            for (var i = 0; i < data.length; i++) {
                table_infor += '<tr><th scope="row">' + (i + 1) + '</th><td>' + data[i].seasoning_name + '</td><td>' + data[i].seasoning_description +'</td></tr>';
            }
            table_infor += '</tbody>';
            $('#seasoning_table').append(table_infor);
        });

    api_url = "http://192.168.11.51:8082/api/dishes/get_cooking_method";
    myAPI = api_url;
    $.getJSON(myAPI, { format: "json" })
        .done(function (data) {
            let table_infor = '<thead><tr><th scope="col"></th><th scope="col">烹飪方式</th><th scope="col">說明</th></tr></thead><tbody>';
            for (var i = 0; i < data.length;i++) {
                table_infor += '<tr><th scope="row">' + (i + 1) + '</th><td>' + data[i].cooking_method + '</td><td>' + data[i].method_description +'</td></tr>';
            }
            table_infor += '</tbody>';
            $('#method-table-container').append(table_infor);
        })

    //食材分頁 食材類型 下拉選單
    api_url = "http://192.168.11.51:8082/api/dishes/get_food_nutrition_category";
    myAPI = api_url;
    $.getJSON(myAPI, { format: "json" })
        .done(function (data) {
            let option_infor = '';
            for (var i = 0; i < data.length; i++) {
                option_infor += '<option value="' + data[i].食品分類 + '">' + data[i].食品分類 +'</option>';
            }
            $('#food_nutrition_category').append(option_infor);
        })

    //下拉選單變化 觸發 顯示食材
    $('#food_nutrition_category').on('change', function () {
        api_url = "http://192.168.11.51:8082/api/dishes/get_food_nutrition_simple_field?food_classification=" + $('#food_nutrition_category option:selected').text();
        myAPI = api_url;
        $.getJSON(myAPI, { format: "json" })
            .done(function (data) {
                $('#food_nutirtion_dt thead').remove();
                $('#food_nutirtion_dt tbody').remove();
                //欄位開頭
                let table_infor = '<thead><tr><th scope="col">#</th><th scope="col">樣品編號</th><th scope="col">食品分類</th><th scope="col">樣品名稱</th><th scope="col">俗名</th><th scope="col">內容物描述</th></tr></thead><tbody>';
                for (var i = 0; i < data.length; i++) {
                    table_infor += '<tr><th scope="row">' + (i + 1).toString() + '</th><td>' + data[i].樣品編號 + '</td><td>' + data[i].食品分類 + '</td><td>' + data[i].樣品名稱 + '</td><td>' + data[i].俗名 + '</td><td>' + data[i].內容物描述 +'</td></tr>';
                }
                table_infor += '</tbody>';
                $('#food_nutirtion_dt').append(table_infor);
            })
    })

    //下拉選單 菜色名稱
    api_url = "http://192.168.11.51:8082/api/dishes/get_dishes_type_name";
    myAPI = api_url;
    $.getJSON(myAPI, { format: "json" })
        .done(function (data) {
            let option_infor = '';
            for (var i = 0; i < data.length; i++) {
                option_infor += '<option value="' + data[i].dishes_id + '">' + data[i].dishes_name + '</option>';
            }
            $('#dishes_name').append(option_infor);
        })

});
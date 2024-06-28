$(document).ready(function () {

    //塞資訊至網頁中
    let api_url = "http://10.10.3.75:8082/api/dishes/get_seasoning";
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
            //for (var i = 0; i < data.length; i++) {
            //    var div_chlid = '<div class="seasoning-method"><h2>' + data[i].seasoning_name + '</h2><p>' + data[i].seasoning_description +'</p></div >';
            //    $("#seasoning_container").append(div_chlid);
            //    console.log(data[i].seasoning_name);
            //    console.log(data[i].seasoning_description);
            //}
        });

    api_url = "http://10.10.3.75:8082/api/dishes/get_cooking_method";
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

});
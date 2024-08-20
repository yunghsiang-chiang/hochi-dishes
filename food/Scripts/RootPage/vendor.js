// event at page loaded
$(document).ready(function () {
    //取得API
    get_purchase();
})

//取得API 活動日期晚於今日 清單
function get_purchase() {
    var api_url = "http://192.168.11.51:8082/api/dishes/get_purchase";
    var myAPI = api_url;
    $.getJSON(myAPI, {
        format: "json"
    }).done(function (data) {
        if (data.length > 0) {
            var mydata = data;
            var htmlcontent = '<table class="table table-striped" name="purchasedt"><thead><tr><th scope="col">#</th><th scope="col">活動名稱</th><th scope="col">活動日期</th><th scope="col">餐別</th><th scope="col">活動區間</th><th scope="col">菜色清單</th></tr></thead><tbody>';
            for (var dataindex = 0; dataindex < data.length; dataindex++) {
                htmlcontent += '<tr><th scope="row"><div class="form-check"><input class="form-check-input cb_col" type="checkbox" value="' + (dataindex + 1).toString() + '" id="flexCheckIndeterminate"><label class="form-check-label" for="flexCheckIndeterminate">' + (dataindex + 1).toString() + '</label></div></th><td>' + data[dataindex].activity_name + '</td><td>' + data[dataindex].activity_date.replace('T00:00:00', '') + '</td><td>' + data[dataindex].meal_type + '</td><td>' + data[dataindex].during_the_activity.replace('~', '~<br/>') + '</td><td>' + data[dataindex].dishes_id_str + '</td></tr>';
            }
            htmlcontent += '</tbody></table>';
            $('.container[name="exist_waitforpurchase"]').append(htmlcontent);
            //不顯示，但是重要資訊! 用於加總的菜色清單資料
            $('td:nth-child(6),th:nth-child(6)').hide();
        } else {
            var htmlcontent = '<h3>資料庫沒有活動於今日之後!</h3><p>網頁會從慈場資料庫中搜尋未來活動資訊.</p>';
            $('.container[name="exist_waitforpurchase"]').append(htmlcontent);
        };
    });
}
$(document).unbind('change').bind('change', $('.cb_col'), function () {
    //勾選 array
    var checkbox_checked_array = [];
    var material_string_array = [];
    var check_index = 1; //用來定位
    $('.cb_col').each(function () { //拜訪checkbox

        if ($(this).prop("checked")) { //if checked
            checkbox_checked_array.push($(this).val()); // push value
            material_string_array.push($('table tbody tr:nth-child(' + check_index.toString() + ') td:nth-child(6)').text()); //push "hide value" 
        } else {
            var index = checkbox_checked_array.indexOf($(this).val());
            if (index != -1) {
                checkbox_checked_array.splice(index, 1); //move value
                material_string_array.splice(index, 1); //move value
            }
        }
        check_index += 1;
    });
    //若有數值，取得被隱藏的資料!
    if (checkbox_checked_array.length > 0) {
        const tempset = new Set(); //不會重複，正好用的到
        const number_array = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9') //判斷菜色還是水果
        for (var tempindex = 0; tempindex < checkbox_checked_array.length; tempindex++) {
            var temp_array = material_string_array[tempindex].split(',');
            for (var array_index = 0; array_index < temp_array.length; array_index++) {
                if (number_array.indexOf(temp_array[array_index].substring(0, 1)) != -1) {
                    tempset.add(temp_array[array_index]);
                }
            }
        }
        var material_id_names_string = Array.from(tempset).join("%2C"); //取得 API 關鍵 material_id_names_string 數據
        var api_url = "http://192.168.11.51:8082/api/dishes/get_material_id_names?material_id_names_string=" + material_id_names_string;
        var myAPI = api_url;
        var final_array = [];
        $.getJSON(myAPI, {
            format: "json"
        }).done(function (data) {
            if (data.length > 0) {
                
                //取得數值
                for (var dataindex = 0; dataindex < data.length; dataindex++) {
                    var temp_array = data[dataindex].material_id_names.split(',');
                    for (var temp_array_index = 0; temp_array_index < temp_array.length; temp_array_index++) {
                        // 新數據
                        var newData = {
                            material: temp_array[temp_array_index].split('-')[0],
                            qty: parseFloat(temp_array[temp_array_index].split('-')[1]),
                            unit: temp_array[temp_array_index].split('-')[2]
                        };
                        final_array.push(newData);
                    }
                }

                // 使用 reduce 方法來處理資料
                var result = final_array.reduce((acc, item) => {
                    // 創建唯一的 key，以便根據 material 和 unit 進行分組
                    var key = item.material + '-' + item.unit;

                    // 如果這個 key 不存在於 accumulator 中，就初始化它
                    if (!acc[key]) {
                        acc[key] = {
                            material: item.material,
                            unit: item.unit,
                            qty: 0
                        };
                    }

                    // 將 salary 加到相應的 group 中
                    acc[key].qty += item.qty;

                    return acc;
                }, {});

                // 將結果轉換為所需的格式
                var groupedData = Object.values(result);
                //console.log(groupedData);


                //顯示數據，此處還沒有合併數據加總
                var htmlcontent = '<table class="table table-striped" name="materialdt"><thead><tr><th scope="col">#</th><th scope="col">食材</th><th scope="col">數量</th><th scope="col">單位</th></tr></thead><tbody>';
                for (var dataindex = 0; dataindex < groupedData.length; dataindex++) {
                    htmlcontent += '<tr><th scope="row">' + (dataindex + 1).toString() + '</th><td>' + groupedData[dataindex].material + '</td><td>' + groupedData[dataindex].qty + '</td><td>' + groupedData[dataindex].unit + '</td></tr>';
                }
                htmlcontent += '</tbody></table>';
                $('.container[name="sum_up_material_quantities"]').children().remove();
                $('.container[name="sum_up_material_quantities"]').append(htmlcontent);
            };
        });

    } else { //沒有數據，清除舊有資料
        $('.container[name="sum_up_material_quantities"]').children().remove();
    }
})

﻿//注意! javascript放在最上面，下方的元件還沒有產生,所以互動都放在ready function 才不用擔心創立順序
$(document).ready(function () {
    //菜單主題 資訊至網頁中
    let api_url = "http://10.10.3.75:8082/api/dishes/get_activity_name";
    //console.log(api_url);
    (function () {
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                $('#TabPanel1select_type').append('<option value="default">不選擇</option>');
                for (var i = 0; i < data.length; i++) {
                    $('#TabPanel1select_type').append($('<option>', {
                        value: data[i].activity_name,
                        text: data[i].activity_name
                    }));
                }
            });
    })();
    //餐別 資訊至網頁中
    var meal_type = ['早餐', '午餐', '晚餐'];
    $('#TabPanel1meal_type').append('<option value="default">不選擇</option>');
    for (let i = 0; i < meal_type.length;i++) {
        $('#TabPanel1meal_type').append('<option value="' + meal_type[i] +'">' + meal_type[i] +'</option>');
    }
    //班會天數 資訊至Select
    var selectValues = {
        "1": "1天",
        "2": "2天",
        "3": "3天",
        "4": "4天",
        "5": "5天",
        "6": "6天"
    };
    var $mySelect = $('#TabPanel1select_days');
    $('#TabPanel1select_days').append('<option value="default">不選擇</option>');
    $(function () {
        $.each(selectValues, function (key, value) {
            var $option = $("<option/>", {
                value: key,
                text: value
            });
            $mySelect.append($option);
        });
    });
    $(function () {

        var dateFormat = "yy/mm/dd",
            from = $("#from")
                .datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: "yy/mm/dd"

                })
                .on("change", function () {
                    to.datepicker("option", "minDate", getDate(this));
                }),
            to = $("#to").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: "yy/mm/dd"
            })
                .on("change", function () {
                    from.datepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });

    //新增 按鈕 從cookie取值並且產生對應元件
    $('#TabPanel4bt_new').click(function () {
        //打勾 確認框
        $('#create_menu_table thead tr').append('<th scope="col"><input type="checkbox" class="cb_col"/></th>');
        //班會日期
        $('#create_menu_table tbody tr:nth-child(1)').append('<td><input type="text" name="date" class="form-control datepicker" style="background-color:Pink" /></td>');
        //菜單主題
        $('#create_menu_table tbody tr:nth-child(2)').append('<td><input type="text" name="name" class="form-control" style="background-color:Pink" /></td>');
        //餐別
        var dishes_type_array = ['早餐','午餐','晚餐'];
        var dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
        for (var i = 0; i < dishes_type_array.length; i++) {
            dishes_type_select += '<option value="' + dishes_type_array[i] + '">' + dishes_type_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(3)').append('<td>' + dishes_type_select + '</td>');
        //主食
        var get_dishes_type_name = getCookie("get_dishes_type_name");
        var get_dishes_type_name_array_temp = get_dishes_type_name.split(',');
        var get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length;i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type=="00") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Main-dish">';
        for (let i = 0; i < get_dishes_type_name_array.length;i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(4)').append('<td>' + dishes_type_select + '</td>');
        //主菜（蛋白質＿濕）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "01") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Main-dish-protein＿wet">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(5)').append('<td>' + dishes_type_select + '</td>');
        //主菜（蛋白質＿乾）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "02") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Main-dish-protein＿dry">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(6)').append('<td>' + dishes_type_select + '</td>');
        //主菜（蛋白質＋纖維質）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "03") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Main-dish-protein-fiber">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(7)').append('<td>' + dishes_type_select + '</td>');
        //副菜（時蔬＋菇等＿2種以上食材）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "04") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Side dishes-seasonal-vegetables-mushrooms">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(8)').append('<td>' + dishes_type_select + '</td>');
        //副菜（葉菜類以外的蔬菜,如瓜類、茄子）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "05") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Side-dishes-vegetables-other-than-leafy-vegetables-such-as-melons-and-eggplants">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(9)').append('<td>' + dishes_type_select + '</td>');
        //副菜（翠綠葉菜）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "06") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Side-dishes-leafy-greens">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(10)').append('<td>' + dishes_type_select + '</td>');
        //副菜（根莖類）
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "07") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Side-dishes-roots-and-tubers">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(11)').append('<td>' + dishes_type_select + '</td>');
        //鹹湯
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "08") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-salty-soup">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(12)').append('<td>' + dishes_type_select + '</td>');
        //甜湯
        get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "09") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-sweet-soup">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(13)').append('<td>' + dishes_type_select + '</td>');
        //水果
        var get_fruits_name = getCookie("fruits");
        var get_fruits_name_temp = get_fruits_name.split(',');
        var fruits_select = '<select class="form-control" aria-describedby="inputGroup-fruits">';
        for (let i = 0; i < get_fruits_name_temp.length; i++) {
            fruits_select += '<option value="' + get_fruits_name_temp[i] + '">' + get_fruits_name_temp[i] + '</option>';
        }
        fruits_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(14)').append('<td>' + fruits_select + '</td>');
    });

    $('#TabPanel1bt_search').click(function () {
        if ($('#TabPanel1select_days').find(":selected").val() != "default") {
            var api_url = "http://10.10.3.75:8082/api/dishes/get_h_activity_records_byday/" + $('#TabPanel1select_days').find(":selected").val();
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            }).done(function (data) {
                if (data.length > 0) {
                    var mydata = data;
                    var table = $.makeSearchTable(mydata);
                    table.appendTo("#search_div");
                };
            });
        } else if ($('#TabPanel1select_type').find(":selected").val() != "default") {
            var api_url = "http://10.10.3.75:8082/api/dishes/get_h_activity_records_byname/" + $('#TabPanel1select_type').find(":selected").text();
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            }).done(function (data) {
                if (data.length > 0) {
                    var mydata = data;
                    var table = $.makeSearchTable(mydata);
                    table.appendTo("#search_div");
                };
            });
        } else if ($('#TabPanel1meal_type').find(":selected").val() != "default") {
            var api_url = "http://10.10.3.75:8082/api/dishes/get_h_activity_records_bymealtype/" + $('#TabPanel1meal_type').find(":selected").text();
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            }).done(function (data) {
                if (data.length > 0) {
                    var mydata = data;
                    var table = $.makeSearchTable(mydata);
                    table.appendTo("#search_div");
                };
            });
        } else {
            $('#gv_search_view').remove();
        }
    })


    $.makeSearchTable = function (mydata) {
        $('#gv_search_view').remove();
        var table = $('<table cellspacing="0" rules="all" class="table table-striped" border="1" id="gv_search_view" style="border-collapse:collapse;"><tbody>');
        var tblHeader = "<tr>";
        tblHeader += '<th scope="col"></th><th scope="col">活動名稱</th><th scope="col">餐別</th><th scope="col">活動天數</th><th scope="col">活動日期</th><th scope="col">活動期間</th><th scope="col">最後編輯者</th>';
        tblHeader += "</tr>";
        $(tblHeader).appendTo(table);
        $.each(mydata, function (index, item) {
            var TableRow = '<tr class="GvGrid">';
            TableRow += '<td><input type="checkbox" class="cb_col"/></td><td>' + item.activity_name + '</td>' + '<td>' + item.meal_type + '</td>' + '<td>' + item.activity_days + '</td>' + '<td>' + item.activity_date.replace("T00:00:00","") + '</td>' + "<td>" + item.during_the_activity + '</td>' + '<td>' + item.lm_user + '</td>';
            TableRow += "</tr>";
            $(table).append(TableRow);
        });
        $(table).append('</tbody></table>');
        return ($(table));
    };

});

//使動態元件 日期生效 並且指定格式 yyyy/MM/dd
$(document).on('click', $('.datepicker'),function () {
    $('.datepicker').datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: "yy/mm/dd"
    });
})

//使菜單主題 內容目視管理 空白:粉色 有值:春綠
$(document).on('change', $('input[name="name"]'), function () {
    $('input[name="name"]').each(function (data) {
        if ($(this).val().length == 0) {
            $(this).css("background-color", "Pink");
        } else {
            $(this).css("background-color", "SpringGreen");
        }
    })
})

//使班會日期 內容目視管理 空白:粉色 有值:春綠
$(document).on('change', $('input[name="date"]'), function () {
    $('input[name="date"]').each(function (data) {
        if ($(this).val().length == 0) {
            $(this).css("background-color", "Pink");
        } else {
            $(this).css("background-color", "SpringGreen");
        }
    })
})

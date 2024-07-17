//注意! javascript放在最上面，下方的元件還沒有產生,所以互動都放在ready function 才不用擔心創立順序
$(document).ready(function () {
    //菜單主題 資訊至網頁中
    let api_url = "http://192.168.11.51:8082/api/dishes/get_activity_name";
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
    for (let i = 0; i < meal_type.length; i++) {
        $('#TabPanel1meal_type').append('<option value="' + meal_type[i] + '">' + meal_type[i] + '</option>');
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

    //查詢活動菜單資訊
    $("#TabPanel1select_type,#TabPanel1meal_type,#TabPanel1select_days,#from,#to").on("change", function () {
        var api_url = "http://192.168.11.51:8082/api/dishes/get_h_activity_records_search?activity_name=" + $('#TabPanel1select_type').find(":selected").val() + "&meal_type=" + $('#TabPanel1meal_type').find(":selected").val() + "&activity_days=" + $('#TabPanel1select_days').find(":selected").val();
        if ($('#from').val().length > 0) {
            api_url += "&activity_start=" + $('#from').val();
        }
        if ($('#to').val().length > 0) {
            api_url += "&activity_end=" + $('#to').val();
        }
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        }).done(function (data) {
            if (data.length > 0) {
                var mydata = data;
                var table = $.makeSearchTable(mydata);
                table.appendTo("#search_div");
            } else {
                $('#gv_search_view').remove();
            }
        })
    });


    //生成活動菜單 表格
    $.makeSearchTable = function (mydata) {
        $('#gv_search_view').remove();
        var table = $('<table cellspacing="0" rules="all" class="table table-striped" border="1" id="gv_search_view" style="border-collapse:collapse;"><tbody>');
        var tblHeader = "<tr>";
        tblHeader += '<th scope="col"></th><th scope="col">活動名稱</th><th scope="col">餐別</th><th scope="col">活動天數</th><th scope="col">活動日期</th><th scope="col">活動期間</th><th scope="col">最後編輯者</th>';
        tblHeader += "</tr>";
        $(tblHeader).appendTo(table);
        $.each(mydata, function (index, item) {
            var TableRow = '<tr class="GvGrid">';
            TableRow += '<td><input type="checkbox" name="search_cb" class="search_cb"/></td><td>' + item.activity_name + '</td>' + '<td>' + item.meal_type + '</td>' + '<td>' + item.activity_days + '</td>' + '<td>' + item.activity_date.replace("T00:00:00", "") + '</td>' + "<td>" + item.during_the_activity + '</td>' + '<td>' + item.lm_user + '</td>';
            TableRow += "</tr>";
            $(table).append(TableRow);
        });
        $(table).append('</tbody></table>');
        return ($(table));
    };

    //新增 按鈕 從cookie取值並且產生對應元件
    $('#TabPanel4bt_new').click(function () {
        //打勾 確認框
        $('#create_menu_table thead tr').append('<th scope="col"><input type="checkbox" name="cb_col" class="cb_col"/></th>');
        //班會日期
        $('#create_menu_table tbody tr:nth-child(1)').append('<td><input type="text" name="date" class="form-control datepicker" style="background-color:Pink" /></td>');
        //菜單主題
        $('#create_menu_table tbody tr:nth-child(2)').append('<td><input type="text" name="name" class="form-control" style="background-color:Pink" /></td>');
        //餐別
        var dishes_type_array = ['早餐', '午餐', '晚餐'];
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
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type == "00") {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-Main-dish">';
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
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

    let check_array = [];
    //用於判斷打勾項目,提供查看 按鈕使用
    $(document).on('change', $('.GvGrid td .search_cb'), function () {

        $('.GvGrid td .search_cb').each(function (index, element) {
            if ($(this).prop("checked")) {
                if (check_array.indexOf(index) == -1) {
                    check_array.push(index);
                }
            } else {
                if (check_array.indexOf(index) != -1) {
                    check_array.splice(check_array.indexOf(index), 1);
                }
            }

        })
        //console.log(check_array);
    })

    //查看按鈕 判斷勾選數量 引導至第二頁查看
    $('#TabPanel1bt_view').click(function () {
        if (check_array.length > 0) {
            document.cookie = "check_array=" + check_array.join(",");
            let correct_array = [];
            $('#gv_search_view tbody tr td').each(function () {
                $(this).each(function () {
                    if ($(this).text().length > 0) {
                        correct_array.push($(this).text());
                    }
                })
            })
            infor_list = [];
            for (var i = 0; i < correct_array.length / 6; i++) {
                if (check_array.indexOf(i) != -1) {
                    infor_list.push(correct_array.slice((6 * i) + 0, (6 * i) + 6).join(","));
                }
            }
            //console.log(infor_list.join(";"));
            document.cookie = "check_infor=" + infor_list.join("、");
            //第二頁
            $('#search-tab').removeClass('active');
            $('#second-tab').addClass('active');
            $('#search').removeClass('active');
            $('#second').addClass('active');
            if (getCookie("check_infor") != null) {
                var mydata = getCookie("check_infor");
                var table = $.makeDetailTables(mydata);
                table.appendTo("detail_div");
                //把cookie 丟掉
                document.cookie = 'check_infor=; Max-Age=0; path=/; domain=' + location.hostname;
            }
        }
    })

    //勾選資訊呈現
    $.makeDetailTables = function (mydata) {
        //console.log('makeDetailTables:' + mydata);
        $('#detail_table').remove();
        var temp_array = mydata.split('、');

        let temp_html = `<table id="detail_table" class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">班會日期</th>
                                </tr>
                                <tr>
                                    <th scope="row">菜單主題</th>
                                </tr>
                                <tr>
                                    <th scope="row">餐別</th>
                                </tr>
                                <tr>
                                    <th scope="row">主食</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿濕）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿乾）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＋纖維質）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（翠綠葉菜）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（根莖類）</th>
                                </tr>
                                <tr>
                                    <th scope="row">鹹湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">甜湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">水果</th>
                                </tr>
                            </tbody>
                        </table>`;
        $('#detail_div').append(temp_html);
        let temp_tablerow = '';

        //打勾 確認框

        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" /></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow);

        //班會日期
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="date">' + temp_array[i].split(',')[3] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(1)').append(temp_tablerow);

        //菜單主題
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="name">' + temp_array[i].split(',')[0] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(2)').append(temp_tablerow);

        //餐別
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="meal_type">' + temp_array[i].split(',')[1] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(3)').append(temp_tablerow);

        //
        for (var ii = 0; ii < temp_array.length; ii++) {
            var api_url = "http://192.168.11.51:8082/api/dishes/get_activity_dishes?activity_name=" + temp_array[ii].split(',')[0] + "&meal_type=" + temp_array[ii].split(',')[1] + "&activity_date=" + temp_array[ii].split(',')[3];
            //console.log("http://192.168.11.51:8082/api/dishes/get_activity_dishes?activity_name=" + temp_array[ii].split(',')[0] + "&meal_type=" + temp_array[ii].split(',')[1] + "&activity_date=" + temp_array[ii].split(',')[3]);
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            }).done(function (data) {
                if (data.length > 0) {
                    //主食
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "00") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(4)').append(temp_tablerow);
                    //主菜（蛋白質＿濕）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_wet">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "01") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(5)').append(temp_tablerow);
                    //主菜（蛋白質＿乾）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_dry">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "02") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(6)').append(temp_tablerow);
                    //主菜（蛋白質＋纖維質）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_fiber">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "03") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(7)').append(temp_tablerow);
                    //副菜（時蔬＋菇等＿2種以上食材）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_mushroom">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "04") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(8)').append(temp_tablerow);
                    //副菜（葉菜類以外的蔬菜,如瓜類、茄子）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_melon">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "05") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(9)').append(temp_tablerow);
                    //副菜（翠綠葉菜）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_vegetables">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "06") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(10)').append(temp_tablerow);
                    //副菜（根莖類）
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_roots">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "07") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(11)').append(temp_tablerow);
                    //鹹湯
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="salty_soup">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "08") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(12)').append(temp_tablerow);
                    //甜湯
                    temp_tablerow = '<th scope="col"><span class="label label-default" name="sweet_soup">';
                    temp_list = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].dishes_type == "09") {
                            temp_list.push(data[i].dishes_name)
                        }
                    }
                    temp_tablerow += temp_list.join("<br/>");
                    temp_tablerow += '</span></th>';
                    $('#detail_table tbody tr:nth-child(13)').append(temp_tablerow);
                }
            })
        }

        return ($('#detail_table'));


    }

    //複製按鈕 判斷勾選數量 引導至第二頁編輯
    $('#TabPanel1bt_copy').click(function () {
        if (check_array.length > 0) {
            document.cookie = "check_array=" + check_array.join(",");
            let correct_array = [];
            $('#gv_search_view tbody tr td').each(function () {
                $(this).each(function () {
                    if ($(this).text().length > 0) {
                        correct_array.push($(this).text());
                    }
                })
            })
            infor_list = [];
            for (var i = 0; i < correct_array.length / 6; i++) {
                if (check_array.indexOf(i) != -1) {
                    infor_list.push(correct_array.slice((6 * i) + 0, (6 * i) + 6).join(","));
                }
            }
            //console.log(infor_list.join(";"));
            document.cookie = "check_infor=" + infor_list.join("、");
            //第二頁
            $('#search-tab').removeClass('active');
            $('#second-tab').addClass('active');
            $('#search').removeClass('active');
            $('#second').addClass('active');
            if (getCookie("check_infor") != null) {
                var mydata = getCookie("check_infor");
                var table = $.copyDetailTables(mydata);
                table.appendTo("detail_div");
                //把cookie 丟掉
                document.cookie = 'check_infor=; Max-Age=0; path=/; domain=' + location.hostname;
            }
        }
    })

    //勾選資訊呈現
    $.copyDetailTables = function (mydata) {
        //console.log('makeDetailTables:' + mydata);
        $('#detail_table').remove();
        var temp_array = mydata.split('、');

        let temp_html = `<table id="detail_table" class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">班會日期</th>
                                </tr>
                                <tr>
                                    <th scope="row">菜單主題</th>
                                </tr>
                                <tr>
                                    <th scope="row">餐別</th>
                                </tr>
                                <tr>
                                    <th scope="row">主食</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿濕）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿乾）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＋纖維質）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（翠綠葉菜）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（根莖類）</th>
                                </tr>
                                <tr>
                                    <th scope="row">鹹湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">甜湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">水果</th>
                                </tr>
                            </tbody>
                        </table>`;
        $('#detail_div').append(temp_html);
        let temp_tablerow = '';

        //打勾 確認框
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" /></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow);

        //班會日期
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="text" name="date" class="form-control datepicker" style="background-color:Pink" /></th>';
        }
        $('#detail_table tbody tr:nth-child(1)').append(temp_tablerow);

        //菜單主題
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="text" name="name" class="form-control" style="background-color:Pink" /></th>';
        }
        $('#detail_table tbody tr:nth-child(2)').append(temp_tablerow);

        //餐別
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            var dishes_type_array = ['早餐', '午餐', '晚餐'];
            var dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
            for (var x = 0; x < dishes_type_array.length; x++) {
                if (temp_array[i].split(',')[1] == dishes_type_array[x]) {
                    dishes_type_select += '<option value="' + dishes_type_array[x] + '" selected>' + dishes_type_array[x] + '</option>';
                } else {
                    dishes_type_select += '<option value="' + dishes_type_array[x] + '">' + dishes_type_array[x] + '</option>';
                }
                // temp_array[i].split(',')[1]
                
            }
            dishes_type_select += '</select>';
            temp_tablerow += '<th scope="col">' + dishes_type_select + '</th>';
        }
        //temp_tablerow += '<th scope="col">' + dishes_type_select + '</th>';
        $('#detail_table tbody tr:nth-child(3)').append(temp_tablerow);

        //
        for (var ii = 0; ii < temp_array.length; ii++) {
            var api_url = "http://192.168.11.51:8082/api/dishes/get_activity_dishes?activity_name=" + temp_array[ii].split(',')[0] + "&meal_type=" + temp_array[ii].split(',')[1] + "&activity_date=" + temp_array[ii].split(',')[3];
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            }).done(function (data) {
                if (data.length > 0) {

                    //主食
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="00" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "00") { // 00在資料庫=主食
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("00", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("00", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(4)').append(temp_tablerow);

                    //主菜（蛋白質＿濕）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="01" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "01") { // 01在資料庫=主菜（蛋白質＿濕）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("01", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("01", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(5)').append(temp_tablerow);
                    //主菜（蛋白質＿乾）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="02" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "02") { // 02在資料庫=主菜（蛋白質＿乾）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("02", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("02", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(6)').append(temp_tablerow);
                    //主菜（蛋白質＋纖維質）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="03" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "03") { // 03在資料庫=主菜（蛋白質＋纖維質）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("03", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("03", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(7)').append(temp_tablerow);
                    //副菜（時蔬＋菇等＿2種以上食材）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="04" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "04") { // 04在資料庫=副菜（時蔬＋菇等＿2種以上食材）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("04", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("04", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(8)').append(temp_tablerow);
                    //副菜（葉菜類以外的蔬菜,如瓜類、茄子）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="05" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "05") { // 05在資料庫=副菜（葉菜類以外的蔬菜,如瓜類、茄子）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("05", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("05", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(9)').append(temp_tablerow);
                    //副菜（翠綠葉菜）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="06" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "06") { // 06在資料庫=副菜（翠綠葉菜）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("06", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("06", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(10)').append(temp_tablerow);
                    //副菜（根莖類）
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="07" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "07") { // 07在資料庫=副菜（根莖類）
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("07", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("07", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(11)').append(temp_tablerow);
                    //鹹湯
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="08" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "08") { // 08在資料庫=鹹湯
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("08", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("08", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(12)').append(temp_tablerow);
                    //甜湯
                    temp_tablerow = '<th scope="col"><button type="button" class="btn btn-light" name="add_select" value="09" >➕</button>';
                    temp_list = []; //用來承接多個數值
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].dishes_type == "09") { // 09在資料庫=甜湯
                            //追加動態下拉選單
                            var selectoptions = settingSelectOptions("09", data[x].dishes_name);
                            temp_list.push(selectoptions)
                        }
                    }
                    if (temp_list.length == 0) {
                        //追加動態下拉選單
                        var selectoptions = settingSelectOptions("09", "");
                        temp_list.push(selectoptions)
                    }
                    temp_tablerow += temp_list.join('');
                    temp_tablerow += '</th>';
                    $('#detail_table tbody tr:nth-child(13)').append(temp_tablerow);
                }
            })
        }

        return ($('#detail_table'));
    }

    //設定下拉選單數值
    function settingSelectOptions(tempvalue,dishes_name) {
        //追加動態下拉選單
        var get_dishes_type_name = getCookie("get_dishes_type_name"); //取得cookie數值
        var get_dishes_type_name_array_temp = get_dishes_type_name.split(','); //切割
        var get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1]; //將cookie get_dishes_type_name 的數值 get_type 切割出來
            if (get_type == tempvalue) {
                get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        let dishes_type_select = '<select class="form-control">'; //下拉選單數值填寫
        for (let i = 0; i < get_dishes_type_name_array.length; i++) {
            if (i == 0) {
                if (get_dishes_type_name_array.indexOf(dishes_name) == -1) {
                    dishes_type_select += '<option value="" selected></option>'; //若菜色不在清單內，則預設選項 "空白"
                } else {
                    dishes_type_select += '<option value=""></option>';
                }
            }
            if (get_dishes_type_name_array[i] == dishes_name) {
                dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '" selected>' + get_dishes_type_name_array[i] + '</option>'; //下拉選單若為歷史菜色則 預設選擇
            } else {
                dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
            }
        }
        dishes_type_select += '</select>';

        return dishes_type_select;
    }

});

//使動態元件 日期生效 並且指定格式 yyyy/MM/dd
$(document).on('click', $('.datepicker'), function () {
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

//取得TabPanel1 table Double click 資訊 已知BUG th也會列入雙擊事件
$(document).one('dblclick', $('#gv_search_view tbody tr'), function () {
    $('#gv_search_view tbody').on('dblclick', 'tr', function () {
        let correct_row = '';
        correct_row += $(this).text();
        //console.log(correct_row);
        let correct_array = [];
        $('#gv_search_view tbody tr td').each(function () {
            $(this).each(function () {
                if ($(this).text().length > 0) {
                    correct_array.push($(this).text());
                }
            })
        })
        for (var i = 0; i < correct_array.length / 6; i++) {
            if ((correct_array.slice((6 * i) + 0, (6 * i) + 6)).join("") == correct_row) {
                //console.log(correct_array.slice((6 * i) + 0, (6 * i) + 6));
                document.cookie = "dblclickrow=" + (correct_array.slice((6 * i) + 0, (6 * i) + 6)).join(",");
                $('#search-tab').removeClass('active');
                $('#second-tab').addClass('active');
                $('#search').removeClass('active');
                $('#second').addClass('active');
                if (getCookie("dblclickrow") != null) {
                    var mydata = getCookie("dblclickrow");
                    var table = $.makeDetailTable(mydata);
                    table.appendTo("detail_div");
                    //把cookie 丟掉
                    document.cookie = 'dblclickrow=; Max-Age=0; path=/; domain=' + location.hostname;
                }
            }
        }
    })

    $.makeDetailTable = function (mydata) {
        $('#detail_table').remove();
        var temp_array = mydata.split('、');
        let temp_html = `<table id="detail_table" class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">班會日期</th>
                                </tr>
                                <tr>
                                    <th scope="row">菜單主題</th>
                                </tr>
                                <tr>
                                    <th scope="row">餐別</th>
                                </tr>
                                <tr>
                                    <th scope="row">主食</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿濕）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿乾）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＋纖維質）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（翠綠葉菜）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（根莖類）</th>
                                </tr>
                                <tr>
                                    <th scope="row">鹹湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">甜湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">水果</th>
                                </tr>
                            </tbody>
                        </table>`;
        $('#detail_div').append(temp_html);
        let temp_tablerow = '';

        //打勾 確認框
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col"></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow);

        //班會日期
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="date">' + temp_array[i].split(',')[3] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(1)').append(temp_tablerow);

        //菜單主題
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="name">' + temp_array[i].split(',')[0] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(2)').append(temp_tablerow);

        //餐別
        temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><span class="label label-default" name="meal_type">' + temp_array[i].split(',')[1] + '</span></th>';
        }
        $('#detail_table tbody tr:nth-child(3)').append(temp_tablerow);

        var api_url = "http://192.168.11.51:8082/api/dishes/get_activity_dishes?activity_name=" + temp_array[0].split(',')[0] + "&meal_type=" + temp_array[0].split(',')[1] + "&activity_date=" + temp_array[0].split(',')[3];
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        }).done(function (data) {
            if (data.length > 0) {
                //主食
                temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "00") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(4)').append(temp_tablerow);
                //主菜（蛋白質＿濕）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_wet">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "01") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(5)').append(temp_tablerow);
                //主菜（蛋白質＿乾）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_dry">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "02") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(6)').append(temp_tablerow);
                //主菜（蛋白質＋纖維質）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="staple_food_fiber">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "03") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(7)').append(temp_tablerow);
                //副菜（時蔬＋菇等＿2種以上食材）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_mushroom">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "04") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(8)').append(temp_tablerow);
                //副菜（葉菜類以外的蔬菜,如瓜類、茄子）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_melon">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "05") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(9)').append(temp_tablerow);
                //副菜（翠綠葉菜）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_vegetables">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "06") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(10)').append(temp_tablerow);
                //副菜（根莖類）
                temp_tablerow = '<th scope="col"><span class="label label-default" name="Non_staple_food_roots">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "07") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(11)').append(temp_tablerow);
                //鹹湯
                temp_tablerow = '<th scope="col"><span class="label label-default" name="salty_soup">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "08") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(12)').append(temp_tablerow);
                //甜湯
                temp_tablerow = '<th scope="col"><span class="label label-default" name="sweet_soup">';
                temp_list = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dishes_type == "09") {
                        temp_list.push(data[i].dishes_name)
                    }
                }
                temp_tablerow += temp_list.join("<br/>");
                temp_tablerow += '</span></th>';
                $('#detail_table tbody tr:nth-child(13)').append(temp_tablerow);
            }
        })
        return ($('#detail_table'));


    }

})



//動態生成元件 input type="date" 使其正常運行
$(document).unbind('click').bind('click', $('.datepicker'), function () {
    $('.datepicker').datepicker();
})

//取得cookie值
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
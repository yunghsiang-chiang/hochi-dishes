//注意! javascript放在最上面，下方的元件還沒有產生,所以互動都放在ready function 才不用擔心創立順序
$(document).ready(function () {
    //菜單主題 資訊至網頁中
    let api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_type";
    //console.log(api_url);
    (function () {
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#TabPanel1select_type').append($('<option>', {
                        value: data[i].dishes_type_id,
                        text: data[i].dishes_type_name
                    }));
                }
                //console.log(data);
                //doSomething(data);
            });
    })();
    //餐別 資訊至網頁中
    api_url = "http://10.10.3.75:8082/api/dishes/get_cooking_method";
    (function () {
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $('#TabPanel1select_method').append($('<option>', {
                        value: data[i].cooking_method_id,
                        text: data[i].cooking_method
                    }));
                }
                //console.log(data);
                //doSomething(data);
            });
    })();
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


    $('#TabPanel4bt_new').click(function () {
        $('#create_menu_table thead tr').append('<th scope="col"><input type="checkbox" class="cb_col"/></th>');
        $('#create_menu_table tbody tr:nth-child(1)').append('<td><input type="text" name="date" class="form-control datepicker" /></td>');
        $('#create_menu_table tbody tr:nth-child(2)').append('<td><input type="text" name="name" class="form-control" /></td>');
        var dishes_type = getCookie("get_dishes_type");
        var dishes_type_array = dishes_type.split(',');
        var dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
        for (var i = 0; i < dishes_type_array.length; i++) {
            dishes_type_select += '<option value="' + dishes_type_array[i] + '">' + dishes_type_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(3)').append('<td>' + dishes_type_select +'</td>');
        var get_dishes_type_name = getCookie("get_dishes_type_name");
        var get_dishes_type_name_array_temp = get_dishes_type_name.split(',');
        var get_dishes_type_name_array = [];
        for (let i = 0; i < get_dishes_type_name_array_temp.length;i++) {
            var get_type = get_dishes_type_name_array_temp[i].split('＊')[1];
            if (get_type=="00") {
                get_dishes_type_name_array.append(get_dishes_type_name_array_temp[i].split('＊')[0]);
            }
        }
        dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
        for (let i = 0; i < get_dishes_type_name_array.length;i++) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>';
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(4)').append('<td>' + dishes_type_select + '</td>');
    });

    
});

$(document).on('click', $('.datepicker'),function () {
    $('.datepicker').datepicker();
})


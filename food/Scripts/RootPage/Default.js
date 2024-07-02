$(document).ready(function () {
    $('#MainContent_gv_view tbody tr td').click(function () {
        if ($(this).text().includes('範例')) {
            location.replace("http://10.10.3.75:8080/New_dishes?dishes_name=" + $(this).text())
        }
    });

    $.makeTable = function (mydata) {
        $('#gv_view').remove();
        var table = $('<table cellspacing="0" rules="all" class="table" border="1" id="gv_view" style="border-collapse:collapse;"><tbody>');
        var tblHeader = "<tr>";
        tblHeader += '<th scope="col">名稱</th><th scope="col">順序</th><th scope="col">手法</th><th scope="col">食材</th>';
        tblHeader += "</tr>";
        $(tblHeader).appendTo(table);
        $.each(mydata, function (index, item) {
            var TableRow = '<tr class="GvGrid">';
            TableRow += "<td>" + item.dishes_name + "</td>" + "<td>" + item.dishes_type + "</td>" + "<td>" + item.cooking_method + "</td>" + "<td>" + item.material_id_names + "</td>";
            TableRow += "</tr>";
            $(table).append(TableRow);
        });
        $(table).append('</tbody>');
        return ($(table));
    };

    //查詢菜色 by 菜色名稱
    $("#dishes_name_text").change(function () {
        var api_url = "http://10.10.3.75:8082/api/dishes/search_dishes_by_words/" + $("#dishes_name_text").val();
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        }).done(function (data) {
            if (data.length > 0) {
                var mydata = data;
                var table = $.makeTable(mydata);
                $(table).appendTo("#test_div");

            };
        });
    });

    //查詢菜色 by 材料名稱
    $("#dishes_material_text").change(function () {
        var api_url = "http://10.10.3.75:8082/api/dishes/search_dishes_by_material/" + $("#dishes_material_text").val();
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        }).done(function (data) {
            if (data.length > 0) {
                var mydata = data;
                var table = $.makeTable(mydata);
                $(table).appendTo("#test_div");
            };
        });
    });
});

$(document).on('click', $('#gv_view'), function () {
    $('#gv_view tbody tr td').click(function () {
        if ($(this).text().includes('範例')) {
            location.replace("http://10.10.3.75:8080/New_dishes?dishes_name=" + $(this).text())
        }
    });
})
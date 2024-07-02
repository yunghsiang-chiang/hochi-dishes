<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="food._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        .GvGrid:hover {
            background-color: #FFEB9C;
            border-top: solid;
            border-left: solid;
            border-bottom: solid;
            border-right: solid;
            color: #9C6500;
        }

        #alert {
            display: none;
            background-color: rgb(252, 219, 219);
            border: 1px solid green;
            position: fixed;
            height: 80px;
            width: 250px;
            left: 40%;
            top: 2%;
            padding: 6px 8px 8px;
            text-align: center;
        }

        p {
            font-size: 18px;
            color: green;
        }

        button {
            border-radius: 12px;
            height: 2rem;
            padding: 7px;
            cursor: pointer;
            border: 2px solid green;
            background-color: aqua;
        }

        #close {
            position: absolute;
            right: 20px;
            bottom: 10px;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#MainContent_gv_view tbody tr td').click(function () {
                if ($(this).text().includes('範例')) {
                    /*                    invokeAlert();*/
                    //alert('進入 ' + $(this).text() + ' 內容頁面');
                    location.replace("http://10.10.3.75:8080/New_dishes?dishes_name=" + $(this).text())
                        //let api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_by_name/" + $(this).text();
                        //console.log(api_url);
                        (function () {
                            //var myAPI = "http://10.10.3.75:8082/api/dishes";
                            //var api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_by_name/" + $(this).text();
                            var myAPI = api_url;
                            $.getJSON(myAPI, {
                                format: "json"
                            })
                                .done(function (data) {
                                    console.log(data);
                                    //doSomething(data);
                                    alert("Load was performed.");
                                });
                        })();

                    //function doSomething(data) {
                    //    for (var i = 0; i < data.length; i++) {
                    //        var div = $("<div>");
                    //        var label = $("<label>").text(data[i].DisplayValue);
                    //        $(div).append(label);
                    //        $('#result').append(div);
                    //    }
                    //} 
                }
            });
            $.makeTable = function (mydata) {
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

            $("#dishes_name_text").change(function () {
                //var api_url = "http://10.10.3.75:8082/api/dishes/search_dishes_by_words/" + $("#dishes_name_text").val();
                //var myAPI = api_url;
                //$.getJSON(myAPI, {
                //    format: "json"
                //}).done(function (data) {
                //    if (data.length > 0) {
                //        var mydata = data;
                //        var table = $.makeTable(mydata);
                //        $(table).appendTo("#test_div");

                //    };
                //});
                console.log('製作中');
            });
        });
    </script>
    <main>
        <br />
        <br />
        <br />
        <section class="row" aria-labelledby="aspnetTitle">
            <h1 id="aspnetTitle">菜色搜尋</h1>
            <%--<div class="container row">
                <div class="col">
                    <button type="button" ID="bt_newdishes_append" class="btn btn-secondary btn-lg">新增</button>
                </div>
                <div class="col">
                    <button type="button" ID="bt_newdishes_edit" class="btn btn-secondary btn-lg">編輯</button>
                </div>
                <div class="col">
                    <button type="button" ID="bt_newdishes_search" class="btn btn-success btn-lg">搜尋</button>
                </div>
                <div class="col">
                    <button type="button" ID="bt_newdishes_drop" class="btn btn-secondary btn-lg">刪除</button>
                </div>
            </div>--%>
            <hr />
            <div class="container row">

                <div class="col-sm">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-dishes_name">菜色名稱</span>
                        </div>
                        <div>
                            <input type="text" id="dishes_name_text" name="dishes_name_text" class="form-control" aria-label="Default" aria-describedby="inputGroup-dishes_name" />
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-dishes_type">順序</span>
                        </div>
                        <div>
                            <asp:DropDownList ID="ddl_newdishes_type" runat="server" class="form-select" aria-describedby="inputGroup-dishes_type" OnSelectedIndexChanged="ddl_newdishes_type_SelectedIndexChanged" AutoPostBack="True"></asp:DropDownList>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container row">

                <div class="col-sm">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-dishes_method">烹飪手法</span>
                        </div>
                        <div>
                            <asp:DropDownList ID="ddl_cooking_method" runat="server" class="form-select" aria-describedby="inputGroup-dishes_method" OnSelectedIndexChanged="ddl_cooking_method_SelectedIndexChanged" AutoPostBack="True"></asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-dishes_material">食材</span>
                        </div>
                        <div>
                            <input type="text" id="dishes_material_text" name="dishes_material_text" class="form-control" aria-label="Default" aria-describedby="inputGroup-dishes_material" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container row">

                <div class="col-sm">
                    <div class="form-inline">
                        <div class="form-group d-flex align-items-center justify-content-start">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-time-consuming_switch">前置耗時</span>
                                </div>
                                <div class="col align-self-center">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="time-consuming_switch" name="time-consuming_switch" aria-describedby="inputGroup-time-consuming_switch">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-cooking_time">烹飪時間</span>
                        </div>
                        <div>
                            <input type="text" id="dishes_cooking_time_text" name="dishes_cooking_time_text" class="form-control" aria-label="Default" aria-describedby="inputGroup-cooking_time" />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="container" id="test_div" name="test_div">
                <asp:GridView ID="gv_view" runat="server" OnRowDataBound="gv_view_RowDataBound" Class="table" RowStyle-CssClass="GvGrid">
                </asp:GridView>
                <%--                <div id="alert">
                    <p>提醒即將跳轉至菜色頁面</p>
                    <button id="close" onclick="closeDialog()">取消</button>
                    <button id="jump_page" onclick="jumpDialog()">跳轉</button>
                </div>--%>
            </div>
            <%--<p class="lead">主頁面用於查詢/觀看 菜品相關資訊</p>
            <img src="images/菜色查詢.png" alt="菜色查詢" class="img-thumbnail img-fluid">--%>
        </section>
    </main>
<%--    <script>
        $(function () {
            $("#dishes_name_text").change(function () {
                console.log($('#dishes_name_text').val());
                //$.ajax({
                    
                //    ////post
                //    //type: "Post",
                //    //url: "Default.aspx/dishes_name_text_TextChanged",
                //    //contentType: "application/json; charset=utf-8",
                //    //data: JSON.stringify($('dishes_name_text').val()),
                //    //dataType: "json",
                //    //contentType: "application/json",
                //    //success: function (data) {
                //    //    alert(data.d);
                //    //},
                //    //error: function (err) {
                //    //    alert(err);
                //    //}
                //});
                //
                //return false;
            });
        });

    </script>--%>
</asp:Content>

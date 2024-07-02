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
    <script src="Scripts/RootPage/Default.js"></script>
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

                <%--<div class="col-sm">
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
                </div>--%>
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
            </div>
            <%--<p class="lead">主頁面用於查詢/觀看 菜品相關資訊</p>
            <img src="images/菜色查詢.png" alt="菜色查詢" class="img-thumbnail img-fluid">--%>
        </section>
    </main>
</asp:Content>

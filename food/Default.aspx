<%@ Page Title="Hochi dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="food._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Content/RootPages/Default.css" rel="stylesheet" />
    <script src="Scripts/RootPage/Default.js"></script>
    <main>
        <br />
        <br />
        <br />
        <section class="row" aria-labelledby="aspnetTitle">
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
            <hr />
            <div class="container" id="test_div" name="test_div">
                <asp:GridView ID="gv_view" runat="server" OnRowDataBound="gv_view_RowDataBound" Class="table" RowStyle-CssClass="GvGrid">
                </asp:GridView>
            </div>
        </section>
    </main>
</asp:Content>

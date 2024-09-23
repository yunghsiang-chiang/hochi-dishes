<%@ Page Title="New dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="New_dishes.aspx.cs" Inherits="food.New_dishes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Scripts/RootPage/New_dishes.js"></script>
    <script src="Scripts/RootPage/FileSaver.js"></script>
    <script src="Scripts/RootPage/jquery.wordexport.js"></script>
    <main aria-labelledby="title" id="page-content">
        <br />
        <br />
        <br />
        <section>
            <div class="row" id="control_items">
                <div class="col">
                    <button type="button" id="bt_newdishes_save" class="btn btn-success btn-lg">儲存</button>
                </div>
                <div class="col">
                    <button type="button" id="bt_newdishes_print" class="btn btn-secondary btn-lg">列印</button>
                </div>
                <div class="col">
                </div>
                <div class="col">
                </div>
            </div>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>一、菜色名稱</td>
                        <td>
                            <input type="text" id="dishesName" class="form-control" aria-label="dishesName">
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>二、依順序</td>
                        <td>
                            <asp:DropDownList ID="ddl_newdishes_type" runat="server" class="form-select"></asp:DropDownList></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>三、依烹飪手法</td>
                        <td>
                            <asp:DropDownList ID="ddl_cooking_method" runat="server" class="form-select"></asp:DropDownList></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table>
                <tr>
                    <td>四、添加食材</td>
                </tr>
            </table>
            <div class="container row" id="div_material">
                <div class="col">食材名稱</div>
                <div class="col">食材用量</div>
                <div class="col">
                    單位
                    <button type="button" id="btn_material" class="btn btn-success btn-sm">➕</button>
                </div>
            </div>
            <div class="container row" id="div_seasoning">
                <div class="col">調味名稱</div>
                <div class="col">調味用量</div>
                <div class="col">
                    單位
                    <button type="button" id="btn_seasoning" class="btn btn-success btn-sm">➕</button>
                </div>
            </div>
            <hr />
            <table>
                <tr>
                    <td>五、烹飪步驟</td>
                </tr>
            </table>
            <div class="container row">
                <div class="col-sm-6">
                    <string>請點選</string>
                    <button type="button" id="btn_step" class="btn btn-success btn-sm">➕</button>
                    <div class="container" id="cooking_step">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="input-group row">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">六、介紹/叮嚀</span>
                        </div>
                        <textarea class="form-control" id="dishesCommentary" rows="5" cols="50"></textarea>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">烹飪分鐘</span>
                        </div>
                        <input type="text" id="cooking_time" class="form-control" aria-label="Amount">
                    </div>
                    <div class="file-upload-container">
                        <string>照片上傳/觀看</string>
                        <input accept="image/*" type='file' id="imgInp" />
                        <img id="blah" src="#" alt="your image" class="img-thumbnail img-fluid" runat="server" />
                    </div>
                </div>
            </div>
        </section>
    </main>
</asp:Content>

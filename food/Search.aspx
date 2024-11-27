<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Search.aspx.cs" Inherits="food.Search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

    <div class="container">
        <h2 class="mt-4">班會搜尋</h2>
        <div class="row mb-3">
            <div class="col-md-4">
                <label for="keyword" class="form-label">關鍵字</label>
                <input type="text" id="keyword" class="form-control" placeholder="請輸入班會名稱">
            </div>
            <div class="col-md-3">
                <label for="startDate" class="form-label">開始日期</label>
                <input type="text" id="startDate" class="form-control datepicker" placeholder="YYYY-MM-DD">
            </div>
            <div class="col-md-3">
                <label for="endDate" class="form-label">結束日期</label>
                <input type="text" id="endDate" class="form-control datepicker" placeholder="YYYY-MM-DD">
            </div>
            <div class="col-md-2 align-self-end">
                <button type="button" id="searchBtn" class="btn btn-primary">搜尋</button>
            </div>
        </div>

        <div id="resultSection" style="display: none;">
            <h3 class="mt-4">搜尋結果</h3>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>項目</th>
                        <th>名稱</th>
                        <th>開始日期</th>
                        <th>結束日期</th>
                        <th>當天日期</th>
                        <th>餐別</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="resultTableBody">
                    <!-- 動態填充 -->
                </tbody>
            </table>
        </div>

        <!-- Dialog -->
        <div id="dialog" title="活動詳細資訊">
            <p>活動 ID: <span id="dialogItem"></span></p>
            <ul id="dialogRecipeList">
            </ul>

            <div id="dialogFooter"></div>

            <div class="mb-3 mt-3">
                <label for="activitySelector" class="form-label">選擇活動</label>
                <select id="activitySelector" class="form-select">
                    <option value="">請選擇活動</option>
                </select>
            </div>

            <button type="button" id="submitOrder" class="btn btn-primary mt-3">提交點菜清單</button>
            
        </div>

        <div id="addRecipeDialog" title="新增菜色" style="display: none;">
            <label for="mainIngredientSelect">主食材:</label>
            <select id="mainIngredientSelect" class="form-control"></select>

            <label for="categorySelect">類型:</label>
            <select id="categorySelect" class="form-control"></select>

            <label for="methodSelect">方式:</label>
            <select id="methodSelect" class="form-control"></select>

            <label for="recipeNameSelect">菜名:</label>
            <select id="recipeNameSelect" class="form-control"></select>


        </div>
    </div>


    <link href="Content/Rootpage/Search.css" rel="stylesheet" />
    <script src="Scripts/Rootpage/Search.js"></script>

</asp:Content>

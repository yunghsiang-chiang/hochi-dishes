<%@ Page Title="Hochi dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="food._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container">
        <div class="row">
            <!-- 點菜清單側欄 -->
            <div class="col-md-3">
                <div class="mt-5">
                    <h3>點菜清單</h3>
                    <ul id="orderList" class="list-group">
                        <!-- 已點的食譜會顯示在這裡 -->
                    </ul>
                </div>
            </div>

            <!-- 主內容區域 -->
            <div class="col-md-9">
                <h2>分類展示</h2>
                <div id="category-section" class="row">
                    <div class="col-md-12">
                        <h3>主食</h3>
                        <div class="row" id="staple-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>冷盤</h3>
                        <div class="row" id="cold-dish-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>熱炒</h3>
                        <div class="row" id="stir-fry-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>主菜</h3>
                        <div class="row" id="main-dish-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>炸類</h3>
                        <div class="row" id="fried-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>時蔬</h3>
                        <div class="row" id="vegetables-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>麵點</h3>
                        <div class="row" id="noodle-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>湯品</h3>
                        <div class="row" id="soup-section"></div>
                    </div>
                    <div class="col-md-12">
                        <h3>甜湯</h3>
                        <div class="row" id="dessert-soup-section"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 食譜列表模態視窗 -->
    <div class="modal fade" id="recipeListModal" tabindex="-1" role="dialog" aria-labelledby="recipeListModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="recipeListModalLabel">Recipe List</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul id="recipeListItems" class="list-group"></ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 食譜詳細資訊模態視窗 -->
    <div class="modal fade" id="recipeDetailModal" tabindex="-1" role="dialog" aria-labelledby="recipeDetailModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="recipeDetailModalLabel">Recipe Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5 id="detailRecipeName"></h5>
                    <p><strong>Category:</strong> <span id="detailCategory"></span></p>
                    <p><strong>Chef:</strong> <span id="detailChef"></span></p>
                    <p><strong>Description:</strong> <span id="detailDescription"></span></p>
                    <h6>Unit Conversion</h6>
                    <select id="unitSelector" class="form-select mb-3">
                        <option value="grams">克</option>
                        <option value="kilograms">公斤</option>
                        <option value="pounds">磅</option>
                        <option value="ounces">盎司</option>
                        <option value="tael">兩</option>
                        <option value="catty">台斤</option>
                    </select>
                    <h6>Steps</h6>
                    <ul id="detailStepsList" class="list-group"></ul>
                    <h6>Ingredients</h6>
                    <ul id="detailIngredientsList" class="list-group"></ul>
                    <h6>Seasonings</h6>
                    <ul id="detailSeasoningsList" class="list-group"></ul>
                </div>

            </div>
        </div>
    </div>

    <link href="Content/RootPage/Default.css" rel="stylesheet" />
    <script src="Scripts/RootPage/Default.js"></script>
</asp:Content>

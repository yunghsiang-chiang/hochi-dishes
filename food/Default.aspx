<%@ Page Title="Hochi dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="food._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Content/RootPage/Default.css" rel="stylesheet" />
    <script src="Scripts/RootPage/Default.js"></script>

    <div class="container">
        <h2 class="text-center">Hochi Dishes</h2>

        <!-- 主食材清單 -->
        <div id="mainIngredientList" class="row ingredient-list">
            <!-- 動態插入主食材項目 -->
        </div>

        <!-- 烹飪方式 icon 列表 -->
        <div id="cookingMethodIcons" class="row cooking-method-icons" style="display: none;">
            <!-- 動態插入烹飪方式 icon -->
        </div>

        <!-- 食譜清單 -->
        <div id="recipeList" class="row recipe-list" style="display: none;">
            <ul id="recipeItems" class="list-group w-100">
                <!-- 動態插入食譜清單項目 -->
            </ul>
        </div>

        <!-- 食譜詳細資訊模態視窗 -->
        <div class="modal fade" id="recipeDetailModal" tabindex="-1" role="dialog" aria-labelledby="recipeDetailLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="recipeDetailLabel">Recipe Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5 id="detailRecipeName"></h5>
                        <p><strong>Category:</strong> <span id="detailCategory"></span></p>
                        <p><strong>Chef:</strong> <span id="detailChef"></span></p>
                        <p><strong>Description:</strong> <span id="detailDescription"></span></p>
                        
                        <h6>Steps</h6>
                        <ul id="detailStepsList" class="list-group">
                            <!-- 動態插入步驟 -->
                        </ul>
                        
                        <h6>Ingredients</h6>
                        <ul id="detailIngredientsList" class="list-group">
                            <!-- 動態插入食材 -->
                        </ul>
                        
                        <h6>Seasonings</h6>
                        <ul id="detailSeasoningsList" class="list-group">
                            <!-- 動態插入調味料 -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

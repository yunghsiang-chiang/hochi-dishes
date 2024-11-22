<%@ Page Title="Recipe Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="recipe.aspx.cs" Inherits="food.FoodAdmin.recipe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/recipe.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2 class="text-center mb-4">Recipe Management</h2>

        <!-- 第一階段：Recipe 基本信息 -->
        <div id="step1Section" class="mb-4">
            <h4 class="mb-3">Step 1: Add Recipe Information</h4>
            <div id="recipeForm">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="recipe_name">Recipe Name</label>
                            <input type="text" id="recipe_name" name="recipe_name" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="main_ingredient_id">Main Ingredient</label>
                            <select id="main_ingredient_id" name="main_ingredient_id" class="form-control" required></select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select id="category" name="category" class="form-control" required></select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="chef_id">Chef</label>
                            <select id="chef_id" name="chef_id" class="form-control" required></select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="description">Description</label>
                            <select id="description" name="description" class="form-control">
                                <option value="主食">主食</option>
                                <option value="冷盤">冷盤</option>
                                <option value="熱炒">熱炒</option>
                                <option value="主菜">主菜</option>
                                <option value="炸類">炸類</option>
                                <option value="時蔬">時蔬</option>
                                <option value="麵點">麵點</option>
                                <option value="湯品">湯品</option>
                                <option value="甜湯">甜湯</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary mt-2" id="saveRecipeBtn">Save Recipe</button>
            </div>
        </div>

        <!-- 第二階段：Recipe 步驟、食材、調味料 -->
        <div id="step2Section" style="display: none;" class="mb-4">
            <h4 class="mb-3">Step 2: Add Recipe Steps, Ingredients, and Seasonings</h4>

            <h5>Steps</h5>
            <div class="table-responsive">
                <table id="recipeStepsTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <button type="button" class="btn btn-secondary mt-2 mb-4" id="addStep">Add Step</button>

            <h5>Ingredients</h5>
            <div class="table-responsive">
                <table id="ingredientsTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ingredient Name</th>
                            <th>Amount</th>
                            <th>Unit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <button type="button" class="btn btn-secondary mt-2 mb-4" id="addIngredient">Add Ingredient</button>

            <h5>Seasonings</h5>
            <div class="table-responsive">
                <table id="seasoningsTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Seasoning Name</th>
                            <th>Amount</th>
                            <th>Unit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <button type="button" class="btn btn-secondary mt-2" id="addSeasoning">Add Seasoning</button>
            <br />
            <button type="button" class="btn btn-success mt-4" id="submitStepIngredientBtn">Save Steps, Ingredients, and Seasonings</button>
        </div>

        <!-- 查詢食譜區 -->
        <h4 class="mb-3">Available Recipes</h4>
        <div class="table-responsive mb-4">
            <table id="recipeListTable" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Recipe ID</th>
                        <th>Recipe Name</th>
                        <th>Category</th>
                        <th>Chef</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <!-- Recipe 詳細資訊模態視窗 -->
        <div class="modal fade" id="recipeDetailModal" tabindex="-1" role="dialog" aria-labelledby="recipeDetailLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
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
                        <ul id="detailStepsList"></ul>

                        <h6>Ingredients</h6>
                        <ul id="detailIngredientsList"></ul>

                        <h6>Seasonings</h6>
                        <ul id="detailSeasoningsList"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

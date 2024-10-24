<%@ Page Title="Recipe Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="recipe.aspx.cs" Inherits="food.FoodAdmin.recipe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/recipe.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2>Recipe Management</h2>

        <!-- 第一階段：Recipe 基本信息 -->
        <div id="step1Section">
            <h4>Step 1: Add Recipe Information</h4>
            <!-- 保留 id="recipeForm"，但不需要再嵌套 <form> 標籤 -->
            <div id="recipeForm">
                <div class="form-group">
                    <label for="recipe_name">Recipe Name</label>
                    <input type="text" id="recipe_name" name="recipe_name" class="form-control" required />
                </div>

                <div class="form-group">
                    <label for="main_ingredient_id">Main Ingredient</label>
                    <select id="main_ingredient_id" name="main_ingredient_id" class="form-control" required></select>
                </div>

                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category" class="form-control" required></select>
                </div>

                <div class="form-group">
                    <label for="chef_id">Chef</label>
                    <select id="chef_id" name="chef_id" class="form-control" required></select>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" name="description" class="form-control" />
                </div>

                <button type="button" class="btn btn-primary" id="saveRecipeBtn">Save Recipe</button>
            </div>
        </div>

        <!-- 第二階段：Recipe 步驟、食材、調味料 -->
        <div id="step2Section" style="display: none;">
            <h4>Step 2: Add Recipe Steps, Ingredients, and Seasonings</h4>

            <h5>Steps</h5>
            <table id="recipeStepsTable" class="table">
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
            <button type="button" class="btn btn-secondary" id="addStep">Add Step</button>

            <h5>Ingredients</h5>
            <table id="ingredientsTable" class="table">
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
            <button type="button" class="btn btn-secondary" id="addIngredient">Add Ingredient</button>

            <h5>Seasonings</h5>
            <table id="seasoningsTable" class="table">
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
            <button type="button" class="btn btn-secondary" id="addSeasoning">Add Seasoning</button>

            <button type="button" class="btn btn-success" id="submitStepIngredientBtn">Save Steps, Ingredients, and Seasonings</button>
        </div>
    </div>
</asp:Content>

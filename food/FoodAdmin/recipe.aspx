<%@ Page Title="Recipe Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="recipe.aspx.cs" Inherits="food.FoodAdmin.recipe" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/recipe.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2>Recipe Management</h2>
        <div class="form-group">
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" class="form-control" placeholder="Enter recipe name" />
        </div>
        <div class="form-group">
            <label for="recipeDescription">Description:</label>
            <textarea id="recipeDescription" class="form-control" placeholder="Enter recipe description"></textarea>
        </div>
        <div class="form-group">
            <label for="mainIngredient">Main Ingredient:</label>
            <select id="mainIngredient" class="form-control"></select>
        </div>
        <div class="form-group">
            <label for="recipeCategory">Category:</label>
            <select id="recipeCategory" class="form-control"></select>
        </div>
        <div class="form-group">
            <label for="chef">Chef:</label>
            <select id="chef" class="form-control"></select>
        </div>
        <input type="hidden" id="recipeId" value="" />
        <button id="submitRecipe" class="btn btn-primary">Save Recipe</button>
        <button id="deleteRecipe" class="btn btn-danger">Delete Recipe</button>

        <hr />

        <h3>Recipe Steps</h3>
        <table class="table table-bordered" id="recipeStepsTable">
            <thead>
                <tr>
                    <th>Step Number</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Recipe steps will be dynamically populated -->
            </tbody>
        </table>
        <button type="button" id="addStep" class="btn btn-success">Add Step</button>

        <hr />

        <h3>Existing Recipes</h3>
        <table class="table table-bordered" id="recipeTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Main Ingredient</th>
                    <th>Category</th>
                    <th>Chef</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</asp:Content>

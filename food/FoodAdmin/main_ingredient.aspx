<%@ Page Title="Main Ingredient Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="main_ingredient.aspx.cs" Inherits="food.FoodAdmin.main_ingredient" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/main_ingredient.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2>Main Ingredient Management</h2>
        <div class="form-group">
            <label for="mainIngredientName">Main Ingredient Name:</label>
            <input type="text" id="mainIngredientName" class="form-control" placeholder="Enter main ingredient name" />
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" class="form-control" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group">
            <label for="category">Category:</label>
            <input type="text" id="category" class="form-control" placeholder="Enter category" />
        </div>
        <input type="hidden" id="mainIngredientId" value="" />
        <button id="submitMainIngredient" class="btn btn-primary">Submit</button>
        <button id="deleteMainIngredient" class="btn btn-danger">Delete</button>

        <hr />

        <h3>Existing Main Ingredients</h3>
        <table class="table table-bordered" id="mainIngredientTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</asp:Content>

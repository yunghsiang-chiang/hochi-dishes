<%@ Page Title="Ingredient Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="ingredient.aspx.cs" Inherits="food.FoodAdmin.ingredient" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/ingredient.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2 class="text-center mb-4">Ingredient Management</h2>

        <!-- 新增或修改區域 -->
        <div class="mb-4">
            <h4>Add or Edit Ingredient</h4>
            <div id="ingredientForm">
                <div class="mb-3">
                    <label for="ingredient_name" class="form-label">Ingredient Name</label>
                    <input type="text" class="form-control" id="ingredient_name" placeholder="Enter ingredient name" required />
                </div>
                <div class="mb-3">
                    <label for="common_name" class="form-label">Common Name (Optional)</label>
                    <input type="text" class="form-control" id="common_name" placeholder="Enter common name(s)" />
                </div>
                <button type="button" class="btn btn-primary" id="saveIngredientBtn">Save Ingredient</button>
                <input type="hidden" id="ingredient_id" value="" />
            </div>
        </div>

        <hr />

        <!-- 食材清單 -->
        <div>
            <h4>Ingredient List</h4>
            <table class="table table-bordered" id="ingredientTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ingredient Name</th>
                        <th>Common Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</asp:Content>

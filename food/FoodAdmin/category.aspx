<%@ Page Title="Category Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="category.aspx.cs" Inherits="food.FoodAdmin.category" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="../Scripts/FoodAdmin/category.js"></script>
    <div class="container">
        <h2>Category Management</h2>
        <div class="form-group">
            <label for="categoryName">Category Name:</label>
            <input type="text" id="categoryName" class="form-control" />
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label for="icon">Icon URL:</label>
            <input type="text" id="icon" class="form-control" placeholder="Enter the URL of the icon image" />
        </div>
        <input type="hidden" id="categoryId" value="" />
        <button id="submitCategory" class="btn btn-primary">Submit</button>

        <hr />

        <h3>Existing Categories</h3>
        <table class="table table-bordered" id="categoryTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Icon</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</asp:Content>

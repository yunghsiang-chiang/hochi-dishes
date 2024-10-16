<%@ Page Title="Chef Management" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="chef.aspx.cs" Inherits="food.FoodAdmin.chef" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/chef.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2>Chef Management</h2>
        <div class="form-group">
            <label for="chefName">Chef Name:</label>
            <input type="text" id="chefName" class="form-control" placeholder="Enter chef name" />
        </div>
        <div class="form-group">
            <label for="region">Region:</label>
            <input type="text" id="region" class="form-control" placeholder="Enter chef region" />
        </div>
        <input type="hidden" id="chefId" value="" />
        <button id="submitChef" class="btn btn-primary">Submit</button>

        <hr />

        <h3>Existing Chefs</h3>
        <table class="table table-bordered" id="chefTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Region</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</asp:Content>

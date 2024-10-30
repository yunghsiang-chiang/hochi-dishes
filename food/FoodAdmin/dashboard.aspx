<%@ Page Title="" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="food.FoodAdmin.dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../Scripts/FoodAdmin/dashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <h2 class="text-center mb-4">食譜類別數量統計</h2>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <canvas id="recipeChart"></canvas>
            </div>
        </div>
    </div>
</asp:Content>

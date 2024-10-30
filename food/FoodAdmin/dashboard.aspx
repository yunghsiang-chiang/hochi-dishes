<%@ Page Title="" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="food.FoodAdmin.dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../Scripts/FoodAdmin/dashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2>食譜類別數量統計</h2>
    <canvas id="recipeChart" width="400" height="200"></canvas>
</asp:Content>

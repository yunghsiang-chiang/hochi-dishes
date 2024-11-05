<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dishes_picture_introduction.aspx.cs" Inherits="food.Dishes_picture_introduction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container mt-5">
        <h2 class="text-center">主廚食譜數量</h2>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <!-- Chart Canvas -->
                <canvas id="chefRecipeChart"></canvas>
            </div>
        </div>
    </div>

    <!-- 引入 Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- 引入 jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- 引入自訂 JS 檔案 -->
    <script src="Scripts/RootPage/Dishes_picture_introduction.js"></script>
</asp:Content>

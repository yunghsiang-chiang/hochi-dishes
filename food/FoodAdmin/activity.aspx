<%@ Page Title="活動設定" Language="C#" MasterPageFile="~/wpadmin.Master" AutoEventWireup="true" CodeBehind="activity.aspx.cs" Inherits="food.FoodAdmin.activity" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/FoodAdmin/activity.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container mt-5">
        <h2 class="mb-4">活動設定</h2>
        
        <!-- 活動設定輸入區 -->
        <div class="mb-3">
            <label for="activity_name" class="form-label">活動名稱</label>
            <input type="text" class="form-control" id="activity_name" required>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="start_date" class="form-label">活動起始日期</label>
                <input type="date" class="form-control" id="start_date" required>
            </div>
            <div class="col">
                <label for="end_date" class="form-label">活動結束日期</label>
                <input type="date" class="form-control" id="end_date" required>
            </div>
        </div>
        <button type="button" class="btn btn-primary" id="generateMeals">生成餐點選擇</button>

        <!-- 餐點選擇區域 -->
        <div class="mt-4" id="mealSelectionArea" style="display: none;">
            <h4>選擇餐別</h4>
            <div id="mealSelectionContainer"></div>
        </div>

        <!-- 儲存活動按鈕 -->
        <button type="button" class="btn btn-success mt-4" id="saveActivities" style="display: none;">儲存活動</button>
    </div>
</asp:Content>

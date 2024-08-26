<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dishes_picture_introduction.aspx.cs" Inherits="food.Dishes_picture_introduction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <br />
    <br />
    <br />
    <style>
        /* 對於整個頁面進行一些基礎的設置 */
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center; /* 讓主容器居中 */
            align-items: center; /* 垂直居中 */
            height: 100vh; /* 讓 body 填滿整個視口高度 */
            background-color: #f0f0f0;
        }
        /* 父容器的樣式 */
        .parent-container {
            display: flex; /* 使用 Flexbox 來實現水平展示 */
            gap: 10px; /* 子容器之間的間距 */
            padding: 20px; /* 父容器的內邊距 */
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px; /* 父容器邊角圓潤 */
        }

        /* 子容器的樣式 */
        .child-container {
            flex: 1; /* 使每個子容器等分父容器的寬度 */
            background-color: #4CAF50; /* 背景顏色 */
            color: white; /* 字體顏色 */
            padding: 20px; /* 內邊距 */
            text-align: center; /* 文字居中 */
            border-radius: 4px; /* 子容器邊角圓潤 */
            box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 子容器的陰影效果 */
        }

        /* 圖片的樣式 */
        .child-container img {
            max-width: 100%; /* 圖片的最大寬度為容器的 100% */
            height: auto; /* 高度自動調整以保持圖片比例 */
            border-radius: 4px; /* 圖片邊角圓潤 */
            display: block; /* 移除圖片的底部空白 */
            margin: 0 auto; /* 使圖片在子容器中水平居中 */
        }

        /* 響應式設計：在螢幕寬度小於 768px 時，取消水平並排展示 */
        @media (max-width: 768px) {
            .parent-container {
                flex-direction: column; /* 改為垂直排列 */
                gap: 10px; /* 保持子容器之間的間距 */
            }
        }

    </style>
    <div class="parent-container" id="dishes_menu">
        <div class="child-container">
            <div class="widget-container widget-image">
                <style>
                    /*! elementor - v3.23.0 - 05-08-2024 */
                    .widget-image {
                        text-align: center
                    }

                        .widget-image a {
                            display: inline-block
                        }

                        .widget-image img {
                            vertical-align: middle;
                            display: inline-block
                        }
                </style>
                <img fetchpriority="high" decoding="async" src="http://10.10.3.75:8080/images/素食.jpg">
            </div>
        </div>
        <div class="child-container"></div>
        <div class="child-container"></div>
    </div>
</asp:Content>

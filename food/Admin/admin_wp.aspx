<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin_wp.aspx.cs" Inherits="food.Admin.admin_wp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>菜色管理後台</title>
    <webopt:BundleReference runat="server" Path="~/Content/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css" />
    <script src="../Scripts/jquery-3.7.0.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/Admin/admin_wp.js"></script>
</head>
<body>
    <style>
        .seasoning-method {
            margin-bottom: 20px;
        }

            .seasoning-method h2 {
                color: #2c3e50;
            }
    </style>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <ajaxToolkit:TabContainer ID="TabContainer1" runat="server">
            <ajaxToolkit:TabPanel ID="TabPanel1" runat="server">
                <HeaderTemplate>參數設定</HeaderTemplate>
                <ContentTemplate>
                    <div class="container">
                        <section>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            單位管理
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <h2>食材單位介紹</h2>

                                            <h3>重量單位</h3>
                                            <ul>
                                                <li>克（g）：例如，100克麵粉、50克糖。 </li>
                                                <li>公斤（kg）：例如，1公斤馬鈴薯、0.5公斤雞胸肉。 </li>
                                                <li>盎司（oz）：例如，4盎司牛排、2盎司巧克力。 </li>
                                                <li>斤（tkg）：例如，1台斤油麵。1 台斤 = 600 公克（g）、1 台斤 = 0.6 公斤（kg）</li>
                                            </ul>

                                            <h3>容量單位</h3>
                                            <ul>
                                                <li>毫升（ml）：例如，250毫升牛奶、100毫升橄欖油。 </li>
                                                <li>升（L）：例如，1公升果汁、5公升橄欖油。 </li>
                                            </ul>

                                            <h3>數量單位</h3>
                                            <ul>
                                                <li>個（個）：例如，3個蘋果、6個雞蛋。 </li>
                                                <li>片（slice）：例如，2片麵包、4片火腿。 </li>
                                                <li>塊（piece）：例如，1塊巧克力、4塊餅乾。 </li>
                                            </ul>

                                            <h3>容器單位</h3>
                                            <ul>
                                                <li>杯（cup）：例如，1杯麵粉、半杯牛奶。 </li>
                                                <li>茶匙（tsp）和湯匙（tbsp）：例如，1茶匙鹽、2湯匙橄欖油。 </li>
                                            </ul>

                                            <h3>面積單位</h3>
                                            <ul>
                                                <li>平方公尺（m²）：例如，1平方公尺披薩餅皮。 </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            烹飪方式
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <table class="table table-striped" id="method-table-container">
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            調味管理
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <table class="table table-striped" id="seasoning_table">
                                            </table>
                                            <%--                           <div class="container" id="seasoning_container">
                                            </div>--%>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel2" runat="server">
                <HeaderTemplate>食材管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>食材筆數1千多、91個營養欄位 全部顯示沒有必要也沒有意義</string></h2>
                    <div class="container">
                        <div class="row">
                            <div class="container condition_filter">
                                <select class="form-select" id="food_nutrition_category">
                                </select>
                            </div>
                            <div class="container food_nutirtion">
                                <table class="table table-bordered" id="food_nutirtion_dt">
                                </table>
                            </div>
                        </div>
                    </div>
                    <p>預計設計 "可選擇" 即將顯示欄位</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel3" runat="server">
                <HeaderTemplate>菜色管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>主廚於前台可以新增 菜色，但後台 服務體能修改與停止菜色</string></h2>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-4">
                                <select class="form-select" id="dishes_name"></select>
                            </div>
                            <div class="col-lg-8">
                                <div class="row">
                                    <div class="col dishes_name">菜單名稱</div>
                                </div>
                                <div class="row">
                                    <div class="col dishes_type">菜品類型</div>
                                </div>
                                <div class="row">
                                    <div class="col cooking_method">烹飪方式</div>
                                </div>
                                <div class="row">
                                    <div class="material_id_names">食材名稱-數量-單位</div>
                                </div>
                                <div class="row">
                                    <div class="cooking_step">烹飪步驟，步驟之間使用:區隔</div>
                                </div>
                                <div class="row">
                                    <div class="cooking_time">烹飪時間 單位:分鐘</div>
                                </div>
                                <div class="row">
                                    <div class="seasoning">調味品</div>
                                </div>
                                <div class="row">
                                    <div class="dishes_image">菜品照片Urls</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>搜尋功能 與前台相同，但後台管理不考慮手機介面體驗</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel4" runat="server">
                <HeaderTemplate>菜單管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>菜單管理雷同菜色，菜單 用"餐"區分 而 菜色 用"道"</string></h2>
                    <p>好比午餐有6道菜，因此會有"時間/時機"資訊</p>
                    <p>餐別有</p>
                    <p>早餐</p>
                    <p>午餐</p>
                    <p>晚餐</p>
                    <p>輕午餐</p>
                    <p>輕晚餐</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel5" runat="server">
                <HeaderTemplate>課程活動菜單管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>活動會有天數/主題/時間區間</string></h2>
                    <p>在起初2022年規劃中 希望從活動報名資訊連接人數</p>
                    <p>並且建立菜單後會有食材用量評估採購單</p>
                    <p>方便目視需要好比日曆一次呈現多天</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel6" runat="server">
                <HeaderTemplate>報表分析</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>費用/回饋 分析報表</string></h2>
                    <p>活動/班會 食材開銷表</p>
                    <p>菜色問卷統計分析表</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel7" runat="server">
                <HeaderTemplate>採購管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>2024 5月會議提到廠商資訊管理</string></h2>
                    <p>廠商資訊:名稱/電話/地址/備註</p>
                    <p>採購金額/品項/數量</p>
                    <p>鑒於傳統市場沒有細項,因此廠商備註資訊與發生金額就變成很重要!!!</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel8" runat="server">
                <HeaderTemplate><a href="http://10.10.3.75:8080">回前台</a></HeaderTemplate>
                <ContentTemplate></ContentTemplate>
            </ajaxToolkit:TabPanel>
        </ajaxToolkit:TabContainer>
    </form>
</body>
</html>

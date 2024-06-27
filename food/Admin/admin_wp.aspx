<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin_wp.aspx.cs" Inherits="food.Admin.admin_wp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>菜色管理後台</title>
    <webopt:BundleReference runat="server" Path="~/Content/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.3/themes/smoothness/jquery-ui.css" />
    <script src="../Scripts/bootstrap.min.js"></script>
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
                                            <div class="cooking-method">
                                                <h2>三杯</h2>
                                                <p>三杯是一種經典的台灣料理，使用三種主要調料：米酒、醬油和麻油，通常用於雞肉或海鮮。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>川燙</h2>
                                                <p>川燙是指將食材短時間放入沸水中煮熟，然後立即取出，以保留食材的鮮嫩口感。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>豆鼓</h2>
                                                <p>豆鼓是使用發酵過的黑豆，加入醬油等調料烹調，常用於魚類或肉類料理中。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>咖哩</h2>
                                                <p>咖哩是一種使用多種香料混合而成的醬料，用於燉煮各種肉類和蔬菜，風味濃郁。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>油炸</h2>
                                                <p>油炸是將食材浸入高溫油中，快速煮熟並形成金黃色酥脆外皮的烹飪方式。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>紅燒</h2>
                                                <p>紅燒是指使用醬油、糖、料酒等調料，長時間燉煮，使食材入味且呈現紅色。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>乾煎</h2>
                                                <p>乾煎是指在少量油或無油的情況下，將食材在鍋中煎至金黃酥脆。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>乾煸</h2>
                                                <p>乾煸是將食材先煸炒去水分，再加入調料進行烹調，使食材更具嚼勁。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>涼拌</h2>
                                                <p>涼拌是將煮熟或生的食材，加入調料拌勻，通常作為涼菜或開胃菜。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>清炒</h2>
                                                <p>清炒是使用少量油快速翻炒食材，保留食材的鮮嫩和營養。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>清蒸</h2>
                                                <p>清蒸是將食材放在蒸籠中蒸熟，保持食材原汁原味，適合海鮮和嫩蔬菜。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>焗烤</h2>
                                                <p>焗烤是將食材加上奶酪或醬料，放入烤箱中烤至金黃色。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>麻辣</h2>
                                                <p>麻辣是結合花椒的麻和辣椒的辣，用於火鍋或各種燒烤。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>酸辣</h2>
                                                <p>酸辣是使用醋和辣椒調味，常見於湯品和涼拌菜。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>熱炒</h2>
                                                <p>熱炒是指使用大火快速翻炒食材，保持食材的鮮嫩和風味。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>燉滷</h2>
                                                <p>燉滷是將食材放入醬汁中，長時間慢火燉煮，使味道滲透到食材中。</p>
                                            </div>

                                            <div class="cooking-method">
                                                <h2>糖醋</h2>
                                                <p>糖醋是使用糖和醋調製的醬汁，酸甜開胃，常用於魚類和肉類料理。</p>
                                            </div>
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
                                            <div class="seasoning-method">
                                                <h2>糖</h2>
                                                <p>糖是常用的調味料，能夠增加食物的甜味，平衡酸味或辣味。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>鹽</h2>
                                                <p>鹽是基本的調味料，能夠提升食物的風味，並用於保存食物。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>高鮮</h2>
                                                <p>高鮮是一種調味粉，能夠增加食物的鮮味，常用於湯品和炒菜。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>米酒</h2>
                                                <p>米酒用於去腥增香，常在烹調魚肉或海鮮時使用。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>醬油膏</h2>
                                                <p>醬油膏是一種濃稠的醬油，適合用於醃漬和調味。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>醬油</h2>
                                                <p>醬油是中式料理中常用的調味料，具有鹹香味，用於各種烹飪方式。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>香油</h2>
                                                <p>香油是由芝麻製成的油，具有濃郁的香味，常用於涼拌或最後調味。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>胡椒粒</h2>
                                                <p>胡椒粒具有辛辣的味道，常用於肉類烹調，提升風味。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>胡椒鹽</h2>
                                                <p>胡椒鹽是胡椒和鹽的混合調味料，常用於烤肉或炒菜。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>素沙茶醬</h2>
                                                <p>素沙茶醬是一種以花生和香料製成的醬料，常用於素食火鍋或炒菜。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>素蠔油</h2>
                                                <p>素蠔油是一種用素食材料製成的調味醬，適合素食者使用，增加鮮味。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>香椿醬</h2>
                                                <p>香椿醬由香椿葉製成，具有獨特的香氣，常用於拌麵或炒菜。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>豆瓣醬</h2>
                                                <p>豆瓣醬是一種發酵的豆製品，味道濃郁，常用於川菜中。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>辣豆瓣醬</h2>
                                                <p>辣豆瓣醬是加入辣椒的豆瓣醬，味道辛辣濃郁，常用於麻辣料理。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>義大利香料</h2>
                                                <p>義大利香料是多種香草混合的調味料，常用於披薩、義大利麵等西式料理。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>迷迭香</h2>
                                                <p>迷迭香是一種具有松香味的香草，常用於烤肉和烤蔬菜。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>咖哩粉</h2>
                                                <p>咖哩粉是多種香料的混合粉末，用於製作咖哩菜餚，風味濃郁。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>豆鼓</h2>
                                                <p>豆鼓是一種發酵過的黑豆，具有獨特的香氣和味道，常用於魚類料理中。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>味增</h2>
                                                <p>味增是由大豆發酵而成的醬料，常用於味增湯或醃漬食材。</p>
                                            </div>

                                            <div class="seasoning-method">
                                                <h2>番茄醬</h2>
                                                <p>番茄醬是一種由番茄製成的醬料，味道酸甜，常用於意大利麵和漢堡。</p>
                                            </div>
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
                    <p>預計設計 "可選擇" 即將顯示欄位</p>
                </ContentTemplate>
            </ajaxToolkit:TabPanel>
            <ajaxToolkit:TabPanel ID="TabPanel3" runat="server">
                <HeaderTemplate>菜色管理</HeaderTemplate>
                <ContentTemplate>
                    <h2>
                        <string>主廚於前台可以新增 菜色，但後台 服務體能修改與停止菜色</string></h2>
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

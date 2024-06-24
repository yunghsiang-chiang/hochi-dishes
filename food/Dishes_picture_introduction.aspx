<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dishes_picture_introduction.aspx.cs" Inherits="food.Dishes_picture_introduction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <main>
        <section>
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="土耳其燉高麗菜佐油漬番茄"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="小黃瓜甜椒菇菇"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="山藥金針湯"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="山藥秋葵冷豆腐"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="午餐肉米餅"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="午餐肉壽司"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="古早味炸醬拌青松菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-label="四季豆豆皮捲佐堅果辣醬"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-label="味噌豆腐四季豆"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="9" aria-label="昆布佃煮蘿蔔"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="10" aria-label="油漬番茄烤蔬菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="11" aria-label="金平牛蒡"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="12" aria-label="金瓜炒米粉"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="13" aria-label="金針香菇炒豆皮"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="14" aria-label="南洋風四季豆涼拌冬粉"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="15" aria-label="皇帝豆燴植物肉丸"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="16" aria-label="香料茄汁煨時蔬"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="17" aria-label="香草小丸子燉菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="18" aria-label="烏克蘭蔬菜湯"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="19" aria-label="烤甜椒義大利麵"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="20" aria-label="乾煸四季豆"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="21" aria-label="涼拌龍鬚菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="22" aria-label="野菇南瓜燉飯"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="23" aria-label="麻油當歸青松菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="24" aria-label="焦糖南瓜布丁"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="25" aria-label="猴頭菇湯3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="26" aria-label="絲瓜豆腐煎餅"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="27" aria-label="菇菇燴豆腐"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="28" aria-label="黑豆桂圓甜湯"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="29" aria-label="蔓越莓時蔬優格捲"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="30" aria-label="衝菜"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="31" aria-label="醋鳳梨木耳炒豆皮"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="32" aria-label="醬燒皇帝豆炒豆包"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="http://10.10.3.75:8081/Upload/%E5%9C%9F%E8%80%B3%E5%85%B6%E7%87%89%E9%AB%98%E9%BA%97%E8%8F%9C%E4%BD%90%E6%B2%B9%E6%BC%AC%E7%95%AA%E8%8C%84.jpg" class="d-block w-100" alt="土耳其燉高麗菜佐油漬番茄" title="土耳其燉高麗菜佐油漬番茄">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%B0%8F%E9%BB%83%E7%93%9C%E7%94%9C%E6%A4%92%E8%8F%87%E8%8F%87.jpg" class="d-block w-100" alt="小黃瓜甜椒菇菇" title="小黃瓜甜椒菇菇">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%B1%B1%E8%97%A5%E9%87%91%E9%87%9D%E6%B9%AF.jpg" class="d-block w-100" alt="山藥金針湯" title="山藥金針湯">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%B1%B1%E8%97%A5%E7%A7%8B%E8%91%B5%E5%86%B7%E8%B1%86%E8%85%90.jpg" class="d-block w-100" alt="山藥秋葵冷豆腐" title="山藥秋葵冷豆腐">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%8D%88%E9%A4%90%E8%82%89%E7%B1%B3%E9%A4%85.jpg" class="d-block w-100" alt="午餐肉米餅" title="午餐肉米餅">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%8D%88%E9%A4%90%E8%82%89%E5%A3%BD%E5%8F%B8.jpg" class="d-block w-100" alt="午餐肉壽司" title="午餐肉壽司">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%8F%A4%E6%97%A9%E5%91%B3%E7%82%B8%E9%86%AC%E6%8B%8C%E9%9D%92%E6%9D%BE%E8%8F%9C.jpg" class="d-block w-100" alt="古早味炸醬拌青松菜" title="古早味炸醬拌青松菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%9B%9B%E5%AD%A3%E8%B1%86%E8%B1%86%E7%9A%AE%E6%8D%B2%E4%BD%90%E5%A0%85%E6%9E%9C%E8%BE%A3%E9%86%AC.jpg" class="d-block w-100" alt="四季豆豆皮捲佐堅果辣醬" title="四季豆豆皮捲佐堅果辣醬">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%91%B3%E5%99%8C%E8%B1%86%E8%85%90%E5%9B%9B%E5%AD%A3%E8%B1%86.jpg" class="d-block w-100" alt="味噌豆腐四季豆" title="味噌豆腐四季豆">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E6%98%86%E5%B8%83%E4%BD%83%E7%85%AE%E8%98%BF%E8%94%94.jpg" class="d-block w-100" alt="昆布佃煮蘿蔔" title="昆布佃煮蘿蔔">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E6%B2%B9%E6%BC%AC%E7%95%AA%E8%8C%84%E7%83%A4%E8%94%AC%E8%8F%9C.jpg" class="d-block w-100" alt="油漬番茄烤蔬菜" title="油漬番茄烤蔬菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%87%91%E5%B9%B3%E7%89%9B%E8%92%A1.jpg" class="d-block w-100" alt="金平牛蒡" title="金平牛蒡">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%87%91%E7%93%9C%E7%82%92%E7%B1%B3%E7%B2%89.jpg" class="d-block w-100" alt="金瓜炒米粉" title="金瓜炒米粉">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%87%91%E9%87%9D%E9%A6%99%E8%8F%87%E7%82%92%E8%B1%86%E7%9A%AE.jpg" class="d-block w-100" alt="金針香菇炒豆皮" title="金針香菇炒豆皮">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E5%8D%97%E6%B4%8B%E9%A2%A8%E5%9B%9B%E5%AD%A3%E8%B1%86%E6%B6%BC%E6%8B%8C%E5%86%AC%E7%B2%89.jpg" class="d-block w-100" alt="南洋風四季豆涼拌冬粉" title="南洋風四季豆涼拌冬粉">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%9A%87%E5%B8%9D%E8%B1%86%E7%87%B4%E6%A4%8D%E7%89%A9%E8%82%89%E4%B8%B8.jpg" class="d-block w-100" alt="皇帝豆燴植物肉丸" title="皇帝豆燴植物肉丸">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%A6%99%E6%96%99%E8%8C%84%E6%B1%81%E7%85%A8%E6%99%82%E8%94%AC.jpg" class="d-block w-100" alt="香料茄汁煨時蔬" title="香料茄汁煨時蔬">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%A6%99%E8%8D%89%E5%B0%8F%E4%B8%B8%E5%AD%90%E7%87%89%E8%8F%9C.jpg" class="d-block w-100" alt="香草小丸子燉菜" title="香草小丸子燉菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%83%8F%E5%85%8B%E8%98%AD%E8%94%AC%E8%8F%9C%E6%B9%AF.jpg" class="d-block w-100" alt="烏克蘭蔬菜湯" title="烏克蘭蔬菜湯">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%83%A4%E7%94%9C%E6%A4%92%E7%BE%A9%E5%A4%A7%E5%88%A9%E9%BA%B5.jpg" class="d-block w-100" alt="烤甜椒義大利麵" title="烤甜椒義大利麵">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E4%B9%BE%E7%85%B8%E5%9B%9B%E5%AD%A3%E8%B1%86.jpg" class="d-block w-100" alt="乾煸四季豆" title="乾煸四季豆">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E6%B6%BC%E6%8B%8C%E9%BE%8D%E9%AC%9A%E8%8F%9C.jpg" class="d-block w-100" alt="涼拌龍鬚菜" title="涼拌龍鬚菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%87%8E%E8%8F%87%E5%8D%97%E7%93%9C%E7%87%89%E9%A3%AF.jpg" class="d-block w-100" alt="野菇南瓜燉飯" title="野菇南瓜燉飯">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%BA%BB%E6%B2%B9%E7%95%B6%E6%AD%B8%E9%9D%92%E6%9D%BE%E8%8F%9C.jpg" class="d-block w-100" alt="麻油當歸青松菜" title="麻油當歸青松菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%84%A6%E7%B3%96%E5%8D%97%E7%93%9C%E5%B8%83%E4%B8%81.jpg" class="d-block w-100" alt="焦糖南瓜布丁" title="焦糖南瓜布丁">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%8C%B4%E9%A0%AD%E8%8F%87%E6%B9%AF.jpg" class="d-block w-100" alt="猴頭菇湯" title="猴頭菇湯">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E7%B5%B2%E7%93%9C%E8%B1%86%E8%85%90%E7%85%8E%E9%A4%85.jpg" class="d-block w-100" alt="絲瓜豆腐煎餅" title="絲瓜豆腐煎餅">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E8%8F%87%E8%8F%87%E7%87%B4%E8%B1%86%E8%85%90.jpg" class="d-block w-100" alt="菇菇燴豆腐" title="菇菇燴豆腐">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%BB%91%E8%B1%86%E6%A1%82%E5%9C%93%E7%94%9C%E6%B9%AF.jpg" class="d-block w-100" alt="黑豆桂圓甜湯" title="黑豆桂圓甜湯">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E8%94%93%E8%B6%8A%E8%8E%93%E6%99%82%E8%94%AC%E5%84%AA%E6%A0%BC%E6%8D%B2.jpg" class="d-block w-100" alt="蔓越莓時蔬優格捲" title="蔓越莓時蔬優格捲">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E8%A1%9D%E8%8F%9C.jpg" class="d-block w-100" alt="衝菜" title="衝菜">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%86%8B%E9%B3%B3%E6%A2%A8%E6%9C%A8%E8%80%B3%E7%82%92%E8%B1%86%E7%9A%AE.jpg" class="d-block w-100" alt="醋鳳梨木耳炒豆皮" title="醋鳳梨木耳炒豆皮">
                    </div>
                    <div class="carousel-item">
                        <img src="http://10.10.3.75:8081/Upload/%E9%86%AC%E7%87%92%E7%9A%87%E5%B8%9D%E8%B1%86%E7%82%92%E8%B1%86%E5%8C%85.jpg" class="d-block w-100" alt="醬燒皇帝豆炒豆包" title="醬燒皇帝豆炒豆包">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    </main>
</asp:Content>

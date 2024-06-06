<%@ Page Title="Menu managment" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Menu_management.aspx.cs" Inherits="food.Menu_management" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <main>
        <section>
            <ajaxToolkit:TabContainer ID="TabContainer1" runat="server" ActiveTabIndex="0">
                <ajaxToolkit:TabPanel runat="server" HeaderText="菜單管理1" ID="TabPanel1">
                    <ContentTemplate>
                        <div class="row">
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_new" name="TabPanel1bt_new" class="btn btn-secondary btn-lg">新增</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_edit" name="TabPanel1bt_edit" class="btn btn-secondary btn-lg">編輯</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_view" name="TabPanel1bt_view" class="btn btn-secondary btn-lg">查看</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_copy" name="TabPanel1bt_copy" class="btn btn-secondary btn-lg">複製</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_search" name="TabPanel1bt_search" class="btn btn-secondary btn-lg">搜尋</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_exit" name="TabPanel1bt_exit" class="btn btn-secondary btn-lg">離開</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel1bt_delete" name="TabPanel1bt_delete" class="btn btn-danger btn-lg">刪除</button>
                            </div>
                        </div>
                        <hr />
                        <img src="images/菜單管理1.png" alt="菜單管理1" class="img-thumbnail img-fluid">
                        <p>1. 菜單主題（下拉選項：幸福印記盛典、老人家紀念會、年菜、一天班會、兩天班會、三天班會...七天班會）</p>
                        <p>2. 餐別（下拉選項：早餐、午餐、晚餐、下午茶、早午餐）</p>
                        <p>3. 期間不等於班會期間，可任意選擇兩日期內的資料，此舉是為了縮小搜尋的範圍，不至於跑出來太多資料</p>
                        <hr />
                        <p>1. 下拉選項 菜單主題‘大愛光靈性假期’＋ 餐別‘午餐’ -->搜尋，所得的結果</p>
                        <p>2. 每個菜單主題前方有方框，可以點選欲同時陳列查看的菜單主題；<b>進入菜單管理框2</b></p>
                        <p>如果單純雙擊任一菜單，即可在下一個頁面查看or編輯該菜單（依照權限）<b>進入菜單管理框2</b></p>
                        <p>3. 複製功能：此菜單管理系統，兩個地方可以複製以往已建立的菜單</p>
                        <p>(1)此主頁面</p>
                        <p>(2)下個查看/編輯頁面</p>
                        <p>可勾選多個頁面上菜單，並點選複製<b>進入菜單管理框2</b></p>
                        <p>4. 欄“製表人”or“開單人”，非“製表人”or“開單人”沒有權限修改（編輯）菜單，但可以查看。</p>
                        <p>5. 班會日期過了不能夠直接修改菜單，但可以有一個“申請變更”的功能，申請後由管理員審核是否同意變更</p>
                        <p>6. 主頁面的“新增”代表新增一個全新的菜單，全部都從下拉選項重新選擇；</p>
                        <p>‘菜單管理框2'的“新增”代表該菜單組欄位末端，再新增另一欄位的菜單</p>
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
                <ajaxToolkit:TabPanel runat="server" HeaderText="菜單管理2" ID="TabPanel2">
                    <ContentTemplate>
                        <div class="row">
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel2bt_new" name="TabPanel2bt_new" class="btn btn-secondary btn-lg">新增</button>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="TabPanel2bt_copy" name="TabPanel2bt_copy" class="btn btn-secondary btn-lg">複製</button>
                            </div>
                        </div>
                        <img src="images/菜單管理2.png" alt="菜單管理2" class="img-thumbnail img-fluid">
                        <p>1. 黃標為 過往菜單標示為主菜，但依據設定不符合者，需討論：</p>
                        <p>'(1) 主菜是否應設置“全穀根莖類”類別</p>
                        <p>'(2)若否，過往菜單設定“全穀根莖類”為主菜者，如何呈現？</p>
                        <p>2. 橘標為 副菜分類類別重複出現者，需討論，是否允許此種狀況出現？</p>
                        <p>'(1) 若是，建立菜單功能時，則不設定“不可重複選順序類別”</p>
                        <p>'(2)若否，建立菜單時，需設定“不可重複選順序類別”，另需討論針對過往菜單入系統時，該如何呈現？</p>
                        <p>3. 點選任一食譜名可以進入該食譜查看同‘菜色管理框’的下表</p>
                        <p>4. 複製功能：勾選預複製的菜單（可同時複製多個 ）--> 點選複製 --> 跳出資料框在畫面正中間供初步填寫</p>
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
                <ajaxToolkit:TabPanel runat="server" HeaderText="菜單管理3" ID="TabPanel3">
                    <ContentTemplate>
                        <img src="images/菜單管理3.png" alt="菜單管理3" class="img-thumbnail img-fluid">
                        <p>1. 此部分出現的資訊，同“菜單管理框2”中，勾選欲複製的菜單，並點選“複製”後出現的下個畫面。</p>
                        <p>2. 這邊的複製/查看無功能</p>
                        <hr />
                        <p>1.複製先前的菜單至新表格後，每道菜皆可以修改，依“下拉選單”裡的選項挑選。</p>
                        <p>2. 如果想要出的菜色沒有出現在下拉選單，需要至“菜色管理”建立。</p>
                        <p>3. 資料編輯到一半，皆可以儲存後再回來編輯</p>
                        <p>4.如何找到編輯到一半的資料繼續編輯？使用在菜單管理框1的搜尋功能</p>
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
                <ajaxToolkit:TabPanel runat="server" HeaderText="菜單管理4" ID="TabPanel4">
                    <ContentTemplate>
                        <img src="images/菜單管理4.png" alt="菜單管理4" class="img-thumbnail img-fluid">
                        <p>1. 這邊的複製/查看無功能</p>
                    </ContentTemplate>
                </ajaxToolkit:TabPanel>
            </ajaxToolkit:TabContainer>
        </section>
    </main>
</asp:Content>

<%@ Page Title="Menu managment" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Menu_management.aspx.cs" Inherits="food.Menu_management" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Scripts/RootPage/Menu_management.js"></script>
    <main>
        <br />
        <br />
        <br />
        <section>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="true">菜單_查詢</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="second-tab" data-bs-toggle="tab" data-bs-target="#second" type="button" role="tab" aria-controls="second" aria-selected="false">菜單管理2</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="third-tab" data-bs-toggle="tab" data-bs-target="#third" type="button" role="tab" aria-controls="third" aria-selected="false">菜單管理3</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="create-tab" data-bs-toggle="tab" data-bs-target="#create" type="button" role="tab" aria-controls="create" aria-selected="false">菜單_新增</button>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="search" role="tabpanel" aria-labelledby="search-tab">
                    <div class="row">
                        <%--                            <div class="col-sm-1">
                           <button type="button" id="TabPanel1bt_new" name="TabPanel1bt_new" class="btn btn-secondary btn-lg">新增</button>
                       </div>--%>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_edit" name="TabPanel1bt_edit" class="btn btn-secondary btn-lg">編輯</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_view" name="TabPanel1bt_view" class="btn btn-success btn-lg">查看</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_copy" name="TabPanel1bt_copy" class="btn btn-success btn-lg">複製</button>
                        </div>
                        <%--<div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_search" name="TabPanel1bt_search" class="btn btn-success btn-lg">搜尋</button>
                        </div>--%>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_exit" name="TabPanel1bt_exit" class="btn btn-secondary btn-lg">離開</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel1bt_delete" name="TabPanel1bt_delete" class="btn btn-secondary btn-lg">刪除</button>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-floating">
                                <select class="form-select" id="TabPanel1select_type" aria-label="TabPanel1 Select dishes type"></select>
                                <label for="TabPanel1select_type">菜單主題</label>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="form-floating">
                                <select class="form-select" id="TabPanel1select_days" aira-label="TabPanel1 Select Activity days"></select>
                                <label for="TabPanel1select_days">班會天數</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-floating">
                                <select class="form-select" id="TabPanel1meal_type" aria-label="TabPanel1 Select dishes method"></select>
                                <label for="TabPanel1meal_type">餐別</label>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-from">From</span>
                                </div>
                                <input type="text" id="from" name="from" class="form-control" aria-label="Calendar From" aria-describedby="inputGroup-from" />
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inoutGroup-to">To</span>
                                </div>
                                <input type="text" id="to" name="to" class="form-control" aria-label="Calendar To" aria-describedby="inoutGroup-to" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div id="search_div">
                    </div>
                    <%--<img src="images/菜單管理1.png" alt="菜單管理1" class="img-thumbnail img-fluid" />--%>
                    <p><del>1. 菜單主題（下拉選項：幸福印記盛典、老人家紀念會、年菜、一天班會、兩天班會、三天班會...七天班會）</del></p>
                    <p><del>2. 餐別（下拉選項：早餐、午餐、晚餐、下午茶、早午餐）</del></p>
                    <p><del>3. 期間不等於班會期間，可任意選擇兩日期內的資料，此舉是為了縮小搜尋的範圍，不至於跑出來太多資料</del></p>
                    <hr />
                    <p><del>1. 下拉選項 菜單主題‘大愛光靈性假期’＋ 餐別‘午餐’ -->搜尋，所得的結果</del></p>
                    <p><del>2. 每個菜單主題前方有方框，可以點選欲同時陳列查看的菜單主題；<b>進入菜單管理框2</b></del></p>
                    <p><del>如果單純雙擊任一菜單，即可在下一個頁面查看or編輯該菜單（依照權限）<b>進入菜單管理框2</b></del></p>
                    <p><del>3. 複製功能：此菜單管理系統，兩個地方可以複製以往已建立的菜單</del></p>
                    <p><del>(1)此主頁面</del></p>
                    <p>(2)下個查看/編輯頁面</p>
                    <p><del>可勾選多個頁面上菜單，並點選複製<b>進入菜單管理框2</del></b></p>
                    <p>4. 欄“製表人”or“開單人”，非“製表人”or“開單人”沒有權限修改（編輯）菜單，但可以查看。</p>
                    <p>5. 班會日期過了不能夠直接修改菜單，但可以有一個“申請變更”的功能，申請後由管理員審核是否同意變更</p>
                    <p><del>6. 主頁面的“新增”代表新增一個全新的菜單，全部都從下拉選項重新選擇；</del></p>

                </div>
                <div class="tab-pane" id="second" role="tabpanel" aria-labelledby="second-tab">
                    <div class="row">
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_new" name="TabPanel2bt_new" class="btn btn-secondary btn-lg">新增</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_copy" name="TabPanel2bt_copy" class="btn btn-secondary btn-lg">複製</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_search" name="TabPanel2bt_edit" class="btn btn-secondary btn-lg">編輯</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_save" name="TabPanel2bt_save" class="btn btn-secondary btn-lg">儲存</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_exit" name="TabPanel2bt_exit" class="btn btn-secondary btn-lg">離開</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel2bt_delete" name="TabPanel2bt_delete" class="btn btn-secondary btn-lg">刪除</button>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" id="TabPanel2bt_change" name="TabPanel2bt_change" class="btn btn-secondary btn-lg">變更申請</button>
                        </div>
                    </div>
                    <hr />
                    <div id="detail_div">
                        <table id="detail_table" class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">班會日期</th>
                                </tr>
                                <tr>
                                    <th scope="row">菜單主題</th>
                                </tr>
                                <tr>
                                    <th scope="row">餐別</th>
                                </tr>
                                <tr>
                                    <th scope="row">主食</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿濕）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＿乾）</th>
                                </tr>
                                <tr>
                                    <th scope="row">主菜（蛋白質＋纖維質）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（翠綠葉菜）</th>
                                </tr>
                                <tr>
                                    <th scope="row">副菜（根莖類）</th>
                                </tr>
                                <tr>
                                    <th scope="row">鹹湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">甜湯</th>
                                </tr>
                                <tr>
                                    <th scope="row">水果</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <%--<img src="images/菜單管理2.png" alt="菜單管理2" class="img-thumbnail img-fluid" />--%>
                    <p>1. 黃標為 過往菜單標示為主菜，但依據設定不符合者，需討論：</p>
                    <p>'(1) 主菜是否應設置“全穀根莖類”類別</p>
                    <p>'(2)若否，過往菜單設定“全穀根莖類”為主菜者，如何呈現？</p>
                    <p>2. 橘標為 副菜分類類別重複出現者，需討論，是否允許此種狀況出現？</p>
                    <p>'(1) 若是，建立菜單功能時，則不設定“不可重複選順序類別”</p>
                    <p>'(2)若否，建立菜單時，需設定“不可重複選順序類別”，另需討論針對過往菜單入系統時，該如何呈現？</p>
                    <p>3. 點選任一食譜名可以進入該食譜查看同‘菜色管理框’的下表</p>
                    <p>4. 複製功能：勾選預複製的菜單（可同時複製多個 ）--> 點選複製 --> 跳出資料框在畫面正中間供初步填寫</p>
                    <p>5.‘菜單管理框2'的“新增”代表該菜單組欄位末端，再新增另一欄位的菜單</p>
                </div>
                <div class="tab-pane" id="third" role="tabpanel" aria-labelledby="third-tab">
                    <div class="row">
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_new" name="TabPanel3bt_new" class="btn btn-secondary btn-lg">新增</button>
                        </div>
                        <%--<div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_copy" name="TabPnael3bt_copy" class="btn btn-secondary btn-lg">複製</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_search" name="TabPanel3bt_search" class="btn btn-secondary btn-lg">查看</button>
                        </div>--%>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_save" name="TabPanel3bt_save" class="btn btn-secondary btn-lg">儲存</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_exit" name="TabPanel3bt_exit" class="btn btn-secondary btn-lg">離開</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel3bt_delete" name="TabPanel3bt_delete" class="btn btn-secondary btn-lg">刪除</button>
                        </div>
                    </div>
                    <hr />
                    <img src="images/菜單管理3.png" alt="菜單管理3" class="img-thumbnail img-fluid" />
                    <p>1. 此部分出現的資訊，同“菜單管理框2”中，勾選欲複製的菜單，並點選“複製”後出現的下個畫面。</p>
                    <p><del>2. 這邊的複製/查看無功能</del></p>
                    <hr />
                    <p>1.複製先前的菜單至新表格後，每道菜皆可以修改，依“下拉選單”裡的選項挑選。</p>
                    <p>2. 如果想要出的菜色沒有出現在下拉選單，需要至“菜色管理”建立。</p>
                    <p>3. 資料編輯到一半，皆可以儲存後再回來編輯</p>
                    <p>4.如何找到編輯到一半的資料繼續編輯？使用在菜單管理框1的搜尋功能</p>
                </div>
                <div class="tab-pane" id="create" role="tabpanel" aria-labelledby="create-tab">
                    <div class="row">
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel4bt_new" name="TabPanel4bt_new" class="btn btn-success btn-lg">新增</button>
                        </div>
                        <%--<div class="col-sm-1">
    <button type="button" id="TabPanel4bt_copy" name="TabPanel4bt_copy" class="btn btn-secondary btn-lg">複製</button>
</div>
<div class="col-sm-1">
    <button type="button" id="TabPanel4bt_search" name="TabPanel4bt_search" class="btn btn-secondary btn-lg">查看</button>
</div>--%>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel4bt_save" name="TabPanel4bt_save" class="btn btn-success btn-lg">儲存</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel4bt_exit" name="TabPanel4bt_exit" class="btn btn-secondary btn-lg">離開</button>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" id="TabPanel4bt_delete" name="TabPanel4bt_delete" class="btn btn-secondary btn-lg">刪除</button>
                        </div>
                    </div>
                    <hr />
                    <div id="activity_infor">
                        菜單主題:<input type="text" name="name" class="form-control" style="background-color: Pink" /><br />
                        班會期間:<div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-from_">From</span>
                            </div>
                            <input type="text" id="from_" name="from" class="form-control" aria-label="Calendar From" aria-describedby="inputGroup-from" />
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inoutGroup-to_">To</span>
                            </div>
                            <input type="text" id="to_" name="to" class="form-control" aria-label="Calendar To" aria-describedby="inoutGroup-to" />
                        </div>

                    </div>
                    <table id="create_menu_table" class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">班會日期</th>
                            </tr>
                            <tr>
                                <th scope="row">餐別</th>
                            </tr>
                            <tr>
                                <th scope="row">主食</th>
                            </tr>
                            <tr>
                                <th scope="row">主菜（蛋白質＿濕）</th>
                            </tr>
                            <tr>
                                <th scope="row">主菜（蛋白質＿乾）</th>
                            </tr>
                            <tr>
                                <th scope="row">主菜（蛋白質＋纖維質）</th>
                            </tr>
                            <tr>
                                <th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th>
                            </tr>
                            <tr>
                                <th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th>
                            </tr>
                            <tr>
                                <th scope="row">副菜（翠綠葉菜）</th>
                            </tr>
                            <tr>
                                <th scope="row">副菜（根莖類）</th>
                            </tr>
                            <tr>
                                <th scope="row">鹹湯</th>
                            </tr>
                            <tr>
                                <th scope="row">甜湯</th>
                            </tr>
                            <tr>
                                <th scope="row">水果</th>
                            </tr>
                        </tbody>
                    </table>
                    <%--<img src="images/菜單管理4.png" alt="菜單管理4" class="img-thumbnail img-fluid">--%>
                    <%--<p>1. 這邊的複製/查看無功能</p>--%>
                </div>
            </div>
        </section>
    </main>
</asp:Content>

<%@ Page Title="New dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="New_dishes.aspx.cs" Inherits="food.New_dishes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <main aria-labelledby="title">
        <h2 id="title"><%: Title %>.</h2>
        <h3>此處建立新菜品</h3>
        <strong>菜色系統之食材需求量，應以「十人份」食材需求計算</strong>
        <section>
            <div class="row">
                <div class="col">
                    <asp:Button ID="bt_newdishes_save" runat="server" Text="儲存" class="btn btn-success btn-lg" />
                </div>
                <div class="col">
                    <asp:Button ID="bt_newdishes_print" runat="server" Text="列印" class="btn btn-success btn-lg" />
                </div>
                <div class="col">
                    <asp:Button ID="bt_newdishes_delete" runat="server" Text="刪除" class="btn btn-success btn-lg" />
                </div>
                <div class="col">
                    <asp:Button ID="bt_newdishes_leave" runat="server" Text="離開" class="btn btn-success btn-lg" />
                </div>
            </div>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>一、依順序</td>
                        <td>
                            <asp:DropDownList ID="ddl_newdishes_type" runat="server" class="form-select"></asp:DropDownList></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>二、依烹飪手法</td>
                        <td>
                            <asp:DropDownList ID="ddl_cooking_method" runat="server" class="form-select"></asp:DropDownList></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table>
                <tr>
                    <td>三、添加食材</td>
                </tr>
            </table>
            <div class="container row" id="div_material">
                <div class="col">食材名稱</div>
                <div class="col">食材用量</div>
                <div class="col">
                    單位
                    <button type="button" id="btn_material" class="btn btn-success btn-sm">➕</button>
                </div>
            </div>
            <div class="container row" id="div_seasoning">
                <div class="input-group sm-6">
                    <div class="input-group-prepend"><span class="input-group-text" id="inputGroup-dishes_name">調味料資訊</span></div>
                    <div class="col">
                        <input type="text" id="seasoning_text" name="seasoning_text" class="form-control" aria-label="Default" aria-describedby="inputGroup-dishes_name" />
                    </div>
                </div>
            </div>
            <hr />
            <table>
                <tr>
                    <td>四、烹飪步驟</td>
                </tr>
            </table>
            <div class="container row">
                <div class="col-sm-4">
                    <string>請點選</string>
                    <button type="button" ID="btn_step" class="btn btn-success btn-sm">➕</button>
                    <div class="container" id="cooking_step">
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="file-upload-container">
                        <string>照片上傳/觀看</string>
                        <%--                    <asp:FileUpload ID="FileUpload1" runat="server" />
<asp:Button ID="bt_newdishes_image" runat="server" Text="上傳照片" OnClick="bt_newdishes_image_Click" ClientIDMode="Static" />
<asp:Image ID="i_newdishes_image" runat="server" class="img-thumbnail img-fluid" />--%>
                        <input accept="image/*" type='file' id="imgInp" />
                        <img id="blah" src="#" alt="your image" class="img-thumbnail img-fluid" runat="server" />
                    </div>
                </div>
            </div>
        </section>
    </main>
    <script type="text/javascript">
        $(document).ready(function () {
            var urlParams;
            (window.onpopstate = function () {
                var match,
                    pl = /\+/g,  // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                    query = window.location.search.substring(1);

                urlParams = {};
                while (match = search.exec(query))
                    urlParams[decode(match[1])] = decode(match[2]);
            })();
            if (typeof urlParams["dishes_name"] == "string") {
                //儲存按鈕 灰色
                $('input[ID*="bt_newdishes_save"]').removeClass("btn btn-success btn-lg");
                $('input[ID*="bt_newdishes_save"]').addClass("btn btn-secondary btn-lg");
                //列印按鈕 灰色
                $('input[ID*="bt_newdishes_print"]').removeClass("btn btn-success btn-lg");
                $('input[ID*="bt_newdishes_print"]').addClass("btn btn-secondary btn-lg");
                //刪除按鈕 灰色
                $('input[ID*="bt_newdishes_delete"]').removeClass("btn btn-success btn-lg");
                $('input[ID*="bt_newdishes_delete"]').addClass("btn btn-secondary btn-lg");
                //離開按鈕 灰色
                $('input[ID*="bt_newdishes_leave"]').removeClass("btn btn-success btn-lg");
                $('input[ID*="bt_newdishes_leave"]').addClass("btn btn-secondary btn-lg");
                //+按鈕 灰色 
                $('input[id*="btn_material"]').removeClass("btn btn-success btn-sm");
                $('input[id*="btn_material"]').addClass("btn btn-secondary btn-sm");
                //塞資訊至網頁中
                let api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_by_name/" + urlParams["dishes_name"];
                //console.log(api_url);
                (function () {
                    //var myAPI = "http://10.10.3.75:8082/api/dishes";
                    //var api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_by_name/" + $(this).text();
                    var myAPI = api_url;
                    $.getJSON(myAPI, {
                        format: "json"
                    })
                        .done(function (data) {
                            var step_content = data["cooking_step"].split(';');
                            //console.log(data["cooking_step"].split(';'));
                            //console.log(data["cooking_step"].split(';').length);
                            for (let i = 1; i <= data["cooking_step"].split(';').length; i++) {
                                var div_chlid = '<div class="form-floating"><textarea class="form-control" placeholder = "Leave a comment here" id = "floatingTextarea' + i.toString() + '" style = "height: 100px" >' + step_content[i - 1] + '</textarea ><label for="floatingTextarea">步驟' + i.toString() + '</label></div > ';
                                $("#cooking_step").append(div_chlid)
                            }
                            var material_content = data["material_id_names"].split(',');
                            //console.log(material_content);
                            //console.log(material_content.length);
                            for (let i = 0; i < material_content.length; i++) {
                                var material_infor = material_content[i].split('-');
                                var div_chlid = '<div class="row"><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + material_infor[0] + '</div ><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + material_infor[1] + '</div><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + material_infor[2] + '</div></div >';
                                $("#div_material").append(div_chlid);
                            }
                            if (data["seasoning"] === null) {
/*                                console.log('seasoning is null');*/
                            } else {
                                //console.log('seasoning not null');
                                //console.log(data["seasoning"]);
                                $("#seasoning_text").val(data["seasoning"]);
                            }
                            //doSomething(data);
                        });
                })();
            }
            //console.log('載入完成');
        });
        var stepindex = 0;
        var materialindex = 0;
        $("#btn_material").bind("click", function () {
            var div_chlid = '<div class="row"><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">1<select id="myselect' + materialindex.toString() + '"></seclect></div ><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">2</div><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">3</div></div >';
            $("#div_material").append(div_chlid);
            var selectValues = {
                "1": "test 1",
                "2": "test 2"
            };
            var $mySelect = $('#myselect' + materialindex.toString());
            $(function () {
                $.each(selectValues, function (key, value) {
                    var $option = $("<option/>", {
                        value: key,
                        text: value
                    });
                    $mySelect.append($option);
                });
            });
            materialindex += 1;
        })
        $("#btn_step").bind("click", function () {
            stepindex += 1;
            var div_chlid = '<div class="form-floating"><textarea class="form-control" placeholder = "Leave a comment here" id = "floatingTextarea' + stepindex.toString() + '" style = "height: 100px" ></textarea ><label for="floatingTextarea">步驟' + stepindex.toString() + '</label></div > ';
            $("#cooking_step").append(div_chlid);
        })
        //imgInp.onchange = evt => {
        //    const [file] = imgInp.files
        //    if (file) {
        //        blah.src = URL.createObjectURL(file)
        //    }
        //}
        //選取檔案完畢後的動作
        $('#imgInp').change(function () {
            let formData = new FormData();
            formData.append('import_file', this.files[0]);
            $.ajax({
                url: "http://10.10.3.75:8081/api/FileUpload/UploadFiles",
                method: 'POST',
                processData: false,
                contentType: false,
                data: formData,
            })
                .done(function (data, textStatus, jqXHR) {
                    if (data.status !== 'success') {
                        alert('上傳成功!');
                        for (var i = 0; i < data.length; i++) {
                            $("#blah").attr("src", "http://10.10.3.75:8081/" + data[i]);
                        }
                        console.log("file upload success");
                    }
                    console.log("enter down status");
                    /*dataGrid.refresh(true);*/
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("status:" + textStatus + " err:" + errorThrown);
                    alert("匯入失敗");
                })
                .always(function () {
                    //在done與fail之後執行
                    console.log("always");
                });
        });
    </script>
</asp:Content>

<%@ Page Title="New dishes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="New_dishes.aspx.cs" Inherits="food.New_dishes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <main aria-labelledby="title">
        <br />
        <br />
        <br />
        <h2 id="title"><%: Title %>.</h2>
        <h3>此處建立新菜品</h3>
        <strong>菜色系統之食材需求量，應以「十人份」食材需求計算</strong>
        <section>
            <div class="row" id="control_items">
                <div class="col">
                    <button type="button" id="bt_newdishes_save" class="btn btn-success btn-lg">儲存</button>
                </div>
                <div class="col">
                    <button type="button" id="bt_newdishes_print" class="btn btn-secondary btn-lg">列印</button>
                </div>
                <div class="col">
                    <button type="button" id="bt_newdishes_delete" class="btn btn-secondary btn-lg">刪除</button>
                </div>
                <div class="col">
                    <button type="button" id="bt_newdishes_leave" class="btn btn-secondary btn-lg">離開</button>
                </div>
            </div>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td>一、菜色名稱</td>
                        <td>
                            <input type="text" id="dishesName" class="form-control" aria-label="dishesName">
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>二、依順序</td>
                        <td>
                            <asp:DropDownList ID="ddl_newdishes_type" runat="server" class="form-select"></asp:DropDownList></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>三、依烹飪手法</td>
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
                    <td>四、添加食材</td>
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
                    <td>五、烹飪步驟</td>
                </tr>
            </table>
            <div class="container row">
                <div class="col-sm-4">
                    <string>請點選</string>
                    <button type="button" id="btn_step" class="btn btn-success btn-sm">➕</button>
                    <div class="container" id="cooking_step">
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">六、介紹/叮嚀</span>
                        </div>
                        <input type="text" id="dishesCommentary" class="form-control" placeholder="介紹/叮嚀" aria-label="dishesCommentary" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">烹飪分鐘</span>
                        </div>
                        <input type="text" id="cooking_time" class="form-control" aria-label="Amount">
                    </div>
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
                $('#dishesName').val(urlParams["dishes_name"]);
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
                            $('#dishesCommentary').val(data["commentary"]);
                            $('#div_material .row:nth-child(even)').css("background-color", "lightgray");
                            $('#cooking_step .form-floating:nth-child(odd) .form-control').css("background-color", "lightgray");
                            $('#cooking_time').val(data["cooking_time"]);
                            //doSomething(data);
                        });
                })();
                $('#control_items').css("display", "none");
                $('#btn_material').css("display", "none");
                $('#btn_step').css("display", "none");
                $('#imgInp').css("display", "none");
            }
            //console.log('載入完成');
        });
        var stepindex = 0;
        var materialindex = 0;
        $('#bt_newdishes_save').bind("click", function () {
            var material_array = '';
            var dishes_step = '';
            var material_array_index = 0;
            var dishes_step_index = 0;
            var dishes_name = "string";
            dishes_name = $('#dishesName').val();
            var dishes_image = '';
            console.log($('#dishesName').val());
            //console.log('按了儲存按鈕');
            //console.log($('#div_material .row .form-control').length);
            console.log($('#MainContent_ddl_newdishes_type option:selected').text());
            console.log($('#MainContent_ddl_cooking_method option:selected').text());
            $('#div_material .row .form-control').each(function () {
                if (material_array_index != 0 && material_array_index % 3 == 0) {
                    material_array += ',';
                } else if (material_array_index != 0 && material_array_index % 3 != 0) {
                    material_array += '-';
                }
                material_array += $(this).val();
                material_array_index += 1;
            });
            console.log(material_array);
            console.log($('#seasoning_text').val());
            $('#cooking_step .form-floating .form-control').each(function () {
                if (dishes_step_index != 0) {
                    dishes_step += ';';
                }
                dishes_step += $(this).val();
                dishes_step_index += 1;
            });
            console.log(dishes_step);
            if (document.cookie.indexOf('dishes_image=') != -1) {
                dishes_image = getCookie("dishes_image");
                console.log(dishes_image);
                //把cookie 丟掉
                document.cookie = 'dishes_image=; Max-Age=0; path=/; domain=' + location.hostname;
            };

            console.log($('#dishesCommentary').val());
            //取得流水號
            let api_url = "http://10.10.3.75:8082/api/dishes/get_dishes_id_like/" + $('#MainContent_ddl_newdishes_type option:selected').val() + $('#MainContent_ddl_cooking_method option:selected').val();
            console.log(api_url);
            (function () {
                var myAPI = api_url;
                $.getJSON(myAPI, {
                    format: "json"
                }).done(function (data) {
                    var dishes_id = '';
                    if (typeof data === "undefined") {
                        dishes_id = $('#MainContent_ddl_newdishes_type option:selected').val() + $('#MainContent_ddl_cooking_method option:selected').val() + '0001';
                        console.log(dishes_id);
                        $.ajax({
                            type: "POST",
                            url: "http://10.10.3.75:8082/api/dishes/appendNewdishes",
                            data: JSON.stringify({
                                "dishes_id": dishes_id,
                                "dishes_name": dishes_name,
                                "dishes_type": $('#MainContent_ddl_newdishes_type option:selected').val(),
                                "cooking_method": $('#MainContent_ddl_cooking_method option:selected').val(),
                                "material_id_items": "",
                                "material_id_names": material_array,
                                "cooking_step": dishes_step,
                                "cooking_time": $('#cooking_time').val(),
                                "dishes_image": encodeURI(dishes_image),
                                "commentary": $('#dishesCommentary').val(),
                                "seasoning": $('#seasoning_text').val()
                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            success: function (data) {
                                alert('上傳成功!');
                            },
                            error: function (data) {
                                console.log(data);
                            }
                        });
                    } else {
                        if (data.hasOwnProperty('dishes_id')) {
                            let index_str = data["dishes_id"].substring(4);
                            let next_index = parseInt(index_str) + 1;
                            dishes_id = $('#MainContent_ddl_newdishes_type option:selected').val() + $('#MainContent_ddl_cooking_method option:selected').val() + ("000" + next_index).slice(-4);
                            console.log(dishes_id);
                            $.ajax({
                                type: "POST",
                                url: "http://10.10.3.75:8082/api/dishes/appendNewdishes",
                                data: JSON.stringify({
                                    "dishes_id": dishes_id,
                                    "dishes_name": dishes_name,
                                    "dishes_type": $('#MainContent_ddl_newdishes_type option:selected').val(),
                                    "cooking_method": $('#MainContent_ddl_cooking_method option:selected').val(),
                                    "material_id_items": "",
                                    "material_id_names": material_array,
                                    "cooking_step": dishes_step,
                                    "cooking_time": $('#cooking_time').val(),
                                    "dishes_image": encodeURI(dishes_image),
                                    "commentary": $('#dishesCommentary').val(),
                                    "seasoning": $('#seasoning_text').val()
                                }),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                success: function (data) {
                                    alert('上傳成功!');
                                },
                                error: function (data) {
                                    console.log(data);
                                }
                            });
                        }
                    }

                });
            })();

        });
        $("#btn_material").bind("click", function () {
            var div_chlid = `<div class="row">
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_name">食材</span>
                    <input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_name">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_qty">數量</span>
                    <input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_qty">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_unit">單位</span>
                    <input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_unit">
                </div>
            </div >`;
            $("#div_material").append(div_chlid);
        });
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
                        alert('圖片上傳成功!');
                        console.log(data.length);
                        for (var i = 0; i < data.length; i++) {
                            console.log("http://10.10.3.75:8081" + data[i]);
                            $("#MainContent_blah").attr("src", "http://10.10.3.75:8081" + data[i]);
                            document.cookie = "dishes_image=http://10.10.3.75:8081" + data[i];
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
        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
    </script>
</asp:Content>

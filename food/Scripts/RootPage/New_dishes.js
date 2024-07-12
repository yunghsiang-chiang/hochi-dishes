$(document).ready(function () {
    //自動填寫 參考 變數
    let food_nutrition_array = [];
    let seasoning_array = [];
    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 食材cookie
    if (getCookie("food_nutrition") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://192.168.11.51:8082/api/dishes/get_food_nutrition";
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    if (i != 0) {
                        unit += ',';
                    }
                    unit += data[i].樣品名稱;
                    food_nutrition_array.push(data[i].樣品名稱);
                }
                document.cookie = "food_nutrition=" + unit;
            });
    } else {
        let temp_str = getCookie("food_nutrition").split(',');
        for (var i = 0; i < temp_str.length; i++) {
            food_nutrition_array.push(temp_str[i]);
        }
    }

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 調味cookie
    if (getCookie("seasoning") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://192.168.11.51:8082/api/dishes/get_seasoning";
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    if (i != 0) {
                        unit += ',';
                    }
                    unit += data[i].seasoning_name;
                    seasoning_array.push(data[i].seasoning_name);
                }
                document.cookie = "seasoning=" + unit;
            });
    } else {
        let temp_str = getCookie("seasoning").split(',');
        for (var i = 0; i < temp_str.length; i++) {
            seasoning_array.push(temp_str[i]);
        }
    }
    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 單位cookie
    if (getCookie("ingredients_unit") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://192.168.11.51:8082/api/dishes/get_ingredients_unit";
        var myAPI = api_url;
        $.getJSON(myAPI, {
            format: "json"
        })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    if (i != 0) {
                        unit += ',';
                    }
                    unit += data[i].unit_chinese;
                }
                document.cookie = "ingredients_unit=" + unit;
            });
    }

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

    //用於顯示使用,非編輯模式
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
        let api_url = "http://192.168.11.51:8082/api/dishes/get_dishes_by_name/" + urlParams["dishes_name"];
        //console.log(api_url);
        (function () {
            //var myAPI = "http://192.168.11.51:8082/api/dishes";
            //var api_url = "http://192.168.11.51:8082/api/dishes/get_dishes_by_name/" + $(this).text();
            var myAPI = api_url;
            $.getJSON(myAPI, {
                format: "json"
            })
                .done(function (data) {
                    var step_content = data["cooking_step"].split(';');
                    //console.log(data["cooking_step"].split(';'));
                    //console.log(data["cooking_step"].split(';').length);
                    for (let i = 1; i <= data["cooking_step"].split(';').length; i++) {
                        var div_chlid = '<div class="form-floating row"><textarea class="form-control" id = "floatingTextarea' + i.toString() + '" style = "height:auto" >' + step_content[i - 1] + '</textarea ><label for="floatingTextarea">步驟' + i.toString() + '</label></div > ';
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
                        var seasoning_content = data["seasoning"].split(',');
                        for (let i = 0; i < seasoning_content.length; i++) {
                            var seasoning_infor = seasoning_content[i].split('-');
                            var div_chlid = '<div class="row"><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + seasoning_infor[0] + '</div ><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + seasoning_infor[1] + '</div><div class="col" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding:5px;">' + seasoning_infor[2] + '</div></div >';
                            $("#div_seasoning").append(div_chlid);
                        }
                    }
                    $('#dishesCommentary').val(data["commentary"]);
                    $('#div_material .row:nth-child(even)').css("background-color", "lightgray");
                    $('#div_seasoning .row:nth-child(even)').css("background-color", "lightgray");
                    $('#cooking_step .form-floating:nth-child(odd) .form-control').css("background-color", "lightgray");
                    $('#cooking_time').val(data["cooking_time"]);
                    //doSomething(data);
                });
        })();
        //將編輯按鈕隱藏
        //$('#control_items').css("display", "none");
        $('#bt_newdishes_save').css('display', 'none');
        $('#btn_material').css("display", "none");
        $('#btn_seasoning').css("display", "none");
        $('#btn_step').css("display", "none");
        $('#imgInp').css("display", "none");
    }
    //console.log('載入完成');
    console.log('Page load');
    var stepindex = 0;
    var materialindex = 0;
    $('#bt_newdishes_save').bind("click", function () {
        //宣告變數 承接元件數值
        var material_array = '';
        var seasoning_array ='';
        var dishes_step = '';
        var material_array_index = 0;
        var seasoning_array_index = 0;
        var dishes_step_index = 0;
        var dishes_name = "string";
        dishes_name = $('#dishesName').val();
        var dishes_image = '';
        console.log($('#dishesName').val());
        //console.log('按了儲存按鈕');
        //console.log($('#div_material .row .form-control').length);
        console.log($('#MainContent_ddl_newdishes_type option:selected').text());
        console.log($('#MainContent_ddl_cooking_method option:selected').text());

        //取得食材資訊
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

        //取得調味資訊
        $('#div_seasoning .row .form-control').each(function () {
            if (seasoning_array_index != 0 && seasoning_array_index % 3 == 0) {
                seasoning_array += ',';
            } else if (seasoning_array_index != 0 && seasoning_array_index % 3 != 0) {
                seasoning_array += '-';
            }
            seasoning_array += $(this).val();
            seasoning_array_index += 1;
        });
        console.log(seasoning_array);


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
        let api_url = "http://192.168.11.51:8082/api/dishes/get_dishes_id_like/" + $('#MainContent_ddl_newdishes_type option:selected').val() + $('#MainContent_ddl_cooking_method option:selected').val();
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
                        url: "http://192.168.11.51:8082/api/dishes/appendNewdishes",
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
                            "seasoning": seasoning_array
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
                            url: "http://192.168.11.51:8082/api/dishes/appendNewdishes",
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
                                "seasoning": seasoning_array
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

    $('#bt_newdishes_print').bind('click',function () {
        console.log('print button active!');
        $("#page-content").wordExport();
    })

    $('#btn_seasoning').on("click", function () {
        var cookie_unit = getCookie("ingredients_unit");
        var cookie_unit_array = cookie_unit.split(',');
        var unit_select = '<select class="form-control" aria-describedby="inputGroup-seasoning_unit">';
        for (var i = 0; i < cookie_unit_array.length; i++) {
            unit_select += '<option value="' + cookie_unit_array[i] + '">' + cookie_unit_array[i] + '</option>';
        }
        unit_select += '</select>';

        //<input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_unit">

        var div_chlid = `<div class="row">
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-seasoning_name">調味</span>
                    <input type="text" class="form-control autoinput_seasoning" aria-label="material of dishes" aria-describedby="inputGroup-seasoning_name">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-seasoning_qty">數量</span>
                    <input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-seasoning_qty">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-seasoning_unit">單位</span>
                    `+ unit_select + `
                </div>
            </div >`;
        $("#div_seasoning").append(div_chlid);
        $(".autoinput_seasoning").autocomplete({
            source: seasoning_array
        });
    })
    $("#btn_material").bind("click", function () {
        var cookie_unit = getCookie("ingredients_unit");
        var cookie_unit_array = cookie_unit.split(',');
        var unit_select = '<select class="form-control" aria-describedby="inputGroup-material_unit">';
        for (var i = 0; i < cookie_unit_array.length;i++) {
            unit_select += '<option value="' + cookie_unit_array[i] + '">' + cookie_unit_array[i] +'</option>';
        }
        unit_select += '</select>';

        //<input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_unit">

        var div_chlid = `<div class="row">
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_name">食材</span>
                    <input type="text" class="form-control autoinput_material" aria-label="material of dishes" aria-describedby="inputGroup-material_name">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_qty">數量</span>
                    <input type="text" class="form-control" aria-label="material of dishes" aria-describedby="inputGroup-material_qty">
                </div>
                <div class="input-group input-group-sm-3 col-sm">
                    <span class="input-group-text" id="inputGroup-material_unit">單位</span>
                    `+ unit_select +`
                </div>
            </div >`;
        $("#div_material").append(div_chlid);
        $(".autoinput_material").autocomplete({
            source: food_nutrition_array
        });

    });
    $("#btn_step").bind("click", function () {
        stepindex += 1;
        var div_chlid = '<div class="form-floating row"><textarea class="form-control" id = "floatingTextarea' + stepindex.toString() + '" style = "height:auto" ></textarea ><label for="floatingTextarea">步驟' + stepindex.toString() + '</label></div > ';
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
            url: "http://192.168.11.51:8081/api/FileUpload/UploadFiles",
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
                        console.log("http://192.168.11.51:8081" + data[i]);
                        $("#MainContent_blah").attr("src", "http://192.168.11.51:8081" + data[i]);
                        document.cookie = "dishes_image=http://192.168.11.51:8081" + data[i];
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

    //動於動態元件 事件綁定
    $(document).on('change', $('.autoinput_seasoning'), function () {
        $('.autoinput_seasoning').each(function (data) {
            if (seasoning_array.indexOf($(this).val()) != -1) {
                $(this).css("background-color", "SpringGreen");
            } else {
                $(this).css("background-color", "Pink");
            }

        })
    });

    //動於動態元件 事件綁定
    $(document).on('change', $('.autoinput_material'), function () {
        $('.autoinput_material').each(function (data) {
            if (food_nutrition_array.indexOf($(this).val()) != -1) {
                $(this).css("background-color", "SpringGreen");
            } else {
                $(this).css("background-color", "Pink");
            }

        })
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


});


$(document).ready(function () {
    //自動填寫 參考 變數
    let food_nutrition_array = []; // 存放食材資料的陣列
    let seasoning_array = []; // 存放調味資料的陣列

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 食材cookie
    if (getCookie("food_nutrition") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_food_nutrition";
        var myAPI = api_url;
        $.getJSON(myAPI, { format: "json" })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    unit += (i != 0 ? ',' : '') + data[i].樣品名稱;
                    food_nutrition_array.push(data[i].樣品名稱); // 儲存食材名稱至陣列
                }
                document.cookie = "food_nutrition=" + unit; // 將食材名稱存入cookie
            }); 
    } else {
        // 如果有cookie，直接從cookie載入食材資料
        let temp_str = getCookie("food_nutrition").split(',');
        for (var i = 0; i < temp_str.length; i++) {
            food_nutrition_array.push(temp_str[i]);
        }
    }

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    // 取得調味品的cookie
    if (getCookie("seasoning") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_seasoning";
        var myAPI = api_url;
        $.getJSON(myAPI, { format: "json"  })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    unit += (i != 0 ? ',' : '') + data[i].seasoning_name;
                    seasoning_array.push(data[i].seasoning_name); // 儲存調味品名稱至陣列
                }
                document.cookie = "seasoning=" + unit; // 將調味品名稱存入cookie
            });
    } else {
        // 如果有cookie，直接從cookie載入調味品資料
        let temp_str = getCookie("seasoning").split(',');
        for (var i = 0; i < temp_str.length; i++) {
            seasoning_array.push(temp_str[i]);
        }
    }
    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    // 取得單位的cookie
    if (getCookie("ingredients_unit") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_ingredients_unit";
        var myAPI = api_url;
        $.getJSON(myAPI, { format: "json" })
            .done(function (data) {
                let unit = '';
                for (var i = 0; i < data.length; i++) {
                    unit += (i != 0 ? ',' : '') + data[i].unit_chinese;
                }
                document.cookie = "ingredients_unit=" + unit; // 將單位資訊存入cookie
            });
    }
    // 解析網址參數
    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl = /\+/g,  // 用來替換加號為空格
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]); // 儲存網址參數
    })();

    // 如果有"dishes_name"參數，非編輯模式下顯示資料
    if (typeof urlParams["dishes_name"] == "string") {
        $('#dishesName').val(urlParams["dishes_name"]); // 顯示菜名
        // 將按鈕變灰，防止編輯
        $('input[ID*="bt_newdishes_save"], input[ID*="bt_newdishes_print"], input[ID*="bt_newdishes_delete"], input[ID*="bt_newdishes_leave"], input[id*="btn_material"]')
            .removeClass("btn btn-success btn-lg")
            .addClass("btn btn-secondary btn-lg");

        // 從API取得菜名相關資訊，並顯示在頁面中
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_dishes_by_name/" + urlParams["dishes_name"];
        $.getJSON(api_url, { format: "json" })
            .done(function (data) {
                var step_content = data["cooking_step"].split(';'); // 烹飪步驟
                for (let i = 1; i <= step_content.length; i++) {
                    var div_chlid = `<div class="form-floating row"><textarea class="form-control" id="floatingTextarea${i}" style="height:auto">${step_content[i - 1]}</textarea><label for="floatingTextarea">步驟${i}</label></div>`;
                    $("#cooking_step").append(div_chlid); // 顯示步驟
                }

                // 顯示食材資訊
                var material_content = data["material_id_names"].split(',');
                for (let i = 0; i < material_content.length; i++) {
                    var material_infor = material_content[i].split('-');
                    var div_chlid = `<div class="row"><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${material_infor[0]}</div><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${material_infor[1]}</div><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${material_infor[2]}</div></div>`;
                    $("#div_material").append(div_chlid); // 顯示食材資料
                }

                // 顯示調味料資訊
                if (data["seasoning"] !== null) {
                    var seasoning_content = data["seasoning"].split(',');
                    for (let i = 0; i < seasoning_content.length; i++) {
                        var seasoning_infor = seasoning_content[i].split('-');
                        var div_chlid = `<div class="row"><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${seasoning_infor[0]}</div><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${seasoning_infor[1]}</div><div class="col" style="border:3px dashed #FFAC55;padding:5px;">${seasoning_infor[2]}</div></div>`;
                        $("#div_seasoning").append(div_chlid); // 顯示調味料資料
                    }
                }

                // 顯示其他資訊
                $('#dishesCommentary').val(data["commentary"]); // 顯示評論
                $('#cooking_time').val(data["cooking_time"]); // 顯示烹飪時間
                $('#div_material .row:nth-child(even)').css("background-color", "lightgray"); // 偶數行變色
                $('#div_seasoning .row:nth-child(even)').css("background-color", "lightgray");
                $('#cooking_step .form-floating:nth-child(odd) .form-control').css("background-color", "lightgray");
            });

        // 隱藏編輯相關按鈕
        $('#bt_newdishes_save, #btn_material, #btn_seasoning, #btn_step, #imgInp').css("display", "none");

    }

    var stepindex = 0;
    var materialindex = 0;
    // 儲存按鈕的點擊事件
    $('#bt_newdishes_save').bind("click", function () {

        // 取得表單數據
        var material_array = '', seasoning_array = '', dishes_step = '';
        var material_array_index = 0, seasoning_array_index = 0, dishes_step_index = 0;
        var dishes_name = $('#dishesName').val(), dishes_image = '';
        var dishes_image = '';

        // 取得食材資訊
        $('#div_material .row .form-control').each(function () {
            if (material_array_index != 0 && material_array_index % 3 == 0) material_array += ',';
            else if (material_array_index != 0) material_array += '-';
            material_array += $(this).val();
            material_array_index++;
        });

        // 取得調味料資訊
        $('#div_seasoning .row .form-control').each(function () {
            if (seasoning_array_index != 0 && seasoning_array_index % 3 == 0) seasoning_array += ',';
            else if (seasoning_array_index != 0) seasoning_array += '-';
            seasoning_array += $(this).val();
            seasoning_array_index++;
        });

        // 取得步驟資訊
        $('#cooking_step .form-floating .form-control').each(function () {
            if (dishes_step_index != 0) dishes_step += ';';
            dishes_step += $(this).val();
            dishes_step_index++;
        });

        // 如果有圖片cookie，取得圖片資料並清除cookie
        if (getCookie('dishes_image') != "") {
            dishes_image = getCookie('dishes_image');
            document.cookie = "dishes_image=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        // 取得流水號並上傳菜餚資料
        let apiUrl = "http://internal.hochi.org.tw:8082/api/dishes/get_dishes_id_like/" +
            $('#MainContent_ddl_newdishes_type option:selected').val() +
            $('#MainContent_ddl_cooking_method option:selected').val();

        console.log(apiUrl);

        // 定義上傳新菜餚的函數
        function uploadDish(dishesId) {
            $.ajax({
                type: "POST",
                url: "http://internal.hochi.org.tw:8082/api/dishes/appendNewdishes",
                data: JSON.stringify({
                    "dishes_id": dishesId,
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
                success: function () {
                    alert('上傳成功!');
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

        // 發送 API 請求
        (function () {
            $.getJSON(apiUrl, { format: "json" }).done(function (data) {
                let dishesId = '';
                const dishesType = $('#MainContent_ddl_newdishes_type option:selected').val();
                const cookingMethod = $('#MainContent_ddl_cooking_method option:selected').val();

                // 如果資料未定義，產生新的流水號並上傳
                if (typeof data === "undefined") {
                    dishesId = dishesType + cookingMethod + '0001';
                    console.log(dishesId);
                    uploadDish(dishesId);
                } else {
                    // 如果已有資料，生成新的流水號並上傳
                    if (data.hasOwnProperty('dishes_id')) {
                        let indexStr = data["dishes_id"].substring(4);
                        let nextIndex = parseInt(indexStr) + 1;
                        dishesId = dishesType + cookingMethod + ("000" + nextIndex).slice(-4);
                        console.log(dishesId);
                        uploadDish(dishesId);
                    }
                }
            });
        })();

    });

    // 綁定列印按鈕事件
    $('#bt_newdishes_print').on('click', function () {
        console.log('print button active!');
        $("#page-content").wordExport();
    });

    // 生成單位選單函數
    function generateUnitSelect(units) {
        let unitSelect = '<select class="form-control" aria-describedby="inputGroup-unit">';
        units.forEach(unit => {
            unitSelect += `<option value="${unit}">${unit}</option>`;
        });
        unitSelect += '</select>';
        return unitSelect;
    }

    // 生成調味料輸入框
    function createSeasoningRow(unitSelect) {
        return `<div class="row">
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-seasoning_name">調味</span>
            <input type="text" class="form-control autoinput_seasoning" aria-label="seasoning" aria-describedby="inputGroup-seasoning_name">
        </div>
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-seasoning_qty">數量</span>
            <input type="text" class="form-control" aria-label="seasoning_qty" aria-describedby="inputGroup-seasoning_qty">
        </div>
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-seasoning_unit">單位</span>
            ${unitSelect}
        </div>
    </div>`;
    }

    // 生成食材輸入框
    function createMaterialRow(unitSelect) {
        return `<div class="row">
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-material_name">食材</span>
            <input type="text" class="form-control autoinput_material" aria-label="material" aria-describedby="inputGroup-material_name">
        </div>
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-material_qty">數量</span>
            <input type="text" class="form-control" aria-label="material_qty" aria-describedby="inputGroup-material_qty">
        </div>
        <div class="input-group input-group-sm-3 col-sm">
            <span class="input-group-text" id="inputGroup-material_unit">單位</span>
            ${unitSelect}
        </div>
    </div>`;
    }

    // 綁定調味料按鈕事件
    $('#btn_seasoning').on("click", function () {
        const cookieUnit = getCookie("ingredients_unit");
        const cookieUnitArray = cookieUnit.split(',');
        const unitSelect = generateUnitSelect(cookieUnitArray);

        $("#div_seasoning").append(createSeasoningRow(unitSelect));

        $(".autoinput_seasoning").autocomplete({
            source: seasoning_array
        });
    });

    // 綁定食材按鈕事件
    $('#btn_material').on("click", function () {
        const cookieUnit = getCookie("ingredients_unit");
        const cookieUnitArray = cookieUnit.split(',');
        const unitSelect = generateUnitSelect(cookieUnitArray);

        $("#div_material").append(createMaterialRow(unitSelect));

        $(".autoinput_material").autocomplete({
            source: food_nutrition_array
        });
    });

    // 綁定步驟按鈕事件
    $('#btn_step').on("click", function () {
        stepindex += 1;
        const stepHtml = `<div class="form-floating row">
        <textarea class="form-control" id="floatingTextarea${stepindex}" style="height:auto"></textarea>
        <label for="floatingTextarea">步驟${stepindex}</label>
    </div>`;
        $("#cooking_step").append(stepHtml);
    });

    // 綁定圖片上傳事件
    $('#imgInp').on('change', function () {
        let formData = new FormData();
        formData.append('import_file', this.files[0]);

        $.ajax({
            url: "http://internal.hochi.org.tw:8081/api/FileUpload/UploadFiles",
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
        })
            .done(function (data) {
                if (data.status !== 'success') {
                    alert('圖片上傳成功!');
                    data.forEach((item, i) => {
                        const imageUrl = "http://internal.hochi.org.tw:8081" + item;
                        $("#MainContent_blah").attr("src", imageUrl);
                        document.cookie = `dishes_image=${imageUrl}`;
                    });
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(`status: ${textStatus} err: ${errorThrown}`);
                alert("匯入失敗");
            });
    });

    // 動態綁定調味料輸入框變更事件
    $(document).on('change', '.autoinput_seasoning', function () {
        $(this).each(function () {
            if (seasoning_array.indexOf($(this).val()) !== -1) {
                $(this).css("background-color", "SpringGreen");
            } else {
                $(this).css("background-color", "Pink");
            }
        });
    });

    // 動態綁定食材輸入框變更事件
    $(document).on('change', '.autoinput_material', function () {
        $(this).each(function () {
            if (food_nutrition_array.indexOf($(this).val()) !== -1) {
                $(this).css("background-color", "SpringGreen");
            } else {
                $(this).css("background-color", "Pink");
            }
        });
    });

    // 取得 Cookie 值的函數
    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }



});


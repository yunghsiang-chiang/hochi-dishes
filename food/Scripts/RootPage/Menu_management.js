//注意! javascript放在最上面，下方的元件還沒有產生,所以互動都放在ready function 才不用擔心創立順序
$(document).ready(function () {
    // 定義 API URL 來取得活動名稱的資料
    let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_activity_name";

    // 使用立即執行函式來封裝 API 請求，避免全域變數污染
    (function () {
        let myAPI = api_url;

        // 發送 AJAX 請求來取得 JSON 資料
        $.getJSON(myAPI, { format: "json" })
            .done(function (data) {
                // 將 "不選擇" 的選項加入到菜單選單中
                $('#TabPanel1select_type').append('<option value="default">不選擇</option>');

                // 遍歷 API 回傳的資料，將每個活動名稱加到下拉選單中
                data.forEach(item => {
                    $('#TabPanel1select_type').append($('<option>', {
                        value: item.activity_name,
                        text: item.activity_name
                    }));
                });
            });
    })();

    // 定義餐別資料，手動加入至餐別選單
    const meal_type = ['早餐', '午餐', '晚餐'];
    $('#TabPanel1meal_type').append('<option value="default">不選擇</option>');
    meal_type.forEach(type => {
        $('#TabPanel1meal_type').append(`<option value="${type}">${type}</option>`);
    });

    // 定義班會天數選項
    const selectValues = {
        "1": "1天",
        "2": "2天",
        "3": "3天",
        "4": "4天",
        "5": "5天",
        "6": "6天"
    };

    let $mySelect = $('#TabPanel1select_days');
    $mySelect.append('<option value="default">不選擇</option>');

    // 使用 jQuery 的 each 方法將班會天數加入下拉選單
    $(function () {
        $.each(selectValues, function (key, value) {
            $mySelect.append($("<option/>", { value: key, text: value }));
        });

        // 載入新格式的按鈕樣式
        tabpanel4bt_new();

        // 根據 cookie 判斷按鈕狀態並修改其樣式
        let at_start = getCookie("person");
        if (!at_start) {
            $('#TabPanel2bt_new').removeClass("btn-success").addClass("btn-secondary");
        } else {
            $('#TabPanel2bt_new').removeClass("btn-secondary").addClass("btn-success");
        }
    });

    // 日期選擇器設置
    $(function () {
        const dateFormat = "yy/mm/dd";

        // 設置"開始日期"選擇器
        let from = $("#from").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: dateFormat
        }).on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        });

        // 設置"結束日期"選擇器
        let to = $("#to").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: dateFormat
        }).on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        });

        // 輔助函數，用來取得日期
        function getDate(element) {
            let date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
    });

    // 查詢活動菜單的資訊，當選項改變時觸發
    $("#TabPanel1select_type, #TabPanel1meal_type, #TabPanel1select_days, #from, #to").on("change", function () {
        // 構造 API URL，根據選擇的值來查詢
        let api_url = `http://internal.hochi.org.tw:8082/api/dishes/get_h_activity_records_search?activity_name=${$('#TabPanel1select_type').find(":selected").val()}&meal_type=${$('#TabPanel1meal_type').find(":selected").val()}&activity_days=${$('#TabPanel1select_days').find(":selected").val()}`;

        if ($('#from').val()) {
            api_url += `&activity_start=${$('#from').val()}`;
        }
        if ($('#to').val()) {
            api_url += `&activity_end=${$('#to').val()}`;
        }

        // 發送查詢請求
        $.getJSON(api_url, { format: "json" }).done(function (data) {
            // 如果有查詢結果
            if (data.length > 0) {
                let table = $.makeSearchTable(data);
                $("#search_div").html(table);  // 使用 HTML 代替 append 避免重複加入
            } else {
                $('#gv_search_view').remove();  // 移除舊表格
            }
        });
    });

    // 生成活動菜單的表格
    $.makeSearchTable = function (data) {
        $('#gv_search_view').remove();  // 先移除已有的表格

        // 建立表格標頭
        let table = $('<table cellspacing="0" rules="all" class="table table-striped" border="1" id="gv_search_view" style="border-collapse:collapse;"><tbody>');
        let tblHeader = "<tr>";
        tblHeader += '<th scope="col"></th><th scope="col">活動名稱</th><th scope="col">餐別</th><th scope="col">活動天數</th><th scope="col">活動日期</th><th scope="col">活動期間</th><th scope="col">最後編輯者</th>';
        tblHeader += "</tr>";
        $(tblHeader).appendTo(table);

        // 遍歷資料並生成表格內容
        data.forEach(item => {
            let TableRow = `<tr class="GvGrid">
                        <td><input type="checkbox" name="search_cb" class="search_cb"/></td>
                        <td>${item.activity_name}</td>
                        <td>${item.meal_type}</td>
                        <td>${item.activity_days}</td>
                        <td>${item.activity_date.replace("T00:00:00", "")}</td>
                        <td>${item.during_the_activity.replace('~', '~<br/>')}</td>
                        <td>${item.lm_user}</td>
                      </tr>`;
            $(table).append(TableRow);
        });

        $(table).append('</tbody></table>');
        return table;
    };


    // 新增 按鈕，從cookie取值並產生對應元件
    $('#TabPanel2bt_new').click(function () {
        // 檢查用戶是否已登入
        const at_start = getCookie("person");

        // 若未登入，則禁用新增按鈕
        if (at_start === "") {
            $('#TabPanel2bt_new').removeClass("btn-success").addClass("btn-secondary");
        } else {
            tabPanel2bt_new(); // 呼叫新增功能
        }
    });

    // 菜單管理 複製按鈕功能
    $('#TabPanel2bt_copy').click(function () {
        // 若複製按鈕為成功狀態
        if ($('#TabPanel2bt_copy').hasClass('btn-success')) {
            const checkbox_checked_array = []; // 勾選的索引陣列

            // 遍歷所有勾選框
            $('.cb_col').each(function (index) {
                // 若勾選且值不為 "Iscopyed"
                if ($(this).prop("checked") && $(this).val() !== "Iscopyed") {
                    checkbox_checked_array.push(index); // 將索引加入陣列
                } else if ($(this).prop("checked") && $(this).val() === "Iscopyed") {
                    alert('非歷史資料不會進行編輯功能!'); // 警告
                }
            });

            // 如果有勾選，則逐一複製
            checkbox_checked_array.forEach(index => {
                tabPanel2bt_copy((index + 2).toString()); // 呼叫複製功能
            });
        }
    });

    // 菜單管理 編輯按鈕功能
    $('#TabPanel2bt_edit').click(function () {
        // 若編輯按鈕為成功狀態
        if ($('#TabPanel2bt_edit').hasClass('btn-success')) {
            const checkbox_checked_array = []; // 勾選的索引陣列

            // 遍歷所有勾選框
            $('.cb_col').each(function (index) {
                // 若勾選且值不為 "Iscopyed"
                if ($(this).prop("checked") && $(this).val() !== "Iscopyed") {
                    checkbox_checked_array.push(index); // 將索引加入陣列
                } else if ($(this).prop("checked") && $(this).val() === "Iscopyed") {
                    alert('非歷史資料不會進行編輯功能!'); // 警告
                }
            });

            // 如果有勾選，則逐一複製
            checkbox_checked_array.forEach(index => {
                tabPanel2bt_copy((index + 2).toString()); // 呼叫複製功能
            });
        }
    });

    // 菜單管理 刪除按鈕功能
    $('#TabPanel2bt_delete').click(function () {
        // 若刪除按鈕為成功狀態
        if ($('#TabPanel2bt_delete').hasClass('btn btn-lg btn-success')) {
            const checkbox_checked_array = []; // 勾選的索引陣列

            // 遍歷所有勾選框
            $('.cb_col').each(function (index) {
                // 若勾選且值為 "Iscopyed"
                if ($(this).prop("checked") && $(this).val() === "Iscopyed") {
                    checkbox_checked_array.push(index); // 將索引加入陣列
                }
            });

            // 如果有勾選，則從大到小刪除
            checkbox_checked_array.reverse().forEach(index => {
                tabPanel2bt_delete((index + 2).toString()); // 呼叫刪除功能
            });
        }
    });

    // 管理2 新增動作
    function tabPanel2bt_new() {
        // 打勾 確認框
        $('#detail_table thead tr').append('<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" value="Iscopyed"/></th>');

        // 班會日期
        $('#detail_table tbody tr:nth-child(1)').append('<th scope="col"><input type="text" name="date" class="form-control datepicker"/></th>');

        // 菜單主題
        $('#detail_table tbody tr:nth-child(2)').append('<th scope="col"><input type="text" name="name" class="form-control"/></th>');

        // 餐別選擇
        const dishesTypes = ['早餐', '午餐', '晚餐'];
        const dishesTypeSelect = createSelectElement(dishesTypes);
        $('#detail_table tbody tr:nth-child(3)').append('<th scope="col">' + dishesTypeSelect + '</th>');

        // 主食、主菜（蛋白質＿濕）、主菜（蛋白質＿乾）等
        const types = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
        for (let i = 0; i < types.length; i++) {
            const dishesData = getDishesData(types[i]);
            const dishesElement = createDishesElement(dishesData, types[i]);
            $('#detail_table tbody tr:nth-child(' + (4 + i) + ')').append('<th scope="col">' + dishesElement + '</th>');
        }

        // 水果
        const fruits = getCookie("fruits").split(',');
        const fruitsSelect = createSelectElement(fruits);
        $('#detail_table tbody tr:nth-child(14)').append('<th scope="col">' + fruitsSelect + '</th>');
    }

    // 創建下拉選單的元素
    function createSelectElement(options) {
        let selectHtml = '<select class="form-control"><option value="" selected></option>';
        for (const option of options) {
            selectHtml += '<option value="' + option + '">' + option + '</option>';
        }
        selectHtml += '</select>';
        return selectHtml;
    }

    // 創建主菜類的按鈕和下拉選單
    function createDishesElement(dishesData, type) {
        const addButton = '<button type="button" class="btn btn-success dishes" name="add_select" value="' + type + '">➕</button>';
        const minusButton = '<button type="button" class="btn btn-danger dishes" name="minus_select" value="' + type + '">➖</button>';
        const selectElement = createSelectElement(dishesData.names, dishesData.ids);

        return addButton + minusButton + selectElement;
    }

    // 獲取指定類型的菜單資料
    function getDishesData(type) {
        const allDishes = getCookie("get_dishes_type_name").split(',');
        const names = [];
        const ids = [];

        for (const dish of allDishes) {
            const [name, dishType, id] = dish.split('＊');
            if (dishType === type) {
                names.push(name);
                ids.push(id);
            }
        }
        return { names, ids };
    }

    // 菜單管理 複製動作 2024/8/15 追加新增/刪除 按鈕
    function tabPanel2bt_copy(array_index) {
        // 添加複製確認框
        $('#detail_table thead tr').append('<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" value="Iscopyed"/></th>');

        // 添加班會日期
        $('#detail_table tbody tr:nth-child(1)').append('<th scope="col"><input type="text" name="date" class="form-control datepicker" style="background-color:Pink" /></th>');

        // 添加菜單主題
        $('#detail_table tbody tr:nth-child(2)').append('<th scope="col"><input type="text" name="name" class="form-control" style="background-color:Pink" /></th>');

        // 餐別選擇
        const dishes_type_array = ['早餐', '午餐', '晚餐'];
        let dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';

        dishes_type_array.forEach(type => {
            const isSelected = (type === $('#detail_table tbody tr:nth-child(3) th:nth-child(' + array_index + ')').text()) ? ' selected' : '';
            dishes_type_select += `<option value="${type}"${isSelected}>${type}</option>`;
        });

        dishes_type_select += '</select>';
        $('#detail_table tbody tr:nth-child(3)').append('<th scope="col">' + dishes_type_select + '</th>');

        // 取得菜品類型名稱與ID
        const get_dishes_type_name = getCookie("get_dishes_type_name");
        const get_dishes_type_name_array_temp = get_dishes_type_name.split(',');
        let get_dishes_type_name_array = [];
        let get_dishes_type_id_array = [];

        // 根據類型篩選菜品名稱和ID
        function filterDishes(type) {
            get_dishes_type_name_array = [];
            get_dishes_type_id_array = [];
            get_dishes_type_name_array_temp.forEach(item => {
                const [name, t, id] = item.split('＊');
                if (t === type) {
                    get_dishes_type_name_array.push(name);
                    get_dishes_type_id_array.push(id);
                }
            });
        }

        // 生成菜品選擇的HTML
        function generateDishesSelect(type, rowIndex, addSelectName) {
            let dishes_type_select = `
            <button type="button" class="btn btn-success dishes" name="add_select" value="${type}">➕</button>
            <button type="button" class="btn btn-danger dishes" name="minus_select" value="${type}">➖</button>
        `;

            const cellSelector = `#detail_table tbody tr:nth-child(${rowIndex}) th:nth-child(${array_index})`;

            if ($(cellSelector).find("span").html().includes('<br>')) {
                // 分割菜品並生成下拉選單
                let dishes_array = $(cellSelector).find("span").html().replace("<br>", ",").split(',');
                dishes_type_select += '<th scope="col">';

                dishes_array.forEach(dish => {
                    dishes_type_select += `<select class="form-control" aria-describedby="inputGroup-Main-dish-${addSelectName}">`;
                    const isSelected = (dish === '') ? ' selected' : '';
                    dishes_type_select += `<option value=""${isSelected}></option>`;
                    get_dishes_type_name_array.forEach((name, i) => {
                        const selected = (name === dish) ? ' selected' : '';
                        dishes_type_select += `<option value="${get_dishes_type_id_array[i]}"${selected}>${name}</option>`;
                    });
                    dishes_type_select += '</select>';
                });
                dishes_type_select += '</th>';
            } else {
                // 直接生成下拉選單
                dishes_type_select += `<select class="form-control" aria-describedby="inputGroup-Main-dish-${addSelectName}">`;
                const isSelected = ($(cellSelector).text() === '') ? ' selected' : '';
                dishes_type_select += `<option value=""${isSelected}></option>`;
                get_dishes_type_name_array.forEach((name, i) => {
                    const selected = (name === $(cellSelector).text()) ? ' selected' : '';
                    dishes_type_select += `<option value="${get_dishes_type_id_array[i]}"${selected}>${name}</option>`;
                });
                dishes_type_select += '</select>';
                dishes_type_select = `<th scope="col">${dishes_type_select}</th>`;
            }

            $(cellSelector).append(dishes_type_select);
        }

        // 生成主食的選擇
        filterDishes("00"); // 主食
        generateDishesSelect("00", 4, "main"); // rowIndex = 4

        // 生成蛋白質(濕)的選擇
        filterDishes("01"); // 蛋白質(濕)
        generateDishesSelect("01", 5, "protein_wet"); // rowIndex = 5

        // 生成蛋白質(乾)的選擇
        filterDishes("02"); // 蛋白質(乾)
        generateDishesSelect("02", 6, "protein_dry"); // rowIndex = 6

        // 生成蛋白質+纖維質的選擇
        filterDishes("03"); // 蛋白質+纖維質
        generateDishesSelect("03", 7, "protein_fiber"); // rowIndex = 7

        // 處理副菜的選擇
        function createDishesSelect(type) {
            filterDishes(type); // 根據類型篩選副菜名稱和ID
            const rowIndex = parseInt(type) + 7; // 將類型轉為對應的行數
            generateDishesSelect(type, rowIndex, `side-${type}`); // 生成副菜的選擇
        }

        // 呼叫函數來處理不同的副菜類型
        createDishesSelect("04"); // 時蔬＋菇等
        createDishesSelect("05"); // 葉菜類以外的蔬菜
        createDishesSelect("06"); // 翠綠葉菜
        createDishesSelect("07"); // 根莖類

        // 生成鹹湯的選擇
        filterDishes("08"); // 鹹湯
        let saltySoupSelect = '<select class="form-control" aria-describedby="inputGroup-salty-soup">';
        const saltySoupCell = $('#detail_table tbody tr:nth-child(12) th:nth-child(' + array_index + ')');
        const isEmpty = (saltySoupCell.text() === '') ? ' selected' : '';
        saltySoupSelect += `<option value=""${isEmpty}></option>`;
        get_dishes_type_name_array.forEach((name, i) => {
            const selected = (name === saltySoupCell.text()) ? ' selected' : '';
            saltySoupSelect += `<option value="${get_dishes_type_id_array[i]}"${selected}>${name}</option>`;
        });
        saltySoupSelect += '</select>';
        $('#detail_table tbody tr:nth-child(12)').append('<th scope="col">' + saltySoupSelect + '</th>');

        // 生成甜湯的選擇
        filterDishes("09"); // 甜湯
        let sweetSoupSelect = '<select class="form-control" aria-describedby="inputGroup-sweet-soup">';
        const sweetSoupCell = $('#detail_table tbody tr:nth-child(13) th:nth-child(' + array_index + ')');
        const isEmptySweet = (sweetSoupCell.text() === '') ? ' selected' : '';
        sweetSoupSelect += `<option value=""${isEmptySweet}></option>`;
        get_dishes_type_name_array.forEach((name, i) => {
            const selected = (name === sweetSoupCell.text()) ? ' selected' : '';
            sweetSoupSelect += `<option value="${get_dishes_type_id_array[i]}"${selected}>${name}</option>`;
        });
        sweetSoupSelect += '</select>';
        $('#detail_table tbody tr:nth-child(13)').append('<th scope="col">' + sweetSoupSelect + '</th>');

        // 生成水果的選擇
        const get_fruits_name = getCookie("fruits");
        const get_fruits_name_temp = get_fruits_name.split(',');
        let fruits_select = '<select class="form-control" aria-describedby="inputGroup-fruits">';
        const fruitsCell = $('#detail_table tbody tr:nth-child(14) th:nth-child(' + array_index + ')');
        const isEmptyFruit = (fruitsCell.text() === '') ? ' selected' : '';
        fruits_select += `<option value=""${isEmptyFruit}></option>`;
        get_fruits_name_temp.forEach(fruit => {
            const selected = (fruit === fruitsCell.text()) ? ' selected' : '';
            fruits_select += `<option value="${fruit}"${selected}>${fruit}</option>`;
        });
        fruits_select += '</select>';
        $('#detail_table tbody tr:nth-child(14)').append('<th scope="col">' + fruits_select + '</th>');
    }

    // 菜單管理 編輯功能 2024/8/19
    function tabPanel2bt_edit(array_index) {
        // 獲取菜單表格中的所有行
        const rows = $('#detail_table tbody tr');

        // 遍歷所有行，並進行編輯處理
        rows.each(function (index) {
            // 獲取當前行的所有單元格
            const cells = $(this).find('th');

            // 遍歷每一個單元格
            cells.each(function (cellIndex) {
                const cell = $(this);
                const cellText = cell.text().trim(); // 獲取當前單元格的文本

                // 如果是第一行或第二行，直接跳過
                if (index === 0 || index === 1) {
                    return true; // 這個繼續表示跳過當前迴圈
                }

                // 如果當前單元格的索引等於 array_index，則開始編輯
                if (cellIndex === array_index) {
                    // 清空單元格的內容
                    cell.empty();

                    // 創建一個輸入框並設置為可編輯狀態
                    const input = $('<input>', {
                        type: 'text',
                        class: 'form-control',
                        value: cellText, // 設置輸入框的值為當前單元格的文本
                    });

                    // 將輸入框添加到當前單元格中
                    cell.append(input);
                }
            });
        });
    }


    // 菜單管理 刪除動作
    function tabPanel2bt_delete(array_index) {
        // 打勾確認框
        // 2024/8/15 追加設定，如果選項是"被複製"出來的，不能再被複製，checkbox直接給值做差異化

        // 定義要刪除的行數，以便進行批次刪除
        const rowsToClear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        // 遍歷需要清除的行數，移除相應的單元格內容
        rowsToClear.forEach((rowIndex) => {
            $('#detail_table tbody tr:nth-child(' + rowIndex + ') th:nth-child(' + array_index + ')').children().remove();
        });

        // 注意: 若需要進一步的行動（例如更新UI或提示使用者），可以在此處添加代碼。
    }

    // 菜單新增 新增按鈕功能
    $('#TabPanel4bt_new').click(function () {
        // 檢查用戶是否已登入以進行新增操作
        const at_start = getCookie("person");

        // 若未登入，提示用戶並返回
        if (!at_start) {
            alert('沒有登入也就不能儲存，請登入再使用新增功能');
            return; // 直接返回，避免執行後續程式
        }

        // 若已登入，調用新增功能
        tabpanel4bt_new();
    });


    // 新增分頁 新增動作
    function tabpanel4bt_new() {
        // 在表頭新增全選的核取方塊
        $('#create_menu_table thead tr').append('<th scope="col"><input type="checkbox" name="cb_col" class="cb_col"/></th>');

        // 班會日期欄位
        $('#create_menu_table tbody tr:nth-child(1)').append('<td><input type="text" name="date" class="form-control datepicker"/></td>');

        // 餐別下拉選單
        const dishes_type_array = ['早餐', '午餐', '晚餐'];
        let dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
        for (const dish of dishes_type_array) {
            dishes_type_select += `<option value="${dish}">${dish}</option>`;
        }
        dishes_type_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(2)').append('<td>' + dishes_type_select + '</td>');

        // 取得菜品名稱和ID，並根據類型動態生成下拉選單
        const get_dishes_type_name = getCookie("get_dishes_type_name");
        const get_dishes_type_name_array_temp = get_dishes_type_name.split(',');

        // 定義一個函數來生成下拉選單
        function generateDishesSelect(typeCode, rowIndex) {
            const names = [];
            const ids = [];
            for (const item of get_dishes_type_name_array_temp) {
                const [name, type, id] = item.split('＊');
                if (type === typeCode) {
                    names.push(name);
                    ids.push(id);
                }
            }

            // 生成下拉選單
            let selectHtml = '<select class="form-control"><option value="" selected></option>';
            for (let i = 0; i < names.length; i++) {
                selectHtml += `<option value="${ids[i]}">${names[i]}</option>`;
            }
            selectHtml += '</select>';
            $('#create_menu_table tbody tr:nth-child(' + rowIndex + ')').append('<td>' + selectHtml + '</td>');
        }

        // 根據不同的類型碼生成對應的下拉選單
        generateDishesSelect("00", 3); // 主食
        generateDishesSelect("01", 4); // 主菜（蛋白質＿濕）
        generateDishesSelect("02", 5); // 主菜（蛋白質＿乾）
        generateDishesSelect("03", 6); // 主菜（蛋白質＋纖維質）
        generateDishesSelect("04", 7); // 副菜（時蔬＋菇等＿2種以上食材）
        generateDishesSelect("05", 8); // 副菜（葉菜類以外的蔬菜,如瓜類、茄子）
        generateDishesSelect("06", 9); // 副菜（翠綠葉菜）
        generateDishesSelect("07", 10); // 副菜（根莖類）
        generateDishesSelect("08", 11); // 鹹湯
        generateDishesSelect("09", 12); // 甜湯

        // 水果下拉選單
        const get_fruits_name = getCookie("fruits");
        const get_fruits_name_temp = get_fruits_name.split(',');
        let fruits_select = '<select class="form-control" aria-describedby="inputGroup-fruits"><option value="" selected></option>';
        for (const fruit of get_fruits_name_temp) {
            fruits_select += `<option value="${fruit}">${fruit}</option>`;
        }
        fruits_select += '</select>';
        $('#create_menu_table tbody tr:nth-child(13)').append('<td>' + fruits_select + '</td>');
    }


    let check_array = []; // 用於儲存被勾選的項目索引

    // 監聽核取方塊的變化事件，更新勾選項目
    $(document).on('change', '.GvGrid td .search_cb', function () {
        // 遍歷所有核取方塊
        $('.GvGrid td .search_cb').each(function (index) {
            const isChecked = $(this).prop("checked"); // 獲取當前核取方塊的勾選狀態

            // 如果核取方塊被勾選
            if (isChecked) {
                // 檢查索引是否已存在於 check_array 中
                if (!check_array.includes(index)) {
                    check_array.push(index); // 將索引添加到 check_array 中
                }
            } else {
                // 如果核取方塊未被勾選
                const indexPosition = check_array.indexOf(index);
                // 檢查索引是否存在於 check_array 中
                if (indexPosition !== -1) {
                    check_array.splice(indexPosition, 1); // 將索引從 check_array 中移除
                }
            }
        });

        // console.log(check_array); // 可以解除註解以檢查當前的勾選項目索引
    });


    // 查看按鈕：判斷勾選數量，並引導至第二頁查看
    $('#TabPanel1bt_view').click(function () {
        // 檢查是否有選擇項目
        if (check_array.length > 0) {
            // 儲存勾選的索引至 cookie
            document.cookie = "check_array=" + check_array.join(",");

            let correct_array = []; // 用於儲存有效的表格數據

            // 遍歷表格中的所有儲存格
            $('#gv_search_view tbody tr td').each(function () {
                // 將儲存格中有內容的文本添加到 correct_array 中
                if ($(this).text().length > 0) {
                    correct_array.push($(this).text());
                }
            });

            let infor_list = []; // 用於儲存勾選的資訊列表
            // 每6個元素為一組，根據勾選的索引組成資訊列表
            for (let i = 0; i < correct_array.length / 6; i++) {
                if (check_array.includes(i)) { // 使用 includes 檢查索引
                    // 將每組6個元素合併成一個字符串並添加到 infor_list 中
                    infor_list.push(correct_array.slice((6 * i), (6 * i) + 6).join(","));
                }
            }

            // console.log(infor_list.join(";")); // 可解除註解以檢查資訊列表

            // 儲存選擇的資訊至 cookie
            document.cookie = "check_infor=" + infor_list.join("、");

            // 切換到第二頁
            $('#search-tab').removeClass('active'); // 移除搜尋頁的激活狀態
            $('#second-tab').addClass('active'); // 設定第二頁為激活狀態
            $('#search').removeClass('active'); // 移除搜尋區域的顯示
            $('#second').addClass('active'); // 顯示第二頁內容

            // 檢查是否有保存的資訊，若有則顯示
            if (getCookie("check_infor") != null) {
                let mydata = getCookie("check_infor");
                let table = $.makeDetailTables(mydata); // 根據資訊生成詳細表格
                table.appendTo("#detail_div"); // 將表格附加到指定的 div

                // 清除已保存的 cookie
                document.cookie = 'check_infor=; Max-Age=0; path=/; domain=' + location.hostname;
            }
        }
    });


    // 勾選資訊呈現
    $.makeDetailTables = function (mydata) {
        // 移除已存在的詳細表格
        $('#detail_table').remove();

        // 將傳入的資料根據「、」進行分割
        var temp_array = mydata.split('、');

        // 建立表格的基本 HTML 結構
        let temp_html = `<table id="detail_table" class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><th scope="row">班會日期</th></tr>
                            <tr><th scope="row">菜單主題</th></tr>
                            <tr><th scope="row">餐別</th></tr>
                            <tr><th scope="row">主食</th></tr>
                            <tr><th scope="row">主菜（蛋白質＿濕）</th></tr>
                            <tr><th scope="row">主菜（蛋白質＿乾）</th></tr>
                            <tr><th scope="row">主菜（蛋白質＋纖維質）</th></tr>
                            <tr><th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th></tr>
                            <tr><th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th></tr>
                            <tr><th scope="row">副菜（翠綠葉菜）</th></tr>
                            <tr><th scope="row">副菜（根莖類）</th></tr>
                            <tr><th scope="row">鹹湯</th></tr>
                            <tr><th scope="row">甜湯</th></tr>
                            <tr><th scope="row">水果</th></tr>
                        </tbody>
                    </table>`;

        // 將表格附加到指定的 div 中
        $('#detail_div').append(temp_html);

        // 創建表頭的勾選框
        let temp_tablerow = '';
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" /></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow);

        // 將數據填入表格
        const fillTableRow = (index, field) => {
            let temp_tablerow = '';
            for (var i = 0; i < temp_array.length; i++) {
                temp_tablerow += `<th scope="col"><span class="label label-default" name="${field}">${temp_array[i].split(',')[index]}</span></th>`;
            }
            $('#detail_table tbody tr:nth-child(' + (index + 1) + ')').append(temp_tablerow);
        };

        // 填充班會日期、菜單主題和餐別
        fillTableRow(3, 'date');     // 班會日期
        fillTableRow(0, 'name');     // 菜單主題
        fillTableRow(1, 'meal_type'); // 餐別

        // 發送 API 請求以獲取菜餚資料
        for (var ii = 0; ii < temp_array.length; ii++) {
            var [name, mealType, , date] = temp_array[ii].split(',');
            var api_url = `http://internal.hochi.org.tw:8082/api/dishes/get_activity_dishes?activity_name=${name}&meal_type=${mealType}&activity_date=${date}`;

            console.log(api_url); // 調試用：顯示 API 請求

            $.getJSON(api_url, { format: "json" }).done(function (data) {
                if (data.length > 0) {
                    const dishCategories = {
                        "00": "staple_food",                       // 主食
                        "01": "staple_food_wet",                   // 主菜（蛋白質＿濕）
                        "02": "staple_food_dry",                   // 主菜（蛋白質＿乾）
                        "03": "staple_food_fiber",                 // 主菜（蛋白質＋纖維質）
                        "04": "Non_staple_food_mushroom",         // 副菜（時蔬＋菇等＿2種以上食材）
                        "05": "Non_staple_food_melon",            // 副菜（葉菜類以外的蔬菜,如瓜類、茄子）
                        "06": "Non_staple_food_vegetables",       // 副菜（翠綠葉菜）
                        "07": "Non_staple_food_roots",            // 副菜（根莖類）
                        "08": "salty_soup",                        // 鹹湯
                        "09": "sweet_soup",                        // 甜湯
                        "fruits": "fruits"                         // 水果
                    };

                    // 填充各類菜餚
                    for (const type in dishCategories) {
                        let temp_tablerow = `<th scope="col"><span class="label label-default" name="${dishCategories[type]}">`;
                        let temp_list = data.filter(dish => dish.dishes_type === type).map(dish => dish.dishes_name);
                        temp_tablerow += temp_list.join("<br/>") + '</span></th>';
                        $('#detail_table tbody tr:nth-child(' + (parseInt(type) + 4) + ')').append(temp_tablerow); // 加4是因為前面有4行
                    }
                }
            });
        }

        return $('#detail_table'); // 返回生成的表格元素
    }


    // 複製按鈕，判斷勾選數量，引導至第二頁編輯
    $('#TabPanel1bt_copy').click(function () {
        // 檢查是否有勾選項目
        if (check_array.length > 0) {
            // 將勾選的項目存入 cookie
            document.cookie = "check_array=" + check_array.join(",");

            // 收集正確的資料
            let correct_array = [];
            $('#gv_search_view tbody tr td').each(function () {
                // 遍歷每個單元格，若有文字則加入 correct_array
                $(this).each(function () {
                    if ($(this).text().length > 0) {
                        correct_array.push($(this).text());
                    }
                });
            });

            // 收集勾選的資訊
            let infor_list = [];
            for (var i = 0; i < correct_array.length / 6; i++) {
                // 檢查該行是否被勾選
                if (check_array.indexOf(i) !== -1) {
                    infor_list.push(correct_array.slice((6 * i), (6 * i) + 6).join(",")); // 將每六個元素組合成一個字串
                }
            }

            // 將收集到的資訊存入 cookie
            document.cookie = "check_infor=" + infor_list.join("、");

            // 切換至第二頁
            $('#search-tab').removeClass('active'); // 隱藏搜尋頁面
            $('#second-tab').addClass('active');    // 顯示第二頁面
            $('#search').removeClass('active');      // 隱藏搜尋區域
            $('#second').addClass('active');         // 顯示第二區域

            // 確認 cookie 是否存在
            if (getCookie("check_infor") != null) {
                var mydata = getCookie("check_infor"); // 取得 cookie 資料
                var table = $.copyDetailTables(mydata); // 使用 mydata 呼叫 copyDetailTables 函數生成表格
                table.appendTo("detail_div"); // 將生成的表格附加到 detail_div
                // 清除 cookie
                document.cookie = 'check_infor=; Max-Age=0; path=/; domain=' + location.hostname;
            }
        }
    });


    // 勾選資訊呈現
    $.copyDetailTables = function (mydata) {
        // 移除已有的 detail_table
        $('#detail_table').remove();
        var temp_array = mydata.split('、'); // 將資料以「、」分割成陣列

        // 建立表格的基本 HTML 結構
        let temp_html = `<table id="detail_table" class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><th scope="row">班會日期</th></tr>
                            <tr><th scope="row">菜單主題</th></tr>
                            <tr><th scope="row">餐別</th></tr>
                            <tr><th scope="row">主食</th></tr>
                            <tr><th scope="row">主菜（蛋白質＿濕）</th></tr>
                            <tr><th scope="row">主菜（蛋白質＿乾）</th></tr>
                            <tr><th scope="row">主菜（蛋白質＋纖維質）</th></tr>
                            <tr><th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th></tr>
                            <tr><th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th></tr>
                            <tr><th scope="row">副菜（翠綠葉菜）</th></tr>
                            <tr><th scope="row">副菜（根莖類）</th></tr>
                            <tr><th scope="row">鹹湯</th></tr>
                            <tr><th scope="row">甜湯</th></tr>
                            <tr><th scope="row">水果</th></tr>
                        </tbody>
                    </table>`;
        $('#detail_div').append(temp_html); // 將表格附加到 detail_div
        let temp_tablerow = '';

        // 打勾確認框
        for (var i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col" value="Iscopyed" /></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow); // 將勾選框附加到表頭

        // 班會日期
        appendInputFieldsToRow(1, 'date', 'text', true, temp_array.length);

        // 菜單主題
        appendInputFieldsToRow(2, 'name', 'text', true, temp_array.length);

        // 餐別
        appendMealTypeSelectToRow(3, temp_array);

        // 動態從 API 獲取資料
        for (var ii = 0; ii < temp_array.length; ii++) {
            let activityInfo = temp_array[ii].split(',');
            var api_url = `http://internal.hochi.org.tw:8082/api/dishes/get_activity_dishes?activity_name=${activityInfo[0]}&meal_type=${activityInfo[1]}&activity_date=${activityInfo[3]}`;

            // 獲取資料後填充表格
            $.getJSON(api_url, { format: "json" }).done(function (data) {
                if (data.length > 0) {
                    appendDishRows(data);
                }
            });
        }

        return $('#detail_table'); // 返回生成的表格
    }

    // 附加輸入欄位到指定的行
    function appendInputFieldsToRow(rowIndex, name, type, isTextInput, count) {
        let temp_tablerow = '';
        for (var i = 0; i < count; i++) {
            temp_tablerow += `<th scope="col"><input type="${type}" name="${name}" class="form-control${isTextInput ? ' datepicker' : ''}" style="background-color:Pink" /></th>`;
        }
        $('#detail_table tbody tr:nth-child(' + rowIndex + ')').append(temp_tablerow);
    }

    // 附加餐別下拉選單到指定的行
    function appendMealTypeSelectToRow(rowIndex, temp_array) {
        let temp_tablerow = '';
        const dishes_type_array = ['早餐', '午餐', '晚餐'];

        for (var i = 0; i < temp_array.length; i++) {
            let dishes_type_select = '<select class="form-control" aria-describedby="inputGroup-dishes_type">';
            dishes_type_array.forEach(type => {
                dishes_type_select += `<option value="${type}" ${temp_array[i].split(',')[1] === type ? 'selected' : ''}>${type}</option>`;
            });
            dishes_type_select += '</select>';
            temp_tablerow += `<th scope="col">${dishes_type_select}</th>`;
        }

        $('#detail_table tbody tr:nth-child(' + rowIndex + ')').append(temp_tablerow);
    }

    // 附加菜餚行到表格
    function appendDishRows(data) {
        const dishTypes = [
            { type: "00", name: "主食" },
            { type: "01", name: "主菜（蛋白質＿濕）" },
            { type: "02", name: "主菜（蛋白質＿乾）" },
            { type: "03", name: "主菜（蛋白質＋纖維質）" },
            { type: "04", name: "副菜（時蔬＋菇等＿2種以上食材）" },
            { type: "05", name: "副菜（葉菜類以外的蔬菜,如瓜類、茄子）" },
            { type: "06", name: "副菜（翠綠葉菜）" },
            { type: "07", name: "副菜（根莖類）" },
            { type: "08", name: "鹹湯" },
            { type: "09", name: "甜湯" }
        ];

        dishTypes.forEach((dish, index) => {
            let temp_tablerow = `<th scope="col"><button type="button" class="btn btn-success" name="add_select" value="${dish.type}">➕</button><button type="button" class="btn btn-danger" name="minus_select" value="${dish.type}">➖</button>`;
            let temp_list = [];

            data.forEach(item => {
                if (item.dishes_type === dish.type) {
                    let selectoptions = settingSelectOptions(dish.type, item.dishes_name);
                    temp_list.push(selectoptions);
                }
            });

            if (temp_list.length === 0) {
                let selectoptions = settingSelectOptions(dish.type, "");
                temp_list.push(selectoptions);
            }
            temp_tablerow += temp_list.join('') + '</th>';
            $('#detail_table tbody tr:nth-child(' + (4 + index) + ')').append(temp_tablerow);
        });
    }




    // 儲存 按鈕
    $('#TabPanel4bt_save').click(function () {
        // 檢查表格是否有資料
        if ($('#create_menu_table tbody tr:nth-child(1) td').length > 0) {
            // 初始化填充數據的二維陣列
            var fill_db = [];
            var arrayindex = 0;

            // 獲取菜單主題
            $('#create_menu_table tbody tr:nth-child(1) td .form-control').each(function () {
                fill_db[arrayindex] = []; // 初始化內部數組
                fill_db[arrayindex][0] = $('#activity_infor .form-control[name="name"]').val(); // 菜單主題
                arrayindex += 1;
            });

            // 計算活動時間
            let date1 = new Date($('#from_').val());
            let date2 = new Date($('#to_').val());
            let Difference_In_Time = date2.getTime() - date1.getTime();
            let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)) + 1; // 加上起始日

            // 獲取班會日期
            arrayindex = 0;
            $('#create_menu_table tbody tr:nth-child(1) td .form-control').each(function () {
                fill_db[arrayindex][1] = $(this).val(); // 班會日期
                arrayindex += 1;
            });

            // 獲取餐別、活動天數和活動期間
            arrayindex = 0;
            $('#create_menu_table tbody tr:nth-child(2) td .form-control').each(function () {
                fill_db[arrayindex][2] = $(this).find(":selected").text(); // 餐別
                fill_db[arrayindex][3] = Difference_In_Days; // 活動天數
                fill_db[arrayindex][4] = $('#from_').val() + '~' + $('#to_').val(); // 活動期間
                fill_db[arrayindex][5] = []; // 初始化內部數組
                arrayindex += 1;
            });

            // 獲取菜單內容
            let fill_array = [];
            for (let i = 0; i < $('#create_menu_table tbody tr:nth-child(1) td').length; i++) {
                fill_array[i] = []; // 初始化內部數組
            }

            // 定義一個函數來處理選擇的菜單項目
            function processMenuItems(rowIndex) {
                let arrayIndex = 0;
                $('#create_menu_table tbody tr:nth-child(' + rowIndex + ') td .form-control').each(function () {
                    if ($(this).find(":selected").text() != '') {
                        fill_array[arrayIndex][rowIndex - 3] = $(this).find(":selected").val(); // 根據行索引填充
                        fill_db[arrayIndex][5].push($(this).find(":selected").val()); // 添加到主數組
                    }
                    arrayIndex += 1;
                });
            }

            // 處理各種菜單項目
            for (let i = 3; i <= 12; i++) {
                processMenuItems(i);
            }

            // 獲取用戶登入狀態
            let at_start = getCookie("person");
            if (at_start != "") {
                arrayindex = 0;
                $('#create_menu_table tbody tr:nth-child(1) td .form-control').each(function () {
                    // 發送 AJAX 請求上傳資料
                    $.ajax({
                        type: "POST",
                        url: "http://internal.hochi.org.tw:8082/api/dishes/appendActivity_records",
                        data: JSON.stringify({
                            "activity_name": fill_db[arrayindex][0], // 活動名稱
                            "activity_date": fill_db[arrayindex][1].replace('/', '-').replace('/', '-'), // 活動日期
                            "meal_type": fill_db[arrayindex][2], // 餐別
                            "activity_days": fill_db[arrayindex][3], // 活動天數
                            "during_the_activity": fill_db[arrayindex][4], // 活動期間
                            "lm_user": at_start.split(';')[0].split('&')[1].split('=')[1], // 用戶
                            "dishes_id_str": fill_db[arrayindex][5].join(',') // 菜單項目ID
                        }),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        success: function (data) {
                            alert('上傳成功!'); // 上傳成功提示
                        },
                        error: function (data) {
                            console.log(data); // 錯誤日誌
                        }
                    });

                    arrayindex += 1; // 移動到下一個索引
                });
            } else {
                alert('沒有登入無法使用儲存功能!'); // 未登入提示
            }
        }
    });


});

// 取得 TabPanel1 table 的雙擊事件，已知 BUG：th 也會列入雙擊事件
$(document).one('dblclick', $('#gv_search_view tbody tr'), function () {
    $('#gv_search_view tbody').on('dblclick', 'tr', function () {
        let correct_row = $(this).text();  // 取得雙擊的行文字內容
        let correct_array = [];

        // 取得所有單元格的文字並儲存至 correct_array
        $('#gv_search_view tbody tr td').each(function () {
            if ($(this).text().length > 0) {
                correct_array.push($(this).text());
            }
        });

        // 根據行數推算每行的內容
        for (let i = 0; i < correct_array.length / 6; i++) {
            if (correct_array.slice((6 * i), (6 * i) + 6).join("") === correct_row) {
                document.cookie = "dblclickrow=" + correct_array.slice((6 * i), (6 * i) + 6).join(",");  // 設定 cookie
                switchTabs();  // 切換到第二個選項卡

                // 如果 cookie 存在，則建立詳細資料表格
                if (getCookie("dblclickrow")) {
                    let mydata = getCookie("dblclickrow");
                    let table = $.makeDetailTable(mydata);
                    table.appendTo("detail_div");
                    // 清除 cookie
                    document.cookie = 'dblclickrow=; Max-Age=0; path=/; domain=' + location.hostname;
                }
            }
        }
    });

    // 切換選項卡的函數
    function switchTabs() {
        $('#search-tab').removeClass('active');
        $('#second-tab').addClass('active');
        $('#search').removeClass('active');
        $('#second').addClass('active');
    }

    // 創建詳細資料表格
    $.makeDetailTable = function (mydata) {
        $('#detail_table').remove();  // 移除舊的詳細資料表格
        let temp_array = mydata.split('、');  // 分割資料
        let temp_html = createDetailTableHTML();  // 創建表格 HTML
        $('#detail_div').append(temp_html);  // 將 HTML 添加到 detail_div

        let temp_tablerow = '';
        // 打勾確認框
        for (let i = 0; i < temp_array.length; i++) {
            temp_tablerow += '<th scope="col"><input type="checkbox" name="cb_col" class="cb_col"></th>';
        }
        $('#detail_table thead tr').append(temp_tablerow);  // 添加確認框到表頭

        // 設置每一行的內容
        setTableRowData(temp_array);

        // 獲取 API 數據並填充表格
        fetchAPIData(temp_array);
        return $('#detail_table');
    };

    // 創建詳細資料表格的 HTML
    function createDetailTableHTML() {
        return `<table id="detail_table" class="table">
                    <thead>
                        <tr><th scope="col"></th></tr>
                    </thead>
                    <tbody>
                        <tr><th scope="row">班會日期</th></tr>
                        <tr><th scope="row">菜單主題</th></tr>
                        <tr><th scope="row">餐別</th></tr>
                        <tr><th scope="row">主食</th></tr>
                        <tr><th scope="row">主菜（蛋白質＿濕）</th></tr>
                        <tr><th scope="row">主菜（蛋白質＿乾）</th></tr>
                        <tr><th scope="row">主菜（蛋白質＋纖維質）</th></tr>
                        <tr><th scope="row">副菜（時蔬＋菇等＿2種以上食材）</th></tr>
                        <tr><th scope="row">副菜（葉菜類以外的蔬菜,如瓜類、茄子）</th></tr>
                        <tr><th scope="row">副菜（翠綠葉菜）</th></tr>
                        <tr><th scope="row">副菜（根莖類）</th></tr>
                        <tr><th scope="row">鹹湯</th></tr>
                        <tr><th scope="row">甜湯</th></tr>
                        <tr><th scope="row">水果</th></tr>
                    </tbody>
                </table>`;
    }

    // 設置表格每一行的資料
    function setTableRowData(temp_array) {
        const rowLabels = ['班會日期', '菜單主題', '餐別'];
        for (let j = 0; j < rowLabels.length; j++) {
            let temp_tablerow = '';
            for (let i = 0; i < temp_array.length; i++) {
                temp_tablerow += '<th scope="col"><span class="label label-default" name="' + rowLabels[j] + '">' + temp_array[i].split(',')[j] + '</span></th>';
            }
            $('#detail_table tbody tr:nth-child(' + (j + 1) + ')').append(temp_tablerow);
        }
    }

    // 獲取 API 數據
    function fetchAPIData(temp_array) {
        let api_url = `http://internal.hochi.org.tw:8082/api/dishes/get_activity_dishes?activity_name=${temp_array[0].split(',')[0]}&meal_type=${temp_array[0].split(',')[1]}&activity_date=${temp_array[0].split(',')[3]}`;
        $.getJSON(api_url, { format: "json" }).done(function (data) {
            if (data.length > 0) {
                populateFoodData(data);
            }
        });
    }

    // 填充食物資料
    function populateFoodData(data) {
        const foodTypes = [
            { type: "00", row: 4, name: "主食" },
            { type: "01", row: 5, name: "主菜（蛋白質＿濕）" },
            { type: "02", row: 6, name: "主菜（蛋白質＿乾）" },
            { type: "03", row: 7, name: "主菜（蛋白質＋纖維質）" },
            { type: "04", row: 8, name: "副菜（時蔬＋菇等＿2種以上食材）" },
            { type: "05", row: 9, name: "副菜（葉菜類以外的蔬菜,如瓜類、茄子）" },
            { type: "06", row: 10, name: "副菜（翠綠葉菜）" },
            { type: "07", row: 11, name: "副菜（根莖類）" },
            { type: "08", row: 12, name: "鹹湯" },
            { type: "09", row: 13, name: "甜湯" }
        ];

        foodTypes.forEach(food => {
            let temp_tablerow = '<th scope="col"><span class="label label-default" name="' + food.name + '">';
            let temp_list = data.filter(item => item.dishes_type === food.type).map(item => item.dishes_name);
            temp_tablerow += temp_list.join("<br/>") + '</span></th>';
            $('#detail_table tbody tr:nth-child(' + food.row + ')').append(temp_tablerow);
        });
    }
});

// 菜單管理2 checkbox 勾選事件
$(document).unbind('change').bind('change', $('.cb_col'), function () {
    // 勾選的索引陣列
    let checkbox_checked_array = [];
    // 勾選的索引
    $('.cb_col').each(function (index) {
        if ($(this).prop("checked")) {
            checkbox_checked_array.push(index);
        }
    });

    // 登入時可使用複製&編輯
    let at_start = getCookie("person");
    if (at_start !== "") {
        toggleButtonState(checkbox_checked_array.length !== 0);
    }
});

// 切換按鈕狀態
function toggleButtonState(isEnabled) {
    const btns = ['#TabPanel2bt_edit', '#TabPanel2bt_copy', '#TabPanel2bt_delete'];
    btns.forEach(btn => {
        $(btn).removeClass(isEnabled ? "btn-secondary" : "btn-success");
        $(btn).addClass(isEnabled ? "btn-success" : "btn-secondary");
    });
}

//點擊 + 增加下拉選單
$(document).unbind('click').bind('click', $('button[name="add_select"]'), function onClick() {
    $('button[name="add_select"]').unbind('click').on('click', (function onClick() {
        var temp = settingSelectOptions($(this).val(), "");
        $(this).closest("th").append(temp);
    }));
    //點擊 - 減少下拉選單(至少一個，所以剩下一個就不會繼續減少)
    $('button[name="minus_select"]').unbind('click').on('click', (function onClick() {
        console.log('minus_select');
        //尋找地位下的最靠近的 th
        var closeitem = $(this).closest("th");
        var closeitemarray = closeitem.find("select");
        console.log(closeitemarray.length);
        if (closeitemarray.length > 1) {
            closeitem.find("select:last").remove();
        }
    }));
    //使動態元件 日期生效 並且指定格式 yyyy/MM/dd
    $('.datepicker').datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        dateFormat: "yy/mm/dd"
    });
    //使動態元件 日期顏色CSS
    $('.datepicker').each(function (data) {
        if ($(this).val().length == 0) {
            $(this).css("background-color", "Pink");
        } else {
            $(this).css("background-color", "SpringGreen");
        }
    });
})

// 刪除按鈕事件
$(document).on('click', '.remove_select', function () {
    $(this).closest('.row').remove();
});

//取得cookie值
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

// 設定下拉選單數值
function settingSelectOptions(tempvalue, dishes_name) {
    // 取得 cookie 中的菜色類型名稱
    var get_dishes_type_name = getCookie("get_dishes_type_name");
    var get_dishes_type_name_array_temp = get_dishes_type_name.split(','); // 將 cookie 字串按逗號切割成陣列
    var get_dishes_type_name_array = []; // 儲存符合 tempvalue 的菜色類型名稱

    // 遍歷切割後的陣列，取得符合 tempvalue 的菜色類型名稱
    for (let i = 0; i < get_dishes_type_name_array_temp.length; i++) {
        var get_type = get_dishes_type_name_array_temp[i].split('＊')[1]; // 取得類型名稱
        if (get_type == tempvalue) {
            get_dishes_type_name_array.push(get_dishes_type_name_array_temp[i].split('＊')[0]); // 將符合的菜色名稱加入陣列
        }
    }

    // 開始建立下拉選單的 HTML 字串
    let dishes_type_select = '<select class="form-control">'; // 設定下拉選單的類別

    // 迭代符合的菜色名稱，建立選項
    for (let i = 0; i < get_dishes_type_name_array.length; i++) {
        // 首個選項為空白選項
        if (i == 0) {
            // 若菜色不在清單內，則預設選項為空白
            if (get_dishes_type_name_array.indexOf(dishes_name) == -1) {
                dishes_type_select += '<option value="" selected></option>'; // 選項為空白，並設為選中
            } else {
                dishes_type_select += '<option value=""></option>'; // 仍需顯示空白選項
            }
        }
        // 若當前菜色為歷史菜色，則預設選中
        if (get_dishes_type_name_array[i] == dishes_name) {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '" selected>' + get_dishes_type_name_array[i] + '</option>';
        } else {
            dishes_type_select += '<option value="' + get_dishes_type_name_array[i] + '">' + get_dishes_type_name_array[i] + '</option>'; // 普通選項
        }
    }

    // 關閉下拉選單標籤
    dishes_type_select += '</select>';

    return dishes_type_select; // 返回生成的下拉選單 HTML
}


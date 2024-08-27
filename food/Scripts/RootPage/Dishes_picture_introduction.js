// event at page loaded
$(document).ready(function () {
    //取得API from cookie，site_Master 載入時就會拜訪api將菜色資訊丟到cookie get_dishes_type_name = dishes_name＊dishes_type＊dishes_id,
    if (getCookie("get_dishes_type_name")!="") {
        //主食
        const maindishes_widget = $('#dishes_menu div:nth-child(1) div:nth-child(2)');
        var html_content = '<h2>主食</h2><ul class="list">';
        const temp_array = getCookie("get_dishes_type_name").split(',');
        for (var index = 0; index < temp_array.length;index++) {
            if (temp_array[index].split('＊')[1] =='00') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] +'</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget.append(html_content);
        //主菜(蛋白質＿濕)
        const maindishes_widget1 = $('#dishes_menu div:nth-child(2) div:nth-child(1)');
        var html_content = '<h2>主菜<br/>(蛋白質＿濕)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '01') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget1.append(html_content);
        //主菜(蛋白質＿乾)
        const maindishes_widget2 = $('#dishes_menu div:nth-child(2) div:nth-child(2)');
        var html_content = '<h2>主菜<br/>(蛋白質＿乾)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '02') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget2.append(html_content);
        //主菜(蛋白質＋纖維質)
        const maindishes_widget3 = $('#dishes_menu div:nth-child(2) div:nth-child(3)');
        var html_content = '<h2>主菜<br/>(蛋白質＿乾)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '03') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget3.append(html_content);
        //副菜(時蔬＋菇等＿2種以上食材)
        const maindishes_widget4 = $('#dishes_menu div:nth-child(3) div:nth-child(1)');
        var html_content = '<h2>副菜<br/>(時蔬＋菇等＿2種以上食材)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '04') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget4.append(html_content);
        //副菜(葉菜類以外的蔬菜,如瓜類、茄子)
        const maindishes_widget5 = $('#dishes_menu div:nth-child(3) div:nth-child(2)');
        var html_content = '<h2>副菜<br/>(葉菜類以外的蔬菜,如瓜類、茄子)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '05') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget5.append(html_content);
        //副菜(翠綠葉菜)
        const maindishes_widget6 = $('#dishes_menu div:nth-child(3) div:nth-child(3)');
        var html_content = '<h2>副菜<br/>(翠綠葉菜)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '06') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget6.append(html_content);
        //副菜(根莖類)
        const maindishes_widget7 = $('#dishes_menu div:nth-child(3) div:nth-child(4)');
        var html_content = '<h2>副菜<br/>(根莖類)</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '07') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget7.append(html_content);
        //鹹湯
        const maindishes_widget8 = $('#dishes_menu div:nth-child(1) div:nth-child(3)');
        var html_content = '<h2>鹹湯</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '08') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget8.append(html_content);
        //甜湯
        const maindishes_widget9 = $('#dishes_menu div:nth-child(1) div:nth-child(4)');
        var html_content = '<h2>甜湯</h2><ul class="list">';
        for (var index = 0; index < temp_array.length; index++) {
            if (temp_array[index].split('＊')[1] == '09') {
                html_content += '<li class="list-item">' + temp_array[index].split('＊')[0] + '</li>';
            }
        }
        html_content += '</ul>';
        maindishes_widget9.append(html_content);
    }
})


//用於取得cookie對應數值
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

// 創建或修改 cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//刪除 cookie
function deleteCookie(name) {
    setCookie(name, "", -1);
}
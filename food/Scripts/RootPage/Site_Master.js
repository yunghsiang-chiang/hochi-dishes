$(document).ready(function () {
    //以ul li包子選單 
    $('.navbar-nav:nth-child(1)>.nav-item>a').click(function (event) {
        $(this).toggleClass('active');
        $(this).siblings('ul').slideToggle(1000);
    });
    $('.navbar-nav:nth-child(1)>.nav-item>ul>li>a').click(function (event) {
        $('.navbar-nav:nth-child(1)>.nav-item>a').toggleClass('active');
        $('.navbar-nav:nth-child(1)>.nav-item>a').siblings('ul').slideToggle(1000);
    });

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 食材cookie
    if (getCookie("food_nutrition") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_food_nutrition";
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
                }
                document.cookie = "food_nutrition=" + unit;
            });
    } 

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 調味cookie
    if (getCookie("seasoning") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_seasoning";
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
                }
                document.cookie = "seasoning=" + unit;
            });
    }

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 單位cookie
    if (getCookie("ingredients_unit") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_ingredients_unit";
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

    //加速資料載入使用,若沒有cookie則網頁載入時取得web api資料至cookie
    //get 水果cookie
    if (getCookie("fruits") == "") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_fruits";
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
                    unit += data[i].fruits_chinese;
                }
                document.cookie = "fruits=" + unit;
            });
    }


    if (getCookie("get_dishes_type")=="") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_dishes_type";
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
                    unit += data[i].dishes_type_name;
                }
                document.cookie = "get_dishes_type=" + unit;
            });
    }

    if (getCookie("get_dishes_type_name")=="") {
        //將單位資訊取得 並丟到cookie裡
        let api_url = "http://internal.hochi.org.tw:8082/api/dishes/get_dishes_type_name";
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
                    unit += data[i].dishes_name + '＊' + data[i].dishes_type + '＊' + data[i].dishes_id;
                }
                document.cookie = "get_dishes_type_name=" + unit;
            });
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

//網頁加載觸發
window.onload = function () {
    islogin();
}
//判斷是否有登入cookie資訊,進而修改css
function islogin() {
    if ($("#menu_infor").length > 0) {
        //console.log('有找到元件');
        at_start = getCookie("person");
        if (at_start.length<=0) {
            document.getElementById("menu_infor").innerHTML = "大愛光餐";
            document.getElementById("login_inout").innerHTML = "管理登入";
            $('.collapse ul li:nth-child(4)').hide();
            
        } else {
            //person_id=1206307&person_name=江永祥&person_area=桃園&person_subinv=F13
            console.log(at_start);
            document.getElementById("menu_infor").innerHTML = at_start.split(';')[0].split('&')[1].split('=')[1] + " 登入中";
            document.getElementById("login_inout").innerHTML = "管理登出";
            $('.collapse ul li:nth-child(4)').show();
        }
    }
}

function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    for (var i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    return cookieObj;
}
function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }
    return value;
}


$(document).ready(function () {

    //塞資訊至網頁中
    let api_url = "http://10.10.3.75:8082/api/dishes/get_seasoning/";
    var myAPI = api_url;
    $.getJSON(myAPI, {
        format: "json"
    })
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                var div_chlid = '<div class="seasoning-method"><h2>' + data[i].seasoning_name + '</h2><p>' + data[i].seasoning_description +'</p></div >';
                $("#seasoning_container").append(div_chlid)
                //console.log(data[i].seasoning_name);
                //console.log(data[i].seasoning_description);
            }
        });

    

});
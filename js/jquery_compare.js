var img1;
var img2;
var imgprev1;
var imgprev2;
var annotationID;
var asymmetryScore;
var borderScore;
var colorScore;
var timesAnnotated;
var imageID = "5af202395c1d2a2d00007bf4";
var jsondata;
//= {"annotationID": annotationID , "asymmetryScore": asymmetryScore, "borderScore": borderScore ,"colorScore": colorScore , "timesAnnotated": timesAnnotated};
var settings;

$(document).ready(function(){
    changeImage();
    $("#compare1").click(function(){
        //alert($(this).attr("style"));
        changeImage();
        asymmetryScore = 678;

        jsondata = {"asymmetryScore": asymmetryScore, "timesAnnotated": timesAnnotated};
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://medical-b854.restdb.io/rest/annotations/"+ img1,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5addc30825a622ae4d528508",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
    $("#compare2").click(function(){
        //alert($(this).attr("style"));
        changeImage();
        asymmetryScore = 678;

        jsondata = {"annotationID": annotationID , "asymmetryScore": asymmetryScore, "timesAnnotated": timesAnnotated};
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://medical-b854.restdb.io/rest/annotations/"+ imageID,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5addc30825a622ae4d528508",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }



        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    });
});

function changeImage() {
    var img1=Math.floor(Math.random()*10)+1;
    var img2=Math.floor(Math.random()*10)+1;
    while (img1 == img2)
    {
        img2=Math.floor(Math.random()*10)+1;
    }

    while (imgprev1 == img1)
    {
        img1=Math.floor(Math.random()*10)+1;
    }

    while (imgprev2 == img2)
    {
        img2=Math.floor(Math.random()*10)+1;
    }

    $("#compare1").attr("style", "background-image:url(img/lesions/" + img1 + ".jpg)");
    $("#compare2").attr("style", "background-image:url(img/lesions/" + img2 + ".jpg)");

    imgprev1 = img1;
    imgprev2 = img2;
}
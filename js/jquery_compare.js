var img1;
var img2;
var imgprev1;
var imgprev2;
var prevquestion;
var annotationID;
var asymmetryScore;
var borderScore;
var colorScore;
var timesAnnotated;
var imageID = "5af202395c1d2a2d00007bf4";
var jsondata;
//= {"annotationID": annotationID , "asymmetryScore": asymmetryScore, "borderScore": borderScore ,"colorScore": colorScore , "timesAnnotated": timesAnnotated};
var settings;
var clickcount = 0;
var question;
var questionduration = 1;

$(document).ready(function(){
    changeQuestion();
    changeImage();

    $("#compare1").click(function(){
        //alert($(this).attr("style"));

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

        changeImage();
        changeQuestion();
    });
    $("#compare2").click(function(){
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

        changeImage();
        changeQuestion();
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

function changeQuestion() {
    clickcount++;

    if (questionduration == clickcount) {
        $("#question").css("color", "#CC0000");

        while (question == prevquestion) {
            question = Math.floor(Math.random() * 3);
        }
        prevquestion = question;

        switch (question) {
            case 0:
                $("#question").html("<b>Which picture is more asymmetric?</b>")
                break;
            case 1:
                $("#question").html("<b>Which picture has a more irregular border?</b>")
                break;
            case 2:
                $("#question").html("<b>Which picture has a higher variation in color?</b>")
                break;
        }

        $("#question").animate({color: '#6c757d'}, 2500);

        questionduration = 40 - (Math.floor(Math.random() * 20) + 1);
        clickcount = 0;
    }
}
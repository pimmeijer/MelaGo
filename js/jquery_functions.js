var img1;
var img2;
var imgprev1;
var imgprev2;

$(document).ready(function(){
    $("#compare1").click(function(){
        //alert($(this).attr("style"));

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

        $("#compare1").attr("style", "background-image:url(img/" + img1 + ".jpg)");
        $("#compare2").attr("style", "background-image:url(img/" + img2 + ".jpg)");

        imgprev1 = img1;
        imgprev2 = img2;
    });
    $("#compare2").click(function(){
        //alert($(this).attr("style"));
        $("#compare1").attr("style", "background-image:url(img/" + Math.floor((Math.random() * 10) + 1) + ".jpg)");
        $("#compare2").attr("style", "background-image:url(img/" + Math.floor((Math.random() * 10) + 1) + ".jpg)");
    });
});
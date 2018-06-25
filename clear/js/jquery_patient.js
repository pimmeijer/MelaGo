var img = 100;
var userNumber = 0; 
var imagesAnnotated;
var participantID;
var userName; 
var target = 100; 
var percentageCoupon; 
var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://medical-b854.restdb.io/rest/participants",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5addc30825a622ae4d528508",
        "cache-control": "no-cache"
        }
    }

$(document).ready(function(){
$.ajax(settings).done(function (participants) {
    setTimeout(function() {
        participantID = participants[user]._id;
        imagesAnnotated = participants[user].imagesAnnotated;
        userName = participants[user].userName;
        console.log(imagesAnnotated);
        img = Math.floor((imagesAnnotated+20)/20); 
        $("#patient").attr("src", "img/patient/Female" + img + ".png");
    }, 0);
}); 
setTimeout(function() {
$("#numberImages").html("Number images annotated: "+imagesAnnotated);
if (imagesAnnotated > -1){
    $("#numberImages").html("Number images annotated: "+imagesAnnotated);
} else {
    $.ajax(settings).done(function (participants) {
    setTimeout(function() {
        participantID = participants[user]._id;
        imagesAnnotated = participants[user].imagesAnnotated;
        userName = participants[user].userName;
        console.log(imagesAnnotated);
        img = Math.floor((imagesAnnotated+20)/20); 
        if(imagesAnnotated>180){
        $("#patient").attr("src", "img/patient/Female" + "10" + ".png");    
        }else{
        $("#patient").attr("src", "img/patient/Female" + patient + ".png");
        }
    }, 3000);
    $("#numberImages").html("Number images annotated: "+imagesAnnotated);

});
}
$("#participantID").html("Your participant ID: "+user);
if (imagesAnnotated>target){    
$("#progress").css("width", "100%");
$("#progress").attr("aria-valuenow", "100");
} else{
    percentageCoupon = ((imagesAnnotated*100)/target);
    console.log("percentage: "+percentageCoupon);
    $("#progress").css("width", percentageCoupon+ "%");
$("#progress").attr("aria-valuenow", percentageCoupon);
}
 }, 4000);    
    
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
    
});

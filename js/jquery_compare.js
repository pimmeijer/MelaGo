var img1;
var img2;
var imgprev1;
var imgprev2;
var prevquestion;
var annotationID;
var asymmetryScore = 1;
var borderScore = 1;
var colorScore = 1;
var asymmetryScore2 = -1;
var borderScore2 = -1;
var colorScore2 = -1;
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
var filter = 0;
var patientcounter = 0;
var imgID;  
var start; //time start
var duration; //duration of annotation
var imgLink1; 
var imgLink2;
var userName; 
var imagesAnnotated; 
var userNumber; 
var participantID; 
var newParticipantID; 
window.user;
var userID; 
var patient; 
var threshold = 700; // below this amount of ms the annotations don't count for patient score
var target = 100; 
var percentageCoupon; 
var settingsUser = {
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
var settingsUserID = {
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
    checkCookie();
    changeQuestion(0);
    changeImage();
    start = Date.now();
//    if (getCookie("tutorial") != 1) {
//        window.location.href="tutorial.html"
//        setCookie("tutorial",1,365);
//    }
    userID = user; 
    $.ajax(settingsUser).done(function (participants) {
        
        participantID = participants[userID]._id;
        imagesAnnotated = participants[userID].imagesAnnotated;
        userName = participants[userID].userName;
        newParticipantID = participants.length;
    });   
        

    $("#compare1").click(function(){

        duration = Date.now() - start;
        imgID=img1;
        postData();
        changeImage();
        changeQuestion(1);
        start = Date.now();
    });
    $("#compare2").click(function(){
        duration = Date.now() - start;
        imgID=img2;
        postData();
        changeImage();
        changeQuestion(1);
        start = Date.now();
    });

    $("#filter").click(function() {
        var lesion1 = $("#compare1").attr("style");
        var lesion2 = $("#compare2").attr("style");

        if (filter == 0) {
            var lesion1new = lesion1.replace(".jpg", "_segmentation.png");
            var lesion2new = lesion2.replace(".jpg", "_segmentation.png");
            filter = 1;
            $("#compare1").attr("style", lesion1new);
            $("#compare2").attr("style", lesion2new);
            return;
        }

        if (filter == 1) {
            var lesion1new = lesion1.replace("_segmentation.png", ".jpg");
            var lesion2new = lesion2.replace("_segmentation.png", ".jpg");
            filter = 0;
            $("#compare1").attr("style", lesion1new);
            $("#compare2").attr("style", lesion2new);
            return;
        }

        /*
        if (filter == 0) {
            imgprev1 = ('00' + imgprev1).slice(-3);
            imgprev2 = ('00' + imgprev2).slice(-3);
            $("#compare1").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgprev1 + "_segmentation.png)");
            $("#compare2").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgprev2 + "_segmentation.png)");
            filter = 1;
        }

        if (filter == 1) {
            imgprev1 = ('00' + imgprev1).slice(-3);
            imgprev2 = ('00' + imgprev2).slice(-3);
            $("#compare1").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgprev1 + ".jpg)");
            $("#compare2").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgprev2 + ".jpg)");
            filter = 0;
        }
         */
    });
    
    $("#notification").click(function() {
        $("#notification").css("display", "none")
    })

    $("#notsure").click(function(){
        changeImage();
        changeQuestion(1);
        duration = Date.now() - start
        asymmetryScore = 0;
        borderScore = 0;
        colorScore = 0;
        asymmetryScore2 = 0;
        borderScore2 = 0;
        colorScore2 = 0;
        postData();
        start = Date.now();
    });
});

function changeImage() {
    
    
    img1=Math.floor(Math.random()*100);
    img2=Math.floor(Math.random()*100);
    while (img1 == img2)
    {
        img2=Math.floor(Math.random()*100);
    }

    while (imgprev1 == img1)
    {
        img1=Math.floor(Math.random()*100);
    }

    while (imgprev2 == img2)
    {
        img2=Math.floor(Math.random()*100);
    }
    imgprev1 = img1;
    imgprev2 = img2;
    
    imgLink1 = ('00' + img1).slice(-3);
    imgLink2 = ('00' + img2).slice(-3);
    $("#compare1").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgLink1 + ".jpg)");
    $("#compare2").attr("style", "background-image:url(img/lesions/ISIC_0000" + imgLink2 + ".jpg)");
    console.log("Images Annotated: " + imagesAnnotated);
    patientcounter = 20-(20*(Math.floor((imagesAnnotated+20)/20))-imagesAnnotated);
    console.log("patientcounter: " + patientcounter);
    console.log(patientcounter);
    if (patientcounter == 0) {
        patient = Math.floor((imagesAnnotated+20)/20);;
        if(imagesAnnotated>180){
        $("#patient").attr("src", "img/patient/Female" + "10" + ".png");    
        }else{
        $("#patient").attr("src", "img/patient/Female" + patient + ".png");
        }
        $("#notification").slideDown();
        
    }
    if(duration>threshold){
        var percentageCoupon = patientcounter*5;
            $("#progress").css("width", percentageCoupon+ "%");
            $("#progress").attr("aria-valuenow", percentageCoupon);
        
        patientcounter++;
    }

}
function postData() {
    $.ajax(settingsUser).done(function (participants) {
        
        participantID = participants[userID]._id;
        //imagesAnnotated = participants[userID].imagesAnnotated;
        userName = participants[userID].userName;
        newParticipantID = participants.length;
    });  
    if(asymmetryScore==0){
        
    }else if(duration<threshold){
        
    }
    else{
    annotationCount();
    }
    if(question==0){
        jsondata = {"imgID": img1, "asymmetryScore": asymmetryScore, "duration": duration, "userID": user, "databaseType": "game"};
    } else if(question==1){
        jsondata = {"imgID": img1, "borderScore": borderScore, "duration": duration, "userID": user, "databaseType": "game"};
    } else if(question==2) {
        jsondata = {"imgID": img1, "colorScore": colorScore, "duration": duration, "userID": user, "databaseType": "game"};
    }
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://medical-b854.restdb.io/rest/annotationdata",
        "method": "POST",
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
    
    var userIDdata = {"userID": user};
    settingsUserID = {
         "async": true,
  "crossDomain": true,
  "url": "https://medical-b854.restdb.io/rest/participants/"+participantID,
  "method": "PUT",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "5addc30825a622ae4d528508",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": JSON.stringify(userIDdata)
            }

        $.ajax(settingsUserID).done(function (response) {
            console.log(response);
        });
    
     if(question==0){
        jsondata = {"imgID": img2, "asymmetryScore": asymmetryScore2, "duration": duration, "userID": user, "databaseType": "game"};
    } else if(question==1){
        jsondata = {"imgID": img2, "borderScore": borderScore2, "duration": duration, "userID": user, "databaseType": "game"};
    } else if(question==2) {
        jsondata = {"imgID": img2, "colorScore": colorScore2, "duration": duration, "userID": user, "databaseType": "game"};
    }
    settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://medical-b854.restdb.io/rest/annotationdata",
        "method": "POST",
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
    
        asymmetryScore = 1;
        borderScore = 1;
        colorScore = 1;
        asymmetryScore2 = -1;
        borderScore2 = -1;
        colorScore2 = -1;
    
}
function annotationCount(){
    
   // imagesAnnotated = participants[userNumber].imagesAnnotated;
    
    console.log(imagesAnnotated);
    imagesAnnotated++;
    console.log(imagesAnnotated);
    
    //Upload images annotated count
    var jsondata = {"imagesAnnotated": imagesAnnotated};
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://medical-b854.restdb.io/rest/participants/"+participantID,
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
    
    
}

function changeQuestion(init) {
    clickcount++;

    if (questionduration == clickcount) {
        while (question == prevquestion) {
            question = Math.floor(Math.random() * 3);
        }
        prevquestion = question;

        $("#nav").removeClass("danger-color");
        $("#nav").removeClass("primary-color");
        $("#nav").removeClass("success-color");

        switch (question) {
            case 0:
                $("#question").html("<b>Which picture is more asymmetric?</b>")
                $("#nav").addClass("danger-color");
                if (init == 1) {
                    $("#question").css("color", "#ff4444");
                }
                break;
            case 1:
                $("#question").html("<b>Which picture has a more irregular border?</b>")
                $("#nav").addClass("primary-color");
                if (init == 1) {
                    $("#question").css("color", "#4285F4");
                }
                break;
            case 2:
                $("#question").html("<b>Which picture has a higher variation in color?</b>")
                $("#nav").addClass("success-color");
                if (init == 1) {
                    $("#question").css("color", "#00C851");
                }
                break;
        }

        $("#question").delay(500).animate({color: '#343a40'}, 1500);

        questionduration = 30 - (Math.floor(Math.random() * 20) + 1);
        clickcount = 0;
    }
}

Number.prototype.pad = function(n) {
    return new Array(n).join('0').slice((n || 2) * -1) + this;
};

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

function checkCookie() {
    user=getCookie("username");
    if (user != "") {
        userID = user; 
       // alert("Welcome again participant #" + userID);
    } else {
        $.ajax(settingsUser).done(function (participants) {
        newParticipantID = participants.length;
        console.log("response: " + participants.length); 
        user = newParticipantID; 

    });
    setTimeout(function() {
        console.log("New UserID: " + user);
        jsondata = {"userID": user, "imagesAnnotated": 0};
            settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://medical-b854.restdb.io/rest/participants",
              "method": "POST",
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
            if (user != "" && user != null && user != 0) {
                setTimeout(function() {
                setCookie("username", user, 30);
            }, 0); 
            window.location.href="tutorial.html";
        }
            });
        
    
            
    
        }, 0);  
        
    }
}
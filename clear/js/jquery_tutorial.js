var currentimg = 0;
var instructioncount = 0;
var check = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var alternate = 0;
var savegrade;

$(document).ready(function(){

    $("#compare1").click(function(){
        switch (currentimg) {
            case 0:
                changeImage(1, 1);
                break;
            case 1:
                changeImage(1, 0);
                break;
            case 2:
                changeImage(1, 1);
                break;
            case 3:
                changeImage(1, 1);
                break;
            case 4:
                changeImage(1, 0);
                break;
            case 5:
                changeImage(1, 0);
                break;
            case 6:
                changeImage(1, 1);
                break;
            case 7:
                changeImage(1, 0);
                break;
            case 8:
                changeImage(1, 1);
                break;
        }
    });

    $("#compare2").click(function(){
        switch (currentimg) {
            case 0:
                changeImage(2, 0);
                break;
            case 1:
                changeImage(2, 1);
                break;
            case 2:
                changeImage(2, 0);
                break;
            case 3:
                changeImage(2, 0);
                break;
            case 4:
                changeImage(2, 1);
                break;
            case 5:
                changeImage(2, 1);
                break;
            case 6:
                changeImage(2, 0);
                break;
            case 7:
                changeImage(2, 1);
                break;
            case 8:
                changeImage(2, 0);
                break;
        }
    });
});

function next() {
    switch (instructioncount) {
        case 0:
            $("#instruction").html("Pay attention to the question, it will flash red when it changes.");
            break;
        case 1:
            $("#instruction").html("If you get the image right, you can tap the image again to move on to the next image.");
            break;
        case 2:
            $("#instruction").html("If you get the image wrong, you can tap the image to try again");
            $("#nextbutton").attr("onclick", "off()")
    }
    instructioncount++;
}

function changeImage(choice, grade) {
    if (alternate == 1) {
        $("#compare1").removeClass("right");
        $("#compare1").removeClass("wrong");
        $("#compare2").removeClass("right");
        $("#compare2").removeClass("wrong");

        if (savegrade == 1) {
            check[currentimg] = 1;
        }

        switch (currentimg) {
            case 2:
                if (check[0]+check[1]+check[2] < 3) {
                    currentimg = 0;
                }
                else {
                    $("#question").css("color", "#CC0000");
                    $("#question").html("<b>Which picture has a higher variation in color?</b>");
                    $("#question").delay(500).animate({color: '#343a40'}, 1500);
                }
                break;
            case 5:
                if (check[0]+check[1]+check[2]+check[3]+check[4]+check[5] < 6) {
                    currentimg = 3;
                }
                else {
                    $("#question").css("color", "#CC0000");
                    $("#question").html("<b>Which picture has a more irregular border?</b>");
                    $("#question").delay(500).animate({color: '#343a40'}, 1500);
                }
                break;
            case 8:
                if (check[0]+check[1]+check[2]+check[3]+check[4]+check[5]+check[6]+check[7]+check[8] < 9) {
                    currentimg = 6;
                }
                else {
                    endTutorial();
                }
                break;
        }

        while (check[currentimg] == 1) {
            currentimg++;
        }

        $("#compare1").attr("style", "background-image:url(img/tutorial/tut" + currentimg + "1.jpg)");
        $("#compare2").attr("style", "background-image:url(img/tutorial/tut" + currentimg + "2.jpg)");

        alternate = 0;
    }

    else {
        if (choice == 1) {
            if (grade == 1) {
                $("#compare1").addClass("right")
                savegrade = 1;
            }
            if (grade == 0) {
                $("#compare1").addClass("wrong")
                savegrade = 0;
            }
        }
        if (choice == 2) {
            if (grade == 1) {
                $("#compare2").addClass("right")
                savegrade = 1;
            }
            if (grade == 0) {
                $("#compare2").addClass("wrong")
                savegrade = 0;
            }
        }
        alternate = 1;
    }
}

function on() {
    $("#tutorialoverlay").attr("style", "display: block;");
};

function off() {
    $("#tutorialoverlay").attr("style", "display: none;");
};

function endTutorial() {
    $("#instruction").html("That was the final image!<br><br>If you start annotating for real, and you really don't know which image to pick, you can tap the <i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i> icon to skip the images.<br><br>If you need to view the image in a different light, you can tap the <i class=\"fa fa-adjust\" aria-hidden=\"true\"></i> icon in order to apply a filter to the images.");
    $("#nextbutton").html("Start annotating!");
    $("#nextbutton").attr("onclick", "redirect()");
    $("#question").html("");
    on();
}

function redirect() {
    window.location.href = "compare.html";
}
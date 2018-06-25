function loginCheck()  {
    //display error message
    $("#incorrect").after($("<div class='row justify-content-center'></div>")
        .append($("<div class=\"col text-center\"></div>")
        .append("<p class=\"mt-4 text-danger\">Incorrect username or password</p>")))
        .delay(5000);
    //go to annotation screen
    window.location.href='compare.html'
};
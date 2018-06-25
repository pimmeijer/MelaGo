function registerCheck()  {
    //display error message
    $("#passmatch").after($("<div class='row justify-content-center'></div>")
        .append($("<div class=\"col text-center\"></div>")
        .append("<p class=\"mt-4 text-danger\">Passwords don't match</p>")))
        .delay(5000);
    //go to login screen
    window.location.href='login.html'
};
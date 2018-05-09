var img = 7;

function sick() {
    if (img > 1) {
        img--
        $("#patient").attr("src", "img/patient/female" + img + ".png")
    }
}

function healthy() {
    if (img < 10) {
        img++
        $("#patient").attr("src", "img/patient/female" + img + ".png")
    }
}
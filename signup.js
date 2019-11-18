$(document).ready(function() {
    $("#password, #c-password").keyup(checkPasswordMatch);
});

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#c-password").val();
    console.log("run");
    if (password != confirmPassword)
        $(".password-input").css("background","#e35f5f");
    else{ //restart animation
        $(".password-input").css("background", "linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6");
        $(".password-input").css("animation", "gradient 3s linear infinite");
        $(".password-input").css("background-size", "500%");
    }
}

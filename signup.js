$(document).ready(function() {
    $("#password, #c-password").keyup(checkPasswordMatch);

    $("#signup-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "signup.php";

        var pass = $("#password");
        var confirm = $("#c-password");

        if(pass.val() !== confirm.val()) {
            $("#response").html("Passwords must match");
            return;
        }
        
        if(pass.val().length < 8) {
            $("#response").html("Password must be longer than 8 characters");
            return;
        }
        
        // serialize packages the input values in the form
        var data = $("form").serialize();
        var jqxhr = $.post(url, data);
        
        // set up callbacks
        jqxhr.done(function(data){
            if(String(data).includes("successfully")) {
                $("#response").css("color","lime");
                $("#response").html(data);
                var number = 7;
                function countdown() {
                    setTimeout(countdown, 1000);
                    $("#num").html(number);
                    number--;

                    if(number < 0){
                        window.location.replace("login.html");
                        number=0;
                    }
                }
                countdown();
            }
            else {
                $("#response").html(data);
            }
        });
    });
    
    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0)
                return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        // because unescape has been deprecated, replaced with decodeURI
        //return unescape(dc.substring(begin + prefix.length, end));
        return decodeURI(dc.substring(begin + prefix.length, end));
    } 
    
    function verifyLogin() {
        var myCookie = getCookie("user");
    
        if (myCookie != null) {
            // The cookie exists, and they get redirected
            alert("Error: You are already logged in");
            window.location.replace("index.html");
        }
    }
    verifyLogin();

});

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#c-password").val();
    if (password != confirmPassword || password.length < 8 || confirmPassword.length < 8) {
        $(".password-input").css("background","#e35f5f");
    }
    else{ //restart animation
        $(".password-input").css("background","#82df8d");
        //$(".password-input").css("background", "linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6");
        //$(".password-input").css("animation", "gradient 3s linear infinite");
        //$(".password-input").css("background-size", "500%");
    }
}

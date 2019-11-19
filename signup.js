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
            if(String(data).includes("successfully")){
                $("#response").css("color","lime");
            }
            $("#response").html(data);
            setTimeout(function(){ window.location.replace("login.html"); }, 4000);
        });
        
        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });
        
        jqxhr.always(function(){
            console.log("Done with AJAX request.");
        });

    });

});

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#c-password").val();
    console.log("run");
    if (password != confirmPassword)
        $(".password-input").css("background","#e35f5f");
    else{ //restart animation
        $(".password-input").css("background","#82df8d");
        //$(".password-input").css("background", "linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6");
        //$(".password-input").css("animation", "gradient 3s linear infinite");
        //$(".password-input").css("background-size", "500%");
    }
}

$(document).ready(function() {
    
    $("#login-btn").on("click", function(e){
        e.preventDefault();
        
        var email = $("#email").val();
        var pass = $("#pass").val();

        if(email == "" || pass == "") {
            $("#response").html("You must input your email and password");
            return;
        }

        if(!validateEmail(email)) {
            $("#response").html("Sorry, you must input a valid email");
            return;
        }
        
        var url = "login.php";
        
        // serialize packages the input values in the form
        var data = $("form").serialize();
        var jqxhr = $.post(url, data);
        
        // set up callbacks
        jqxhr.done(function(data){
            $("#response").html(data);
            if(!String(data).includes("Sorry")) {
                window.location.replace("index.html");
            }
            
        });
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

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
$(document).ready(function(){
    
    $("#login-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "login.php";
        
        // serialize packages the input values in the form
        var data = $("form").serialize();
        var jqxhr = $.post(url, data);
        
        // set up callbacks
        jqxhr.done(function(data){
            $("#response").html(data);
            window.location.replace("index.html");
        });
        
        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });
        
        jqxhr.always(function(){
            console.log("Done with AJAX request.");
        });

    });
});
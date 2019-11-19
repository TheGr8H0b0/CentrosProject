$(document).ready(function(){
        
    var url = "account.php";
    
    // serialize packages the input values in the form
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#account-info").html(data);
    });
    
    jqxhr.fail(function(jqXHR){
        console.log("Error: " + jqXHR.status);
    });
    
    jqxhr.always(function(){
        console.log("Done with AJAX request.");
    });


    $("#login-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "logout.php";
        
        // serialize packages the input values in the form
        var data = $("form").serialize();
        var jqxhr = $.post(url, data);
        
        // set up callbacks
        jqxhr.done(function(data){
            $("#response").html(data);
        });
        
        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });
        
        jqxhr.always(function(){
            console.log("Done with AJAX request.");
        });

    });


});
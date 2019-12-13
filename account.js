$(document).ready(function(){
        
    var url = "account.php";
    
    // serialize packages the input values in the form
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#account-info").html(data);
    });


    $("#logout-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "logout.php";

        var jqxhr = $.post(url);
        
        // set up callbacks
        jqxhr.done(function(data){
            window.location.replace("index.html");
        });
    });


});
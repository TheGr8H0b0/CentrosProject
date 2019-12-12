$(document).ready(function(){

    $("#upgrade-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "payment.php";

        var jqxhr = $.post(url);
        
        // set up callbacks
        jqxhr.done(function(data){
            console.log(data);
            window.location.replace("upgrade.html");
        });
        
        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });
        
        jqxhr.always(function(){
            console.log("Done with AJAX request.");
        });

    });


});
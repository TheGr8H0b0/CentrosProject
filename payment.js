$(document).ready(function(){

    $("#upgrade-btn").on("click", function(e){
        e.preventDefault();
        
        var url = "payment.php";

        var jqxhr = $.post(url);
        
        // set up callbacks
        jqxhr.done(function(data){
            window.location.replace("upgrade.html");
        });

    });


});
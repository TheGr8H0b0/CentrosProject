$(document).ready(function(){
        
    var url = "upgrade.php";
    
    // serialize packages the input values in the form
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#upgrade-results").html(data);
    });
    
    jqxhr.fail(function(jqXHR){
        console.log("Error: " + jqXHR.status);
    });
    
    jqxhr.always(function(){
        console.log("Done with AJAX request.");
    });

});
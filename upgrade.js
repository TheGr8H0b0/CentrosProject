$(document).ready(function(){
        
    var url = "upgrade.php";
    
    // serialize packages the input values in the form
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#upgrade-results").html(data);
    });
});
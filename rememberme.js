$(document).ready(function(){
        
    var url = "rememberme.php";
    
    // serialize packages the input values in the form
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#account").html(data);
    });

});
$(document).ready(function() {
    $(".search-bar").focus(); //so they can immediately start searching
    $("input").css("transition", "transform 0.9s, opacity .25s;");
        $("input").css("transform", "scale(1.0025,1)");
    
    $(".search-bar").on('keyup', function(event){
        //If the enter button is the button being pressed
        if(event.keyCode ==13){
            var obj = {searchVal: $(".search-bar").val(),time: Date.now()};
            sessionStorage.setItem("base",JSON.stringify(obj));
            location.href = "search.html";
        }
    });

    $("input").focus(function(){
        $("input").css("transition", "transform .5s, opacity .25s;");
        $("input").css("transform", "scale(1)");
        
    });
    $("input").blur(function(){
        $("input").css("transition", "transform .5s, opacity .25s");
        $("input").css("transform", "scale(.993,.94)");
    });
});
$(document).ready(function() {
    $("input").focus(function(){
        $("input").css("transition", "transform .5s, opacity .25s;");
        $("input").css("transform", "scale(1)");
        
    });
    $("input").blur(function(){
        $("input").css("transition", "transform .5s, opacity .25s");
        $("input").css("transform", "scale(.993,.94)");
    });
});
$(document).ready(function() {
    $(".search-bar").focus(); //so they can immediately start searching
    $(".search-bar").on('keyup', function(event){
        if(event.keyCode ==13){
            console.log("Hi");
            var searchQuery = $(".search-bar");
            $("#recent-searches").append("<li>" + searchQuery.val() + "</li>");
            searchQuery.val("");
        }
    });

    $("#response").load("search.php");

    $("input").focus(function(){
        $(".input span").css("opacity", "1");
        $(".input span").css("transform", "scale(1)");
        console.log("hi");
    });
    $("input").blur(function(){
        $(".input span").css("color", "#aaa");
        $(".input span").css("color", "#aaa");
    });
});
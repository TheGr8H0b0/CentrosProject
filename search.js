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
});
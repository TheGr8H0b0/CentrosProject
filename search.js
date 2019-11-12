$(document).ready(function() {
    
    $("#search_btn").on('click', function(event){
        var searchQuery = $("#search_input");
        $("#search_results").append("<li>" + searchQuery.val() + "</li>");
        searchQuery.val("");
    });
    
});
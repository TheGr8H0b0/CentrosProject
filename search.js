$(document).ready(function() {
    
    $("#search_btn").on('click', function(event){
        var searchQuery = $("#search_input");
        $("#content").load("search.php");
        searchQuery.val("");
    });
    
});
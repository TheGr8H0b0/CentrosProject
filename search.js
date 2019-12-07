var lastSearchData;

$(document).ready(function() {
    $("#search-results").on("click", loadSearchResults);
    $("#recent-searches").on("click", recentSearches);
    $("#filter-results").on("click", filterResults);
    $(".search-bar").focus(); //so they can immediately start searching
    $("input").css("transition", "transform 0.9s, opacity .25s;");
        $("input").css("transform", "scale(1.0025,1)");
    
    $(".search-bar").on('keyup', function(event){
        //If the enter button is the button being pressed
        if(event.keyCode ==13){
            var searchQuery = $(".search-bar").val();
            $("#recent-searches").append("<li>" + searchQuery + "</li>");

            $.ajax({  
                type: 'GET',
                url: 'search.php', 
                data: { query: searchQuery, numResults: 50 },
                success: function(response) {
                    var jsonresult = response.split('}}]}');
                    jsonresult[0] += "}}]}";
                    jsonresult = JSON.parse(jsonresult[0]);
                    console.log(jsonresult);
                    lastSearchData = jsonresult.shopping_results;
                    lastSearchData.forEach(createResultDisplay);
                }
            });

        }
    });
    $("input").focus(function(){
        $("input").css("transition", "transform .9s, opacity .25s;");
        $("input").css("transform", "scale(1.0025,1)");
        
    });
    $("input").blur(function(){
        $("input").css("transition", "transform .5s, opacity .25s");
        $("input").css("transform", "scale(.993,.94)");
    });
});

function filterResults() {
    $("#filter-res").html("You clicked me!");
    $("#search-res").html("");
    $("#recent-sea").html("");
}

function recentSearches() {
    $("#recent-sea").html("You clicked me!");
    $("#filter-res").html("");
    $("#search-res").html("");
}

function loadSearchResults() {
    $("#search-res").html("You clicked me!");
    $("#filter-res").html("");
    $("#recent-sea").html("");
}

function createResultDisplay(item, index, arr) {
    if (item.title != null && item.price != null && item.link && item.thumbnail) {
        if (item.description == null) {
            var htmlAppend =
            "<div class='item-container'>" +
                "<a class='item-link' target='_blank' href=" + "https://www.google.com/" + item.link + ">" +
                    "<div class='row'>" + 
                        "<div class='col-xs-3'>" +
                            "<img src=" + item.thumbnail + " alt=" + item.description + ">" +
                        "</div>" +
                        "<div class='col-xs-9'>" +
                            "<div class='item-title'>" +
                                item.title +
                            "</div>" +
                            "<div class='price'>" +
                                item.price + 
                            "</div>" +
                            "<div class='item-description'>" +
                                "No description was given for this product." +
                            "</div>" +
                        "</div>" + 
                    "</div>" + 
                "</a>"
            "</div>";

            $("#search-results").append(htmlAppend);
        } else {
            var htmlAppend =
            "<div class='item-container'>" +
                "<a class='item-link' target='_blank' href=" + "https://www.google.com/" + item.link + ">" +
                    "<div class='row'>" + 
                        "<div class='col-xs-3'>" +
                            "<img src=" + item.thumbnail + " alt=" + item.description + ">" +
                        "</div>" +
                        "<div class='col-xs-9'>" +
                            "<div class='item-title'>" +
                                item.title +
                            "</div>" +
                            "<div class='price'>" +
                                item.price + 
                            "</div>" +
                            "<div class='item-description'>" +
                                item.description +
                            "</div>" +
                        "</div>" + 
                    "</div>" + 
                "</a>"
            "</div>";

            $("#search-results").append(htmlAppend);
        }
    }
}

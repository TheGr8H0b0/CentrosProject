$(document).ready(function() {
    $(".search-bar").focus(); //so they can immediately start searching
    $("input").css("transition", "transform .5s, opacity .25s;");
    $("input").css("transform", "scale(1)");
    
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
                    var data = jsonresult.shopping_results;
                    data.forEach(createResultDisplay);
                }
            });

        }
    });
    $("input").focus(function(){
        $("input").css("transition", "transform .5s, opacity .25s;");
        $("input").css("transform", "scale(1.0025,1)");
        
    });
    $("input").blur(function(){
        $("input").css("transition", "transform .5s, opacity .25s");
        $("input").css("transform", "scale(.993,.94)");
    });
});

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

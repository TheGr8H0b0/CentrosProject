var lastSearchData;
var displayAmount = 50;
var displayStyle = 0;
var sel1 = "";
var sel2 = "";
var sel3 = "";
var sel4 = "";
var sel5 = 'selected="selected"';
var sel6 = "";
var sel7 = "";
var sel8 = "";
var sel9 = "";
var sel10 = "";
var selHigh = "";
var selLow = "";
var selNone = 'selected="selected"';
var pastSearches = "";
var revertTime = Date.now() + 2400;

function grabRecentSearches() {
    pastSearches = "";
    for (var i = 1;i <= 5; i++) {
        if (localStorage.getItem(i.toString()) != null && localStorage.getItem(i.toString()) != "null") {
            pastSearches += ('<div id="prev-search">' + localStorage.getItem(i.toString()) + "</div>");
        }
    }
}

function redirectLoad() {
    if (sessionStorage.getItem("base") != null && sessionStorage.getItem("base") != undefined) {
        var storedItem = JSON.parse(sessionStorage.getItem("base"));
        if (storedItem.time + 5000 >= Date.now()) {
            $("#search-results").html("Loading results... \n This may take awhile...");
            var searchQuery = storedItem.searchVal;
            $(".search-bar").value = searchQuery;
            localStorage.setItem("5".toString(),localStorage.getItem("4"));
            localStorage.setItem("4".toString(),localStorage.getItem("3"));
            localStorage.setItem("3".toString(),localStorage.getItem("2"));
            localStorage.setItem("2".toString(),localStorage.getItem("1"));
            localStorage.setItem("1",searchQuery);
            grabRecentSearches();

            $.ajax({
                type: 'GET',
                url: 'search.php',
                data: { query: searchQuery, numResults: 100 },
                success: function(response) {
                    var jsonresult = response.split('}}]}');
                    jsonresult[0] += "}}]}";
                    jsonresult = JSON.parse(jsonresult[0]);
                    lastSearchData = jsonresult.shopping_results;
                    loadSearchResults();
                }
            });
        }
    }
}

$(document).ready(function() {
    grabRecentSearches();
    redirectLoad();
    $("#recent-searches").mouseenter(recentSearches);
    $("#recent-searches").mouseleave(recentSearchesRevert);
    $("#filter-results").mouseenter(filterResults);
    $("#filter-results").mouseleave(filterResultsRevert);
    $(".search-bar").focus(); //so they can immediately start searching
    $("input").css("transition", "transform 0.9s, opacity .25s;");
        $("input").css("transform", "scale(1.0025,1)");

    $(".search-bar").on('keyup', function(event){
        //If the enter button is the button being pressed
        if(event.keyCode ==13){
            $("#search-results").html("Loading results... \n This may take awhile...");
            var searchQuery = $(".search-bar").val();
            localStorage.setItem("5".toString(),localStorage.getItem("4"));
            localStorage.setItem("4".toString(),localStorage.getItem("3"));
            localStorage.setItem("3".toString(),localStorage.getItem("2"));
            localStorage.setItem("2".toString(),localStorage.getItem("1"));
            localStorage.setItem("1",searchQuery);
            grabRecentSearches();

            $.ajax({
                type: 'GET',
                url: 'search.php',
                data: { query: searchQuery, numResults: 100 },
                success: function(response) {
                    var jsonresult = response.split('}}]}');
                    jsonresult[0] += "}}]}";
                    jsonresult = JSON.parse(jsonresult[0]);
                    lastSearchData = jsonresult.shopping_results;
                    loadSearchResults();
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
    $("#filter-results").html(' Filter Results <br><select id="res-select">' +
        '<option value="10"' + sel1 + '>10 results</option>' +
        '<option value="20"' + sel2 + '>20 results</option>' +
        '<option value="30"' + sel3 + '>30 results</option>' +
        '<option value="40"' + sel4 + '>40 results</option>' +
        '<option value="50"' + sel5 + '>50 results</option>' +
        '<option value="60"' + sel6 + '>60 results</option>' +
        '<option value="70"' + sel7 + '>70 results</option>' +
        '<option value="80"' + sel8 + '>80 results</option>' +
        '<option value="90"' + sel9 + '>90 results</option>' +
        '<option value="100"' + sel10 + '>100 results</option>' +
    '</select>' +
    '<br><select id="price-select">' +
        '<option value="None"' + selNone + '>None</option>' +
        '<option value="low-high"' + selLow + '>low-high</option>' +
        '<option value="high-low"' + selHigh + '>high-low</option>' +
    '</select>');
    $("select").on("change", detectSelectChange);
    $("#filter-results").css("font-size","2.5rem");
    $("#res-select").css("font-size","1.5rem");
    $("#price-select").css("font-size","1.5rem");
   /* $("#res-select").animate([
        // keyframes
        { transform: 'scale(0.5,0.5)' },
        { color: '#431236', offset: 0.3},
        { transform: 'scale(1.1,1.1)' }
      ], {
        // timing options
        duration: 1000,
        iterations: Infinity
      });
      */
    revertTime = Date.now() + 2400;
}

function filterResultsRevert() {
    var delay = makeDelay(2500);
    delay(timeCheck);
}

function makeDelay(ms) {
    var timer = 0;
    return( function(callback) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    });
}

function timeCheck() {
    if (Date.now() > revertTime) {
        $("#filter-results").html(' Filter Results');
        $("#filter-results").css("font-size","unset");
    }
}

function detectSelectChange() {
    var val1 = $("#res-select").val();
    var val2 = $("#price-select").val();
    sel1 = "";
    sel2 = "";
    sel3 = "";
    sel4 = "";
    sel5 = "";
    sel6 = "";
    sel7 = "";
    sel8 = "";
    sel9 = "";
    sel10 = "";
    selHigh = "";
    selLow = "";
    switch (val1) {
        case "10":
            sel1 = 'selected="selected"';
            displayAmount = 10;
            break;
        case "20":
            sel2 = 'selected="selected"';
            displayAmount = 20;
            break;
        case "30":
            sel3 = 'selected="selected"';
            displayAmount = 30;
            break;
        case "40":
            sel4 = 'selected="selected"';
            displayAmount = 40;
            break;
        case "50":
            sel5 = 'selected="selected"';
            displayAmount = 50;
            break;
        case "60":
            sel6 = 'selected="selected"';
            displayAmount = 60;
            break;
        case "70":
            sel7 = 'selected="selected"';
            displayAmount = 70;
            break;
        case "80":
            sel8 = 'selected="selected"';
            displayAmount = 80;
            break;
        case "90":
            sel9 = 'selected="selected"';
            displayAmount = 90;
            break;
        case "100":
            sel10 = 'selected="selected"';
            displayAmount = 100;
            break;
    }
    switch (val2) {
        case "low-high":
            selLow = 'selected="selected"';
            displayStyle = 1;
            break;
        case "high-low":
            selHigh = 'selected="selected"';
            displayStyle = 2;
            break;
        case "None":
            selNone = 'selected="selected"';
            displayStyle = 0;
            break;
    }
    loadSearchResults();
}

function recentSearchesRevert() {
    $("#recent-searches").text("Recent Searches");
}

function recentSearches() {
    $("#recent-searches").html('<div id="update">Recent Searches</div>' +
        '<div id="prev-search">' + pastSearches + '</div>');
    $("#update").css("font-size","2.5rem");
}

function loadSearchResults() {
    $("#search-results").html("");
    console.log(displayStyle);
    if (displayStyle == 0) {
        console.log("None");
        for (var i = 0; i < displayAmount; i++) {
            if (lastSearchData[i] != undefined) {
                createResultDisplay(lastSearchData[i]);
            }
        }
    } else if (displayStyle == 1) {
        var positionsUnused = Array(100).fill(true);
        for (var i = 0; i < displayAmount; i++) {
            if (lastSearchData[0] != undefined) {
                var itemToLoad = 0;
                var minAmount = 999999999999;
                for (var j = 0; j < 100; j++) {
                    if (lastSearchData[j] != undefined &&
                        lastSearchData[j].price != undefined) {
                        var num = Number(lastSearchData[j].price.replace(/[^0-9.-]+/g,""));
                        if (minAmount > num && positionsUnused[j]) {
                            minAmount = num;
                            itemToLoad = j;
                        }
                    }
                }
                positionsUnused[itemToLoad] = false;
                createResultDisplay(lastSearchData[itemToLoad]);
            }
        }
    } else if (displayStyle == 2) {
        var maxAmount = 0;
        var positionsUnused = Array(100).fill(true);
        if (lastSearchData[0] != undefined) {
            for (var i = 0; i < displayAmount; i++) {
                var itemToLoad = 0;
                var maxAmount = 0;
                for (var j = 0; j < 100; j++) {
                    if (lastSearchData[j] != undefined &&
                        lastSearchData[j].price != undefined) {
                        var num = Number(lastSearchData[j].price.replace(/[^0-9.-]+/g,""));
                        if (maxAmount < num && positionsUnused[j]) {
                            maxAmount = num;
                            itemToLoad = j;
                        }
                    }
                }
                positionsUnused[itemToLoad] = false;
                createResultDisplay(lastSearchData[itemToLoad]);
            }
        }
    }
    // Favorites click Listener code
    $(".fav-star").on("click", function() {
        //Animate star
        if($(this).children().hasClass("fa")){ //remove from favorites
            $(this).children().removeClass("rotate");
            $(this).children().removeClass("fa");
        }
        else if ($(this).children().hasClass("login-link")){
            //Do nothing this is when you are not logged in
        }
        else{ //fill in star and add to favorites
            $(this).children().addClass("fa");
            $(this).children().addClass("rotate");
             // You'll need to test all of these, some may work, some may not
            var title = $(this).parent().find(".item-title").text();
            var price = $(this).parent().find(".price").text();
            var itemLink = $(this).parent().find(".item-link").attr("href");
            var imgLink = $(this).parent().find(".col-xs-3 img").attr("src");
            console.log("Title: " + title + " Price: " + price + " Item Link: " + itemLink + " Image Link: " + imgLink);
        }

        var title = $(this).parent().find(".item-title").text();
        var price = $(this).parent().find(".price").text();
        var itemLink = $(this).parent().find(".item-link").attr("href");
        var imgLink = $(this).parent().find(".col-xs-3 img").attr("src");
        console.log("Title: " + title + " Price: " + price + " Item Link: " + itemLink + " Image Link: " + imgLink);

        //Set cookie values for 1 minute to transfer values to addFavorite.php
        var cookieTTLMinutes = "1";
        createCookie("title",title,cookieTTLMinutes);
        createCookie("price",price,cookieTTLMinutes);
        createCookie("itemLink",itemLink,cookieTTLMinutes);
        createCookie("imgLink",imgLink,cookieTTLMinutes);

        //Make an ajax post to addFavorite.php so it can add this item to the database
        var url = "addFavorite.php";

        var jqxhr = $.post(url);
        var textItem = $(this);

        // set up callbacks
        jqxhr.done(function(data){
            //Use the response to the ajax post to give feedback
            console.log(data);
            textItem.text(String(data));
            if(String(data) == "NOT LOGGED IN") {
                //window.location.replace("login.html");
                textItem.html("<a class='login-link' href='login.html'><button class='login-btn' type='button'>Login in order to favorite!</button></a>");
            }
        });

        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });

        jqxhr.always(function(){
            //Within ajax.always, delete the cookie
            console.log("Done with AJAX request.");
        });

    });
}
function createCookie(name, value, minutes) {
    var expires;

    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }

    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
function createResultDisplay(item) {

    //Create a cookie with the item link so we can access it from the PHP page
    var cookieTTLMinutes = "1";
    createCookie("itemLink",item.link,cookieTTLMinutes);
    console.log("created isFavorite cookie");

    //Assuming our user is logged in, we call the PHP page
    //if user isn't logged in, functionality shouldn't work
    var url = "isFavorite.php";
    var jqxhr = $.post(url);

    //Run through our AJAX request to get the result of 'if user has favorited this item'
    var isFA = ""
    console.log("starting isFavorite AJAX request");

    // set up callbacks
    jqxhr.done(function(data){
        //Use the response to the ajax post to give feedback
        console.log("AJAX isFavorite result: "+data);
        if(String(data) == "TRUE") {
            isFA = "fa"
        }
    });
    jqxhr.fail(function(jqXHR){
        console.log("Error: " + jqXHR.status);
    });
    jqxhr.always(function(){
        //Within ajax.always, delete the cookie
        console.log("Done with AJAX isFavorite request.");
    });
    console.log("Creating item");

    if (item != undefined && item.title != null && item.price != null && item.link && item.thumbnail) {
        if (item.description == null) {
            var htmlAppend =
            "<div class='item-container'>" +
            "<div class='fav-star'><i class='far " + isFA +  " fa-star fav-star-icon'></i></div>" +
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
                "</a>" +
            "</div>";

            $("#search-results").append(htmlAppend);
        } else if (item != undefined) {
            var htmlAppend =
            "<div class='item-container'>" +
                "<div class='fav-star'><i class='far " + isFA +  " fa-star fav-star-icon'></i></div>" +
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
                "</a>" +
            "</div>";

            $("#search-results").append(htmlAppend);
        }
    }
}

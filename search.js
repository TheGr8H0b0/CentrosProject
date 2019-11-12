$(document).ready(function() {
    /*
    $("#search_btn").on('click', function(event){
        var searchQuery = $("#search_input");
        $("#search_results").append("<li>" + searchQuery.val() + "</li>");
        searchQuery.val("");
    });
    */
    let cheerio = require('cheerio')
    let $ = cheerio.load('https://www.amazon.com/s?k=iphone&ref=nb_sb_noss_1')

    var companiesList = [];

    // For each .item, we add all the structure of a company to the companiesList array
    // Don't try to understand what follows because we will do it differently.
    $('.a-price-whole').each(function(){
        console.log(this);
    });

    console.log(companiesList); // Output the data in the terminal
});
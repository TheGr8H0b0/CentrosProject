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

    //star animation
  $(".fa").on("click", function() {
    removeFavorite(this);
  });

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
        }

        var title = $(this).parent().find(".item-title").text();
        var price = $(this).parent().find(".price").text();
        var itemLink = $(this).parent().find(".item-link").attr("href");
        var imgLink = $(this).parent().find(".col-xs-3 img").attr("src");
        
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
            //textItem.text(String(data));
            if(String(data) == "NOT LOGGED IN") {
                textItem.html("<a class='login-link' href='login.html'><button class='login-btn' type='button'>Login in order to favorite!</button></a>");
            }
            else if(String(data) == "MAX 5 FILLED") {
                alert("Sorry, you already have your max of 5 favorites saved. Please upgrade your account to premium to add more than 5 favorites");
            }
        });
    });
});


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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function removeFavorite(item){

    $(item).children().removeClass("fa");
    $(item).children().addClass("rotate"); 

    await sleep(1100);
    $(item).parent().parent().parent().html("");
    
}



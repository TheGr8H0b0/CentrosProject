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

  //start
    var url = "rememberme.php";
        
    var jqxhr = $.post(url);

    // set up callbacks
    jqxhr.done(function(data){
        if(String(data).includes("My Account")) {
            showFavorites();
        }
    });
  //end

  // Favorites click Listener code
  $(".fav-star").on("click", function() {
        $(this).html("<a class='login-link' href='login.html'><button class='login-btn' type='button'>Login in order to favorite!</button></a>");
    });
});

// I STILL NEED TO CALL THIS FUNCTION IF THE USER IS LOGGED IN!!!!
function showFavorites() {
    var url = "index.php";
        
    var jqxhr = $.post(url);
    
    // set up callbacks
    jqxhr.done(function(data){
        $("#favorites").html(data);
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function removeFavorite(item){

    $(item).children().removeClass("fa");
    $(item).children().addClass("rotate"); 

    await sleep(1100);
    $(item).parent().parent().parent().html("");
    
}



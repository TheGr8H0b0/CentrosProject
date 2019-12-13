$(document).ready(function(){
  //var box = document.getElementById("item");
  //var overlay = document.getElementById("overlay");
  //var descOverlay = document.getElementById("descOverlay");

  var url = "favorites.php";
      
  // serialize packages the input values in the form
  var jqxhr = $.post(url);

  // set up callbacks
  jqxhr.done(function(data){
      $("#fav-results").html(data);
      if(String(data).includes("Sorry, you are not logged in")) {
        // set css
        $("#fav-results").css("text-align", "center");
        $("#fav-results").css("font-size", "2rem");
        $("#fav-results").css("color", "crimson");
      }
      updateNumFavorites();
      $(".unstar").on("click", function() {
        removeFavorite(this);

        var title = $(this).parent().find(".item-title").text();
        console.log(title);

        var url = "removeFavorite.php";
        createCookie("remove",title,"1");
      
        // serialize packages the input values in the form
        var jqxhr = $.post(url);
      
        // set up callbacks
        jqxhr.done(function(data){
          $(this).html(data);
          if(String(data).includes("Successfully")) {;
              updateNumFavorites();
          } 
        });
      
        jqxhr.fail(function(jqXHR){
            console.log("Error: " + jqXHR.status);
        });
      
        jqxhr.always(function(){
            console.log("Done with AJAX request.");
        });

      });
  });

  jqxhr.fail(function(jqXHR){
      console.log("Error: " + jqXHR.status);
  });

  jqxhr.always(function(){
      console.log("Done with AJAX request.");
  });

  //star animation
  $(".fav-star").on("click", function() {
    removeFavorite(this);
  });

});

//Function to update the number of favorites user has in the top right corner
function updateNumFavorites() {
  var url = "favorites-num.php";

  // serialize packages the input values in the form
  var jqxhr = $.post(url);

  // set up callbacks
  jqxhr.done(function(data){
    if(String(data).includes("5")) {
        $("#num-favs").html(String(data));
    } 
  });

  jqxhr.fail(function(jqXHR){
      console.log("Error: " + jqXHR.status);
  });

  jqxhr.always(function(){
      console.log("Done with AJAX request.");
  });

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeFavorite(item){

  $(item).children().removeClass("fa");
  $(item).children().addClass("rotate"); 

  await sleep(1100);
  $(item).parent().parent().css("display", "none");
  
}

// Function to create a cookie (to be passed to addFavorite.php)
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
$(document).ready(function(){
  var box = document.getElementById("item");
  var overlay = document.getElementById("overlay");
  var descOverlay = document.getElementById("descOverlay");

  var init = () => {
    overlay.style.display = 'none'; //hide by default when page is shown
    descOverlay.style.display = 'none';
    box.addEventListener('mouseover', () => {
      overlay.style.display = 'inline';
      descOverlay.style.display = 'block';
    });

    box.addEventListener('mouseout', () => {
      overlay.style.display = 'none';
      descOverlay.style.display = 'none'
    });
  };
  
  init();

  var url = "favorites.php";
      
  // serialize packages the input values in the form
  var jqxhr = $.post(url);

  // set up callbacks
  jqxhr.done(function(data){
      $("#fav-results").html(data);
      $(".unstar").on("click", function() {
        var title = $(this).parent().find(".item-title").text();
        console.log(title);

        var url = "removeFavorite.php";
        createCookie("remove",title,"1");
      
        // serialize packages the input values in the form
        var jqxhr = $.post(url);
      
        // set up callbacks
        jqxhr.done(function(data){
          $(this).html(data);
          if(String(data).includes("Successfully")) {
              window.location.replace("favorites.html");
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
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeFavorite(item){

  $(item).children().removeClass("fa");
  $(item).children().addClass("rotate"); 

  await sleep(1100);
  $(item).parent().parent().addClass("hello");
  $(item).parent().parent().css("visibility", "hidden");
  
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
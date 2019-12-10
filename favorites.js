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
      });
  });

  jqxhr.fail(function(jqXHR){
      console.log("Error: " + jqXHR.status);
  });

  jqxhr.always(function(){
      console.log("Done with AJAX request.");
  });



});

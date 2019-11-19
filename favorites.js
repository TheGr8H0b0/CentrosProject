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
});

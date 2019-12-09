<?php
// Case 3: logout
// delete the cookie by setting expiration date to the past
setcookie('user', '', time() - 3600);
setcookie('premium', '', time() - 3600);
setcookie('title', '', time() - 3600);
setcookie('price', '', time() - 3600);
setcookie('itemLink', '', time() - 3600);
setcookie('imgLink', '', time() - 3600);
  
?>
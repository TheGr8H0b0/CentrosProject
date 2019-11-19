<?php
// Case 3: logout
// delete the cookie by setting expiration date to the past
setcookie('user', '', time() - 3600);
  
?>
<?php
// Case 3: logout
// delete the cookie by setting expiration date to the past
//setcookie('user', '', time() - 3600);

if( isset($_COOKIE['user']) ){
    echo '<a class="nav-link" href="account.html"><i class="fas fa-user"></i> My Account</a>';
}
else {
    echo '<a class="nav-link" href="login.html"><i class="fas fa-user"></i> Log in</a>';
}
  
?>
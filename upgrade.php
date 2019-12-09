<?php

if( isset($_COOKIE['user']) ) { // The User is Logged In
    if( isset($_COOKIE['premium']) ) { // The Logged in User is a PREMIUM User
        echo '';
    }
    else { // The Logged in User is NOT a Premium User
        echo '';
    }
}
else { // The User is NOT Logged In
    echo '<div class="upgrade-txt">You are not currently logged in. Log in or Sign Up now to upgrade!</div>
    <div class="center-button">
      <a href="login.html"><button type="button">Log In</button></a>
    </div>
    <div class="center-button">
      <a href="signup.html"><button type="button">Sign Up</button></a>
    </div>';
}
  
?>
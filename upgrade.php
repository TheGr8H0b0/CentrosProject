<?php

if( isset($_COOKIE['user']) ) { // The User is Logged In
    if( isset($_COOKIE['premium']) ) { // The Logged in User is a PREMIUM User
        echo '<h2 class="sub-header">You are a premium user. Thank you for your support!<br>Enjoy your unlimited favorites and ad-free exploration of our site!</h2>';
    }
    else { // The Logged in User is NOT a Premium User
        echo '<h2 class="sub=header">Upgrade now!<br>No more ads!<br>Unlimited Favorites!<br>Support Centros!</h2>
        <div class="button-container">
            <a href="payment.html" class="btn"><span>Pay Now</span></a>
        </div>';
    }
}
else { // The User is NOT Logged In
    echo '<h2 class="sub-header">You are not currently logged in.<br>Log in or Sign Up now to upgrade!</h2>
    <div class="button-container">
        <a href="login.html" class="btn"><span>Log In</span></a>
    </div>
    <div class="button-container">
        <a href="signup.html" class="btn"><span>Sign Up</span></a>
    </div>';
}
  
?>

<?php
// Case 3: logout
// delete the cookie by setting expiration date to the past
//setcookie('user', '', time() - 3600);

if( isset($_COOKIE['user']) ) {
    // Start the DB operations
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "centros";
                
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_errno) {
        $statusMessage = "Could not connect to database";
    }
    else {
        // Get the information for the relevant accounts
        $email = $_COOKIE['user'];
        $stmt = $conn->prepare("SELECT * from clients where username=?");
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        
        // Array to hold account information
        $res = $stmt->get_result(); 
        $row = $res->fetch_assoc();
        $usertype = $row['usertype'];

        $stmt->close();

        if($usertype == 'regular'){
            echo("<div class='userInfo' id='userEmail'>Email: " . $_COOKIE["user"] . "</div>
            <div class='userInfo' id='numFavs'>Max Favorites: 5</div>
            <div class='userInfo'>Non premium user. Click <a href='upgrade.html'>here</a> to upgrade!</div>");
        }
        else {
            echo("<div class='userInfo' id='userEmail'>Email: " . $_COOKIE["user"] . "</div>
            <div class='userInfo' id='numFavs'>Max Favorites: Unlimited</div>
            <div class='userInfo'>Premium user. Thank you for supporting Centros!</div>");
        }
    }
}
else {
    echo("I'm not sure how you got here, hacker :P");
}
  
?>
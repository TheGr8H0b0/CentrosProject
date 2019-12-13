<?php
// Case 3: logout
// delete the cookie by setting expiration date to the past
//setcookie('user', '', time() - 3600);

if( isset($_COOKIE['user']) && isset($_COOKIE['itemLink'])) {
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
        // Get the information for our query
        $link = $_COOKIE['itemLink'];
        $email = $_COOKIE['user'];

        //Get select all favorites with the item link for the item we are creating
        $stmt = $conn->prepare("SELECT * FROM favorites WHERE user=? AND title=?");
        $stmt->bind_param("ss", $email, $link);

        $stmt->execute();

        // Get the result of our query
        $res = $stmt->get_result();
        $stmt->close();

        //check if we got any results (favorites exist)
        if($res->num_rows == 0) {
          echo 'FALSE';
        }else{
          echo 'TRUE';
        }

    }
}
else {
    echo("I'm not sure how you got here, hacker :P");
}

?>

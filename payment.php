<?php
$statusMessage = "";

// Since this request will alter the DB, we use POST instead of GET
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
    // Check the fields are present
    if(isset($_COOKIE["user"])) {
        
        $email = $_COOKIE["user"];

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
            $stmt = $conn->prepare("UPDATE `clients` SET `usertype`='premium' WHERE username=?");
            
            $stmt->bind_param("s", $email);
            $stmt->execute();
            
            $stmt->close();
            
            $expiryTime = time() + 60*60*24; // 1 day from now
            setcookie('premium', $email, $expiryTime);
            $statusMessage = "You are now a premium member!";
        }
        
        $conn->close();
        
    }
    else{
        $statusMessage = "You are not logged in";
    }
}
else{
    $statusMessage = "No POST request received.";
}

// Echo the result        
echo($statusMessage);

?>

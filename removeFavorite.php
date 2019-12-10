<?php
$statusMessage = "";
  
  // Since this request will alter the DB, we use POST instead of GET
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
    if(isset($_COOKIE['user'])) {

        $email = $_COOKIE['user'];
        if(isset($_COOKIE["remove"])) {
            $title = $_COOKIE["remove"];
        }
        else {
            $title = "";
        }

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
            $stmt = $conn->prepare("DELETE FROM favorites WHERE user=? AND title=?");
            
            $stmt->bind_param("ss", $email, $title);
            $stmt->execute();
            
            $statusMessage = "Item Removed Successfully";
            
            $stmt->close();
        }
        
        $conn->close();
          
    }
    else{
        $statusMessage = "Sorry, you are not logged in";
    }
}
else{
    $statusMessage = "No POST request received.";
}
  
// Echo the result        
echo($statusMessage);

?>

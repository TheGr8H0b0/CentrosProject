<?php
$statusMessage = "";
  
  // Since this request will alter the DB, we use POST instead of GET
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
    if(isset($_COOKIE['user']) && !isset($_COOKIE['premium'])) { // they're logged in and not premium

        $email = $_COOKIE['user'];

        // Start the DB operations
        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbname = "centros";
                    
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_errno) {
            console.log("Could not connect to database");
        }
        else {
            // Get the information for the relevant accounts
            $stmt = $conn->prepare("SELECT * FROM favorites WHERE user=?");
            
            $stmt->bind_param("s", $email);
            $stmt->execute();
            
            $res = $stmt->get_result();
            
            // The number of favorites the user has
            $num_favs = $res->num_rows;
            
            $statusMessage = $num_favs . "/5";
            
            $stmt->close();
        }
        
        $conn->close();
          
    }
    else{
        $statusMessage = "";
    }
}
else{
    console.log("No POST request received.");
}
  
// Echo the result        
echo($statusMessage);

?>

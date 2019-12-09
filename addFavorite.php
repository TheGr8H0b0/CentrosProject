<?php
//INSERT INTO `favorites`(`user`, `title`, `price`, `itemLink`, `imageLink`) VALUES (?,?,?,?,?);
$statusMessage = "";
  
  // Since this request will alter the DB, we use POST instead of GET
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
    if(!isset($_COOKIE['user'])) {
        $statusMessage = "Sorry, you are not logged in";
    }
    // Check the fields are present
    else if(isset($_COOKIE['title']) && isset($_COOKIE['price']) && isset($_COOKIE['itemLink']) && isset($_COOKIE['imgLink'])){
          
        $title = $_COOKIE['title'];
        $price = $_COOKIE['price'];
        $itemLink = $_COOKIE['itemLink'];
        $imgLink = $_COOKIE['imgLink'];
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
            $statusMessage = "Could not connect to database";
        }
        else {
            // Get the information for the relevant accounts
            $stmt = $conn->prepare("SELECT * FROM favorites WHERE user=?");
            
            $stmt->bind_param("s", $email);
            $stmt->execute();

            $userType = "standard"
            if(isset($_COOKIE['premium'])){
                $userType = "premium";
            }
            
            // Array to hold account information
            $res = $stmt->get_result(); 
            if($res->num_rows >= 5 && $userType == "standard"){ // The email is already in the database
                $statusMessage = "Sorry, you already have your max of 5 favorites saved";
            }
            else{ // They're able to add this favorite, so we will add the favorite
                // Get the information for the relevant accounts
                $favorite = $conn->prepare("INSERT INTO `favorites`(`user`, `title`, `price`, `itemLink`, `imageLink`) VALUES (?,?,?,?,?)");
                
                $favorite->bind_param("ssdss", $email, $title, $price, $itemLink, $imgLink);
                $favorite->execute();

                $statusMessage = $title . " added successfully!";

                $favorite->close();
            }
            
            $stmt->close();
        }
        
        $conn->close();
          
    }
    else{
        $statusMessage = "Parameters missing";
    }
}
else{
    $statusMessage = "No POST request received.";
}
  
  // Echo the result        
  echo($statusMessage);

?>
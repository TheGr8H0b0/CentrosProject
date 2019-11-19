<?php
  $statusMessage = "";
  
  // Since this request will alter the DB, we use POST instead of GET
  if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
      // Check the fields are present
      if(isset($_POST["login-email"]) && isset($_POST["login-pass"])){
          
        $email = $_POST["login-email"];
        $pass = $_POST["login-pass"];

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
            $stmt = $conn->prepare("SELECT * from clients where username=? AND password=?");
            
            $stmt->bind_param("ss", $email, $pass);
            $stmt->execute();
            
            // Array to hold account information
            $res = $stmt->get_result(); 
            if($res->num_rows !== 1){
                $statusMessage = "Sorry, either your email or password is incorrect";
            }
            else{
                $statusMessage = "Welcome " . $email . "!";

                // SET COOKIE HERE
                $expiryTime = time() + 60*60*24; // 1 day from now
                setcookie('user', $email, $expiryTime);



                // BEGIN COOKIE MADNESS
                
                // Case 3: logout
                // delete the cookie by setting expiration date to the past
                setcookie('user', '', time() - 3600);
                
                else if( isset($_COOKIE['user']) ){
                    $username = $_COOKIE['user'];
                }
                // END COOKIE MADNESS

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
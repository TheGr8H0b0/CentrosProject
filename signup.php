<?php
  $statusMessage = "";
  
  // Since this request will alter the DB, we use POST instead of GET
  if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
      // Check the fields are present
      if(isset($_POST["signup-email"]) && isset($_POST["signup-pass"])){
          
        $email = $_POST["signup-email"];
        $pass = $_POST["signup-pass"];

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
            $stmt = $conn->prepare("SELECT * from clients where username=?");
            
            $stmt->bind_param("s", $email);
            $stmt->execute();
            
            // Array to hold account information
            $res = $stmt->get_result(); 
            if($res->num_rows === 1){ // The email is already in the database
                $statusMessage = "Sorry, there is already an account with this email";
            }
            else{
                $statusMessage = $email . " is available!";

                // Get the information for the relevant accounts
                $signup = $conn->prepare("INSERT INTO `clients`(`username`, `password`, `usertype`) VALUES (?,?,'regular')");
                
                $signup->bind_param("ss", $email, $pass);
                $signup->execute();

                $statusMessage = "Account with email " . $email . " added successfully!";

                $signup->close();
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

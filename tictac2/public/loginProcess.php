<?php include 'database.php'; ?>
 
<?php
        session_start();  
        $myUsername = $_POST["myUsername"]; 

        $_SESSION["pass_userName"] = $myUsername;

        $result1 = mysqli_query($connect,"SELECT userName FROM login WHERE userName = '".$myUsername."'");

        if(mysqli_num_rows($result1) > 0 )
        { 
        	$result2 = mysqli_query($connect,"SELECT User_Name, User_Password FROM user_data WHERE User_Name = '".$myUsername."' AND  User_Password = '".$myPassword."'");
        	if (mysqli_num_rows($result2) > 0 )
        	{
        		echo "Welcome back $myUsername";
                header("Location: http://ec2-35-166-206-88.us-west-2.compute.amazonaws.com:8081/");
                die();
        	}
            
        }
        else
        {
            header("Location:LoginFail.php");
           
        }
?>
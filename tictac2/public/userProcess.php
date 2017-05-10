<?php include 'database.php'; ?>
 
<?php

// create a variable
$userName=$_POST['userName'];

 
//Execute the query
 
 
$result = mysqli_query($connect,"INSERT INTO login (userName)
		        VALUES ('$userName')");
				
	if(mysqli_affected_rows($connect) > 0){
	echo "<p>User Added</p>";
	header("Location:loginRegister.php"); 
	
	//echo "<a href="index.html"> Go Back </a>";
	} else {
		echo "User NOT Added<br />";
		echo mysqli_error ($connect);
	}
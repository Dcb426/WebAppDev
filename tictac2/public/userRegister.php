<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <title>Create_New_User</title>

  <link rel="stylesheet" href="css/CNU.css">
 <script src="jquery-3.1.1.js"></script>
</head>

<body>
	<header>
    	<h1 id="CNU_header_Title">Registration Information</h1>
  	</header>
  	<div id="loginBox">
	<form action="userProcess.php" method="post" id="myForm">

		<p id="userName">Username: <input title="Username must not be blank and contain only letters, numbers and underscores." type="text" required pattern="\w+" name="userName"></p>

	</form>

	<form action="loginRegister.php" method="post" id="myForm">
		<p><input type="submit" id="submit" value="Back"></p>
	</form>

	</div>
	<script>
	
	</script>
</body>
</html>
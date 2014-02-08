<?php
// Connect to server and select databse.
require_once "db_connect.php";

$db = new DB_CONNECT;

// username and password sent from form
$myusername = "ryanjroyer";
$mypassword = "helloworld";

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

// MD5 hash encrypt password string
$hashpasswd = md5($mypassword);

$authquery  = " SELECT * FROM tbluser ".
              " WHERE uname='".$myusername."' AND pword='".$hashpasswd."'";

$queryresult = mysql_query($authquery);

// return number of tables
$rowcount = mysql_num_rows($queryresult);

// If result matched $myusername and $mypassword, table row must be 1 row
if($rowcount == 1){
    
    // Register $myusername, $mypassword and redirect to file "login_success.php"
    while ($row = mysql_fetch_array($queryresult)) {
        
        if (($row["uname"] == $myusername) && ($row["pword"] == $hashpasswd)) {
            
            session_register("username");
            session_register("password");
            header("location:login_success.php");
        }
        
    }
}
else {
    echo "Wrong Username or Password";
}

?>
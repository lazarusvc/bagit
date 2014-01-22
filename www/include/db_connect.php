<?php
    
    /**
     * class file to connect to database
     */
    class DB_CONNECT {
        
        function __construct() {
            $this->connect();   // connecting to database
        }
        
        function __destruct() {
            $this->close();     // closing db connection
        }
    
        function connect() {
            require_once "db_config.php";    // import database connection variables
            
            $con = mysql_connect(DB_SERVER, DB_USER, DB_PASSWORD) or die(mysql_error());    // Connecting to mysql database
            $db = mysql_select_db(DB_DATABASE,$con) or die(mysql_error()) or die(mysql_error()); // Selecing database

            return $con;    // returing connection cursor
        }
        
        function close() {
            mysql_close();  // closing db connection
        }
        
    }
    
?>
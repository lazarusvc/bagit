<?php
    include 'includes/db_link_open.php'
    
    if(isset($_POST['submit'])){
    
    $search_phrase = $_POST['submit']
        
    $sql = "SELECT * FROM `tblproduct` WHERE item LIKE%".$search_phrase.""
    $result = mysql_query($sql,$conn)or die (mysql_error());
    
        
    }else{echo  "<p>Please enter a search query</p>";}
?>

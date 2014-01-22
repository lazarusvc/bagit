<?php
/*
 * Following code will list all the products and registered companies
 * on database server.
 */
    
require_once "db_connect.php";     // include dbconnect class


$response = array();               // initalize response array
$db = new DB_CONNECT();            // connect to database

// check for form POST variable
if(isset($_POST['search'])) {
    
    // clean variable string to prevent mysql injection
    $content = mysql_real_escape_string($_POST['search']);
    // execute SQL statement enforcing foreign key constraint
    $result = mysql_query(" SELECT tblproduct.idproduct, tblbusiness.company, tblbusiness.latitude , tblbusiness.longitude, tblbusiness.opening, tblbusiness.closing, tblbusiness.address ".
                          " FROM tblproduct INNER JOIN tblbusiness".
                          " WHERE tblbusiness.idbusiness = tblproduct.businessFK".
                          " AND (tblproduct.item LIKE '".$content."%' OR tblproduct.item LIKE '%".$content."%')"
    ) or die(mysql_error());
    // check if results array is empty
    if (mysql_num_rows($result) > 0) {
        // create products array
        $response["products"] = array();
        // iterate through results array
        while ($row = mysql_fetch_array($result)) {
        
            $product = array();                         // initialize sub-array for holding json data
            $product["company"] = $row["company"];      // assign company value
            $product["latitude"] = $row["latitude"];    // assign latitude coordinates
            $product["longitude"] = $row["longitude"];  // assign longitude coordinates
            $product["address"] = $row["address"];      // assign business mailing address
            $product["closing"] = $row["closing"];      // assign business closing time
            $product["opening"] = $row["opening"];      // assign business opening time
            
            // push sub-array values into response array
            array_push($response["products"], $product);
        
        }
        
    }
    // return json encode string
    echo json_encode($response);
}
?>

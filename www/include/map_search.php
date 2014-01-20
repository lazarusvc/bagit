<?php
/*
 * Following code will list all the products
 */

$SESSION['keyword'] = $GET['POST']; //store post variable for search
    
$response = array();    // array for JSON response

require_once __DIR__ . 'include/db_connect.php';   // include db connect class

$db = new DB_CONNECT(); // connect to database
    
$result = mysql_query("SELECT * FROM tblproduct WHERE item LIKE '".$SESSION['keyword']."%'") or die(mysql_error());   // get all products from products table


if (mysql_num_rows($result) > 0) {   // looping through all results

    $response["products"] = array();      // products node
    
    while ($row = mysql_fetch_array($result)) {
    
        $product = array();
        $product["pid"] = $row["pid"];
        $product["name"] = $row["name"];
        $product["price"] = $row["price"];
        $product["created_at"] = $row["created_at"];
        $product["updated_at"] = $row["updated_at"];
        
        
        array_push($response["products"], $product);    // push single product into final response array
    }

    $response["success"] = 1;
    
    echo json_encode($response);    // echoing JSON response
    
} else {
    
    // no products found
    $response["success"] = 0;
    $response["message"] = "No products found";
    
    // echo no users JSON
    echo json_encode($response);
}
?>

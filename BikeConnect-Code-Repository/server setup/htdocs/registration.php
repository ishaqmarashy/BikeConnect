<?php
header('Access-Control-Allow-Origin: *');  
//error_reporting(0);
include 'dbfun.php';

$dbpost="0";
$dbopen="0";
$dbquery="0";
$dbqlogin="0";
$payload="0";  
$dbresponse="0";  
$dbexception="0";

try {
	$db           = connectToDB(0);
if ($db) {
				$dbopen= "Opened database successfully";
		}
		else{	$dbopen= "Error : Unable to open database";
			}
if (isset($_POST['USERNAME'])&&isset($_POST['PASSWORD'])&&isset($_POST['NAME'])&&isset($_POST['EMAIL'])) {
    $USERNAME     =filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
    $PASSWORD     = md5($_POST['PASSWORD']);
    $NAME         =filter_var($_POST['NAME'],FILTER_SANITIZE_SPECIAL_CHARS);
    $EMAIL = filter_var($_POST['EMAIL'],FILTER_SANITIZE_EMAIL);
    $sql = "
   INSERT INTO public." . '"USERS"' . '("USERNAME","PASSWORD","NAME","EMAIL")
    VALUES(' . "'$USERNAME','$PASSWORD','$NAME','$EMAIL')";
    $ret = pg_query($db, $sql);
    $payload = pg_fetch_all($ret);
    $payload=json_encode($payload);
    if (!$ret) {
        $dbquery=($db);
    } 
} else{
        $dbpost= "No post ";
}
}
catch(Exception $e)   {
            $dbexception=  $e->getMessage();
    }
echo json_encode( 
    array( "dbresponse"=>"$dbresponse","dbpost"=>"$dbpost","dbopen"=>"$dbopen",
           "dbquery"=>"$dbquery","dbqlogin"=>"$dbqlogin",
           "payload"=>"$payload","dbexception"=>"$dbexception" ,"dbtoken"=>"$dbtoken")
     );
pg_close($db);
?>
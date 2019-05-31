<?php
header('Access-Control-Allow-Origin: *');  
//error_reporting(0);
include 'dbfun.php';
$dbpost="0";
$dbopen="0";
$dbquery="0";
$dbqlogin="0";
$dbtoken="0";  
$dbresponse="0";  
$dbexception="0";
try {
    $db    = connectToDB(0);
    if ($db) {
                $dbopen= "Opened database successfully";
        }
        else{   $dbopen= "Error : Unable to open database";
            }
         
    if (isset($_POST['USERNAME'])&&isset($_POST['TOKEN'])&&isset($_POST['BOID'])) {
        $USERNAME =
         filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $TOKEN =
         filter_var( $_POST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);
          $BOID =
         filter_var( $_POST['BOID'],FILTER_SANITIZE_SPECIAL_CHARS);
                 //checks admin acc token exists or not
        if (userCheckToken($USERNAME,$TOKEN,$db,$dbquery,$dbresponse)) {
            $dbqlogin= "login successful";
            
                $sql = 
                //dont use ` for sending this...
                'DELETE FROM public."BB"
                    WHERE "BOID"='."'".$BOID."'".';
                    DELETE FROM public."BOOKING"
                    WHERE "BOID"='."'".$BOID."'".';';
                   $ret = pg_query($db, $sql);
                 if (!$ret) {
                    echo pg_last_error($db);
                } else {
                    $payload=pg_fetch_all($ret);
                    $payload=json_encode($payload);
                }
            }
          
        else {
            $dbqlogin= "login failed";
        }
    }
     else {
        $dbpost= "No post ";
    }
}catch(Exception $e)   {
            $dbexception=  $e->getMessage();
    }
echo json_encode( 
    array( "dbresponse"=>"$dbresponse","dbpost"=>"$dbpost","dbopen"=>"$dbopen",
           "dbquery"=>"$dbquery","dbqlogin"=>"$dbqlogin",
           "payload"=>"$payload","dbexception"=>"$dbexception" ,"dbtoken"=>"$dbtoken")
     );
pg_close($db);
?>
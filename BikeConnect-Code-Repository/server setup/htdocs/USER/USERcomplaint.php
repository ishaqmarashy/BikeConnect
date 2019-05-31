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
         
    if (isset($_POST['USERNAME'])&&isset($_POST['TOKEN'])&&isset($_POST['BOID'])&&isset($_POST['COMPLAINT'])) {
        $USERNAME =
         filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $TOKEN =
         filter_var( $_POST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);
          $BOID =
         filter_var( $_POST['BOID'],FILTER_SANITIZE_SPECIAL_CHARS);
               $COMPLAINT =
         filter_var( $_POST['COMPLAINT'],FILTER_SANITIZE_SPECIAL_CHARS);
                 //checks admin acc token exists or not
        if (userCheckToken($USERNAME,$TOKEN,$db,$dbquery,$dbresponse)) {
            $dbqlogin= "login successful";
                $sql = 'INSERT INTO public."COMPLAINTS"("BOID","COMPLAINT")VALUES ('
                ."'".$BOID."'".', '."'".$COMPLAINT."'".');';
                   $ret = pg_query($db, $sql);
                 if (!$ret) {   
                     $payload= -1;
                     } 
                    else {
                      $payload= 1;
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
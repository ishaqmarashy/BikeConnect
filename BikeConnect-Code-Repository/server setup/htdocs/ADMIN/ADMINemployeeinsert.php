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
          /*test admin acc
          INSERT INTO public."EMPLOYEES"("USERNAME", "PASSWORD", "NAME", "EMAIL","EID","ADDRESS") VALUES ('3', '3', '3', '3','3','3');
            INSERT INTO public."ADMINSESSIONS"(
                "TOKEN", "EID")
                VALUES ('3','3');
          */
    //do isset for every idem in vendor field/form
    if (isset($_POST['EID'])&&isset($_POST['TOKEN'])) {
        if(isset($_POST['NAME'])&&isset($_POST['ADDRESS'])
          &&isset($_POST['USERNAME'])&&isset($_POST['PASSWORD'])&&isset($_POST['EMAIL'])){
        $EID =
         filter_var($_POST['EID'],FILTER_SANITIZE_SPECIAL_CHARS);
        $TOKEN =
         filter_var( $_POST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);
        $dbpost=$EID;
        //checks admin acc token exists or not
        if (adminCheckToken($EID,$TOKEN,$db,$dbquery,$dbresponse)) {
            $dbqlogin= "login successful";
            //gets bikehub data
  $NAME =
         filter_var($_POST['NAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $ADDRESS =
         filter_var( $_POST['ADDRESS'],FILTER_SANITIZE_SPECIAL_CHARS);
         $USERNAME =
         filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $PASSWORD =
         filter_var( $_POST['PASSWORD'],FILTER_SANITIZE_SPECIAL_CHARS);
         $EMAIL =
         filter_var($_POST['EMAIL'],FILTER_SANITIZE_SPECIAL_CHARS);
      
                $sql = 
                //dont use ` for sending this...
                'INSERT INTO public."EMPLOYEES"("ADDRESS", "USERNAME","PASSWORD","NAME","EMAIL")VALUES('."'".$NAME."','".$ADDRESS."','".$USERNAME."','".$PASSWORD."','".$EMAIL."');";
                 $ret = pg_query($db, $sql);
                 if (!$ret) {
                    echo pg_last_error($db);
                } else {
                    $payload=pg_fetch_all($ret);
                    $payload=json_encode($payload);
                }
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
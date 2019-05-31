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
    //do isset for every idem in vendor field/form.


    if (isset($_POST['EID'])&&isset($_POST['TOKEN'])) {
        $EID =
         filter_var($_POST['EID'],FILTER_SANITIZE_SPECIAL_CHARS);
        $TOKEN =
         filter_var( $_POST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);
         $DAY =
         filter_var( $_POST['DAY'],FILTER_SANITIZE_SPECIAL_CHARS);
        $dbresponse=$EID.'-'.$TOKEN.'-'.$DAY;
        //checks admin acc token exists or not
        if (adminCheckToken($EID,$TOKEN,$db,$dbquery,$dbresponse)) {
            $dbqlogin= "login successful";
            //gets bikehub data
        $USERNAME =
         filter_var( $_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
         $DAY1=$DAY+1;
       
                 $dbresponse=$EID.'-'.$TOKEN.'-'.$DAY;

                $sql = 
          'SELECT *
    FROM public."BOOKINGVIEW" where "DATEFROM">=CURRENT_TIMESTAMP - interval '."'".$DAY1.' day'."'".' and "DATEFROM"<CURRENT_TIMESTAMP - interval '."'".$DAY.' day'."'".';';
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
        $dbpost= "failed login";
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
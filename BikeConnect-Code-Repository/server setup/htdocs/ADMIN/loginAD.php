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
		else{	$dbopen= "Error : Unable to open database";
			}
    if (isset($_POST['USERNAME'])) {

        $USERNAME = filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $PASSWORD = md5($_POST['PASSWORD']);
        $dbpost="$USERNAME";
      
        $sql = "SELECT * FROM public." . '"EMPLOYEES"' . " where " . '"USERNAME"=' . "'" . $USERNAME . "'" . " and " . '"PASSWORD"=' . "'" . $PASSWORD . "'";
        //attempts query
        $ret = pg_query($db, $sql);
        if (!$ret) {
            $dbquery= pg_last_error($db);
        } else {
            $dbquery= "Query completed created successfully";
        }

        $dbresponse=pg_fetch_row($ret);
        //checks if user exists with said pass
        $arr = pg_fetch_array($ret, 0, PGSQL_NUM);
        if (pg_fetch_row($ret) != false) {
            $dbqlogin= "login successful";
            $i=0;
            //random token unique generator
            do {
                $i=$i+1;
                $TOKEN=bin2hex(openssl_random_pseudo_bytes(16));
                $sql = "
               INSERT INTO public." . '"ADMINSESSIONS"' . '("TOKEN","EID")
                VALUES(' . "'$TOKEN','$arr[4]')";
                $ret = pg_query($db, $sql);
                if (!$ret) {
                    echo pg_last_error($db);
                } else {
                    $dbtoken=$TOKEN;
                    $dbresponse= $arr[4];
                }
            } while (!$ret&&$i<15);
        }
        else {
            $dbqlogin= "login failed";
        }
    } else {
        $dbpost= "No post";
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
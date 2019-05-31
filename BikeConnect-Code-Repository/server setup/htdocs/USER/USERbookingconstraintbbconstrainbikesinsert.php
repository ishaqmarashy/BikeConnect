
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
$dbexception=" ";
try {
    $db    = connectToDB(0);
    if ($db) {
                $dbopen= "Opened database successfully";
        }
        else{   $dbopen= "Error : Unable to open database";
            }
    if (isset($_POST['USERNAME'])&&isset($_POST['TOKEN'])) {
       if (isset($_POST['LAT'])&&isset($_POST['LONG'])&&isset($_POST['DATEFROM'])
        &&isset($_POST['DATETO'])&&isset($_POST['BTYPE'])&&isset($_POST['BOOKINGTYPE'])) {
        $USERNAME =
         filter_var($_POST['USERNAME'],FILTER_SANITIZE_SPECIAL_CHARS);
        $TOKEN =
         filter_var( $_POST['TOKEN'],FILTER_SANITIZE_SPECIAL_CHARS);
        $LAT =
         filter_var( $_POST['LAT'],FILTER_SANITIZE_SPECIAL_CHARS);
        $LONG =
         filter_var( $_POST['LONG'],FILTER_SANITIZE_SPECIAL_CHARS);
        $DATEFROM =
         filter_var( $_POST['DATEFROM'],FILTER_SANITIZE_SPECIAL_CHARS);
           $DATETO =
         filter_var( $_POST['DATETO'],FILTER_SANITIZE_SPECIAL_CHARS);
                 $BTYPE =
         filter_var( $_POST['BTYPE'],FILTER_SANITIZE_SPECIAL_CHARS);
              $BOOKINGTYPE =
         filter_var( $_POST['BOOKINGTYPE'],FILTER_SANITIZE_SPECIAL_CHARS);
               $QUANTITY =
         filter_var( $_POST['QUANTITY'],FILTER_SANITIZE_SPECIAL_CHARS);
                  $GEAR =
         filter_var( $_POST['GEAR'],FILTER_SANITIZE_SPECIAL_CHARS);
        //checks user acc token exists or not
         if (userCheckToken($USERNAME,$TOKEN,$db,$dbquery,$dbresponse)) {
            $dbqlogin= "login successful";
            $HID= hidFromLatLong($LAT,$LONG,$db);
            if ($HID==false) {
                    $dbexception=$dbexception."could not find bikehub ".$QUANTITY;
                    $dbtoken='false';
            } else {  
                    if($HID){
                       $conflicts=findBookingConflicts($HID,$BTYPE,$DATEFROM,$DATETO,$db);
                      //NO CONFLICTS MAKE BOOKING 

                      if($conflicts==false){
                         //$dbexception= $dbexception.'no conflicts ';
                         //returns array of avaiable bikes 
                         //excludes those in conflict
                              $availablebikes=bikesFromHID($HID,$BTYPE,$db,$conflicts);
                              if($availablebikes==false||$QUANTITY>sizeof($availablebikes)){
                                $dbexception= $dbexception.'{'.$QUANTITY.'/'.sizeof($availablebikes).'}'.$availablebikes.' insufficient available bikes at: '.$HID;
                                                                     $dbtoken='false';
                              }

                              else{
                              $dbtoken='true';
                                $success=MakeBooking($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE, $GEAR,$db);
                                $BOID= getBOID($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE,$HID,$db);
                                $payload=assignBikeToBooking($BOID,$availablebikes,$QUANTITY,$db);
                                                                $dbquery= $BOID;
                            
                        }
                      }
                      else{
                    //    $dbexception= $dbexception.' found conflicts ';
                              $availablebikes=bikesFromHID($HID,$BTYPE,$db,$conflicts);
                              if($availablebikes==false||$QUANTITY>sizeof($availablebikes)){
                                $dbexception= $dbexception.'{'.$QUANTITY.'/'.sizeof($availablebikes).'}'.$availablebikes.' insufficient available bikes at: '.$HID;
                                                                     $dbtoken='false';
                              }
                              else{
                                  $i=0;
                                   $dbtoken='true';
                                $success=MakeBooking($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE, $GEAR,$db);
                                $BOID= getBOID($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE,$HID,$db);
                                $dbquery= $BOID;
                                $payload=assignBikeToBooking($BOID,$availablebikes,$QUANTITY,$db);

                             }
                              
                      }
                    }
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
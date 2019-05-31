<?php
header('Access-Control-Allow-Origin: *');  
error_reporting(0);
$host        = "host = 127.0.0.1";
$dbname      = "dbname = bikeconnect";
$credentials = "user = postgres password=342910841";
function connectToDB(){

  global $host,$dbname,$credentials;
  try{
  $db          = pg_connect($host." ".$dbname." ".$credentials);
  }
  catch(Exception $e)   {
    }
  return $db;
}

function userCheckToken($USERNAME,$TOKEN,$db,$dbquery,$dbresponse){
  try{
    
        $sql = "SELECT " . '"TOKEN","USERNAME"' . " FROM public." . '"SESSIONS"' . " where " . '"USERNAME"=' . "'" . 
    $USERNAME
    . "'" . " and " . '"TOKEN"=' . "'" . 
    $TOKEN 
    . "'";

        //attempts query
        $ret = pg_query($db, $sql);
        if (!$ret) {
            $dbquery= pg_last_error($db);
        } else {
            $dbquery= "Query completed created successfully";
        }

        $dbresponse=pg_fetch_row($ret);
        //checks if user exists with said token
        $arr = pg_fetch_array($ret, 0, PGSQL_NUM);
    return (pg_fetch_row($ret) != false);
    }
      catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}

function adminCheckToken($EID,$TOKEN,$db,$dbquery,$dbresponse){
  try{
    
        $sql = "SELECT " . '"TOKEN","EID"' . " FROM public." . '"ADMINSESSIONS"' . " where " . '"EID"=' . "'" . 
    $EID
    . "'" . " and " . '"TOKEN"=' . "'" . 
    $TOKEN 
    . "'";

        //attempts query
        $ret = pg_query($db, $sql);
        if (!$ret) {
            $dbquery= pg_last_error($db);
        } else {
            $dbquery= "Query completed created successfully";
        }

        $dbresponse=pg_fetch_row($ret);
        //checks if user exists with said token
        $arr = pg_fetch_array($ret, 0, PGSQL_NUM);
    return (pg_fetch_row($ret) != false);
    }
      catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}

function hidFromLatLong($LAT,$LONG,$db){
    try{
      $sql = 
               'SELECT * FROM public."BIKEHUB" WHERE (("LATITUDE")::numeric(9,2))='."(('".$LAT."')::numeric(9,2)) ".' AND (("LONGITUDE")::numeric(9,2))='."(('".$LONG."')::numeric(9,2));";
                 $ret = pg_query($db, $sql);
                 if (!$ret) {
                      return false; 
                } else {
                    $payload=pg_fetch_all($ret);
                    if($payload!=false){
                    $payload=$payload[0];
                    $payload=$payload["HID"];

                    $HID=$payload; 
                      return $HID; 
                      }
                      return false; 
                  }
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}

function findBookingConflicts($HID,$BTYPE,$DATEFROM,$DATETO,$db){
    try{
                     //(45.1839187, 18.8237103)
                       //SELECT * FROM public."BOOKINGVIEW"   WHERE "HID"='687' 
                      //AND "BTYPE"='9'
                      //AND (("DATEFROM">='2000-04-11 14:35:00+04' AND "DATETO"<='2019-04-11 16:00:00+04'));
             $sql = 
                //RETURNS ALL CONFLICTS 
               'SELECT "BOID", "USERNAME", "HID", "HNAME", "DATEFROM", "DATETO", "BOOKINGTYPE", "BID", "BTYPE", "ADDRESS"
  FROM public."BOOKINGVIEW"  WHERE ("DATEFROM"<='."'".$DATEFROM."'".' AND '."'".$DATETO."'".'<="DATETO")
  OR("DATEFROM"<='."'".$DATEFROM."'".' AND '."'".$DATEFROM."'".'<="DATETO")
  OR("DATEFROM"<='."'".$DATETO."'".' AND '."'".$DATETO."'".'<="DATETO");';
                 $ret = pg_query($db, $sql);
                  if (!$ret) {
                     return false;
                 }else {
                    $payload=pg_fetch_all($ret);
                    return $payload;}
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}

function bikesFromHID($HID,$BTYPE,$db,$conflicts){
    try{
            if($conflicts==false){
                        $dbexception= $dbexception.' no conflicts ';
                        $sql = 
                        'SELECT "BID" FROM public."BIKEHUBVIEW" WHERE "HID"='."'".$HID."'"
                        .' AND "BTYPE"='."'".$BTYPE."' ";
                         $ret = pg_query($db, $sql);
                         if (!$ret) {
                           return false;
                        } else {
                            $payload=pg_fetch_all($ret);
                            return  $payload;
                        }
                    }
            else {
                       $i=" ";
                       foreach($conflicts as $key=>$value) {
                        $i=$i.' AND  "BID"!='."'".$value['BID']."'";                      
                      }
                        $sql = 
                        'SELECT "BID" FROM public."BIKEHUBVIEW" WHERE "HID"='."'".$HID."'"
                        .' AND "BTYPE"='."'".$BTYPE."' "
                        .$i ;
                         $ret = pg_query($db, $sql);
                        if (!$ret) {
                           return false;
                        } else {
                            $payload=pg_fetch_all($ret);
                            return  $payload;
                        }
            }
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}
function MakeBooking($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE,$HID,$db){
    try{
             $sql = 
                                            'INSERT INTO public."BOOKING" ("USERNAME", "DATEFROM", "DATETO", "HID", "BOOKINGTYPE")VALUES ('
                                             ."'".$USERNAME."','".$DATEFROM."','".$DATETO."','".$HID."','".$BOOKINGTYPE."');";
                                             $ret = pg_query($db, $sql);
                                             if (!$ret) {
                                                return false;
                                             } else {
                                                return true;
                                            }
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}
function getBOID($USERNAME,$DATEFROM,$DATETO,$BOOKINGTYPE,$HID,$db){
    try{
             $sql = 
                                            'SELECT "BOID" FROM public."BOOKING" WHERE "USERNAME"='."'".$USERNAME."'".' AND "DATEFROM"= '."'".$DATEFROM."'".' AND   "DATETO"='."'".$DATETO."'".' AND   "HID"='."'".$HID."'".' AND   "BOOKINGTYPE"='."'".$BOOKINGTYPE."'";
                                             $ret = pg_query($db, $sql);
                                             if (!$ret) {
                                                return false;
                                             } else {
                                                $payload=pg_fetch_all($ret);
                                                $payload=$payload[sizeof($payload)-1]["BOID"];
                                                return $payload;
                                            }
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}

function assignBikeToBooking($BOID,$BID,$db){
    try{
        $sql ='INSERT INTO public."BB" ( "BOID", "BID" ) VALUES ('."'".$BOID."','".$BID."');";
        $ret = pg_query($db, $sql);
        if (!$ret) {
          return true;}
        else {
          return false;
            }
        }
            catch(Exception $e)   {
            $dbopen=$dbopen+  $e->getMessage();
    }
}
    
?>
<?php
    
    $myhost="localhost";
    $myuser="root";
    $mypassw="";
    $mybd="tecnologia";

    $link = mysqli_connect($myhost, $myuser, $mypassw, $mybd) or die("Error " .mysqli_error($link));

    

?>
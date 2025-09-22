<?php
session_start();
include("conexion.php");
if (isset($_SESSION["logueado"])) {
    echo "L";
}
else{
    echo "NL";
}
?>
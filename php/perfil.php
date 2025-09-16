<?php
session_start();
include("conexion.php");
$nombre = $_SESSION['nombre'];
$email = $_SESSION['email'];


$contrasenia = $_POST['pass'];
$updat = "UPDATE usuario SET contrasenia = '" . $contrasenia . "' WHERE nombre = '" . $nombre . "' AND email = '" . $email . "'" or die("Error " . mysqli_error($link));
$update = $link->query($updat);
if($update){
    echo "CA";
}
else{
    echo"EA";
}

?>


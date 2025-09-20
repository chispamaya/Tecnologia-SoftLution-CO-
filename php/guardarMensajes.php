<?php
session_start();
include("conexion.php");

$nombreE = $_SESSION['nombre'];
$nombreR = $_POST['nombreR'];
$mensaje = $_POST['inputMensaje'];
$mensajear = "INSERT into mensaje(contenido, nombreRemitente, nombreEmisor) VALUES('". $mensaje ."', '". $nombreR ."', '". $nombreE ."')";
$insertar = $link->query($mensajear);
?>
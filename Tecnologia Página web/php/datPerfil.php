<?php
session_start();
include("conexion.php");
$nombre = $_SESSION['nombre'];
$email = $_SESSION['email'];

$datos = [$nombre, $email];
echo json_encode($datos);


?>
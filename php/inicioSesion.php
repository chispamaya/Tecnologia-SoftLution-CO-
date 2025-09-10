<?php
session_start();
include("conexion.php");

$email = $_POST['email'];

$contrasenia = $_POST['password'];

$query = "SELECT * FROM usuario WHERE email = '$email' AND contrasenia = '$contrasenia'";

$resultado = $link->query($query);

if($resultado->num_rows == 0){
    echo "El email o contraseña ingresados no coinciden o no existen en nuestra db. Por favor intente nuevamente.";
}

else{
    $busNombre = "SELECT nombre FROM usuario WHERE email = '$email'";
    $nombreD = $link->query($busNombre);
    $dato = $nombreD->fetch_assoc();
    $nombre = $dato['nombre'];

    $_SESSION['nombre'] = $nombre;
    $_SESSION['email'] = $email;
    $_SESSION['contrasenia'] = $contrasenia;
    $S_SESSION['logueado'] = true;
    header("Location: /inicio.html");
}

?>
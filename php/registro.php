<?php
session_start();
include("conexion.php");
$nombre = $_POST['user'];
$email = $_POST['email'];
$contrasenia = $_POST['password'];
$admin = false;

$condicion = "@tecnologia.com";

$check = "SELECT * FROM usuario WHERE nombre = '$nombre'";
$r_check = $link->query($check);
if ($r_check->num_rows == 0) {
  $busqueda = strpos($email, $condicion, -15);
  if ($busqueda === false) {
    echo "El email ingresado no tiene el dominio de la empresa. Por favor favor ingrese uno válido";
  } else {
    $query = "INSERT INTO usuario(nombre, contrasenia, adminONo, email) VALUES ('" . $nombre . "','" . $contrasenia . "', '" . $admin . "', '" . $email . "')" or
      die("Error " . mysqli_error($link));
    $result = $link->query($query);
    if ($result == 1) {
      echo "'¡Datos cargados correctamente!'<br/>";
    } else {
      echo "<h3>Ha ocurrido un error durante el ingreso de la información!</h3><br/>";
    }
  }
} else {
  echo "<h3>ERROR: Ya existe un usuario con ese nombre. </h3><br/>";
}
session_unset();
session_destroy();
?>
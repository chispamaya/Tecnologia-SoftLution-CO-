<?php
session_start();
include("conexion.php");
$nombre = $_POST['user'];
$email = $_POST['email'];
$contrasenia = $_POST['password'];
$admin = 0;

$condicion = "@tecnologia.com";

$check = "SELECT * FROM usuario WHERE nombre = '$nombre'";
$r_check = $link->query($check);
if ($r_check->num_rows == 0) {
  $busqueda = strpos($email, $condicion, -15);
  if ($busqueda === false) {
    echo "ED";
  } else {
    $check2 = "SELECT * from usuario where email = '$email'";
    $consulta = $link->query($check2);
    if($consulta->num_rows == 0){
      $query = "INSERT INTO usuario(nombre, contrasenia, adminONo, email) VALUES ('" . $nombre . "','" . $contrasenia . "', '" . $admin . "', '" . $email . "')" or
        die("Error " . mysqli_error($link));
      $result = $link->query($query);
      if ($result == 1) {
        $_SESSION['nombre'] = $nombre;
        $_SESSION['email'] = $email;
        $_SESSION['contrasenia'] = $contrasenia;
        $_SESSION['logueado'] = true;
        $_SESSION['ChatActual'] = "chat1";

        echo "C";
      } else {
        echo "EI";
      }
    }
    else{
      echo "EE";
    }
  }
} else {
  echo "EN";
}

?>
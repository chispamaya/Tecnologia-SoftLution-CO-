<?php
include("conexion.php");
$nombre=$_POST['user'];
$email=$_POST['email'];
$contasenia= $_POST['password'];
$query = "INSERT INTO usuario(nombre, email, contrasenia) VALUES ('".$nombre."','".$email."','".$contrasenia."')"or
die("Error " . mysqli_error($link));
$result = $link->query($query);
if ($result==1){
echo "<h3>Datos cargados correctamente!</h3><BR>";
}
else {
echo "<h3>No es posible ingresar la informacion!</h3><BR>";
}
?>
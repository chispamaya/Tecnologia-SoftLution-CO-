<?php
session_start();
include("conexion.php");

$cont = $_POST['com'];

$idP = $_POST['idP'];

$nombre = $_SESSION['nombre'];

$insertar = "INSERT INTO comentar(contenido, idPost, nombreUsuario) VALUES('". $cont ."', '". $idP ."', '". $nombre ."')";

$bd = $link->query($insertar);



?>
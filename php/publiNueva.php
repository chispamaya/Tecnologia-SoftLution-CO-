<?php
session_start();
include("conexion.php");

$titulo = $_POST['title'];
$desc = $_POST['desc'];
$url = $_POST['url'];
$logueado = $_SESSION['logueado'];



$nombre = $_SESSION['nombre'];
if  ($url == false){
    $url = 'Sin Link';
}
$query = "INSERT INTO post(titulo, contenido, link, nombreUsuario) VALUES ('" . $titulo . "','" . $desc . "', '" . $url . "', '" . $nombre . "')" or die("Error " . mysqli_error($link));
$consulta = $link->query($query);
if ($consulta == false) {
    echo "EP";
    //"Ocurrio un error con el post: " . mysqli_error($link)
}
else {
    echo "C";
    //Post Subido con éxito.
}


?>
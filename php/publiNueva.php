<?php
session_start();
include("conexion.php");

$titulo = $_POST['title'];
$desc = $_POST['desc'];
$url = $_POST['url'];

echo $url;
$logueado = $_SESSION['logueado'];


if($logueado == true){
    $nombre = $_SESSION['nombre'];
    $query = "INSERT INTO post(titulo, contenido, link, nombreUsuario) VALUES ('" . $titulo . "','" . $desc . "', '" . $url . "', '" . $nombre . "')" or die("Error " . mysqli_error($link));
    $consulta = $link->query($query);
    if($consulta == false){
        echo "Ocurrio un error con el post: " . mysqli_error($link);
    }
}
else{
    header("Location: /index.html");
}
?>

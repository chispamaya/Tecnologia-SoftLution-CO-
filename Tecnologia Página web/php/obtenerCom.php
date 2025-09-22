<?php
session_start();
include("conexion.php");

$idP = $_POST['idP'];


$buscar = "SELECT contenido, nombreUsuario FROM comentar WHERE idPost = '". $idP ."' ORDER BY id DESC";

$secPost = $link->query($buscar);

$datos = [];

while ($fila = $secPost->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);
?>
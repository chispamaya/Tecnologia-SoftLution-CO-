<?php
session_start();
include("conexion.php");

$nombre = $_SESSION['nombre'];
$chats = "SELECT nombre FROM usuario WHERE nombre != '". $nombre ."' ORDER BY nombre ASC";

$buscar = $link->query($chats);

$nombres = [];
while($fila = $buscar->fetch_assoc()){
    $nombres[] = $fila;
}

echo json_encode($nombres);

?>
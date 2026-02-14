<?php
session_start();
include("conexion.php");
$consul = "SELECT id, titulo, contenido, link, nombreUsuario FROM post order by id ASC";
$query = $link->query($consul);

$datos = [];

while ($fila = $query->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);
?>
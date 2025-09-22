<?php
session_start();

include("conexion.php");

$nombre = $_SESSION['nombre'];

$selectA = "SELECT adminOno FROM usuario WHERE nombre = '". $nombre ."'";

$verA = $link->query($selectA);

$fila = $verA->fetch_row();

echo $fila[0];



?>
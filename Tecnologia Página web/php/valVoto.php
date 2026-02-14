<?php
session_start();
include("conexion.php");
$nombre = $_SESSION['nombre'];
$idP = $_POST['id'];

$voto = "SELECT idOpcionPool FROM votar WHERE nombreUsuario = '". $nombre ."' AND idOpcionPool IN(SELECT id FROM opcionpool WHERE idPool = '". $idP ."')";

$query = $link->query($voto);

$siONo = $query->fetch_row();

if($siONo){
    $siONo = $siONo[0];
}
else{
    $siONo = "NODIO";
}

echo json_encode([
    "hayVoto" => $siONo
]);
?>
<?php
session_start();

include("conexion.php");

$nombreE = $_SESSION['nombre'];

$nombreR = $_POST['nombreR'];

$selectM = "SELECT id, contenido, nombreEmisor FROM mensaje WHERE nombreRemitente IN('". $nombreE ."', '". $nombreR ."') AND nombreEmisor IN('". $nombreE ."', '". $nombreR ."') ORDER BY id ASC";

$verM = $link->query($selectM);

$mensajes = [];

while($fila = $verM->fetch_assoc()){
    $temporal = [$fila['id'], $fila['contenido'], $fila['nombreEmisor']];
    $mensajes[] = $temporal;
}
echo json_encode($mensajes);



?>
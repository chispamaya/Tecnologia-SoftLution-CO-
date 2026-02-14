<?php
session_start();

include("conexion.php");

$nombre = $_SESSION['nombre'];

$ver = "SELECT id, titulo, nombreUsuario, subidoDesp FROM pool ORDER BY id ASC";

$consulta = $link->query($ver);

$pools = [];

while($fila = $consulta->fetch_assoc()){
    $pool = [
        'id' => $fila['id'],
        'titulo' => $fila['titulo'],
        'nombreUsuario' => $fila['nombreUsuario'],
        'subidoDesp' => $fila['subidoDesp'],
        'opciones' => [] 
    ];

    $id_encuesta = $fila['id'];
    $verO = "SELECT id, opcion FROM opcionpool WHERE idPool = '". $id_encuesta ."' ORDER BY id ASC";
    $consultaO = $link->query($verO);
    
    while ($opcion = $consultaO->fetch_assoc()) {
        $pool['opciones'][] = [
            'id_opcion' => $opcion['id'],
            'opcion_texto' => $opcion['opcion']
        ];
    }
    
    $pools[] = $pool;
}
echo json_encode($pools);
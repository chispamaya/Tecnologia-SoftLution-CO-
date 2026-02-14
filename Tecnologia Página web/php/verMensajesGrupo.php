<?php
session_start();
include("conexion.php");

$nombreUsuarioActual = $_SESSION['nombre'];

$mensajesInfo = [];
$mensajesS = "SELECT id, contenido, nombreEmisor FROM mensaje WHERE nombreRemitente = 'Grupo - Tecnologia' ORDER BY id ASC";
$busMensajes = $link->query($mensajesS);

while ($fila = $busMensajes->fetch_assoc()) {
    $mensajesInfo[] = [
        'tipo' => 'mensaje',
        'id' => $fila['id'],
        'contenido' => $fila['contenido'],
        'nombreEmisor' => $fila['nombreEmisor'],
        'nombreUsuario' => $nombreUsuarioActual
    ];
}

$poolsT = [];
$buscPools = "SELECT p.id AS id_encuesta, p.titulo, p.subidoDesp, p.nombreUsuario AS nombreEmisor, op.id AS id_opcion, op.opcion, COUNT(v.nombreUsuario) AS votos
             FROM pool p
             JOIN opcionPool op ON p.id = op.idPool LEFT JOIN votar v ON op.id = v.idOpcionPool
             GROUP BY p.id, op.id
             ORDER BY p.id ASC, op.id ASC";
$busPools = $link->query($buscPools);

while ($fila = $busPools->fetch_assoc()) {
    $poolId = $fila['subidoDesp'];
    if (!isset($poolsT[$poolId])) {
        $poolsT[$poolId] = [
            'tipo' => 'pool',
            'id' => $poolId,
            'idR' => $fila['id_encuesta'],
            'titulo' => $fila['titulo'],
            'nombreEmisor' => $fila['nombreEmisor'],
            'nombreUsuario' => $nombreUsuarioActual,
            'opciones' => []
        ];
    }
    $poolsT[$poolId]['opciones'][] = [
        'id_opcion' => $fila['id_opcion'],
        'votos' => $fila['votos'],
        'opcion' => $fila['opcion']
    ];
}

$poolsInfo = array_values($poolsT);
$comu = array_merge($mensajesInfo, $poolsInfo);

usort($comu, function($a, $b) {
    return $a['id'] <=> $b['id'];
});

echo json_encode($comu);
?>
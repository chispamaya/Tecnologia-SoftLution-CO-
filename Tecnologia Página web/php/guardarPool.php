<?php
session_start();
include("conexion.php");

$nombre = $_SESSION['nombre'];

$titulo = $_POST['titulo'];

$opciones = $_POST['opciones'];

$subidoDesp = $_POST['subidoDesp'];

$guardarPool = "INSERT into pool(titulo, nombreUsuario, subidoDesp) VALUES('". $titulo ."', '". $nombre ."', '". $subidoDesp ."')";

$guardar = $link->query($guardarPool);

$rescatarrID = "SELECT id FROM pool WHERE nombreUsuario = '". $nombre ."' ORDER BY id DESC LIMIT 1";

$rescatarID = $link->query($rescatarrID);

$a = $rescatarID->fetch_row();

$ID = $a[0];


foreach($opciones as $opcion){
    $guardarOpc = "INSERT into opcionpool(opcion, idPool) VALUES('". $opcion ."', '". $ID ."')";

    $guardarO = $link->query($guardarOpc);
}
?>
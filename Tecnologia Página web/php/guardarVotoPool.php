<?php
session_start();

include("conexion.php");

$nombre = $_SESSION['nombre'];

$idPost = $_POST['idP']; 

$idOpt = $_POST['idO']; 

$verificar = "SELECT idOpcionPool FROM votar WHERE nombreUsuario = '" . $nombre . "' AND idOpcionPool IN(SELECT id FROM opcionpool WHERE idPool = '" . $idPost . "')";

$query = $link->query($verificar);

$opcionVotada = $query->fetch_assoc();

if ($opcionVotada) {
    if ($opcionVotada['idOpcionPool'] == $idOpt) {
        $borra = "DELETE FROM votar WHERE nombreUsuario = '" . $nombre . "' AND idOpcionPool = '" . $idOpt . "'";
        $borrar = $link->query($borra);
        echo"D";
    } else {
        $actualiza = "UPDATE votar SET idOpcionPool = '" . $idOpt . "' WHERE nombreUsuario = '" . $nombre . "' AND idOpcionPool = '". $opcionVotada['idOpcionPool'] ."'";
        $actualizar = $link->query($actualiza);
        echo"U";
    }
} else {
    $crea = "INSERT INTO votar(idOpcionPool, nombreUsuario) VALUES('" . $idOpt . "', '" . $nombre . "')";
    $crear = $link->query($crea);
        echo"I";

}
?>

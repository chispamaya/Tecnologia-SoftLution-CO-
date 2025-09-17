<?php
session_start();
include("conexion.php");

$nombre = $_SESSION['nombre'];
$idP = $_POST['id'];

$verificar = "SELECT likeOdislike FROM valorar WHERE nombreUsuario = '" . $nombre . "' AND idPost = '" . $idP . "'";

$query = $link->query($verificar);

$tipoLike = $query->fetch_assoc();

if ($tipoLike) {
    if ($tipoLike['likeOdislike'] == 0) {
        $borra = "DELETE FROM valorar WHERE nombreUsuario = '" . $nombre . "' AND idPost = '" . $idP . "'";
        $borrar = $link->query($borra);
        echo"D";
    } else {
        $actualiza = "UPDATE valorar SET likeOdislike = '" . 0 . "' WHERE nombreUsuario = '" . $nombre . "' AND idPost = '" . $idP . "'";
        $actualizar = $link->query($actualiza);
        echo"U";
    }
} else {
    $crea = "INSERT INTO valorar(likeOdislike, nombreUsuario, idPost) VALUES('" . 0 . "', '" . $nombre . "', '" . $idP . "')";
    $crear = $link->query($crea);
        echo"I";

}
?>
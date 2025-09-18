<?php
session_start();
include("conexion.php");
$nombre = $_SESSION['nombre'];
$idP = $_POST['id'];

$calculL = "SELECT COUNT(likeOdislike) FROM valorar WHERE idPost = '". $idP ."' AND likeOdislike = '". 1 ."'";
$calculD = "SELECT COUNT(likeOdislike) FROM valorar WHERE idPost = '". $idP ."' AND likeOdislike = '". 0 ."'";

$calculaL = $link->query($calculL);
$calculaD = $link->query($calculD);

$calcularL = $calculaL->fetch_row();
$calcularD = $calculaD->fetch_row();


$dioLike = "SELECT likeOdislike FROM valorar WHERE nombreUsuario = '". $nombre ."' AND idPost = '". $idP ."'";

$query = $link->query($dioLike);

$siONo = $query->fetch_row();

if($siONo){
    if($siONo[0] == 1){
        $siONo = "SI";
    }
    else{
        $siONo = 'NO';
    }
}
else{
    $siONo = "NODIO";
}

echo json_encode([
    "likes" => $calcularL[0],
    "dislikes" => $calcularD[0],
    "hayLike" => $siONo
]);
?>
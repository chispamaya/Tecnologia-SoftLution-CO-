<?php
session_start();
include("conexion.php");

$ultMsg = "SELECT id FROM mensaje WHERE nombreRemitente = 'Grupo - Tecnologia' order by id DESC limit 1";

$query = $link->query($ultMsg);

$col = $query->fetch_row();

$id = $col[0];

echo $id;

?>
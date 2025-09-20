<?php
session_start();

$chat = $_POST['actual'];

$_SESSION['ChatActual'] = $chat;

echo $chat;
?>
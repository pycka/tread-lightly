<?php
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Treadlightly\Treadlightly;
error_reporting(E_ALL);
ini_set('display_errors', 1);
require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(new WsServer(new \Treadlightly\Treadlightly()), 8085);

$server->run();
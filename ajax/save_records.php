<?php

if (($_SERVER["REQUEST_METHOD"] !== "POST")) die;

require_once('../../../init.php');

$request = new Request();

$data = $request->getPost();

if ($data == null) die;

$tracker = new Tracker(new ObjectFactory());

$tracker->saveRecords($data);

echo 'done';
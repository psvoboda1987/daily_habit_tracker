<?php

if (($_SERVER["REQUEST_METHOD"] !== "POST")) die('no post');

require_once('../config.php');
require_once('../../../init.php');

$request = new Request();

$action = $request->getPost('action');

$show_functions = [
    'showRecords',
    'showStatistics',
];

$save_functions =[
    'saveRecord',
];

$allowed_actions = array_merge($show_functions, $save_functions);

if (!in_array($action, $allowed_actions)) die('not allowed');

$tracker = new Tracker(new ObjectFactory());

function showRecords($tracker)
{
    $data = $tracker->getRecords();

    $list = new ListTemplate('records', $data);

    return $list->getHtml();
}

function showStatistics($tracker)
{
    $statistics = $tracker->getStatistics();

    $template = new Template('statistics', $statistics);

    return $template->getHtml();
}

if (in_array($action, $show_functions)) {
    echo $action($tracker);
    return;
}

echo $tracker->$action();
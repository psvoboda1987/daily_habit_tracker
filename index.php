<?php

require_once('config.php');
require_once('../../init.php');

$page = new Template('index', [], 'layout');
echo $page->getHtml();
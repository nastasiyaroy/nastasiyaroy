<?php

use JetBrains\PhpStorm\NoReturn;

require_once($_SERVER['DOCUMENT_ROOT'] . '/api/src/Helper.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/src/Database.php');

$output = [];
$request = json_decode(json_encode($_POST));

#[NoReturn] function error()
{
	$output = ['success' => 'error'];
	echo json_encode($output);
	exit;
}

function validation(string $value): bool
{
	return trim($value) === '';
}

if (validation($request->customer_name)) {
	error();
}

if (validation($request->customer_phone)) {
	error();
}

Database::query("INSERT INTO orders (`customer_name`, `customer_phone`) VALUES (:customer_name, :customer_phone)");
Database::bind([
	':customer_name' => $request->customer_name,
	':customer_phone' => $request->customer_phone,
]);

if (!Database::execute()) {
	error();
}

$output = ['success' => 'true'];
echo json_encode($output);
exit;
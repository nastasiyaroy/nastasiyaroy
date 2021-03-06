<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/api/env.php');

/**
 * Class Database
 *
 * Класс базы данных PDO
 * Подключение к базе данных.
 * Создать prepared statements.
 * Привязка значений.
 * Возвращать строки и результаты.
 */
class Database
{
	private static string $address = NO_SQL_ADDRESS;
	private static string $type = DB_TYPE;
	private static string $host = DB_HOST;
	private static string $port = DB_PORT;
	private static string $name = DB_NAME;
	private static string $user = DB_USER;
	private static string $pass = DB_PASS;

	private static mixed $db_handler;
	private static mixed $stmt;

	/**
	 * Установить DSN и создайте PDO
	 *
	 * @return void
	 */
	public static function init()
	{
		if (self::$address !== '') {
			$dsn = self::$type . ':' . self::$address;
		} else {
			$dsn = self::$type . ':host=' . self::$host . ';port=' . self::$port . ';dbname=' . self::$name;
		}

		$options = [
			PDO::ATTR_EMULATE_PREPARES => false,
			PDO::ATTR_PERSISTENT => true,
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		];

		try {
			self::$db_handler = new PDO($dsn, self::$user, self::$pass, $options);
			self::$db_handler->exec("set names utf8mb4");
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
		}
	}

	/**
	 * Подготовить statement с запросом
	 *
	 * @param string $sql
	 * @return void
	 */
	public static function query(string $sql)
	{
		try {
			self::$stmt = self::$db_handler->prepare($sql);
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
		}
	}

	/**
	 * Bind values
	 *
	 * @param string|array $param
	 * @param mixed $value
	 * @param null $type
	 * @return void
	 */
	public static function bind(string|array $param, mixed $value = null, $type = null)
	{
		try {
			if (is_array($param)) {
				foreach ($param as $k => $v) {
					self::bindValues($type, $v, $k);
				}
			} else {
				self::bindValues($type, $value, $param);
			}
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
		}
	}

	/**
	 * Выполнить prepared statement
	 *
	 * @return bool
	 */
	public static function execute(): bool
	{
		try {
			return self::$stmt->execute();
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
			return false;
		}
	}

	/**
	 * Получить результирующий набор в виде массива
	 *
	 * @return array|bool
	 */
	public static function fetchAll(): array|bool
	{
		try {
			self::$stmt->execute();
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
		}

		return self::$stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	/**
	 * Получить одну запись в виде массива
	 *
	 * @return array|bool
	 */
	public static function fetch(): array|bool
	{
		try {
			self::$stmt->execute();
		} catch (PDOException $exception) {
			echo 'PDO Error: ' . $exception->getMessage();
		}

		return self::$stmt->fetch(PDO::FETCH_ASSOC);
	}

	/**
	 * Bind values
	 *
	 * @param $type
	 * @param mixed $value
	 * @param array|string $param
	 */
	protected static function bindValues($type, mixed $value, array|string $param): void
	{
		if (is_null($type)) {
			$type = match (true) {
				is_int($value) => PDO::PARAM_INT,
				is_bool($value) => PDO::PARAM_BOOL,
				is_null($value) => PDO::PARAM_NULL,
				default => PDO::PARAM_STR,
			};
		}

		self::$stmt->bindValue($param, $value, $type);
	}
}

Database::init();

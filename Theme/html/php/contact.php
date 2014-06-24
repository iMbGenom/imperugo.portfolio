<?php
define('PATH', dirname(__FILE__));

// Load config variables
require_once PATH . '/config.php';
require_once PATH . '/functions.php';

/**
 * Process form data to send email
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['data'])) {
	$defaults = array(
		'email'   => '',
		'name'	=> '',
		'subject' => '',
		'message' => ''
	);

	$data = is_array($_POST['data']) 
		? array_merge($defaults, $_POST['data']) 
		: $defaults;

	if (empty($data['subject']))
		$data['subject'] = $config['default_subject'];

	try {
		// Validate name
		if (empty($data['name']))
			throw new Exception('Name cannot be left blank');

		// Validate email
		if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL))
			throw new Exception('Invalid email address');

		// Validate message
		if (empty($data['message']))
			throw new Exception('Message cannot be left blank');

		$body	 = get_template('tmpl/mail_content.php', $data);
		$headers  = 'MIME-Version: 1.1' . PHP_EOL;
		$headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
		$headers .= "From: {$data['name']} <{$data['email']}>" . PHP_EOL;
		$headers .= "Return-Path: {$config['email_to']}" . PHP_EOL;
		$headers .= "Reply-To: {$data['email']}" . PHP_EOL;

		// Send email
		mail($config['email_to'], $data['subject'], $body, $headers);

		// Auto send reply email to user
		if ($config['auto_response'] == true) {
			$response_headers  = 'MIME-Version: 1.1' . PHP_EOL;
			$response_headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
			$response_headers .= "From: {$config['auto_response_name']} <{$config['auto_response_email']}>" . PHP_EOL;
			$response_headers .= "Return-Path: {$data['email']}" . PHP_EOL;
			$response_headers .= "Reply-To: {$config['auto_response_email']}" . PHP_EOL;
			$response_body	 = get_template('tmpl/mail_response.php', $data);

			// Send email
			mail($data['email'], $config['auto_response_subject'], $response_body, $response_headers);
		}

		set_response('success', $config['success_message']);
	}
	catch (Exception $ex) {
		set_response('error', $ex->getMessage());
	}
}

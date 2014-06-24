<?php
define('PATH', dirname(__FILE__));

// Load config variables
require_once PATH . '/config.php';
require_once PATH . '/functions.php';
require_once PATH . '/vendor/mailchimp.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
	try {
		// Validate email
		if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
			throw new Exception('Invalid email address');

		$api = new MailChimp($config['mailchimp_key']);
		$result = $api->call('lists/subscribe', array(
			'id'                => $config['mailchimp_list_id'],
			'email'             => array('email' => $_POST['email']),
			'double_optin'      => false,
			'update_existing'   => true,
			'replace_interests' => false,
			'send_welcome'      => true
		));

		if (isset($result['status']) && $result['status'] == 'error')
			throw new Exception($result['error']);

		set_response('success', $config['mailchimp_success_message']);
	}
	catch (Exception $ex) {
		set_response('error', $ex->getMessage());
	}
}

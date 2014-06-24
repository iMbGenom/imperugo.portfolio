<?php
/**
 * Return true when HTTP Request is sent by XMLHttpRequest
 * 
 * @return  boolean
 */
function is_ajax() {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
		   strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

/**
 * Send response content to the client when form is submitted
 * 
 * @param  string  $status   Response status
 * @param  string  $content  Response content
 */
function set_response($status, $content) {
	echo json_encode(array(
		'status'  => $status,
		'content' => $content
	));

	exit;
}

/**
 * Render template file with passed variables
 * 
 * @param   string  $file  Template file name
 * @param   array   $vars  Template variables
 * 
 * @return  string
 */
function get_template($file, $vars = array()) {
	if (is_file(PATH . '/' . $file)) {
		ob_start();

		include PATH . '/' . $file;

		return ob_get_clean();
	}

	return '';
}
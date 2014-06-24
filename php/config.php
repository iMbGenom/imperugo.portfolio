<?php
/******************************************************************/
/* Contact Form Config                                            */
/******************************************************************/
// An email address that will be received mail from the user
$config['email_to'] = 'support@linethemes.com';

// Default subject for email when user doesn't fill subject field
$config['default_subject'] = 'New contact message from linethemes.com';

// Message content will be sent to user after process form request
$config['success_message'] = 'Thank you! Your message has been sent to us';

// Set auto_response to TRUE when you wish to auto
// send an response message to the user
$config['auto_response'] = true;

// Name of the sender will be used by auto response email
$config['auto_response_name']	 = 'LineThemes Support';

// Email address of the sender will be used by auto response email
$config['auto_response_email']	= 'support@linethemes.com';

// Subject for auto response email
$config['auto_response_subject']  = 'Thank you for contacted me from linethemes.com';

/******************************************************************/
/* Mailchimp Integration Config                                   */
/******************************************************************/
$config['mailchimp_key'] = '13c3e4b3ea4c85d2ca33b4be3b75de2c-us3';
$config['mailchimp_list_id'] = '3e329a10f8';
$config['mailchimp_success_message'] = 'Success! You\'ve been added to our email list.';

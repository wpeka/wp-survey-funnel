<?php
/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://club.wpeka.com
 * @since      1.0.0
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/includes
 * @author     WPEka Club <support@wpeka.com>
 */
class Wp_Survey_Funnel_I18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'wp-survey-funnel',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}

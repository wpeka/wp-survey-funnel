<?php
/**
 * Fired during plugin activation
 *
 * @link  https://club.wpeka.com
 * @since 1.0.0
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/includes
 * @author     WPEka Club <support@wpeka.com>
 */
class Surveyfunnel_Lite_Activator {


	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since 1.0.0
	 */
	public static function activate() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		if ( is_multisite() ) {
			// Get all blogs in the network and activate plugin on each one.
			$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );
			foreach ( $blog_ids as $blog_id ) {
				switch_to_blog( $blog_id );
				self::surveyfunnel_lite_install_table();
				restore_current_blog();
			}
		} else {
			self::surveyfunnel_lite_install_table();
		}
	}

	/**
	 * SRF Install tables.
	 */
	public static function surveyfunnel_lite_install_table() {

		// if used dbDelta function it will check if existing table is present or not. and create it if not present.
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name      = $wpdb->prefix . 'srf_entries';
		$sql             = "CREATE TABLE $table_name (
			ID int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
			survey_id int(11) DEFAULT 0,
			user_id int(11) DEFAULT 0,
			fields TEXT,
			user_locale_id varchar(255),
			time_created int(11) DEFAULT 0,
			date_created DATE,
			user_meta TEXT
		) $charset_collate;";
		dbDelta( $sql );
	}
}

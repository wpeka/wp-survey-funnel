<?php
/**
 * Class Test_Surveyfunnel_Lite_Activator
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Test for Surveyfunnel_Lite_Activator class
 */
class Test_Surveyfunnel_Lite_Activator extends WP_UnitTestCase {

	/**
	 * Test for activate function
	 */
	public function test_activate() {
		Surveyfunnel_Lite_Activator::activate();
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$this->assertEquals( $table_name, $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name ) ) ); // db call ok; no-cache ok.
	}
}

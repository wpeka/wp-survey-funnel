<?php
/**
 * Class Test_WP_Survey_Funnel_Activator
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Test for Wp_Survey_Funnel_Activator class
 */
class Test_WP_Survey_Funnel_Activator extends WP_UnitTestCase {

	/**
	 * Test for activate function
	 */
	public function test_activate() {
		Wp_Survey_Funnel_Activator::activate();
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$this->assertEquals( $table_name, $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name ) ) ); // db call ok; no-cache ok.
	}
}

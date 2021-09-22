<?php
/**
 * Class Test_Surveyfunnel_Lite
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Unit test cases for class Surveyfunnel_Lite.
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 * @author     WPEka <hello@wpeka.com>
 */
class Test_Surveyfunnel_Lite extends WP_UnitTestCase {

	/**
	 * Surveyfunnel_Lite class instance.
	 *
	 * @access public
	 * @var string $surveyfunnel_lite class instance.
	 */
	public static $surveyfunnel_lite;

	/**
	 * Set up function.
	 *
	 * @param class WP_UnitTest_Factory $factory class instance.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {
		self::$surveyfunnel_lite = new Surveyfunnel_Lite();
	}

	/**
	 * Test for constructor
	 */
	public function test_construct() {
		$obj = new Surveyfunnel_Lite();
		$this->assertTrue( $obj instanceof Surveyfunnel_Lite );
	}

	/**
	 * Test for get_plugin_name function
	 */
	public function test_get_plugin_name() {
		$plugin_name = self::$surveyfunnel_lite->get_plugin_name();
		$this->assertSame( 'surveyfunnel-lite', $plugin_name );
	}

	/**
	 * Test for get_version function
	 */
	public function test_get_version() {
		$version = self::$surveyfunnel_lite->get_version();
		$this->assertSame( '1.0.2', $version );
	}

	/**
	 * Test for check_pro_activated function
	 */
	public function test_check_pro_activated() {
		$is_pro_activated = self::$surveyfunnel_lite->check_pro_activated();
		$this->assertEquals( get_option( 'surveyfunnel_pro_activated' ), $is_pro_activated );
	}

	/**
	 * Test for get_loader function
	 */
	public function test_get_loader() {
		$loader = self::$surveyfunnel_lite->get_loader();
		$loader = (array) $loader;
		$it     = new RecursiveIteratorIterator( new RecursiveArrayIterator( $loader ) );
		$array  = array();
		foreach ( $it as $v ) {
			array_push( $array, $v );
		}

		// Test for some hooks.
		$this->assertTrue( in_array( 'plugins_loaded', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_surveyfunnel_lite_save_build_data', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_surveyfunnel_lite_new_survey_lead', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_surveyfunnel_lite_get_configuration_data', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_surveyfunnel_lite_save_design_data', $array, true ) );
	}

	/**
	 * Test for run function.
	 */
	public function test_run() {
		self::$surveyfunnel_lite->run();
		$this->assertTrue( true );
	}

}

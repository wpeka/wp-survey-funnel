<?php
/**
 * Class Test_Wp_Survey_Funnel
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Unit test cases for class Wp_Survey_Funnel.
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 * @author     WPEka <hello@wpeka.com>
 */
class Test_Wp_Survey_Funnel extends WP_UnitTestCase {

	/**
	 * Wp_Survey_Funnel class instance.
	 *
	 * @access public
	 * @var string $wp_survey_funnel class instance.
	 */
	public static $wp_survey_funnel;

	/**
	 * Set up function.
	 *
	 * @param class WP_UnitTest_Factory $factory class instance.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {
		self::$wp_survey_funnel = new Wp_Survey_Funnel();
	}

	/**
	 * Test for constructor
	 */
	public function test_construct() {
		$obj = new Wp_Survey_Funnel();
		$this->assertTrue( $obj instanceof Wp_Survey_Funnel );
	}

	/**
	 * Test for get_plugin_name function
	 */
	public function test_get_plugin_name() {
		$plugin_name = self::$wp_survey_funnel->get_plugin_name();
		$this->assertSame( 'wp-survey-funnel', $plugin_name );
	}

	/**
	 * Test for get_version function
	 */
	public function test_get_version() {
		$version = self::$wp_survey_funnel->get_version();
		$this->assertSame( '1.0.0', $version );
	}

	/**
	 * Test for check_pro_activated function
	 */
	public function test_check_pro_activated() {
		$is_pro_activated = self::$wp_survey_funnel->check_pro_activated();
		$this->assertEquals( get_option( 'wp_survey_funnel_activated' ), $is_pro_activated );
	}

	/**
	 * Test for get_loader function
	 */
	public function test_get_loader() {
		$loader = self::$wp_survey_funnel->get_loader();
		$loader = (array) $loader;
		$it     = new RecursiveIteratorIterator( new RecursiveArrayIterator( $loader ) );
		$array  = array();
		foreach ( $it as $v ) {
			array_push( $array, $v );
		}

		// Test for some hooks.
		$this->assertTrue( in_array( 'plugins_loaded', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_wpsf_save_build_data', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_wpsf_new_survey_lead', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_wpsf_get_configuration_data', $array, true ) );
		$this->assertTrue( in_array( 'wp_ajax_wpsf_save_design_data', $array, true ) );
	}

	/**
	 * Test for run function.
	 */
	public function test_run() {
		self::$wp_survey_funnel->run();
		$this->assertTrue( true );
	}

}

<?php
/**
 * Class Test_Main_Plugin_File
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Unit test cases for main plugin file.
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 * @author     WPEka <hello@wpeka.com>
 */

/**
 * Test for new plugin file.
 */
class Test_Main_Plugin_File extends WP_UnitTestCase {

	/**
	 * Test for srf_fs function
	 */
	public function test_srf_fs() {
		$analytics = srf_fs();
		$this->assertTrue( is_object( $analytics ) && ! empty( $analytics ) );
	}

	/**
	 * Test for activate_wp_survey_funnel function
	 */
	public function test_activate_wp_survey_funnel() {
		activate_wp_survey_funnel();
		$this->assertTrue( true );
	}

	/**
	 * Test for deactivate_wp_survey_funnel function
	 */
	public function test_deactivate_wp_survey_funnel() {
		deactivate_wp_survey_funnel();
		$this->assertTrue( true );
	}

	/**
	 * Test for run_wp_survey_funnel function
	 */
	public function test_run_wp_survey_funnel() {
		run_wp_survey_funnel();
		$this->assertTrue( true );
	}
}


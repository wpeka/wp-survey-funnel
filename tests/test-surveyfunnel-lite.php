<?php
/**
 * Class Test_Main_Plugin_File
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Unit test cases for main plugin file.
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 * @author     WPEka <hello@wpeka.com>
 */

/**
 * Test for new plugin file.
 */
class Test_Main_Plugin_File extends WP_UnitTestCase {

	/**
	 * Test for activate_surveyfunnel_lite function
	 */
	public function test_activate_surveyfunnel_lite() {
		activate_surveyfunnel_lite();
		$this->assertTrue( true );
	}

	/**
	 * Test for deactivate_surveyfunnel_lite function
	 */
	public function test_deactivate_surveyfunnel_lite() {
		deactivate_surveyfunnel_lite();
		$this->assertTrue( true );
	}

	/**
	 * Test for run_surveyfunnel_lite function
	 */
	public function test_run_surveyfunnel_lite() {
		run_surveyfunnel_lite();
		$this->assertTrue( true );
	}
}


<?php
/**
 * Class Test_Wp_Survey_Funnel_Ajax
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Required file.
 */
require_once ABSPATH . 'wp-admin/includes/ajax-actions.php';

/**
 * Unit test cases for ajax request.
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 * @author     WPEka <hello@wpeka.com>
 */
class Test_Wp_Survey_Funnel_Ajax extends WP_Ajax_UnitTestCase {

	/**
	 * Created dummy post id array
	 *
	 * @var int $post_ids post ids
	 */
	public static $post_ids;

	/**
	 * Dummy design for survey
	 *
	 * @var string $design design string
	 */
	public static $design;

	/**
	 * Dummy build for survey
	 *
	 * @var string $build build string
	 */
	public static $build;

	/**
	 * Set up function.
	 *
	 * @param class WP_UnitTest_Factory $factory class instance.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {
		self::$post_ids = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design   = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build    = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
		update_post_meta(
			self::$post_ids[0],
			'wpsf-survey-data',
			array(
				'design' => self::$design,
				'build'  => self::$build,
			)
		);
	}


	/**
	 * Test for wpsf_new_survey function
	 */
	public function test_wpsf_new_survey() {
		// become administrator.
		$this->_setRole( 'administrator' );

		// setup an ajax request.
		$_POST['action']   = 'wpsf_new_survey';
		$_POST['security'] = wp_create_nonce( 'surveySecurity' );
		$_POST['title']    = 'Demo survey';
		try {
			$this->_handleAjax( 'wpsf_new_survey' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$repsonse = json_decode( $this->_last_response );
		$this->assertTrue( $repsonse->success );
		$this->assertSame( 1, preg_match( '/post_id=[0-9]+#build$/', $repsonse->data->url_to_redirect ) );
	}

	/**
	 * Test for wpsf_save_build_data function
	 */
	public function test_wpsf_save_build_data() {
		$_POST['action']     = 'wpsf_save_build_data';
		$_POST['security']   = wp_create_nonce( 'wpsf-security' );
		$_POST['post_id']    = self::$post_ids[0];
		$_POST['post_title'] = 'Demo survey';
		$_POST['state']      = self::$build;
		try {
			$this->_handleAjax( 'wpsf_save_build_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$this->assertSame( 'Demo survey', get_the_title( self::$post_ids[0] ) );
		$survey_data = get_post_meta( self::$post_ids[0], 'wpsf-survey-data', true );
		$this->assertSame( self::$build, $survey_data['build'] );
		$this->assertSame( self::$design, $survey_data['design'] );
		$response = json_decode( $this->_last_response );
		$this->assertTrue( $response->success );
	}

	/**
	 * Test for wpsf_get_build_data function
	 */
	public function test_wpsf_get_build_data() {
		$_POST['action']   = 'wpsf_get_build_data';
		$_POST['security'] = wp_create_nonce( 'wpsf-security' );
		$_POST['post_id']  = self::$post_ids[0];
		try {
			$this->_handleAjax( 'wpsf_get_build_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertSame( true, $response->success );
		$this->assertSame( get_the_title( self::$post_ids[0] ), $response->data->post_title );
		$post_meta = get_post_meta( self::$post_ids[0], 'wpsf-survey-data', true );
		$this->assertSame( $post_meta['build'], $response->data->build );
	}

	/**
	 * Test for wpsf_save_design_data function
	 */
	public function test_wpsf_save_design_data() {
		$_POST['action']   = 'wpsf_save_design_data';
		$_POST['security'] = wp_create_nonce( 'wpsf-security' );
		$_POST['post_id']  = self::$post_ids[0];
		$_POST['state']    = self::$design;
		try {
			$this->_handleAjax( 'wpsf_save_design_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( $response->success );
	}
}

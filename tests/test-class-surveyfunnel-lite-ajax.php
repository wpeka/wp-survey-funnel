<?php
/**
 * Class Test_Surveyfunnel_Lite_Ajax
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Required file.
 */
require_once ABSPATH . 'wp-admin/includes/ajax-actions.php';

/**
 * Unit test cases for ajax request.
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 * @author     WPEka <hello@wpeka.com>
 */
class Test_Surveyfunnel_Lite_Ajax extends WP_Ajax_UnitTestCase {

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
	 * Dummy configuration for survey
	 *
	 * @var string $configure configure string
	 */
	public static $configure;

	/**
	 * Set up function.
	 *
	 * @param class WP_UnitTest_Factory $factory class instance.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {
		self::$post_ids  = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design    = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build     = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
		self::$configure = "{\"metaInfo\":{\"title\":\"Title\",\"description\":\"Description\"},\"companyBranding\":false}"; //phpcs:ignore Squiz.Strings.DoubleQuoteUsage.NotRequired

		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
			array(
				'design'    => '',
				'build'     => '',
				'configure' => '',
			)
		);
	}


	/**
	 * Test for surveyfunnel_lite_new_survey function
	 */
	public function test_surveyfunnel_lite_new_survey() {
		// become administrator.
		$this->_setRole( 'administrator' );

		// setup an ajax request.
		$_POST['action']   = 'surveyfunnel_lite_new_survey';
		$_POST['security'] = wp_create_nonce( 'surveySecurity' );
		$_POST['title']    = 'Demo survey';
		try {
			$this->_handleAjax( 'surveyfunnel_lite_new_survey' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$repsonse = json_decode( $this->_last_response );
		$this->assertTrue( $repsonse->success );
		$this->assertSame( 1, preg_match( '/post_id=[0-9]+#build$/', $repsonse->data->url_to_redirect ) );
	}

	/**
	 * Test for surveyfunnel_lite_save_build_data function
	 */
	public function test_surveyfunnel_lite_save_build_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']     = 'surveyfunnel_lite_save_build_data';
		$_POST['security']   = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']    = self::$post_ids[0];
		$_POST['post_title'] = 'Demo survey';
		$_POST['state']      = self::$build;
		try {
			$this->_handleAjax( 'surveyfunnel_lite_save_build_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$this->assertSame( 'Demo survey', get_the_title( self::$post_ids[0] ) );
		$survey_data = get_post_meta( self::$post_ids[0], 'surveyfunnel-lite-data', true );
		$this->assertSame( self::$build, $survey_data['build'] );
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
	}

	/**
	 * Test for surveyfunnel_lite_get_build_data function
	 */
	public function test_surveyfunnel_lite_get_build_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_get_build_data';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
			array(
				'design'    => self::$design,
				'build'     => self::$build,
				'configure' => self::$configure,
			)
		);

		try {
			$this->_handleAjax( 'surveyfunnel_lite_get_build_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		$this->assertSame( get_the_title( self::$post_ids[0] ), $response->data->post_title );
		$post_meta = get_post_meta( self::$post_ids[0], 'surveyfunnel-lite-data', true );
		$this->assertSame( $post_meta['build'], $response->data->build );
	}

	/**
	 * Test for surveyfunnel_lite_save_design_data function
	 */
	public function test_surveyfunnel_lite_save_design_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_save_design_data';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		$_POST['state']    = self::$design;
		try {
			$this->_handleAjax( 'surveyfunnel_lite_save_design_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
	}

	/**
	 * Test for surveyfunnel_lite_save_configuration_data function
	 */
	public function test_surveyfunnel_lite_save_configuration_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']        = 'surveyfunnel_lite_save_configuration_data';
		$_POST['security']      = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']       = self::$post_ids[0];
		$_POST['configuration'] = self::$configure;
		try {
			$this->_handleAjax( 'surveyfunnel_lite_save_configuration_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( $response->success );
		$post_meta = get_post_meta( self::$post_ids[0], 'surveyfunnel-lite-data', true );
		$this->assertSame( self::$configure, $post_meta['configure'] );
	}

	/**
	 * Test for surveyfunnel_lite_get_configuration_data function
	 */
	public function test_surveyfunnel_lite_get_configuration_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_get_configuration_data';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
			array(
				'design'    => self::$design,
				'build'     => self::$build,
				'configure' => self::$configure,
			)
		);
		try {
			$this->_handleAjax( 'surveyfunnel_lite_get_configuration_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		$post_meta = get_post_meta( self::$post_ids[0], 'surveyfunnel-lite-data', true );
		$this->assertSame( $post_meta['configure'], $response->data->configure );
	}

	/**
	 * Test for surveyfunnel_lite_new_survey_lead function
	 */
	public function test_surveyfunnel_lite_new_survey_lead() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']      = 'surveyfunnel_lite_new_survey_lead';
		$_POST['security']    = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']     = self::$post_ids[0];
		$_POST['userLocalID'] = 'db68b4e27c3f063e6907f2f90f5b0efe';
		$_POST['time']        = 1628141629;
		$_POST['completed']   = 0;
		$_POST['data']        = '{"question":"Which is your favorite flower? ","answer":"Daffodil","_id":"uy8m2kk2l2skrxekdtw","status":"answered","tabNumber":1,"componentName":"SingleChoice"}';

		// To insert record.
		try {
			$this->_handleAjax( 'surveyfunnel_lite_new_survey_lead' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$rows       = $wpdb->get_results(
			$wpdb->prepare(
				'
				SELECT * 
				FROM ' . $table_name . ' 
				WHERE survey_id = %d',
				self::$post_ids[0]
			)
		); // db call ok; no cache ok.
		$this->assertEquals( 1, count( $rows ) );

		// To update record.
		$_POST['data'] = '{"question":"Which is your favorite flower? ","answer":"Aster","_id":"uy8m2kk2l2skrxekdtw","status":"answered","tabNumber":1,"componentName":"SingleChoice"}';
		try {
			$this->_handleAjax( 'surveyfunnel_lite_new_survey_lead' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$this->assertTrue( true );

		// Reverting database to previous state.
		$wpdb->query(
			$wpdb->prepare(
				'
				DELETE FROM ' . $table_name . ' WHERE survey_id = %d
			',
				self::$post_ids[0]
			)
		);// db call ok; no cache ok.
	}

	/**
	 * Test for surveyfunnel_lite_get_design_data function
	 */
	public function test_surveyfunnel_lite_get_design_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_new_survey_lead';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		$attachment_id     = self::factory()->post->create( array( 'post_type' => 'attachment' ) );
		update_post_meta( self::$post_ids[0], 'surveyfunnel-lite-design-background', $attachment_id );
		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
			array(
				'design'    => self::$design,
				'build'     => self::$build,
				'configure' => self::$configure,
			)
		);
		try {
			$this->_handleAjax( 'surveyfunnel_lite_get_design_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		$this->assertSame( self::$design, $response->data->design );
		$this->assertSame( wp_get_attachment_url( $attachment_id ), $response->data->backgroundImage );
	}

	/**
	 * Test for surveyfunnel_lite_get_reports_data function
	 */
	public function test_surveyfunnel_lite_get_reports_data() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']    = 'surveyfunnel_lite_new_survey_lead';
		$_POST['security']  = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']   = self::$post_ids[0];
		$survey_id          = self::$post_ids[0];
		$_POST['startDate'] = '2021-08-05';
		$_POST['endDate']   = '2021-08-08';
		$user_id            = get_current_user_id();
		$user_locale_id     = 'db68b4e27c3f063e6907f2f90f5b0efe';
		$time               = 1628141629;
		$fields             = '{"uy8m2kk2l2skrxekdtw":{"question":"Which is your favorite flower? ","answer":"Daffodil","_id":"uy8m2kk2l2skrxekdtw","status":"answered","tabNumber":1,"componentName":"SingleChoice"}}';
		$date               = '2021-08-06';
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$wpdb->query(
			$wpdb->prepare(
				'
				INSERT INTO ' . $table_name . ' ( `survey_id`, `user_id`, `fields`, `user_locale_id`, `time_created`, `date_created`, `user_meta` )
				VALUES (%d, %d, %s, %s, %d, %s, 0)
			',
				$survey_id,
				$user_id,
				$fields,
				$user_locale_id,
				$time,
				$date
			)
		);// db call ok; no cache ok.
		try {
			$this->_handleAjax( 'surveyfunnel_lite_get_reports_data' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		$this->assertSame( $fields, $response->data[0]->fields );
		$this->assertSame( $user_locale_id, $response->data[0]->userLocaleID );
		$this->assertSame( strval( $time ), $response->data[0]->time_created );
		$this->assertSame( '0', $response->data[0]->userMeta );

		// Reverting database to previous state.
		$wpdb->query(
			$wpdb->prepare(
				'
				DELETE FROM ' . $table_name . ' WHERE survey_id = %d
			',
				self::$post_ids[0]
			)
		);// db call ok; no cache ok.
	}

	/**
	 * Test for surveyfunnel_lite_delete_survey function
	 */
	public function test_surveyfunnel_lite_delete_survey() {
		// become administrator .
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_delete_survey';
		$_POST['security'] = wp_create_nonce( 'surveySecurity' );
		$_POST['id']       = self::$post_ids[0];
		try {
			$this->_handleAjax( 'surveyfunnel_lite_delete_survey' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
	}

	/**
	 * Test for surveyfunnel_lite_get_status function
	 */
	public function test_surveyfunnel_lite_get_status() {
		// become administrator .
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_get_status';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		try {
			$this->_handleAjax( 'surveyfunnel_lite_get_status' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertFalse( (bool) $response->success );
		$this->assertSame( get_post_status( self::$post_ids[0] ), $response->data );
	}

	/**
	 * Test for surveyfunnel_lite_change_status function
	 */
	public function test_surveyfunnel_lite_change_status() {
		// become administrator.
		$this->_setRole( 'administrator' );

		$_POST['action']   = 'surveyfunnel_lite_change_status';
		$_POST['security'] = wp_create_nonce( 'surveyfunnel-lite-security' );
		$_POST['post_id']  = self::$post_ids[0];
		try {
			$this->_handleAjax( 'surveyfunnel_lite_change_status' );
		} catch ( WPAjaxDieContinueException $e ) {
			unset( $e );
		}
		$response = json_decode( $this->_last_response );
		$this->assertTrue( (bool) $response->success );
		$this->assertSame( 'draft', $response->data );
	}
}

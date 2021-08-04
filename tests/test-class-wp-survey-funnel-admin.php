<?php
/**
 * Class Test_WP_Survey_Funnel_Admin
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Test for Wp_Survey_Funnel_Admin class
 */
class Test_WP_Survey_Funnel_Admin extends WP_UnitTestCase {

	/**
	 * Wp_Survey_Funnel_Admin class instance.
	 *
	 * @access public
	 * @var string $wp_survey_funnel_admin class instance.
	 */
	public static $wp_survey_funnel_admin;

	/**
	 * Plugin name.
	 *
	 * @var string $plugin_name plugin name
	 * @access public
	 */
	public static $plugin_name;

	/**
	 * Plugin version.
	 *
	 * @var string $plugin_version plugin version
	 * @access public
	 */
	public static $plugin_version;

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
	 * Setup function for all tests.
	 *
	 * @param WP_UnitTest_Factory $factory helper for unit test functionality.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {

		if ( defined( 'WP_SURVEY_FUNNEL_VERSION' ) ) {
			self::$plugin_version = WP_SURVEY_FUNNEL_VERSION;
		} else {
			self::$plugin_version = '1.0.0';
		}
		self::$plugin_name            = 'wp-survey-funnel';
		self::$wp_survey_funnel_admin = new Wp_Survey_Funnel_Admin( self::$plugin_name, self::$plugin_version );
		self::$post_ids               = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design                 = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build                  = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
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
	 * Test for constructor function.
	 */
	public function test_construct() {
		$obj = new Wp_Survey_Funnel_Admin( self::$plugin_name, self::$plugin_version );
		$this->assertTrue( $obj instanceof Wp_Survey_Funnel_Admin );
	}

	/**
	 * Test for enqueue_styles function.
	 */
	public function test_enqueue_styles() {
		self::$wp_survey_funnel_admin->enqueue_styles();
		global $wp_styles;
		$enqueue_styles = $wp_styles->queue;
		$this->assertTrue( in_array( 'wp-survey-funnel', $enqueue_styles ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for enqueue_scripts function.
	 */
	public function test_enqueue_scripts() {
		self::$wp_survey_funnel_admin->enqueue_scripts();
		global $wp_scripts;
		$enqueue_scripts = $wp_scripts->queue;
		$this->assertTrue( in_array( 'wp-survey-funnel', $enqueue_scripts ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$data          = $wp_scripts->get_data( 'wp-survey-funnel', 'data' );
		$data          = substr( $data, strpos( $data, '{' ), strpos( $data, '}' ) - 1 );
		$data          = str_replace( ';', '', $data );
		$localize_data = json_decode( $data, true );
		$this->assertCount( 2, $localize_data );
		$this->assertArrayHasKey( 'ajaxURL', $localize_data, 'Localize array does not contains ajaURL.' );
		$this->assertArrayHasKey( 'ajaxSecurity', $localize_data, 'Localize array does not contains ajaxSecurity.' );
		$this->assertSame( $localize_data['ajaxURL'], admin_url( 'admin-ajax.php' ) );
		$this->assertSame( $localize_data['ajaxSecurity'], wp_create_nonce( 'surveySecurity' ) );
	}

	/**
	 * Test for wpsf_admin_menu function
	 */
	public function test_wpsf_admin_menu() {

		$current_user = wp_get_current_user();
		$current_user->add_cap( 'manage_options' );
		self::$wp_survey_funnel_admin->wpsf_admin_menu();
		global $menu, $submenu;
		$this->assertTrue( in_array( 'Survey Funnel', $menu[0] ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$submenu_array = wp_list_pluck( $submenu['wpsf-dashboard'], 2 );
		$this->assertTrue( in_array( 'wpsf-dashboard', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$this->assertTrue( in_array( 'wpsf-settings', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$this->assertTrue( in_array( 'wpsf-help', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for wpsf_init function
	 */
	public function test_wpsf_init() {
		unregister_post_type( 'wpsf-survey' );
		$this->assertFalse( post_type_exists( 'wpsf-survey' ) );
		self::$wp_survey_funnel_admin->wpsf_init();
		$this->assertTrue( post_type_exists( 'wpsf-survey' ) );
	}

	/**
	 * Test for wpsf_get_setup_page_url function
	 */
	public function test_wpsf_get_setup_page_url() {
		$actual_url   = self::$wp_survey_funnel_admin->wpsf_get_setup_page_url();
		$expected_url = get_admin_url() . 'index.php?page=wpsf-survey&post_id=';
		$this->assertSame( $expected_url, $actual_url );
	}

	/**
	 * Test for wpsf_get_default_save_array function
	 */
	public function test_wpsf_get_default_save_array() {
		$array = self::$wp_survey_funnel_admin->wpsf_get_default_save_array();
		$this->assertArrayHasKey( 'build', $array );
		$this->assertArrayHasKey( 'design', $array );
		$this->assertArrayHasKey( 'configure', $array );
		$this->assertArrayHasKey( 'share', $array );
		$this->assertArrayHasKey( 'reports', $array );
	}

	/**
	 * Test for wpsf_get_insights_data function
	 */
	public function test_wpsf_get_insights_data() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$wpdb->insert( //phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$table_name,
			array(
				'survey_id' => self::$post_ids[0],
			)
		);
		$args = self::$wp_survey_funnel_admin->wpsf_get_insights_data( self::$post_ids[0] );
		$this->assertCount( 3, $args );
		$this->assertTrue( is_array( $args ) );
		$this->assertArrayHasKey( 'views', $args );
		$this->assertArrayHasKey( 'contacts', $args );
		$this->assertArrayHasKey( 'completionRate', $args );
	}

	/**
	 * Test for wpsf_settings function
	 */
	public function test_wpsf_settings() {
		self::$wp_survey_funnel_admin->wpsf_settings();
		$this->assertTrue( true );
	}

	/**
	 * Test for wpsf_help function
	 */
	public function test_wpsf_help() {
		self::$wp_survey_funnel_admin->wpsf_help();
		$this->assertTrue( true );
	}

	/**
	 * Test for wpsf_dashboard function
	 */
	public function test_wpsf_dashboard() {
		$count_befor_include = count( get_included_files() );

		ob_start();
		self::$wp_survey_funnel_admin->wpsf_dashboard();
		ob_get_clean();

		$count_after_include = count( get_included_files() );
		$this->assertEquals( 1, $count_after_include - $count_befor_include, 'Failed to include admin-display-dashboard-page.php file' );
	}

}

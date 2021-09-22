<?php
/**
 * Class Test_Surveyfunnel_Lite_Admin
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Test for Surveyfunnel_Lite_Admin class
 */
class Test_Surveyfunnel_Lite_Admin extends WP_UnitTestCase {

	/**
	 * Surveyfunnel_Lite_Admin class instance.
	 *
	 * @access public
	 * @var string $surveyfunnel_lite_admin class instance.
	 */
	public static $surveyfunnel_lite_admin;

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

		if ( defined( 'SURVEYFUNNEL_LITE_VERSION' ) ) {
			self::$plugin_version = SURVEYFUNNEL_LITE_VERSION;
		} else {
			self::$plugin_version = '1.0.2';
		}
		self::$plugin_name            = 'surveyfunnel-lite';
		self::$surveyfunnel_lite_admin = new Surveyfunnel_Lite_Admin( self::$plugin_name, self::$plugin_version );
		self::$post_ids               = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design                 = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build                  = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
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
		$obj = new Surveyfunnel_Lite_Admin( self::$plugin_name, self::$plugin_version );
		$this->assertTrue( $obj instanceof Surveyfunnel_Lite_Admin );
	}

	/**
	 * Test for enqueue_styles function.
	 */
	public function test_enqueue_styles() {
		self::$surveyfunnel_lite_admin->enqueue_styles();
		global $wp_styles;
		$enqueue_styles = $wp_styles->registered;
		$this->assertArrayHasKey( 'surveyfunnel-lite', $enqueue_styles ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for enqueue_scripts function.
	 */
	public function test_enqueue_scripts() {
		self::$surveyfunnel_lite_admin->enqueue_scripts();
		global $wp_scripts;
		$enqueue_scripts = $wp_scripts->queue;
		$this->assertTrue( in_array( 'surveyfunnel-lite', $enqueue_scripts ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$data          = $wp_scripts->get_data( 'surveyfunnel-lite', 'data' );
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
	 * Test for surveyfunnel_lite_admin_menu function
	 */
	public function test_surveyfunnel_lite_admin_menu() {

		$current_user = wp_get_current_user();
		$current_user->add_cap( 'manage_options' );
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_admin_menu();
		global $menu, $submenu;
		$this->assertTrue( in_array( 'SurveyFunnel', $menu[0] ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$submenu_array = wp_list_pluck( $submenu['surveyfunnel-lite-dashboard'], 2 );
		$this->assertTrue( in_array( 'surveyfunnel-lite-dashboard', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		// $this->assertTrue( in_array( 'surveyfunnel-lite-settings', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$this->assertTrue( in_array( 'surveyfunnel-lite-help', $submenu_array ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for surveyfunnel_lite_init function
	 */
	public function test_surveyfunnel_lite_init() {
		unregister_post_type( 'wpsf-survey' );
		$this->assertFalse( post_type_exists( 'wpsf-survey' ) );
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_init();
		$this->assertTrue( post_type_exists( 'wpsf-survey' ) );
	}

	/**
	 * Test for surveyfunnel_lite_get_setup_page_url function
	 */
	public function test_surveyfunnel_lite_get_setup_page_url() {
		$actual_url   = self::$surveyfunnel_lite_admin->surveyfunnel_lite_get_setup_page_url();
		$expected_url = get_admin_url() . 'index.php?page=surveyfunnel-lite&post_id=';
		$this->assertSame( $expected_url, $actual_url );
	}

	/**
	 * Test for surveyfunnel_lite_get_default_save_array function
	 */
	public function test_surveyfunnel_lite_get_default_save_array() {
		$array = self::$surveyfunnel_lite_admin->surveyfunnel_lite_get_default_save_array();
		$this->assertArrayHasKey( 'build', $array );
		$this->assertArrayHasKey( 'design', $array );
		$this->assertArrayHasKey( 'configure', $array );
		$this->assertArrayHasKey( 'share', $array );
		$this->assertArrayHasKey( 'reports', $array );
	}

	/**
	 * Test for surveyfunnel_lite_get_insights_data function
	 */
	public function test_surveyfunnel_lite_get_insights_data() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$wpdb->insert( //phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
			$table_name,
			array(
				'survey_id' => self::$post_ids[0],
			)
		);
		$args = self::$surveyfunnel_lite_admin->surveyfunnel_lite_get_insights_data( self::$post_ids[0] );
		$this->assertCount( 3, $args );
		$this->assertTrue( is_array( $args ) );
		$this->assertArrayHasKey( 'views', $args );
		$this->assertArrayHasKey( 'contacts', $args );
		$this->assertArrayHasKey( 'completionRate', $args );
	}

	/**
	 * Test for surveyfunnel_lite_settings function
	 */
	public function test_surveyfunnel_lite_settings() {
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_settings();
		$this->assertTrue( true );
	}

	/**
	 * Test for surveyfunnel_lite_help function
	 */
	public function test_surveyfunnel_lite_help() {
		ob_start();
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_help();
		$output = ob_get_clean();
		$this->assertTrue( strpos( $output, '<div class="surveyfunnel-lite-container-main">' ) !== false );
		$this->assertTrue( strpos( $output, 'Thank‌ ‌you‌ ‌for‌ ‌choosing‌ ‌SurveyFunnel‌ ‌plugin.' ) !== false );
		$this->assertTrue( strpos( $output, 'Welcome‌ ‌to‌ ‌SurveyFunnel!‌' ) !== false );
	}

	/**
	 * Test for surveyfunnel_lite_dashboard function
	 */
	public function test_surveyfunnel_lite_dashboard() {
		$count_befor_include = count( get_included_files() );

		ob_start();
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_dashboard();
		ob_get_clean();

		$count_after_include = count( get_included_files() );
		$this->assertEquals( 1, $count_after_include - $count_befor_include, 'Failed to include admin-display-dashboard-page.php file' );
	}

	/**
	 * Test for surveyfunnel_lite_mascot_on_pages function
	 */
	public function test_surveyfunnel_lite_mascot_on_pages() {
		$this->go_to( admin_url() . 'admin.php?page=surveyfunnel-lite-dashboard' );
		ob_start();
		self::$surveyfunnel_lite_admin->surveyfunnel_lite_mascot_on_pages();
		$output = ob_get_clean();
		global $wp_scripts;
		global $wp_styles;
		$enqueue_scripts = $wp_scripts->queue;
		$enqueue_styles  = $wp_styles->registered;
		$data            = $wp_scripts->get_data( 'surveyfunnel-lite-mascot', 'data' );
		$data            = trim( str_replace( 'var mascot =', '', $data ) );
		$data            = trim( str_replace( ';', '', $data ) );
		$localize_data   = json_decode( $data, true );
		update_option( 'surveyfunnel_pro_active', true );

		$this->assertCount( 3, $localize_data );
		$this->assertArrayHasKey( 'menu_items', $localize_data );
		$this->assertArrayHasKey( 'is_pro', $localize_data );
		$this->assertArrayHasKey( 'quick_links_text', $localize_data );
		$this->assertSame( __( 'See Quick Links', 'surveyfunnel' ), $localize_data['quick_links_text'] );

		$this->assertSame( '<div id="surveyfunnel-lite-mascot-app"></div>', trim( $output ) );
		$this->assertTrue( in_array( 'surveyfunnel-lite-mascot', $enqueue_scripts ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$this->assertArrayHasKey( 'surveyfunnel-lite-mascot', $enqueue_styles ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Tests for surveyfunnel_lite_register_gutenberg_blocks function
	 */
	public function test_surveyfunnel_lite_register_gutenberg_blocks() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$this->assertArrayHasKey( 'surveyfunnel/single-survey', $registered_blocks, 'Failed to register single survey gutenberg block' );
	}

	/**
	 * Tests for surveyfunnel_lite_gutenberg_display_single_survey function
	 */
	public function test_surveyfunnel_lite_gutenberg_display_single_survey() {
		$attributes         = array(
			'id'     => self::$post_ids[0],
			'type'   => 'aligncenter',
			'width'  => '400px',
			'height' => '400px',
		);
		$single_survey_html = self::$surveyfunnel_lite_admin->surveyfunnel_lite_gutenberg_display_single_survey( $attributes );
		$this->assertTrue( is_string( $single_survey_html ) );

	}

	/**
	 * Test for surveyfunnel_lite_gutenberg_block_categories function
	 */
	public function test_surveyfunnel_lite_gutenberg_block_categories() {

		$returned_categories = self::$surveyfunnel_lite_admin->surveyfunnel_lite_gutenberg_block_categories( array() );
		$this->assertTrue( is_array( $returned_categories ) );
		$surveyfunnelcategory = $returned_categories[0];
		$this->assertSame( 'SurveyFunnel', $surveyfunnelcategory['title'] );
	}


}

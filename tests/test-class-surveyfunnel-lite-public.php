<?php
/**
 * Class Test_Surveyfunnel_Lite_Public
 *
 * @package Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/Tests
 */

/**
 * Test for Surveyfunnel_Lite_Public class
 */
class Test_Surveyfunnel_Lite_Public extends WP_UnitTestCase {

	/**
	 * Surveyfunnel_Lite_Public class instance.
	 *
	 * @access public
	 * @var string $surveyfunnel_lite_public class instance.
	 */
	public static $surveyfunnel_lite_public;

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
	 * Dummy configure for survey
	 *
	 * @var string $configure configure string
	 */
	public static $configure;

	/**
	 * Setup function for all tests.
	 *
	 * @param WP_UnitTest_Factory $factory helper for unit test functionality.
	 */
	public static function wpSetUpBeforeClass( WP_UnitTest_Factory $factory ) {

		$version = '';
		if ( defined( 'SURVEYFUNNEL_LITE_VERSION' ) ) {
			self::$plugin_version = SURVEYFUNNEL_LITE_VERSION;
		} else {
			self::$plugin_version = '1.0.2';
		}
		self::$plugin_name             = 'surveyfunnel-lite';
		self::$surveyfunnel_lite_public = new Surveyfunnel_Lite_Public( self::$plugin_name, self::$plugin_version );
		self::$post_ids                = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design                  = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build                   = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
		self::$configure               = '{\"metaInfo\":{\"title\":\"Title\",\"description\":\"Description\"},\"companyBranding\":false}';
		update_post_meta(
			self::$post_ids[0],
			'surveyfunnel-lite-data',
			array(
				'design'    => self::$design,
				'build'     => self::$build,
				'configure' => self::$configure,
			)
		);
	}

	/**
	 * Test for constructor function.
	 */
	public function test_construct() {
		$obj = new Surveyfunnel_Lite_Public( self::$plugin_name, self::$plugin_version );
		$this->assertTrue( $obj instanceof Surveyfunnel_Lite_Public );
	}

	/**
	 * Test for enqueue_styles function.
	 */
	public function test_enqueue_styles() {
		self::$surveyfunnel_lite_public->enqueue_styles();
		global $wp_styles;
		$enqueue_styles = $wp_styles->registered;
		$this->assertArrayHasKey( 'surveyfunnel-lite-public', $enqueue_styles ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for enqueue_scripts function.
	 */
	public function test_enqueue_scripts() {
		self::$surveyfunnel_lite_public->enqueue_scripts();
		global $wp_scripts;
		$enqueue_scripts = $wp_scripts->queue;
		$this->assertTrue( in_array( 'surveyfunnel-lite', $enqueue_scripts ) );  //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$registered_scripts = $wp_scripts->registered;
		$this->assertArrayHasKey( 'surveyfunnel-lite', $registered_scripts );
	}

	/**
	 * Test for surveyfunnel_lite_public_init function.
	 */
	public function test_surveyfunnel_lite_public_init() {
		remove_shortcode( 'surveyfunnel_lite_survey' );
		$this->assertFalse( shortcode_exists( 'surveyfunnel_lite_survey' ) );
		self::$surveyfunnel_lite_public->surveyfunnel_lite_public_init();
		$this->assertTrue( shortcode_exists( 'surveyfunnel_lite_survey' ) );
	}

	/**
	 * Test for surveyfunnel_lite_survey_shortcode_render function
	 */
	public function test_surveyfunnel_lite_survey_shortcode_render() {
		$atts   = array(
			'id' => self::$post_ids[0],
		);
		$output = self::$surveyfunnel_lite_public->surveyfunnel_lite_survey_shortcode_render( $atts );
		$this->assertEquals( 1, preg_match( '/id="surveyfunnel-lite-survey-[0-9a-z]{32}"/', $output ) );
	}
}

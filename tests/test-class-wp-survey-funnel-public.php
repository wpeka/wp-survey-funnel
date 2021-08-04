<?php
/**
 * Class Test_WP_Survey_Funnel_Public
 *
 * @package Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/Tests
 */

/**
 * Test for Wp_Survey_Funnel_Public class
 */
class Test_WP_Survey_Funnel_Public extends WP_UnitTestCase {

	/**
	 * Wp_Survey_Funnel_Public class instance.
	 *
	 * @access public
	 * @var string $wp_survey_funnel_public class instance.
	 */
	public static $wp_survey_funnel_public;

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

		$version = '';
		if ( defined( 'WP_SURVEY_FUNNEL_VERSION' ) ) {
			$version = WP_SURVEY_FUNNEL_VERSION;
		} else {
			$version = '1.0.0';
		}
		$plugin_name                   = 'wp-survey-funnel';
		self::$wp_survey_funnel_public = new Wp_Survey_Funnel_Public( $plugin_name, $version );
		self::$post_ids                = $factory->post->create_many( 2, array( 'post_type' => 'wpsf-survey' ) );
		self::$design                  = '{\'opacity\':1,\'fontFamily\':null,\'fontFamilyValue\':\'\',\'backgroundColor\':{\'r\':255,\'g\':255,\'b\':255\'a\':1},\'buttonColor\':{r\':0,\'g\':222,\'b\':129,a\':1},\'buttonTextColor\':{\'r\':\'255\',\'g\':\'255\',\'b\':\'255\',\'a\':\'1\'},\'answersHighlightBoxColor\':{\'r\':\'232\',\'g\':\'238\',\'b\':\'244\',\'a\':\'1\'}}';
		self::$build                   = '{"List":{"START_ELEMENTS":[{"button":"Start","title":"This is a cover page","description":"Cover page","id":"zh727zy9m7krvwz09k","componentName":"CoverPage","type":"START_ELEMENTS","currentlySaved":true}],"CONTENT_ELEMENTS":[{"title":"What is your age?","description":"Tell us about yourself","answers":[{"name":"20","checked":false},{"name":"10","checked":false},{"name":"40","checked":false},{"name":"60","checked":false}],"value":"","id":"0y566hzo1ewckrvwzvc8","componentName":"SingleChoice","type":"CONTENT_ELEMENTS","currentlySaved":true}],"RESULT_ELEMENTS":[{"title":"Thanks","description":"Thanks for participation","id":"cd98dnfel8krvx0db2","componentName":"ResultScreen","type":"RESULT_ELEMENTS","currentlySaved":true}]},"title":"Demo survey"}';
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
	 * Test for enqueue_styles function.
	 */
	public function test_enqueue_styles() {
		self::$wp_survey_funnel_public->enqueue_styles();
		global $wp_styles;
		$enqueue_styles = $wp_styles->queue;
		$this->assertTrue( in_array( 'wp-survey-funnel-public', $enqueue_styles ) ); //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
	}

	/**
	 * Test for enqueue_scripts function.
	 */
	public function test_enqueue_scripts() {
		self::$wp_survey_funnel_public->enqueue_scripts();
		global $wp_scripts;
		$enqueue_scripts = $wp_scripts->queue;
		$this->assertTrue( in_array( 'wp-survey-funnel', $enqueue_scripts ) );  //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
		$registered_scripts = $wp_scripts->registered;
		$this->assertArrayHasKey( 'wp-survey-funnel', $registered_scripts );
	}

	/**
	 * Test for wpsf_public_init function.
	 */
	public function test_wpsf_public_init() {
		remove_shortcode( 'wpsf_survey' );
		$this->assertFalse( shortcode_exists( 'wpsf_survey' ) );
		self::$wp_survey_funnel_public->wpsf_public_init();
		$this->assertTrue( shortcode_exists( 'wpsf_survey' ) );
	}

	/**
	 * Test for wpsf_survey_shortcode_render function
	 */
	public function test_wpsf_survey_shortcode_render() {
		$atts   = array(
			'id' => self::$post_ids[0],
		);
		$output = self::$wp_survey_funnel_public->wpsf_survey_shortcode_render( $atts );
		$this->assertEquals( 1, preg_match( '/id="wpsf-survey-[0-9a-z]{32}"/', $output ) );
	}
}
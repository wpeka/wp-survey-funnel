<?php
/**
 * The file that defines rest api functionality
 *
 * A class definition that includes attributes and functions used for rest api functionality.
 *
 * @link       https://club.wpeka.com
 * @since      1.0.0
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/includes
 */

/**
 * The api plugin class.
 *
 * This is used to define hooks for rest api.
 *
 * @since      1.0.0
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/includes
 * @author     WPEka Club <support@wpeka.com>
 */
class Surveyfunnel_Lite_Rest_Api {

	/**
	 * Registers rest api routes.
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	public static function init() {

		if ( ! function_exists( 'register_rest_route' ) ) {
			return false;
		}
		register_rest_route(
			'surveyfunnel/v2',
			'fsd',
			array(
				'methods'  => 'GET',
                'permission_callback' => '__return_true',
				'callback' => array( 'Surveyfunnel_Lite_Rest_Api', 'fetch_survey_details' ),
			)
		);
	}

	/**
	 * Rest api callback function which returns scanned cookies.
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request Request data.
	 *
	 * @return mixed|WP_REST_Response
	 * @phpcs:disable
	 */
	public static function fetch_survey_details() {

		$args = [
                'post_type' => 'wpsf-survey',
                'posts_per_page' => -1
                ];
        $posts =get_posts( $args );
        return $posts;
    }
}

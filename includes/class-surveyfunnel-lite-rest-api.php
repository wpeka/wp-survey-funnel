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
class Surveyfunnel_Lite_Rest_Api
{

	/**
	 * Registers rest api routes.
	 *
	 * @since 1.0.0
	 * @return bool
	 */
	public static function init()
	{

		if (!function_exists('register_rest_route')) {
			return false;
		}
		register_rest_route(
			'surveyfunnel/v2',
			'fsd',
			array(
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => array('Surveyfunnel_Lite_Rest_Api', 'fetch_survey_details'),
		)
		);
		register_rest_route(
			'surveyfunnel/v2',
			'responses',
			array(
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => array('Surveyfunnel_Lite_Rest_Api', 'fetch_responses_details'),
		)
		);
		register_rest_route(
			'surveyfunnel/v2',
			'responses/(?P<slug>[0-9-]+)',
			array(
			'methods' => 'GET',
			'permission_callback' => '__return_true',
			'callback' => array('Surveyfunnel_Lite_Rest_Api', 'fetch_responses_with_surveyid'),
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
	public static function fetch_survey_details()
	{

		$args = [
			'post_type' => 'wpsf-survey',
			'posts_per_page' => -1
		];
		$ans = array();
		$posts = get_posts($args);
		$arr=array();
		foreach ($posts as $post) {
			$a=self::json_change_key($post,'ID','id');
			array_push($arr,$a);
		}
		return $arr;
	}
	public static function fetch_responses_details()
	{
		global $wpdb;
		$query = "SELECT * FROM `wp_srf_entries`";
		$data = $wpdb->get_results($query);
		$arr=array();
		foreach ($data as $d) {
			$a=self::json_change_key($d,'ID','id');
			$a->fields=json_decode($a->fields);
			array_push($arr,$a);
		}
		return $arr;
	}
	public static function fetch_responses_with_surveyid($slug){
		$responses=self::fetch_responses_details();
		$ans=array();
		foreach($responses as $response){
			if($response->survey_id==$slug['slug']){
				array_push($ans,$response);
			}
		}
		return $ans;
	}
	public function json_change_key($arr, $oldkey, $newkey) {
		$json = str_replace('"'.$oldkey.'":', '"'.$newkey.'":', json_encode($arr));
		return json_decode($json);	
	}
}

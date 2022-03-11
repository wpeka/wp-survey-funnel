<?php //phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * The file that defines rest api functionality
 *
 * A class definition that includes attributes and functions used for rest api functionality.
 *
 * @link       https://club.wpeka.com
 * @since      1.0.0
 *
 * @package    Wpl_Cookies
 * @subpackage Wpl_Cookies/includes
 */

/**
 * Zapier Integration.
 *
 * This is used to define hooks for rest api.
 *
 * @since      1.0.0
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/includes
 * @author     wpeka <support@wpeka.com>
 */
class Class_Zapier {

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
			'sfzapier/v2',
			'/get_survey_details',
			array(
				'methods'  => 'GET',
				'callback' => array( 'Class_Zapier', 'get_survey_details' ),
			)
		);
		register_rest_route(
			'sfzapier/v2',
			'/get_category_details',
			array(
				'methods'  => 'GET',
				'callback' => array( 'Class_Zapier', 'get_category_details' ),
			)
		);
		register_rest_route(
			'wplcookies/v2',
			'/check_api_version',
			array(
				'methods'  => 'GET',
				'callback' => array( 'Class_Zapier', 'check_api_version' ),
			)
		);
		register_rest_route(
			'wplcookies/v2',
			'/get_post_cookie_details',
			array(
				'methods'  => 'GET',
				'callback' => array( 'Class_Zapier', 'get_post_cookie_details' ),
			)
		);
		register_rest_route(
			'wplcookies/v2',
			'/post_cookie_details',
			array(
				'methods'  => 'POST',
				'callback' => array( 'Class_Zapier', 'post_cookie_details' ),
			)
		);
	}

	/**
	 * Rest api callback function which returns list of surveys.
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request Request data.
	 *
	 * @return mixed|WP_REST_Response
     * @phpcs:disable
     */
    public static function get_survey_details( WP_REST_Request $request ) {
        $urls     = stripslashes( $request['urls'] );
        $hash     = stripslashes( $request['hash'] );

        global $wpdb;
        $table = $wpdb->prefix . 'wpl_scan_status';
        $sql   = "INSERT IGNORE INTO `$table` (`hash`) VALUES ('$hash')";
        $result = $wpdb->query( $sql );
        $config = array(
            'urls'         => json_decode( $urls ),
            'response_url' => 'https://api.wpeka.com/wp-json/wplcookies/v2/post_cookie_details',
            'hash'         => $hash,
        );
        $config = json_encode( $config );

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, 'http://apitest.wpeka.com:3000/scan' );
        curl_setopt( $ch, CURLOPT_POST, 1 );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $config );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array( 'Content-Type:application/json' ) );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

        $out = curl_exec( $ch );
        if ( curl_error( $ch ) ) {
            $out = false;
        }
        curl_close( $ch );
        return rest_ensure_response( $out );
    }

    /**
     * Rest api callback function which returns categories.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request Request data.
     *
     * @return mixed|WP_REST_Response
     * @phpcs:enable
	 */
	public static function get_category_details( WP_REST_Request $request ) {
		$wpl_cookies = new Wpl_Cookies();
		return rest_ensure_response( $wpl_cookies->wpl_get_category_details() );
	}

	/**
	 * Rest api callback function to check version compatability.
	 *
	 * @since 1.0.1
	 * @param WP_REST_Request $request Request data.
	 *
	 * @return mixed|WP_Error|WP_REST_Response
	 */
	public static function check_api_version( WP_REST_Request $request ) {
		$ver      = stripslashes( $request['ver'] );
		$site_url = '';
		if ( isset( $request['site_url'] ) ) {
			$site_url = stripslashes( $request['site_url'] );
		}
		if ( $ver < WPL_API_REQUIRED_VERSION ) {
			return new WP_Error( 'wpl_cookies_version', __( 'Upgrade to required version', 'wpl-cookies' ), array( 'status' => 404 ) );
		} else {
			if ( ! empty( $site_url ) ) {
				$mp = Mixpanel::getInstance( '47cb2e724d27b304c815399afaab2967' );

				// Track an event.
				$mp->track(
					'scanning',
					array(
						'label'   => 'Scanning Cookies',
						'siteurl' => $site_url,
					)
				);
			}
			return rest_ensure_response( 'Server available' );
		}
	}

	/**
	 * Rest api call to scan cookies.
	 *
	 * @param WP_REST_Request $request Request data.
	 *
	 * @since 1.0.3
	 *
	 * @return mixed|WP_REST_Response
     * @phpcs:disable
     */
    public static function post_cookie_details( WP_REST_Request $request ) {
        $data    = json_decode( $request->get_body() );
        $cookies = array();
        if ( isset( $data->cookies ) ) {
            $cookies = $data->cookies;
            foreach ( $cookies as $cookie ) {
                $cookie->value = '';
            }
            $cookies = json_encode( $cookies );
        }
        $hash = $data->hash;
        global $wpdb;
        $table = $wpdb->prefix . 'wpl_scan_status';
        $sql   = "UPDATE `$table` SET `status`=1, `cookies`='$cookies' WHERE `hash`='$hash'";
        $wpdb->query( $sql );
        $response = array(
            'success' => 'success',
        );
        return rest_ensure_response( $response );
    }

    /**
     * Rest api to get scanned cookies.
     *
     * @param WP_REST_Request $request Request data.
     *
     * @since 1.0.3
     *
     * @return mixed|WP_Error|WP_REST_Response
     */
    public static function get_post_cookie_details( WP_REST_Request $request ) {
        $hash = stripslashes( $request['hash'] );
        global $wpdb;
        $table  = $wpdb->prefix . 'wpl_scan_status';
        $sql    = "SELECT `cookies`, `status` FROM `$table` WHERE `hash`='$hash' AND `status`='1' ORDER BY id_wpl_scan_status DESC LIMIT 1";
        $result = $wpdb->get_row( $sql, ARRAY_A );
        if($result) {
            $cookies_data = array();
            $data   = $result['cookies'];
            if ( $data ) {
                $cookies_data = self::get_cookies_data( $data );
                $sql          = "DELETE FROM `$table` WHERE `hash`='$hash' AND `status`='1'";
                $wpdb->query( $sql );
            }
            $cookies_data = json_encode( $cookies_data );
            return rest_ensure_response( $cookies_data );
        }
        return new WP_Error( 'wpl_scan_status', __( 'scanning cookies', 'wpl-cookies' ), array( 'status' => 404 ) );
    }

    /**
     * Return formatted cookies to be sent in response.
     *
     * @since 1.0.3
     * @param Array $json_data Cookies data.
     *
     * @return array
     * @phpcs:enable
	 */
	public static function get_cookies_data( $json_data ) {
		$json_data     = json_decode( $json_data );
		$c_data        = array();
		$cookies_data  = array();
		$policies_data = array();
		if ( isset( $json_data ) && ! empty( $json_data ) ) {
			$cookies_array = $json_data;
			foreach ( $cookies_array as $data ) {
				$num_days = round( abs( time() - $data->expires ) / 60 / 60 / 24 );
				if ( $num_days < 1 ) {
					$num_days = 'Session';
				} elseif ( 1 === $num_days ) {
					$num_days .= ' day';
				} elseif ( $num_days < 365 ) {
					if ( $num_days >= 30 ) {
						$num_days = round( $num_days / 30 );
						if ( $num_days > 1 ) {
							$num_days .= ' months';
						} else {
							$num_days .= ' month';
						}
					} else {
						$num_days .= ' days';
					}
				} elseif ( $num_days >= 365 ) {
					$num_days = round( $num_days / 365 );
					if ( $num_days > 1 ) {
						$num_days .= ' years';
					} else {
						$num_days .= ' year';
					}
				}
				// Code to add policy data to the existing cookies data.
				$p_data = array();
				$domain = $data->domain;
				if ( '.' === substr( $domain, 0, 1 ) ) {
					$domain = substr_replace( $domain, '', 0, 1 );
				}
				$policy_post = get_posts(
					array(
						'post_type'   => WPL_POST_POLICY_TYPE,
						'post_status' => 'publish',
						's'           => $domain,
						'numberposts' => -1,
						'order'       => 'ASC',
					)
				);
				if ( ! empty( $policy_post ) ) {
					$post               = $policy_post[0];
					$p_data['links']    = $post->post_content;
					$custom_policy_data = get_post_custom( $post->ID );
					$p_data['company']  = $custom_policy_data['_wpl_policies_company'][0];
					$p_data['purpose']  = $custom_policy_data['_wpl_policies_purpose'][0];
				}
				$policies_data[ $domain ] = $p_data;
				// end of code.
				$cookie_data = array(
					'name'          => $data->name,
					'value'         => $data->value,
					'domain'        => $data->domain,
					'path'          => $data->path,
					'expires'       => $data->expires,
					'size'          => $data->size,
                    'httpOnly'      => $data->httpOnly, // phpcs:ignore
					'secure'        => $data->secure,
					'session'       => $data->session,
					'description'   => '',
					'category'      => 'Unclassified',
					'category_desc' => 'Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.',
					'category_slug' => 'unclassified',
					'type'          => '',
					'duration'      => $num_days,
				);
				if ( '.' === substr( $data->domain, 0, 1 ) ) {
					$cookie_data['domain'] = substr_replace( $data->domain, '', 0, 1 );
				}

				$args = array(
					'post_type'   => WPL_POST_TYPE,
					'post_status' => 'publish',
					'numberposts' => 1,
					'meta_query'  => array( // phpcs:ignore slow query
						'relation' => 'AND',
						array(
							'key'     => '_wpl_cookies_slugid',
							'value'   => $data->name,
							'compare' => '=',
						),
						array(
							'key'     => '_wpl_cookies_domain',
							'value'   => $cookie_data['domain'],
							'compare' => '=',
						),
					),
					'orderby'     => 'ID',
					'order'       => 'ASC',
				);

				$cookie_post = get_posts( $args );

				if ( empty( $cookie_post ) ) {
					// check if cookie exists by slug.
					$args['meta_query'] = array( // phpcs:ignore slow query
						array(
							'key'     => '_wpl_cookies_slugid',
							'value'   => $data->name,
							'compare' => '=',
						),
					);
					$cookie_post        = get_posts( $args );
					if ( empty( $cookie_post ) ) {
						// insert new record.
						$cookie_post_data = array(
							'post_type'    => WPL_POST_TYPE,
							'post_title'   => $data->name,
							'post_content' => '',
							'post_status'  => 'draft',
						);
						$cookies_post_id  = wp_insert_post( $cookie_post_data );
						if ( $cookies_post_id ) {
							update_post_meta( $cookies_post_id, '_wpl_cookies_duration', $cookie_data['duration'] );
							update_post_meta( $cookies_post_id, '_wpl_cookies_slugid', $cookie_data['name'] );
							update_post_meta( $cookies_post_id, '_wpl_cookies_domain', $cookie_data['domain'] );
						}
					} else {
						// fetch and update existing record for domain.
						$cookie_post                  = $cookie_post[0];
						$custom                       = get_post_custom( $cookie_post->ID );
						$term_list                    = wp_get_post_terms( $cookie_post->ID, 'wplcookies-category' );
						$cookie_data['description']   = $cookie_post->post_content;
						$cookie_data['category']      = $term_list[0]->name;
						$cookie_data['category_slug'] = $term_list[0]->slug;
						$cookie_data['category_desc'] = $term_list[0]->description;
						$cookie_data['type']          = $custom['_wpl_cookies_type'][0];
						$cookie_data['duration']      = $custom['_wpl_cookies_duration'][0];
						update_post_meta( $cookie_post->ID, '_wpl_cookies_domain', $cookie_data['domain'] );
					}
				} else {
					// fetch.
					$cookie_post                  = $cookie_post[0];
					$custom                       = get_post_custom( $cookie_post->ID );
					$term_list                    = wp_get_post_terms( $cookie_post->ID, 'wplcookies-category' );
					$cookie_data['description']   = $cookie_post->post_content;
					$cookie_data['category']      = $term_list[0]->name;
					$cookie_data['category_slug'] = $term_list[0]->slug;
					$cookie_data['category_desc'] = $term_list[0]->description;
					$cookie_data['type']          = $custom['_wpl_cookies_type'][0];
					$cookie_data['duration']      = $custom['_wpl_cookies_duration'][0];
					$cookie_data['domain']        = $custom['_wpl_cookies_domain'][0];
				}

				$cookies_data[] = $cookie_data;
			}
		}
		$c_data['cookies']  = $cookies_data;
		$c_data['policies'] = $policies_data;
		return $c_data;
	}
}

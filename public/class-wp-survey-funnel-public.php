<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link  https://club.wpeka.com
 * @since 1.0.0
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/public
 * @author     WPEka Club <support@wpeka.com>
 */
class Wp_Survey_Funnel_Public {


	/**
	 * The ID of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $plugin_name       The name of the plugin.
	 * @param string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {

		wp_register_style(
			$this->plugin_name . '-public',
			plugin_dir_url( __FILE__ ) . 'css/wp-survey-funnel-public.css',
			array(),
			$this->version,
			'all'
		);
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'js/wp-survey-funnel-public.js',
			array( 'jquery' ),
			$this->version,
			false
		);

		wp_register_script(
			$this->plugin_name . '-survey',
			WP_SURVEY_FUNNEL_PLUGIN_URL . 'dist/survey.bundle.js',
			array(),
			time(),
			false
		);
	}

	/**
	 * Public init of wpsf.
	 */
	public function wpsf_public_init() {
		add_shortcode( 'wpsf_survey', array( $this, 'wpsf_survey_shortcode_render' ) );
	}

	/**
	 * Display survey at the frontend.
	 */
	public function wpsf_survey_shortcode_render( $atts ) {
		$atts = shortcode_atts(
			array(
				'id'   => 0,
				'type' => 'responsive',
			),
			$atts
		);

		return $this->wpsf_display_survey( $atts );
	}

	/**
	 * Display function of survey.
	 */
	public function wpsf_display_survey( $atts ) {
		if ( intval( $atts['id'] ) === 0 ) {
			return '';
		}
		if ( get_post_status( $atts['id'] ) !== 'publish' ) {
			return '';
		}
		$meta_data = get_post_meta( $atts['id'], 'wpsf-survey-data', true );
		$ip        = $_SERVER['REMOTE_ADDR'];//phpcs:ignore
		$m_time    = time() * 1000000;

		$unique_id = md5( $ip . $m_time . wp_rand( 0, time() ) );
		$time      = time();
		$data      = array(
			'build'           => $meta_data['build'],
			'design'          => $meta_data['design'],
			'configure'       => $meta_data['configure'],
			'ajaxURL'         => admin_url( 'admin-ajax.php' ),
			'ajaxSecurity'    => wp_create_nonce( 'wpsf-security' ),
			'post_id'         => $atts['id'],
			'time'            => $time,
			'userLocalID'     => $unique_id,
			'styleSurveyLink' => WP_SURVEY_FUNNEL_PLUGIN_URL . 'dist/survey.css',
			'type'            => $atts['type'],
		);

		$design_image_id = get_post_meta( $atts['id'], 'wpsf-survey-design-background', true );
		if ( $design_image_id ) {
			$data['designImageUrl'] = wp_get_attachment_url( $design_image_id );
		} else {
			$data['designImageUrl'] = null;
		}
		wp_enqueue_style( $this->plugin_name . '-public' );
		wp_enqueue_script( $this->plugin_name . '-survey' );
		wp_localize_script( $this->plugin_name . '-survey', 'data', $data );
		return '<div id="wpsf-survey-' . $unique_id . '" style="width: 100%; height: 100%;"></div>';
	}

	/**
	 * Ajax when new survey lead is generated in front end
	 */
	public function wpsf_new_survey_lead() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$survey_id      = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$user_locale_id = isset( $_POST['userLocalID'] ) ? sanitize_text_field( wp_unslash( $_POST['userLocalID'] ) ) : 0;
		$time           = isset( $_POST['time'] ) ? intval( $_POST['time'] ) : 0;
		$tab_count      = isset( $_POST['completed'] ) ? intval( $_POST['completed'] ) : 0;
		$user_id        = get_current_user_id();

		$fields = $this->wpsf_sanitize_survey_lead( $_POST['data'] );//phpcs:ignore
		// $fields = wp_json_encode( array( $fields->_id => $fields ) );
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		// get field value from database if exist.
		$rows = $wpdb->get_results(
			$wpdb->prepare(
				'
				SELECT * 
				FROM ' . $table_name . '
				WHERE user_locale_id = %s AND time_created = %d
			',
				$user_locale_id,
				$time
			)
		);
		$flag = false;

		if ( is_array( $rows ) && count( $rows ) ) {
			$data          = json_decode( $rows[0]->fields );
			$id            = $fields->_id;
			$data->$id     = $fields;
			$current_count = count( (array) $data );

			if ( $current_count !== $tab_count ) {
				$completed = 0;
			} else {
				$completed = 1;
			}

			$fields = wp_json_encode( $data );
			$flag   = true;
		}
		if ( $flag ) {
			$rows = $wpdb->query(
				$wpdb->prepare(
					'
					UPDATE ' . $table_name . ' SET `fields` = %s, `user_meta` = %s
					WHERE user_locale_id = %s AND time_created = %d
				',
					$fields,
					$completed,
					$user_locale_id,
					$time
				)
			);

			if ( ! $rows ) {
				wp_send_json_error();
				wp_die();
			}
		} else {
			$fields = wp_json_encode( array( $fields->_id => $fields ) );
			$date   = gmdate( 'Y-m-d' );
			$rows   = $wpdb->query(
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
			);

			if ( ! $rows ) {
				wp_send_json_error();
				wp_die();
			}
		}

		wp_send_json_success();
		wp_die();
	}

	/**
	 * Sanitize survey leads.
	 *
	 * @param string $data json data.
	 */
	public function wpsf_sanitize_survey_lead( $data ) {
		$data = json_decode( stripslashes( $data ) );
		foreach ( $data as $key => $value ) {
			switch ( $key ) {
				case '_id':
				case 'status':
				case 'question':
					$value = sanitize_text_field( wp_unslash( $value ) );
					break;
				case 'answer':
					if ( is_array( $value ) ) {
						foreach ( $value as $row ) {
							$row = sanitize_text_field( wp_unslash( $row->name ) );
						}
					} else {
						$value = sanitize_text_field( wp_unslash( $value ) );
					}
				default:
					break;
			}
		}
		return $data;
	}
}

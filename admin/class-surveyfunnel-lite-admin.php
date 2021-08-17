<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link  https://club.wpeka.com
 * @since 1.0.0
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite/admin
 * @author     WPEka Club <support@wpeka.com>
 */
class Surveyfunnel_Lite_Admin {

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
	 * @param string $plugin_name       The name of this plugin.
	 * @param string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {

		wp_register_style(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'css/surveyfunnel-lite-admin.css',
			array(),
			time(),
			'all'
		);

		wp_register_style(
			$this->plugin_name . '-mascot',
			plugin_dir_url( __FILE__ ) . 'css/surveyfunnel-lite-mascot.css',
			array(),
			time(),
			'all'
		);

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'js/surveyfunnel-lite-admin.js',
			array( 'jquery' ),
			$this->version,
			false
		);

		wp_localize_script(
			$this->plugin_name,
			'ajax',
			array(
				'ajaxURL'      => admin_url( 'admin-ajax.php' ),
				'ajaxSecurity' => wp_create_nonce( 'surveySecurity' ),
			)
		);

		wp_register_script(
			$this->plugin_name . '-vue',
			plugin_dir_url( __FILE__ ) . 'js/vue/vue.min.js',
			array(),
			$this->version,
			false
		);

		wp_register_script(
			$this->plugin_name . '-mascot',
			plugin_dir_url( __FILE__ ) . 'js/surveyfunnel-lite-mascot.js',
			array( $this->plugin_name . '-vue' ),
			$this->version,
			false
		);
	}

	/**
	 * Register Survey Funnel Admin Menu.
	 *
	 * @since 1.0.0
	 */
	public function wpsf_admin_menu() {

		// dashboard page is nothing but react one page app to build surveys.
		add_dashboard_page( '', '', 'manage_options', 'wpsf-survey', '' );

		add_menu_page(
			__( 'Survey Funnel', 'surveyfunnel' ),
			__( 'Survey Funnel', 'surveyfunnel' ),
			'manage_options',
			'wpsf-dashboard',
			'',
			SURVEYFUNNEL_LITE_PLUGIN_URL . 'images/SF-logo.png'
		);

		// Dashboard.
		add_submenu_page(
			'wpsf-dashboard',
			__( 'Dashboard', 'surveyfunnel' ),
			__( 'Dashboard', 'surveyfunnel' ),
			'manage_options',
			'wpsf-dashboard',
			array( $this, 'wpsf_dashboard' )
		);

		// Settings.
		/*
		 add_submenu_page(
			'wpsf-dashboard',
			__( 'Settings', 'surveyfunnel' ),
			__( 'Settings', 'surveyfunnel' ),
			'manage_options',
			'wpsf-settings',
			array( $this, 'wpsf_settings' )
		); */

		// Help.
		add_submenu_page(
			'wpsf-dashboard',
			__( 'Help', 'surveyfunnel' ),
			__( 'Help', 'surveyfunnel' ),
			'manage_options',
			'wpsf-help',
			array( $this, 'wpsf_help' )
		);
	}

	/**
	 * Settings submenu page callback.
	 *
	 * @since 1.0.0
	 */
	public function wpsf_settings() {
		echo '';
	}

	/**
	 * Help submenu page callback.
	 *
	 * @since 1.0.0
	 */
	public function wpsf_help() {
		wp_enqueue_style( $this->plugin_name );
		?>	
			<div class="wpsf-container-main">
				<div class="wpsf-header">
					<div class="wpsf-logo">
						<img width="350" src="<?php echo SURVEYFUNNEL_LITE_PLUGIN_URL . 'images/wpsf-main-logo.png';//phpcs:ignore ?>" alt="wpsf-main-logo">
					</div>
				</div>
				<div class="wpsf-inner-container">
				<div class="wpsf-section">
					<div class="wpsf-section-heading">
						<div class="wpsf-section-title">
							<p>Welcome‌ ‌to‌ ‌SurveyFunnel!‌</p>
						</div>
						<div class="wpsf-section-subtitle">
							<p>Complete Survey Management Plugin.</p>
						</div>
					</div>
					<div class="wpsf-section-content">
						<p>Thank‌ ‌you‌ ‌for‌ ‌choosing‌ ‌SurveyFunnel‌ ‌plugin.‌ ‌SurveyFunnel‌ ‌lets‌ ‌you‌ ‌create‌ ‌interesting‌ ‌surveys‌ ‌to‌ ‌keep‌ ‌your‌ ‌audience‌ ‌engaged,‌ ‌and‌ ‌collect‌ ‌qualified‌ ‌leads.‌ ‌With‌ ‌drag‌ ‌and‌ ‌drop‌ ‌features‌ ‌you‌ ‌can‌ ‌create‌ ‌a‌ ‌survey‌ ‌in‌ ‌minutes‌ ‌and‌ ‌get‌ ‌better‌ ‌insights‌ ‌about‌ ‌your‌ ‌audience.‌</p>
					</div>
				</div>
				<div class="wpsf-section">
					<a class="wpsf-button" href="<?php echo admin_url() . 'admin.php?page=wpsf-dashboard';//phpcs:ignore ?>">Create Your First Survey</a>
				</div>
				</div>
			</div>
		<?php
	}

	/**
	 * Dashboard submenu page callback.
	 *
	 * @since 1.0.0
	 */
	public function wpsf_dashboard() {
		wp_enqueue_style( $this->plugin_name );
		include_once plugin_dir_path( __FILE__ ) . 'views/admin-display-dashboard-page.php';
	}

	/**
	 * Initialize wpsf functionalities.
	 *
	 * @since 1.0.0
	 */
	public function wpsf_init() {
		// no labels required.
		$labels = array();

		// register hidden post type 'wpsf-survey'.
		$args = array(
			'label'               => __( 'wpsf-survey', 'surveyfunnel' ),
			'description'         => __( 'wpsf-survey custom post type to generate surveys', 'surveyfunnel' ),
			'labels'              => $labels,
			'supports'            => array( 'title' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => false,
			'show_in_menu'        => false,
			'menu_position'       => 5,
			'show_in_admin_bar'   => false,
			'show_in_nav_menus'   => false,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'capability_type'     => 'page',
			'show_in_rest'        => false,
		);
		register_post_type( 'wpsf-survey', $args );
	}

	/**
	 * Ajax: new survey.
	 */
	public function wpsf_new_survey() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'surveySecurity', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
			return;
		}
		// check for validations.
		$type = isset( $_POST['type'] ) ? sanitize_text_field( wp_unslash( $_POST['type'] ) ) : 'basic';
		// create wpsf survey post.
		$post_id = wp_insert_post(
			array(
				'post_type'  => 'wpsf-survey',
				'post_title' => sanitize_text_field( wp_unslash( $_POST['title'] ) ),
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			wp_send_json_error();
		} else {
			$defaults = $this->wpsf_get_default_save_array();
			update_post_meta( $post_id, 'wpsf-survey-data', $defaults );
			update_post_meta( $post_id, 'wpsf-survey-type', $type );
			// send success if validated.
			wp_send_json_success(
				array(
					'url_to_redirect' => self::wpsf_get_setup_page_url() . $post_id . '#build',
				)
			);
		}
		wp_die();
	}

	/**
	 * Ajax: delete survey.
	 */
	public function wpsf_delete_survey() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'surveySecurity', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
			return;
		}

		$post_id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
		$delete  = wp_delete_post( $post_id );
		if ( ! $delete ) {
			wp_send_json_error();
			wp_die();
			return;
		}

		wp_send_json_success();
		wp_die();
	}

	/**
	 * Setup page for wpsf-survey
	 */
	public function wpsf_survey_setup_page() {
		if ( empty( $_GET['page'] ) || 'wpsf-survey' !== $_GET['page'] ) { // phpcs:ignore CSRF ok, input var ok.
			return;
		}

		// Don't load the interface if doing an ajax call.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		set_current_screen();
		// Remove an action in the Gutenberg plugin ( not core Gutenberg ) which throws an error.
		remove_action( 'admin_print_styles', 'gutenberg_block_editor_admin_print_styles' );
		$this->wpsf_survey_page_html();
	}

	/**
	 * Html,CSS and JS of wpsf-survey page.
	 */
	public function wpsf_survey_page_html() {

		wp_register_script(
			$this->plugin_name . '-main',
			SURVEYFUNNEL_LITE_PLUGIN_URL . 'dist/index.bundle.js',
			array( 'wp-i18n' ),
			time(),
			true
		);

		?>
			<!DOCTYPE html>
			<html <?php language_attributes(); ?>>
			<head>
				<meta name="viewport" content="width=device-width"/>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
				<?php wp_print_styles( 'dashicons' ); ?>
				<title>WP Survey Funnel</title>
			</head>
			<body class="wpsf-body">
				<div id="root" class="wpsf-root"></div>
				<input type="hidden" id="ajaxURL" value="<?php echo admin_url( 'admin-ajax.php' );//phpcs:ignore ?>">
				<input type="hidden" id="ajaxSecurity" value="<?php echo wp_create_nonce('wpsf-security');//phpcs:ignore ?>">
				<input type="hidden" id="dashboardLink" value="<?php echo admin_url() . 'admin.php?page=wpsf-dashboard';//phpcs:ignore ?>">
				<input type="hidden" id="exportCSVAction" value="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>?action=export_csv">
				<?php wp_print_scripts( $this->plugin_name . '-main' ); ?>
			</body>
			</html>
		<?php
		exit;
	}

	/**
	 * Returns the setup page url.
	 */
	public static function wpsf_get_setup_page_url() {
		return get_admin_url() . 'index.php?page=wpsf-survey&post_id=';
	}

	/**
	 * Ajax: get status.
	 */
	public function wpsf_get_status() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post    = get_post( $post_id );

		$status = $post->post_status;
		wp_send_json_error( $status );
		wp_die();
	}

	/**
	 * Ajax: Change Status.
	 */
	public function wpsf_change_status() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post    = get_post( $post_id );

		$status      = $post->post_status === 'draft' ? 'publish' : 'draft';
		$post_update = array(
			'ID'          => $post_id,
			'post_status' => $status,
		);

		$is_error = wp_update_post( $post_update );

		if ( is_wp_error( $is_error ) ) {
			wp_send_json_error();
			wp_die();
		}
		wp_send_json_success( $status );
		wp_die();
	}

	/**
	 * Ajax: save build question and answers.
	 */
	public function wpsf_save_build_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id       = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_title    = isset( $_POST['post_title'] ) ? sanitize_text_field( wp_unslash( $_POST['post_title'] ) ) : '';
		$defaults      = $this->wpsf_get_default_save_array();
		$post_meta     = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data          = wp_parse_args( (array) $post_meta, $defaults );
		$data['build'] = $_POST['state'];//phpcs:ignore.

		update_post_meta( $post_id, 'wpsf-survey-data', $data );
		$post_update = array(
			'ID'         => $post_id,
			'post_title' => $post_title,
		);
		wp_update_post( $post_update );
		wp_send_json_success();
		wp_die();
	}

	/**
	 * Ajax: save build question and answers.
	 */
	public function wpsf_save_configuration_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id           = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$defaults          = $this->wpsf_get_default_save_array();
		$post_meta         = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data              = wp_parse_args( (array) $post_meta, $defaults );
		$data['configure'] = $_POST['configuration'];//phpcs:ignore.

		update_post_meta( $post_id, 'wpsf-survey-data', $data );
		wp_send_json_success();
		wp_die();
	}

	/**
	 * Get configuration data for the post id
	 */
	public function wpsf_get_configuration_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id   = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_meta = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data      = array(
			'configure' => $post_meta['configure'],
		);
		wp_send_json_success( $data );
		wp_die();
	}

	/**
	 * Get default array save data in post_content.
	 */
	public static function wpsf_get_default_save_array() {
		return array(
			'build'     => '{"List":{"START_ELEMENTS":[],"CONTENT_ELEMENTS":[],"RESULT_ELEMENTS":[]},"title":"survey test"}',
			'design'    => '{"opacity":0,"fontFamily":null,"fontFamilyValue":"","backgroundColor":{"r":"255","g":"255","b":"255","a":"1"},"buttonColor":{"r":"1","g":"111","b":"222","a":"1"},"buttonTextColor":{"r":"255","g":"255","b":"255","a":"1"},"answersHighlightBoxColor":{"r":"232","g":"238","b":"244","a":"1"},"answerBorderColor":{"r":"180","g":"220","b":"255","a":"1"},"backgroundContainerColor":{"r":"255","g":"255","b":"255","a":"1"},"fontColor":{"r":"0","g":"0","b":"0","a":"1"}}',
			'configure' => '{"metaInfo":{"title":"","description":""},"companyBranding":true}',
			'share'     => '{"popup":{"active":false,"targettingOptions":{"devices":[{"name":"Desktop","checked":true,"id":"desktop"},{"name":"Mobile","checked":true,"id":"mobile"},{"name":"Tablet","checked":true,"id":"tablet"}],"triggerPage":"triggerOnSpecific","selectedPagesAndPosts":[]},"behaviourOptions":{"launchOptions":{"launchWhen":"afterPageLoads","afterTimeDelay":5,"afterExitIntent":"low","afterScrollPercentage":20},"frequencyOptions":{"frequency":"alwaysShow","hideFor":3,"dontShowAgain":false}}}}',
			'reports'   => '',
		);
	}

	/**
	 * Get Build data for the post id
	 */
	public function wpsf_get_build_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id    = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_meta  = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$post_title = get_the_title( $post_id );
		$data       = array(
			'build'      => $post_meta['build'],
			'post_title' => $post_title,
		);
		wp_send_json_success( $data );
		wp_die();
	}

	/**
	 * Ajax: Save design data for the post id
	 */
	public function wpsf_save_design_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id        = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$defaults       = $this->wpsf_get_default_save_array();
		$post_meta      = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data           = wp_parse_args( (array) $post_meta, $defaults );
		$data['design'] = $_POST['state'];//phpcs:ignore.
		update_post_meta( $post_id, 'wpsf-survey-data', $data );

		if ( isset( $_FILES['designImage'] ) ) {
			$image_type = isset( $_FILES['designImage']['type'] ) ? sanitize_text_field( wp_unslash( $_FILES['designImage']['type'] ) ) : '';
			if ( 'image/jpeg' === $image_type || 'image/jpg' === $image_type || 'image/png' === $image_type ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
				$img           = wp_handle_upload( $_FILES['designImage'], array( 'test_form' => false ) ); // phpcs:ignore input var ok, CSRF ok, sanitization ok.
				$file_name     = $img['file'];
				$wp_filetype   = wp_check_filetype( basename( $file_name ), null );
				$attachment    = array(
					'post_mime_type' => $wp_filetype['type'],
					'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $file_name ) ),
					'post_content'   => '',
					'post_status'    => 'inherit',
				);
				$attachment_id = wp_insert_attachment( $attachment, $file_name );
				if ( $attachment_id ) {
					require_once ABSPATH . 'wp-admin/includes/image.php';
					$attachment_data = wp_generate_attachment_metadata( $attachment_id, $file_name );
					wp_update_attachment_metadata( $attachment_id, $attachment_data );
					update_post_meta( $post_id, 'wpsf-survey-design-background', $attachment_id );
				} else {
					update_post_meta( $post_id, 'wpsf-survey-design-background', false );
				}
			} else {
				update_post_meta( $post_id, 'wpsf-survey-design-background', false );
			}
		}

		wp_send_json_success();
		wp_die();
	}

	/**
	 * Ajax: get design data.
	 */
	public function wpsf_get_design_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id               = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_meta             = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$background_image_meta = get_post_meta( $post_id, 'wpsf-survey-design-background', true );
		$data                  = array(
			'design'          => $post_meta['design'],
			'backgroundImage' => wp_get_attachment_url( $background_image_meta ),
		);
		wp_send_json_success( $data );
		wp_die();
	}

	/**
	 * Ajax: Get reports data.
	 */
	public function wpsf_get_reports_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$post_id    = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$start_date = isset( $_POST['startDate'] ) ? sanitize_text_field( wp_unslash( $_POST['startDate'] ) ) : '';
		$end_date   = isset( $_POST['endDate'] ) ? sanitize_text_field( wp_unslash( $_POST['endDate'] ) ) : '';
		$rows       = $wpdb->get_results(
			$wpdb->prepare(
				'
					SELECT * 
					FROM ' . $table_name . '
					WHERE date_created BETWEEN %s and %s AND
					survey_id = %d
				',
				$start_date,
				$end_date,
				$post_id
			)
		);
		$return_arr = array();
		if ( is_array( $rows ) && count( $rows ) ) {
			foreach ( $rows as $row ) {
				$temp_arr = array(
					'lead'         => 'Unknown',
					'fields'       => $row->fields,
					'userLocaleID' => $row->user_locale_id,
					'time_created' => $row->time_created,
					'userMeta'     => $row->user_meta,
					'checked'      => false,
				);

				preg_match( '/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/', $row->fields, $matches );

				if ( count( $matches ) ) {
					$temp_arr['lead'] = $matches[0];
				}
				array_push( $return_arr, $temp_arr );
			}
		}

		wp_send_json_success( $return_arr );
		wp_die();
	}

	/**
	 * Get insights data.
	 *
	 * @param int $post_id post id.
	 */
	public static function wpsf_get_insights_data( $post_id ) {
		global $wpdb;
		$table_name = $wpdb->prefix . 'srf_entries';
		$rows       = $wpdb->get_results(
			$wpdb->prepare(
				'
				SELECT * 
				FROM ' . $table_name . '
				WHERE survey_id = %d
			',
				$post_id
			)
		);

		$view_count      = 0;
		$completed_count = 0;
		$contacts_count  = 0;
		$total_count     = count( $rows );
		$completion_rate = 0;
		$contacts_count  = 0;
		$completed_count = 0;

		if ( count( $rows ) ) {
			$data             = get_post_meta( $post_id, 'wpsf-survey-data', true );
			$build            = json_decode( $data['build'] );
			$content_elements = $build->List->CONTENT_ELEMENTS;//phpcs:ignore
			foreach ( $content_elements as $content ) {
				$id      = $content->id;
				$pattern = '/' . $id . '/';
				foreach ( $rows as $row ) {
					if ( preg_match( $pattern, $row->fields ) ) {
						$view_count++;
					}
				}
			}
			foreach ( $rows as $row ) {
				if ( preg_match( '/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/', $row->fields ) ) {
					$contacts_count++;
				}
				$completed_count += intval( $row->user_meta );
			}
			$completion_rate = $completed_count / $total_count * 100;
			$completion_rate = number_format( (float) $completion_rate, 2, '.', '' );
		}
		return array(
			'views'          => $view_count,
			'contacts'       => $contacts_count,
			'completionRate' => $completion_rate,
		);
	}

	/**
	 * Export CSV string.
	 */
	public function wpsf_export_csv() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'exportSecurity', 'security' );
		}
		$filename       = $this->plugin_name . '-stats';
		$generated_date = gmdate( 'd-m-Y His' );
		$csv_string     = isset( $_POST['csv_data'] ) ? sanitize_textarea_field( wp_unslash( $_POST['csv_data'] ) ) : '';
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="' . $filename . ' ' . $generated_date . '.csv";' );
		echo wp_kses_data( $csv_string );
		die();
	}

	/**
	 * Mascot on all pages.
	 */
	public function wpsf_mascot_on_pages() {
		if ( empty( $_GET['page'] ) || ('wpsf-dashboard' !== $_GET['page'] && 'wpsf-help' !== $_GET['page']) ) {//phpcs:ignore
			return;
		}

		$is_pro = get_option( 'wpadcenter_pro_active' );
		if ( $is_pro ) {
			$support_url = '#';
		} else {
			$support_url = '#';
		}

		$return_array = array(
			'menu_items'       => array(
				'support_text'       => __( 'Support', 'surveyfunnel' ),
				'support_url'        => $support_url,
				'documentation_text' => __( 'Documentation', 'surveyfunnel' ),
				'documentation_url'  => 'https://docs.wpeka.com/survey-funnel/v/master/',
				'faq_text'           => __( 'FAQ', 'surveyfunnel' ),
				'faq_url'            => 'https://docs.wpeka.com/survey-funnel/v/master/faq',
				'upgrade_text'       => __( 'Upgrade to Pro &raquo;', 'surveyfunnel' ),
				'upgrade_url'        => 'https://club.wpeka.com/product/survey-funnel/?utm_source=survey-funnel&utm_medium=help-mascot&utm_campaign=link&utm_content=upgrade-to-pro',
			),
			'is_pro'           => $is_pro,
			'quick_links_text' => __( 'See Quick Links', 'surveyfunnel' ),
		);
		wp_enqueue_script( $this->plugin_name . '-mascot' );
		wp_enqueue_style( $this->plugin_name . '-mascot' );
		wp_localize_script( $this->plugin_name . '-mascot', 'mascot', $return_array );

		?>
			<div id="srf-mascot-app"></div>
		<?php
	}

	/**
	 * Ajax: save share data.
	 */
	public function wpsf_save_share_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id       = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$defaults      = $this->wpsf_get_default_save_array();
		$post_meta     = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data          = wp_parse_args( (array) $post_meta, $defaults );
		$data['share'] = $_POST['share'];//phpcs:ignore.

		update_post_meta( $post_id, 'wpsf-survey-data', $data );
		wp_send_json_success();
		wp_die();
	}

	/**
	 * Get share data for the post id
	 */
	public function wpsf_get_share_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id   = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_meta = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data      = array(
			'share' => $post_meta['share'],
		);
		wp_send_json_success( $data );
		wp_die();
	}

	/**
	 * Ajax: get posts and pages for async select.
	 */
	public function wpsf_get_posts_pages() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$args = array(
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'numberofposts' => -1,
		);

		$posts                 = get_posts( $args );
		$post_object           = new stdClass();
		$post_object->label    = 'Posts';
		$post_object->options = array();

		foreach ( $posts as $post ) {
			$obj        = new stdClass();
			$obj->label = $post->post_title;
			$obj->value = $post->ID;
			array_push( $post_object->options, $obj );
		}

		$args = array(
			'post_type'     => 'page',
			'post_status'   => 'publish',
			'numberofposts' => -1,
		);

		$pages                 = get_posts( $args );
		$page_object           = new stdClass();
		$page_object->label    = 'Pages';
		$page_object->options = array();

		foreach ( $pages as $page ) {
			$obj        = new stdClass();
			$obj->label = $page->post_title;
			$obj->value = $page->ID;
			array_push( $page_object->options, $obj );
		}

		$data = array( $post_object, $page_object );

		wp_send_json_success( $data );
		wp_die();
	}

}

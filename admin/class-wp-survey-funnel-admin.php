<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://club.wpeka.com
 * @since      1.0.0
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Wp_Survey_Funnel
 * @subpackage Wp_Survey_Funnel/admin
 * @author     WPEka Club <support@wpeka.com>
 */
class Wp_Survey_Funnel_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'css/wp-survey-funnel-admin.css',
			array(),
			time(),
			'all'
		);

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url( __FILE__ ) . 'js/wp-survey-funnel-admin.js',
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

	}

	/**
	 * Register Survey Funnel Admin Menu.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_admin_menu() {

		// dashboard page is nothing but react one page app to build surveys.
		add_dashboard_page( '', '', 'manage_options', 'wpsf-survey', '' );

		add_menu_page(
			__( 'Survey Funnel', 'wp-survey-funnel' ),
			__( 'Survey Funnel', 'wp-survey-funnel' ),
			'manage_options',
			'wpsf-dashboard',
			'',
			WP_SURVEY_FUNNEL_PLUGIN_URL . 'images/SF-logo.png'
		);

		// Dashboard.
		add_submenu_page(
			'wpsf-dashboard',
			__( 'Dashboard', 'wp-survey-funnel' ),
			__( 'Dashboard', 'wp-survey-funnel' ),
			'manage_options',
			'wpsf-dashboard',
			array( $this, 'wpsf_dashboard' )
		);

		// Settings.
		add_submenu_page(
			'wpsf-dashboard',
			__( 'Settings', 'wp-survey-funnel' ),
			__( 'Settings', 'wp-survey-funnel' ),
			'manage_options',
			'wpsf-settings',
			array( $this, 'wpsf_settings' )
		);

		// Help.
		add_submenu_page(
			'wpsf-dashboard',
			__( 'Help', 'wp-survey-funnel' ),
			__( 'Help', 'wp-survey-funnel' ),
			'manage_options',
			'wpsf-help',
			array( $this, 'wpsf_help' )
		);
	}

	/**
	 * Settings submenu page callback.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_settings() {
		echo '';
	}

	/**
	 * Help submenu page callback.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_help() {
		echo '';
	}

	/**
	 * Dashboard submenu page callback.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_dashboard() {
		include_once plugin_dir_path( __FILE__ ) . 'views/admin-display-dashboard-page.php';
	}

	/**
	 * Initialize wpsf functionalities.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_init() {
		// no labels required.
		$labels = array();

		// register hidden post type 'wpsf-survey'.
		$args = array(
			'label'               => __( 'wpsf-survey', 'wp-survey-funnel' ),
			'description'         => __( 'wpsf-survey custom post type to generate surveys', 'wp-survey-funnel' ),
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
			WP_SURVEY_FUNNEL_PLUGIN_URL . 'dist/index.bundle.js',
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
				<title>WP Survey Funnel</title>
			</head>
			<body class="wpsf-body">
				<div id="root"></div>
				<input type="hidden" id="ajaxURL" value="<?php echo admin_url( 'admin-ajax.php' );//phpcs:ignore ?>">
				<input type="hidden" id="ajaxSecurity" value="<?php echo wp_create_nonce('wpsf-security');//phpcs:ignore ?>">
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
	 * Ajax: save build question and answers.
	 */
	public function wpsf_save_build_data() {
		if ( isset( $_POST['action'] ) ) {
			check_admin_referer( 'wpsf-security', 'security' );
		} else {
			wp_send_json_error();
			wp_die();
		}

		$post_id    = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_title = isset( $_POST['post_title'] ) ? sanitize_text_field( wp_unslash( $_POST['post_title'] ) ) : '';
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
	 * Get default array save data in post_content.
	 */
	public function wpsf_get_default_save_array() {
		return array(
			'build'     => '',
			'design'    => '',
			'configure' => '',
			'share'     => '',
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
		$data       = array( 'build' => $post_meta['build'], 'post_title' => $post_title );
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

		$post_id    = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$defaults      = $this->wpsf_get_default_save_array();
		$post_meta     = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$data          = wp_parse_args( (array) $post_meta, $defaults );
		$data['design'] = $_POST['state'];//phpcs:ignore.
		update_post_meta( $post_id, 'wpsf-survey-data', $data );

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

		$post_id    = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
		$post_meta  = get_post_meta( $post_id, 'wpsf-survey-data', true );
		$post_title = get_the_title( $post_id );
		$data       = array( 'design' => $post_meta['design'] );
		wp_send_json_success( $data );
		wp_die();
	}
}

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

	}

	/**
	 * Register Survey Funnel Admin Menu.
	 *
	 * @since    1.0.0
	 */
	public function wpsf_admin_menu() {
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
}

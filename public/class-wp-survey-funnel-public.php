<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://club.wpeka.com
 * @since      1.0.0
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
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		wp_enqueue_style(
			$this->plugin_name . '-public',
			plugin_dir_url( __FILE__ ) . 'css/wp-survey-funnel-public.css',
			array( 'jquery' ),
			$this->version,
			'all'
		);
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
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
				'id' => 0,
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
		$meta_data = get_post_meta( $atts['id'], 'wpsf-survey-data', true );
		$data      = array(
			'build'        => $meta_data['build'],
			'ajaxURL'      => admin_url( 'admin-ajax.php' ),
			'ajaxSecurity' => wp_create_nonce( 'wpsf-security' ),
			'post_id'      => $atts['id'],
		);

		wp_enqueue_script( $this->plugin_name . '-survey' );
		wp_localize_script( $this->plugin_name . '-survey', 'data', $data );
		return '<div id="root" style="width: 100%"></div>';
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

		error_log( print_r( $_POST, true ) );
	}
}

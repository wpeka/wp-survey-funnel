<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://club.wpeka.com
 * @since             1.0.0
 * @package           Wp_Survey_Funnel
 *
 * @wordpress-plugin
 * Plugin Name:       WP Survey Funnel
 * Plugin URI:        https://club.wpeka.com/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            WPEka Club
 * Author URI:        https://club.wpeka.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-survey-funnel
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WP_SURVEY_FUNNEL_VERSION', '1.0.0' );

if ( ! defined( 'WP_SURVEY_FUNNEL_PLUGIN_URL' ) ) {
	define( 'WP_SURVEY_FUNNEL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! function_exists( 'srf_fs' ) ) {
    error_log('in function exists');
    /**
     * Helper function to access SDK.
     *
     * @return Analytics
     */
    function srf_fs() {
        global $srf_fs;

        if ( ! isset( $srf_fs ) ) {
            // Include Analytics SDK.
            require_once dirname( __FILE__ ) . '/analytics/start.php';

            $srf_fs = ras_dynamic_init(
                array(
                    'id'              => '30',
                    'slug'            => 'wp-survey-funnel',
                    'product_name'    => 'WP Survey Funnel',
                    'module_type'     => 'plugin',
                    'version'         => WP_SURVEY_FUNNEL_VERSION,
                    'plugin_basename' => 'wp-survey-funnel/wp-survey-funnel.php',
                    'plugin_url'      => WP_SURVEY_FUNNEL_PLUGIN_URL,
                )
            );
        }

        return $srf_fs;
    }

    // Init Analytics.
    srf_fs();
    // SDK initiated.
    do_action( 'srf_fs_loaded' );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-survey-funnel-activator.php
 */
function activate_wp_survey_funnel() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-survey-funnel-activator.php';
	Wp_Survey_Funnel_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-survey-funnel-deactivator.php
 */
function deactivate_wp_survey_funnel() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-survey-funnel-deactivator.php';
	Wp_Survey_Funnel_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wp_survey_funnel' );
register_deactivation_hook( __FILE__, 'deactivate_wp_survey_funnel' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-survey-funnel.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_survey_funnel() {
	$plugin = new Wp_Survey_Funnel();
	$plugin->run();
}
run_wp_survey_funnel();

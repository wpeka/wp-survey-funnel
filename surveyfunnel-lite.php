<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link    https://club.wpeka.com
 * @since   1.0.0
 * @package Surveyfunnel_Lite
 *
 * @wordpress-plugin
 * Plugin Name:       SurveyFunnel Lite
 * Plugin URI:        https://club.wpeka.com/
 * Description:       Boost your leads using quiz / survey lead techniques . Drag & drop form builder to launch quizzes within minutes.
 * Version:           1.1.5
 * Author:            WPEka Club
 * Author URI:        https://club.wpeka.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       surveyfunnel
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
define( 'SURVEYFUNNEL_LITE_VERSION', '1.1.5' );

if ( ! defined( 'SURVEYFUNNEL_LITE_PLUGIN_URL' ) ) {
	define( 'SURVEYFUNNEL_LITE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-surveyfunnel-lite-activator.php
 */
function activate_surveyfunnel_lite() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-surveyfunnel-lite-activator.php';
	Surveyfunnel_Lite_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-surveyfunnel-lite-deactivator.php
 */
function deactivate_surveyfunnel_lite() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-surveyfunnel-lite-deactivator.php';
	Surveyfunnel_Lite_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_surveyfunnel_lite' );
register_deactivation_hook( __FILE__, 'deactivate_surveyfunnel_lite' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-surveyfunnel-lite.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 1.0.0
 */
function run_surveyfunnel_lite() {
	$plugin = new Surveyfunnel_Lite();
	$plugin->run();
}
run_surveyfunnel_lite();

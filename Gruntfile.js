/**
 * Grunt Tasks JavaScript.
 *
 * @package    Surveyfunnel_Lite
 * @subpackage Surveyfunnel_Lite
 * @author     WPEka Club <support@wpeka.com>
 */

module.exports = function (grunt) {

	'use strict';

	// Project configuration.
	grunt.initConfig(
		{

			pkg: grunt.file.readJSON( 'package.json' ),
			clean: {
				build: ['release/<%= pkg.version %>']
			},
			uglify: {
				options: {

				},
				admin: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/admin/js/',
						src: [
						'*.js',
						'!*.min.js'
						],
						dest: 'release/<%= pkg.version %>/admin/js/',
						ext: '.min.js'
					}]
				},
				frontend: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/public/js/',
						src: [
						'*.js',
						'!*.min.js'
						],
						dest: 'release/<%= pkg.version %>/public/js/',
						ext: '.min.js'
					}]
				},
			},
			cssmin: {
				options: {

				},
				admin: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/admin/css/',
						src: [
						'*.css',
						'!*.min.css'
						],
						dest: 'release/<%= pkg.version %>/admin/css/',
						ext: '.min.css'
					}]
				},
				frontend: {
					files: [{
						expand: true,
						cwd: 'release/<%= pkg.version %>/public/css/',
						src: [
						'*.css',
						'!*.min.css'
						],
						dest: 'release/<%= pkg.version %>/public/css/',
						ext: '.min.css'
					}]
				},
			},
			copy: {
				build: {
					options: {
						mode: true,
						expand: true,
					},
					src: [
					'**',
					'!node_modules/**',
					'!vendor/**',
					'!**/JSTests/**',
					'!__mocks__/**',
					'vendor/mobiledetect/**',
                    'vendor/autoload.php',
					'!release/**',
					'!build/**',
					'!tests/**',
					'!bin/**',
					'!.git/**',
					'!Gruntfile.js',
					'!package-lock.json',
					'!.gitignore',
					'!.gitmodules',
					'!composer.lock',
					'!composer.json',
					'!*.yml',
					'!*.xml',
					'!*.config.*',
					'!phpunit.xml.dist',
					'!*.md'
					],
					dest: 'release/<%= pkg.version %>/'
				}
			},
			compress: {
				build: {
					options: {
						mode: 'zip',
						archive: './release/<%= pkg.name %>.<%= pkg.version %>.zip'
					},
					expand: true,
					cwd: 'release/<%= pkg.version %>/',
					src: ['**/*'],
					dest: '<%= pkg.name %>'
				}
			},

			addtextdomain: {
				options: {
					textdomain: 'surveyfunnel',
				},
				update_all_domains: {
					options: {
						updateDomains: true
					},
					src: ['*.php', '**/*.php', '!\.git/**/*', '!bin/**/*', '!node_modules/**/*', '!tests/**/*', '!vendor/**/*', '!auto-updates/*', '!analytics/*']
				}
			},

			wp_readme_to_markdown: {
				your_target: {
					files: {
						'README.md': 'README.txt'
					}
				},
			},

			makepot: {
				target: {
					options: {
						domainPath: '/languages',
						exclude: ['\.git/*', 'bin/*', 'node_modules/*', 'tests/*', '!vendor/**/*', '!auto-updates/*', '!analytics/*'],
						mainFile: 'surveyfunnel-lite.php',
						potFilename: 'surveyfunnel.pot',
						potHeaders: {
							poedit: true,
							'x-poedit-keywordslist': true
						},
						type: 'wp-plugin',
						updateTimestamp: true
					}
				}
			},

			

			shell: {

				build: [ 'grunt updatefonts', 'npm run build' ].join( ' && ' )
			},
		}
	);

	grunt.registerTask('google-fonts', function () {
		var done = this.async();
		var request = require('request');
		var fs = require('fs');
		request('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDu1nDK2o4FpxhrIlNXyPNckVW5YP9HRu8&sort=popularity', function (error, response, body) {
			if (response && response.statusCode == 200) {
				var fonts = JSON.parse(body).items.map(function (font) {
					return {
						name: font.family,
						value: font.family.replace(/ /g, '+')
					};
				});
				
				fs.writeFile('./src/Data/google-fonts.json', JSON.stringify(fonts, undefined, 4), function (err) {
					if (! err ) {
						console.log("Google Fonts Updated!");
					}
				});
			}
		});
	});

	// Default task(s).
	grunt.registerTask( 'updatefonts', [ 'google-fonts' ] );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-wp-readme-to-markdown' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask( 'default', ['i18n'] );
	grunt.registerTask( 'i18n', ['addtextdomain', 'makepot'] );
	grunt.registerTask( 'compile', ['shell:build'] );
	grunt.registerTask( 'readme', ['wp_readme_to_markdown'] );
	grunt.registerTask( 'build', ['shell:build', 'clean:build', 'copy:build', 'uglify:admin', 'uglify:frontend', 'cssmin:admin', 'cssmin:frontend', 'compress:build'] );

	grunt.util.linefeed = '\n';

};

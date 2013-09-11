module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		min: {
			fx: {
				src: 'src/fx.js',
				dest: 'dist/fx.min.js'
			},
			fx_scroll: {
				src: 'src/fx.scroll.js',
				dest: 'dist/fx.scroll.min.js'
			}
		},
		lint: {
			all: ['src/*.js']
		},
		jshint: {
			options: {
				browser: true
			}
		},
		uglify: {
			options: {
				mangle: true,
				mangleToplevel: true,
				compress: {
					unsafe: true
				}
			}
		}
	});

	grunt.registerTask('default', 'min');

};
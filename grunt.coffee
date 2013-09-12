module.exports = (grunt) ->



	package = require 'package.json'
	version = package.version



	grunt.initConfig

		pkg: grunt.file.readJSON 'package.json'

		lint:

			all: ['src/*.js']

		jshint:

			options:
				browser: true
		
		uglify:

			options:
				mangle:
					toplevel: true
				compress:
					dead_code: true
					unused: true
					join_vars: true
				comments: false

			fx:
				files:
					'dist/fx.min.js': [
						'src/fx.js'
					]

			fx_scroll:
				files:
					'dist/fx.scroll.min.js': [
						'src/fx.scroll.js'
					]


	

	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-uglify'



	grunt.registerTask 'default', 'uglify'
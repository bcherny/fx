module.exports = (grunt) ->

	pkg = require './package.json'
	fields = ['version', 'author', 'license', 'bugs']
	build = (pkg, fields) ->

		prefix = ' * '
		suffix = '\n'
		string = '/**\n'
		tpl = (field) ->

			value = pkg[field]

			console.log 'template', field, value

			string += "#{prefix}@#{field} "

			type = typeof value

			# string, number
			if type is 'string' or type is 'number'
				string += value + suffix

			# array
			else if value.length
				string += value.join(', ') + suffix

			# object
			else
				string += '\n'
				for key, val of value
					string += prefix + '\t' + key + ': ' + val + suffix


		# package names
		string += prefix + pkg.name + suffix

		# fields
		tpl field for field in fields when typeof pkg[field] isnt 'undefined'

		string += ' */\n'


	header = build pkg, fields


	grunt.initConfig

		pkg: grunt.file.readJSON 'package.json'

		concat:

			options:
				banner: header

			fx:
				src: ['dist/fx.min.js']
				dest: 'dist/fx.min.js'

			fx_scroll:
				src: ['dist/fx.scroll.min.js']
				dest: 'dist/fx.scroll.min.js'

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



	grunt.registerTask 'default', ['uglify', 'concat']
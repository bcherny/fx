/**
 * Fx.Color.js
 * -----BROKEN CODE-----
 * @author : Agile Diagnosis
 * @contributors : Boris Cherny <boris@agilediagnosis.com>
 * @created : 2012-02-14
 * @description : Color animation plugin for Fx.js
 * @requires : Fx.js
 * @version : 0.1.0
 */

Fx.Color = (function(){

	'use strict';

	return function (element) {

		setters.color = function (r, g, b) {
			style[property] = 'rgb(' + r + ',' + g + ',' + b + ')';
		};

		setters['background-color'] = setters['border-color'] = setters['border-bottom-color'] = setters['border-left-color'] = setters['border-right-color'] = setters['border-top-color'] = setters.color;

		function get() {

			case 'background-color':
			case 'border-bottom-color':
			case 'border-color':
			case 'border-left-color':
			case 'border-top-color':
			case 'border-right-color':
			case 'color':

				result = parseColor(style[property]);

		}
		

		/**
		 * Parse a color into its component RGB values; accepts 'abc', '#abc', 'abcdef', '#abcdef', 'rgb(12,34,56)', '12,34,56'
		 * @param  {[type]} color [description]
		 * @return {[type]}       [description]
		 */
		function parseColor (color) {

			var original = color.slice(0);

			if (color.charAt(0) === '#') {
				color = color.slice(1);
			}

			var length = color.length;

			if (length === 3) {

				// eg. abc
				
				var char1 = color.charAt(0);
				var char2 = color.charAt(1);
				var char3 = color.charAt(2);

				return [parseHex(char1+char1), parseHex(char2+char2), parseHex(char3+char3)];

			} else if (length === 6) {

				// eg. abcdef

				return [parseHex(color.slice(0,2)), parseHex(color.slice(2,4)), parseHex(color.slice(4,6))];

			} else if (color.search(',') > -1) {

				// eg. rgb(12,34,56) or 12,34,56
				
				// remove rgb() wrapper if it exists
				var parts = color.split('(');
				if (parts.length === 2) {
					color = parts[1].slice(0,-1);
				}

				return color.split(',');

			} else {

				throw new Error('Error parsing color ' + original);

			}

		}

		function parseHex (hexstring) {
			return parseInt(hexstring, 16);
		}

	};

})();
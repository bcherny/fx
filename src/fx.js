(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(require('annie'));
	} else if (typeof define === 'function' && define.amd) {
		define(['annie'], factory);
	} else {
		root.Fx = factory(root.annie);
	}
}(this, function (annie) {

	'use strict';

	var doc = document;
	var nav = navigator;
	var win = window;


	//
	// Polyfills
	//


	// property collections
	var rules = {

		/**
		 * Properties grouped according to the structures of their values
		 * @type {Object}
		 */
		schemas: {
			css: 'bottom left right top margin marginBottom marginLeft marginRight marginTop padding paddingBottom paddingLeft paddingRight paddingTop fontSize height opacity width zoom',
			css3: 'translate translate3d rotate rotate3d scale scale3d',
			nocss: 'scrollLeft scrollTop'
		},
		no_negative: 'scrollLeft scrollTop fontSize height opacity width zoom',
		no_unit: 'scrollLeft scrollTop opacity zoom scale scale3d'
	};

	//
	// Fx
	//


	var Fx = function (element, property, options) {

		var self = this;

		self.options = {
			duration: 300,
			animationStart: function(){},
			animationEnd: function(){},
			transition: 'linear',
			unit: 'px'
		};


		// set user options

		var opts = self.options;

		if (options) {
			setOptions(opts, options);
		}


		// vars

		
		property = toCamelCase(property);

		var round = Math.round;
		var style = element.style;
		var cantBeNegative = rules.no_negative.indexOf(property) > 0;
		var is3d = property.indexOf('3d') > -1;
		var isTranslate = property === 'translate' || property === 'translate3d';
		var hasUnit = rules.no_unit.indexOf(property) < 0;
		var unit = hasUnit ? opts.unit : '';
		var calls = 0; // for measuring FPS

		var x, y, z;
		var animationFrame;
		var time_start, time_end;
		var x_exists, y_exists, z_exists,
			x_from,   y_from,	z_from,
			x_to,	  y_to,		z_to,
			mx,		  my,		mz;


		// set transition
		

		var transitions = {
			linear: function (time) {

				var result = [];

				if (x_exists) {

					result.push(mx*time);

				} if (y_exists) {

					result.push(my*time);

				} if (z_exists) {

					result.push(mz*time);

				}

				return result;

			}
		};

		var trans = opts.transition;
		var transition = typeof trans === 'function' ? trans : transitions.linear;


		// gracefully degrade for browsers that don't support 3D animations


		if (is3d && !annie.supports3d) {

			property = property.replace('3d', '');

		}


		// setters
		

		var setters = {
			css: function(x) {

				style[property] = x + unit;

			},
			css3: annie.transform ? function (x, y, z) {

				var value = [];
				
				if (x_exists) {
					value.push(x + unit);
				} if (y_exists) {
					value.push(y + unit);
				} if (z_exists && annie.supports3d) {
					value.push(z + unit);
				}

				style[annie.transform] = property + '(' + value.join(',') + ')';

			} : function (x, y) {

				if (isTranslate) {

					if (x_exists) {
						style.left = round(x) + unit;
					} if (y_exists) {
						style.top = round(y) + unit;
					}

				}
			},
			nocss: function(x) {

				element[property] = x;

			}
		};


		// getters


		var defaults = {
			css: unit ? [0] : [1],
			css3: is3d ? (unit ? [0,0,0] : [1,1,1]) : (unit ? [0,0] : [1,1]),
			nocss: [0]
		};

		var getters = {
			css: function() {

				var value = parse(getStyle(element)[property]);
				return isNaN(value) ? defaults.css : [value]; // because 0 is falsey

			},
			css3: function() {

				var result = defaults.css3;
				var sliceStart = {
					scale: 6,
					rotate: 7,
					scale3d: 8,
					rotate3d: 9,
					translate: 10,
					translate3d: 12
				}[property];

				if (annie.transform) {

					var currentStyle = getStyle(element)[annie.transform];
					var matches = currentStyle.slice(sliceStart, -1).split(',');

					if (currentStyle) {

						if (matches[0]) {

							result[0] = parse(matches[0]);

						} if (matches[1]) {

							result[1] = parse(matches[1]);

						} if (matches[2]) {

							result[2] = parse(matches[2]);

						}

					}

				} else if (isTranslate) {

					var left = getStyle(element)['left'];
					var top = getStyle(element)['top'];

					result = [
						parse(left) || 0,
						parse(top) || 0
					];

				}

				return result;

			},
			nocss: function() {

				var value = element[property];
				return isNaN(value) ? defaults.nocss : [value];

			}
		};


		// define getter + setter


		var schemas = rules.schemas;

		for (var type in schemas) {

			var properties = schemas[type].split(' ');

			for (var n = properties.length; n--;) {
				var prop = properties[n];
				getters[prop] = getters[type];
				setters[prop] = setters[type];
			}

		}

		var set = setters[property];
		var get = getters[property];
		

		// animate!
		

		var compute = function (time) {

			var coords = transition(time);

			if (x_exists) {

				x = x_from + coords[0];

			} if (y_exists) {

				y = y_from + coords[1];

			} if (z_exists) {

				z = z_from + coords[2];

			}

			if (cantBeNegative) {

				if (x_exists && x < 0) {
					x = 0;
				} if (y_exists && y < 0) {
					y = 0;
				} if (z_exists && z < 0) {
					z = 0;
				}

			}

			set(x, y, z);
		};
		
		var tick = function (time) {

			compute(time - time_start);
			++calls;
			if (time < time_end) {
				annie.requestAnimationFrame(tick);
			}
			else {
				annie.cancelAnimationFrame(tick);
				set(x_to, y_to, z_to);
				self.options.animationEnd(element, 1000*calls/opts.duration);
			}
			
		};

		var to = function (new_x, new_y, new_z) {

			var duration = opts.duration;

			x_exists = isNumber(new_x);
			y_exists = isNumber(new_y);
			z_exists = isNumber(new_z);

			opts.animationStart(element);

			// get current state
			var state = get();

			x = state[0];
			y = state[1];
			z = state[2];

			// pre-compute as much as possible
			if (x_exists) {

				x_from = x;
				x_to = new_x;
				mx = (x_to - x_from)/duration;

			} if (y_exists) {

				y_from = y;
				y_to = new_y;
				my = (y_to - y_from)/duration;

			} if (z_exists) {

				z_from = z;
				z_to = new_z;
				mz = (z_to - z_from)/duration;

			}

			// reset call count
			calls = 0;

			// start!
			time_start = annie.performance ? win.performance.now() : +new Date();
			time_end = time_start + duration;
			animationFrame = annie.requestAnimationFrame(tick);

		};


		// public API


		self.element = element;
		self.property = property;
		self.get = get;
		self.set = set;
		self.to = to;

		return self;

	};


	//
	// helpers
	//
	

	function getStyle (element) {
		return element.style;
	}

	function isDefined (thing) {
		return thing !== void 0;
	}

	function isNumber (thing) {
		return typeof thing === 'number';
	}

	function parse (string) {
		return parseInt(string, 10);
	}

	function setOptions (options, userOptions) {

		for (var option in userOptions) {
			var opt = userOptions[option];
			if (opt && options.hasOwnProperty(option)) {
				options[option] = opt;
			}
		}

	}

	function toCamelCase (property) {
		var parts = property.split('-');
		var count = parts.length;

		if (count > 1) {

			while (count-- > 1) {
				var part = parts[count];
				parts[count] = part.charAt(0).toUpperCase() + part.slice(1);
			}

		}

		return parts.join('');
	}


	return Fx;

}));
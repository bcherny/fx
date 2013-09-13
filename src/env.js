(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else {
		root.env = factory();
	}
}(this,function(){

	'use strict';

	var doc = document;
	var nav = navigator;
	var win = window;
	var ie = nav.appVersion.search('MSIE') > -1
		? parse(nav.appVersion.slice(22,26))
		: void 0;
	var vendor = (function(){

		var prefixes = ' -ms- -moz- -webkit-'.split(' '),
			style = doc.body.style,
			n, property;

		for (n = prefixes.length; n--;) {
			property = prefixes[n] + 'transform';
			if (style[property] !== void 0) {
				return property;
			}
		}

	})();

	var env = {

		ie: ie,

		performance: win.performance && win.performance.now,

		/*
			3d animation support flag
			based on stackoverflow.com/questions/5661671/detecting-transform-translate3d-support/12621264#12621264
		*/
		supports3d: (function(){

			if (ie < 9) {
				return;
			}

			var body = doc.body,
				el = doc.createElement('p'),
				transform = '-' + vendor + '-transform';

			el.style[transform] = 'translate3d(1px,1px,1px)';
			body.appendChild(el);
			var has3d = getCompStyle(el, transform);
			body.removeChild(el);

			return has3d !== void 0 && has3d !== 'none' && has3d.length > 0;

		})(),

		vendor: vendor

	};


	function getCompStyle (element, property) {
		return (element.currentStyle || getComputedStyle(element))[property];
	}


	return env


}));
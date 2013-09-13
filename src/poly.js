(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(require('env'));
	} else if (typeof define === 'function' && define.amd) {
		define(['env'], factory);
	} else {
		root.poly = factory(root.env);
	}
}(this, function (env) {

	'use strict';

	var win = window;

	var poly = {

		/*
			requestAnimationFrame
		*/
		animationFrame: (function(){

			var vendor = env.vendor,
				request = bind(
						win.requestAnimationFrame
						|| win[vendor + 'RequestAnimationFrame']
						|| (function(){
							var lastTime = 0;
							return function (callback) {
								var currTime = +new Date();
								var timeToCall = Math.max(0, 16 - (currTime - lastTime));
								var id = setTimeout(function(){ callback(currTime+timeToCall) }, timeToCall);
								lastTime = currTime + timeToCall;
								return id;
							}
						})()
					, win),
				cancel = bind(
						win.cancelAnimationFrame
						|| win[vendor + 'RequestAnimationFrame']
						|| win[vendor + 'CancelRequestAnimationFrame']
						|| clearTimeout
					, win);

			return {
				request: request,
				cancel: cancel
			};

		})(),

		/*
			CSS3 transform
		*/
		transform: (function() {
			
			var property = '-' + env.vendor + '-transform';

			if (document.body.style[property] !== void 0) {
				return property;
			}

		})()

	};

	function bind (fn, context) {
		return function() {
			fn.apply(context, [].slice.call(arguments));
		}
	}


	return poly;


}));
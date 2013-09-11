/**
 * Fx.Scroll.js
 * @author : Agile Diagnosis
 * @contributors : Boris Cherny <boris@agilediagnosis.com>
 * @created : 2012-02-14
 * @description : Scrolling functionality for Fx.js. Uses GPU-accelerated
 *                3D transforms while properly updating scrollLeft and scrollTop.
 * @requires : Fx.js
 * @version : 0.1.0
 */

Fx.Scroll = (function(){

	'use strict';

	return function (element, direction) {

		var self = this;
		var isHorizontal = direction === 'horizontal';
		var property = 'scroll' + (isHorizontal ? 'Left' : 'Top');
		var oldScroll = 0;

		var fxScroll = new Fx(element.parentNode, property);
		var fxTranslate = new Fx(element, 'translate3d', {
			animationStart: function() {

				oldScroll = fxScroll.get()[0];
				fxTranslate.set.apply(fxTranslate, getMatrix(oldScroll));
				fxScroll.set(0);

			},
			animationEnd: function() {

				var newScroll = fxTranslate.get()[isHorizontal ? 0 : 1];
				fxTranslate.set(0,0,0);
				fxScroll.set(-newScroll);

			}
		});

		var set = function(x) {
			fxTranslate.set.apply(this, getMatrix(x));
		};

		var to = function(x) {
			fxTranslate.to.apply(this, getMatrix(x));
		};

		var getMatrix = function(x) {
			return isHorizontal ? [-x, 0, 0] : [0, -x, 0];
		};


		// public API


		self.set = set;
		self.to = to;

	};

})();
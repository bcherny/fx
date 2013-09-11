// document.getElementsByClassName polyfill for ie8 and down
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function(e,t){
		for (var n = [], r = e.getElementsByTagName('*'), i = r.length; i--;) {
			r[i].className.indexOf(t) > -1 && n.push(r[i]);
			return n;
		}
	};
}

// cross-browser click event
var evt = 'ontouchstart' in window ? 'touchstart' : 'click';

// animation options
var options = {
	duration: 1000,
	animationStart: function (element) {
		$('#fps-'+element.id.split('-').slice(1).join('-')).innerHTML = '';
	},
	animationEnd: function (element, FPS) {
		$('#fps-'+element.id.split('-').slice(1).join('-')).innerHTML = 'Completed @' + FPS + 'FPS';
	}
};

// fx: translate

var element_translate = $('#element-translate');
var toggler_translate = $('#toggler-translate');
var fx_translate = new Fx(element_translate, 'translate3d', options);
var translate_call_count = 0;

addEvent(toggler_translate, evt, function (e) {

	// alternate the direction with every click

	var to;
	
	if (++translate_call_count % 2) {

		to = element_translate.parentNode.offsetWidth - element_translate.offsetWidth;

	} else {

		to = 0;

	}

	fx_translate.to(to, 0, 0);

});

// fx: left

var element_left = $('#element-left');
var toggler_left = $('#toggler-left');
var fx_left = new Fx(element_left, 'left', options);
var left_call_count = 0;

addEvent(toggler_left, evt, function (e) {

	// alternate the direction with every click

	var to;
	
	if (++left_call_count % 2) {

		to = element_left.parentNode.offsetWidth - element_left.offsetWidth;

	} else {

		to = 0;

	}

	fx_left.to(to);

});

// fx: rotate

var element_rotate = $('#element-rotate');
var toggler_rotate = $('#toggler-rotate');
var fx_rotate = new Fx(element_rotate, 'rotate', {
	unit: 'deg'
});
var rotate_call_count = 0;

addEvent(toggler_rotate, evt, function (e) {

	var to;
	
	if (++rotate_call_count % 2) {

		to = 45;

	} else {

		to = 0;

	}
	
	fx_rotate.to(to);

});

// fx: scale

var element_scale = $('#element-scale');
var toggler_scale = $('#toggler-scale');
var fx_scale = new Fx(element_scale, 'scale3d', options);
var scale_call_count = 0;

addEvent(toggler_scale, evt, function (e) {

	var to;
	
	if (++scale_call_count % 2) {

		to = 10;

	} else {

		to = 1;

	}
	
	fx_scale.to(to, to, to);

});

// fx: opacity

var element_opacity = $('#element-opacity');
var toggler_opacity = $('#toggler-opacity');
var fx_opacity = new Fx(element_opacity, 'opacity', options);
var opacity_call_count = 0;

addEvent(toggler_opacity, evt, function (e) {

	var to;
	
	if (++opacity_call_count % 2) {

		to = 0;

	} else {

		to = 1;

	}
	
	fx_opacity.to(to);

});

// fx: font-size

var element_font_size = $('#element-font-size');
var toggler_font_size = $('#toggler-font-size');
var fx_font_size = new Fx(element_font_size, 'font-size', options);
var font_size_call_count = 0;

addEvent(toggler_font_size, evt, function (e) {

	var to;
	
	if (++font_size_call_count % 2) {

		to = 72;

	} else {

		to = 10;

	}
	
	fx_font_size.to(to);

});

// fx: scrollTop

var element_scrollTop = $('#element-scrollTop');
var toggler_scrollTop = $('#toggler-scrollTop');
var fx_scrollTop = new Fx.Scroll(element_scrollTop);
var scrollTop_call_count = 0;

addEvent(toggler_scrollTop, evt, function (e) {

	var to;
	
	if (++scrollTop_call_count % 2) {

		to = 220;

	} else {

		to = 0;

	}
	
	fx_scrollTop.to(to);

});
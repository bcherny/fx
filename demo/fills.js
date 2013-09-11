//
// ClassName manipulation
//


var D = document;
var W = window;
var r = ['(^|\\s)', '(?:\\s|$)'];

function addClass (element, className) {
	element.className += ' ' + className;
	return element;
}

function removeClass (element, className) {
	element.className = element.className.replace(new RegExp(r[0] + className + r[1]), '$1');
	return element;
}


//
// DOM selectors
//


var s = {
	'#': 'ById',
	'.': 'sByClassName'
};

function $(selector, context) {
	var what = s[selector.charAt(0)];
	return (context || D)['getElement'+(what || 'sByTagName')](selector.slice(what ? 1 : 0));
}


//
// DOM events
//


var addEvent = D.addEventListener ?
	function (element, type, callback) {
		return element.addEventListener(type, callback);
	}
	: function (element, type, callback) {
		element.attachEvent('on'+type, callback);
	};
#Fx.js

The tiny animation library - high performance, works with everthing from iOS to IE6, and dependency free. Perfect for applications where you need a lot of animation functionality without a lot of footprint.

##Features:

- **Super lightweight**: Just 1.9k minified + gzipped, or 3.6k minified
- **High performance**: Uses requestAnimationFrame and hardware-accelerated CSS transforms, degrades gracefully in older browsers (requestAnimationFrame degrades to timeouts, 3D degrades to 2D, X/Y transforms degrade to left/top). Consistently delivers 60FPS and above in modern browsers
- **Cross browser**: Tested in Chrome, Safari, Firefox, Opera, iOS, Android, and IE6+
- **Dependency-free**: No jQuery! No MooTools! No YUI! No Closure!

##Demo

[performancejs.com/Fx.js/demo](http://performancejs.com/Fx.js/demo/)

##Usage

```javascript

var fx = new Fx(DOMElement, property, options);

fx.get();		// get current value of the property
fx.set(value);	// immediately set value
fx.to(value);	// animate to value
```

##Example

```javascript

var element = document.getElementById('myElement');
var fx = new Fx(element, 'top', {
	duration: 1000
}).to(100);
```

##API

- `Fx.element` {DOMElement} Returns the element attached to the Fx instance
- `Fx.property` {String} Returns the property attached to the Fx instance
- `Fx.get()` {Function} Returns the current value of the property attached to the Fx instance
- `Fx.set(value)` {Function} Set the Fx instance's value immediately (without animating it)
- `Fx.to(value)` {Function} Animate the Fx instance to the given value

##Options

- `duration` {Number} The animation duration (in milliseconds)
- `animationStart` {Function} Animation start hook (arguments: element)
- `animationEnd` {Function} Animation end hook (arguments: element, framerate)
- `transition` {Function} Custom relative transition function (takes time since start)
- `unit` {String} Units (`px`, `%`, `em`, `deg`, etc.)

##Supported properties

 `bottom` `height` `left` `margin` `margin-bottom` `margin-left` `margin-right` `margin-top` `opacity` `padding` `padding-bottom` `padding-left` `padding-right` `padding-top` `right` `rotate` `rotate3d` `scale` `scale3d` `top` `translate` `translate3d` `width` `zoom`

###Fx.Scroll

`scrollLeft` `scrollTop`

##To do:

- Unit tests
- Support for transitioning multiple properties simultaneously
- Support for transitioning CSS classes
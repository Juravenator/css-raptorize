/*
 * Konami-JS ~
 * :: Now with support for touch events and multiple instances for
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in:
 * Safari 4+, Google Chrome 4+, Firefox 3+,
 * IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				};
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "38384040373937396665",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length)
					konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tapTolerance: 8,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			code: function (link) {
				konami.code(link);
			},
      touchCapture: function(evt) {
				konami.iphone.start_x = evt.changedTouches[0].pageX;
				konami.iphone.start_y = evt.changedTouches[0].pageY;
				konami.iphone.capture = true;
      },
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", function (e) {
					if (e.touches.length == 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, "touchend", function (evt) {
					konami.touchCapture(evt);
					konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, "touchstart", function (evt) {
					konami.touchCapture(evt);
				});
			},
			check_direction: function (link) {
				var x_magnitude = Math.abs(this.start_x - this.stop_x);
				var y_magnitude = Math.abs(this.start_y - this.stop_y);
				var hasMoved = (x_magnitude > this.tapTolerance || y_magnitude > this.tapTolerance);
				var result;
				if (this.capture === true && hasMoved) {
					this.capture = false;
					var x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
					var y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
					var result = (x_magnitude > y_magnitude) ? x : y;
				}
				else if (this.capture === false && !hasMoved) {
					result = (this.tap == true) ? "TAP" : result;
					result = "TAP";
				}
				if (result) {
					if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
					else this.keys = this.orig_keys;
				}
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === "string" && konami.load(callback);
	if (typeof callback === "function") {
		konami.code = callback;
		konami.load();
	}

	return konami;
};

/* This program is free software. It comes without any warranty, to
    * the extent permitted by applicable law. You can redistribute it
    * and/or modify it under the terms of the Do What The Fuck You Want
    * To Public License, Version 2, as published by Sam Hocevar. See
    * http://www.wtfpl.net/ for more details. */
var raptor = new Konami();

var makeRaptor = function(forReal) {
  if (typeof forReal === 'undefined') { forReal = true; }
  var raptorimg = document.createElement('img');
  raptorimg.setAttribute('id', 'rawr');
  raptorimg.setAttribute('src', 'media/raptor.png');

  var raptorsound = document.createElement('audio');
  var raptorsoundsource1 = document.createElement('source');
  var raptorsoundsource2 = document.createElement('source');
  raptorsoundsource1.setAttribute('src', 'media/rawr.mp3');
  raptorsoundsource1.setAttribute('type', 'audio/mpeg');
  raptorsoundsource2.setAttribute('src', 'media/rawr.ogg');
  raptorsoundsource2.setAttribute('type', 'audio/ogg');
  raptorsound.appendChild(raptorsoundsource1);
  raptorsound.appendChild(raptorsoundsource2);



  if (forReal) {
    raptorimg.setAttribute('animate', 'animate');
    document.body.appendChild(raptorimg);
    document.body.appendChild(raptorsound);
    raptorsound.play();

    setTimeout(function () {
      document.body.removeChild(raptorimg);
      document.body.removeChild(raptorsound);
    }, 6000);
  }
}


window.addEventListener('load', function() {
  // at page load we briefly add a hidden raptor to the DOM
  // to pre-load the image and sound files
  makeRaptor(false);
  //inline css here
});

raptor.code = makeRaptor;
raptor.load();

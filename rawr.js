/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details.
 */

window.onload = function setupRaptor() {
  var dir
  var scriptel = document.querySelector('script[src$="rawr.js"]')
  if (window.raptorizeRoot) {
    makeRaptor.root = window.raptorizeRoot
  }
  else if (scriptel) {
    makeRaptor.root = scriptel.getAttribute('src').slice(0, -"rawr.js".length)
  }
  else {
    makeRaptor.root = "/bower_components/css-raptorize/"
  }

  /*
   * detect user typing the magic word
   */
  var magicword = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  var pos = 0;
  document.addEventListener('keydown', function raptorKeyDown(event) {
    if (event.key === magicword[pos]) {
      pos += 1;
      if (pos === magicword.length) {
        makeRaptor(true);
        pos = 0;
      }
    }
    else {
      pos = 0;
    }
  });
  // at page load we briefly add a hidden raptor to the DOM
  // to pre-load the image and sound files
  makeRaptor(false);
  //inline css here
}



function makeRaptor(forReal) {
  if (typeof forReal === 'undefined') {
    forReal = true;
  }
  var raptorimg = document.createElement('img');
  raptorimg.setAttribute('id', 'rawr');
  raptorimg.setAttribute('src', makeRaptor.root + 'media/raptor.png');

  var raptorsound = document.createElement('audio');
  var raptorsoundsource1 = document.createElement('source');
  var raptorsoundsource2 = document.createElement('source');
  raptorsoundsource1.setAttribute('src', makeRaptor.root + 'media/rawr.mp3');
  raptorsoundsource1.setAttribute('type', 'audio/mpeg');
  raptorsoundsource2.setAttribute('src', makeRaptor.root + 'media/rawr.ogg');
  raptorsoundsource2.setAttribute('type', 'audio/ogg');
  raptorsound.appendChild(raptorsoundsource1);
  raptorsound.appendChild(raptorsoundsource2);



  if (forReal) {
    raptorimg.setAttribute('animate', 'animate');
    document.body.appendChild(raptorimg);
    document.body.appendChild(raptorsound);
    raptorsound.play();

    setTimeout(function() {
      document.body.removeChild(raptorimg);
      document.body.removeChild(raptorsound);
    }, 6000);
  }
}

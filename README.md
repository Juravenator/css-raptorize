# css-raptorize
Inspired from the original jQuery Raptorize plugin by ZURB. This version however does not use jQuery, but fancy css3 animations.
Original: https://github.com/zurb/jquery-raptorize

It uses the excellent konami-js library to detect the konami code in vanilla js.
https://code.google.com/archive/p/konami-js/

## What you need
To install raptorize in your project, run:
```
bower install --save css-raptorize
```
You can then include it in your project like this:
```html
<link  href="/bower_components/css-raptorize/rawr.css" rel="stylesheet">
<script src="/bower_components/css-raptorize/rawr.js"></script>
```

The script will detect where rawr.js is loaded from. And loads extra files (raptor.png, rawr.mp3, and rawr.ogg) from the `./media` directory.  
As a fallback, the script can also try to load these files from
`/bower_components/css-raptorize/media`.

If you have build system that would break both of these paths, you can also set `window.raptorizeRoot = "/my-custom/path/"` before `rawr.js` is run.

You can also use `inline/rawr.js`, which has all above listed files inlined in its source code.

## How do I get raptors on the screen?
Easy, press &ShortUpArrow; &ShortUpArrow; &darr; &darr; &larr; &rarr; &larr; &rarr; B A, and behold.

You can also call a raptor by executing `makeRaptor()`.

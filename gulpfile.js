var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var replace = require('gulp-replace');
var cssmin = require('gulp-cssmin');
var clean = require('gulp-clean');

var paths = {
  sass: ['./**/sass/*.scss', '!./bower_components/**/*.scss'],
  babel: ['./**/babel/*.js', '!./bower_components/**/*.js'],
  html: ['./**/src/html/*.html', '!./bower_components/**/*.html'],
  build: './**/_build',
}

gulp.task('default', ['injectjs'] ,function() {
  gulp.start('clean');
});

gulp.task('css', function () {
  return gulp.src('rawr.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions', '> 5%'],
		}))
    .pipe(cssmin())
    .pipe(gulp.dest(''));
});

gulp.task('injectcss',['css'] ,function () {
  return gulp.src('inlinecss.js')
    .pipe(replace('rawr.css', fs.readFileSync('rawr.css', 'utf8')))
    .pipe(gulp.dest('inline'));
});
gulp.task('injectjs',['injectcss'] ,function () {
  return gulp.src('rawr.js')
    .pipe(replace('//inline css here', fs.readFileSync('inline/inlinecss.js', 'utf8')))
    .pipe(replace('media/raptor.png', "data:image/png;base64," + new Buffer(fs.readFileSync('media/raptor.png')).toString('base64') ) )
    .pipe(replace('media/rawr.mp3', "data:audio/mp3;base64," + new Buffer(fs.readFileSync('media/rawr.mp3')).toString('base64') ) )
    .pipe(replace('media/rawr.ogg', "data:audio/ogg;base64," + new Buffer(fs.readFileSync('media/rawr.ogg')).toString('base64') ) )
    .pipe(gulp.dest('inline'));
});

gulp.task('clean', function () {
	return gulp.src('inline/inlinecss.js', {read: false})
		.pipe(clean());
});

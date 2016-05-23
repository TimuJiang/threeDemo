var os = require('os');
var path = require('path');
var gulp = require('gulp');

var browserSync = require('browser-sync').create();

gulp.task('web',function() {
	browserSync.init({
		server: {
			baseDir: ''
		},
		port: 3800,
		open: 'external',
		startPath: 'index.html'
	});
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLocation = 'scss/**/*.scss';

//Sets up the task to compile Sass into CSS
gulp.task('compileSass', function() {
	gulp.src(sassLocation)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

//Watch task
gulp.task('default', function(){
	gulp.watch(sassLocation, ['compileSass']);
});
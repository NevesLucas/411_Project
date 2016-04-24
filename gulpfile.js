var gulp    = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");
var gutil = require('gulp-util');

gulp.task('scripts', function() {
  gulp.src(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('app_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app_client'))
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }));
});

///*/*gulp.task('scripts', function () {
//      return gulp.src('./app_client/**/*.js')
 //       .pipe(uglify().on('error', function(e){
 //           console.log(e);
 //        }))
 //       .pipe(gulp.dest('minjs'));
//}); */*/



gulp.task('watch', function() {
  watch(['./app_client/**/*.js', '!./app_client/**/*.test.js', '!./app_client/app.min.js'], function () {
    gulp.start('scripts');
  });
});

gulp.task('default', ['scripts', 'watch']);
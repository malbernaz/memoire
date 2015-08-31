'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("./*.scss", ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.src("./*.scss")
      .pipe(sass())
      .pipe(prefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    watch = require('gulp-watch');

gulp.task('default', ['views', 'styles', 'scripts', 'serve']);

var errorHandler = function (error) {
  console.log(error.message);
  this.emit("end");
}

gulp.task('styles', function() {
  return gulp.src('./src/sass/application.sass')
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sass({ indentedSyntax: true }).on('error', util.log))
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('views', function() {
  return gulp.src('./src/views/**/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }).on('error', util.log))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('scripts', function () {
  return gulp.src('./src/javascripts/**/*.js')
    .pipe(plumber())
    .pipe(concat("application.js"))
    .pipe(gulp.dest('./app/javascripts'))
    .pipe(rename("application.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./app/javascripts"))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  });
  watch('./src/sass/**/*.sass', function(){ gulp.start('styles'); })
  watch('./src/views/**/*.pug', function(){ gulp.start('views'); })
  watch('./src/javascripts/**/*.js', function(){ gulp.start('scripts'); })
});
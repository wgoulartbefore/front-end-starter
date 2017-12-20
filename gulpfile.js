const config = require('./config.js');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const notify = require('gulp-notify');

gulp.task('browsersync-run', () => {
  browsersync.init(config.browsersync.options);

  gulp.watch(`${config.js.src}`, ['js']);
  gulp.watch(`${config.sass.src}`, ['sass']);
  gulp.watch(`${config.html.src}`, ['html']);
});

gulp.task('server', () => {
  browsersync.init(config.browsersync.options);

  gulp.watch(`${config.sass.src}`, ['sass']);
  gulp.watch(`${config.html.src}`, ['html']);
  gulp.watch(`${config.js.src}`, ['js']);
});

gulp.task('js', () => {
  return gulp.src(config.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', notify.onError({
      message: 'Error: <%= error.message %>'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.js.dist))
    .pipe(browsersync.stream());
});

gulp.task('js-watch', ['js'], () => {
  return watch([config.js.src], () => {
    gulp.start(['js']);
  });
});

gulp.task('html', () => {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dist))
    .pipe(browsersync.stream());
});

gulp.task('html-watch', ['html'], () => {
  return watch([config.html.src], () => {
    gulp.start(['html']);
  });
});

gulp.task('sass', () => {
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.sass.dist))
    .pipe(browsersync.stream());
});

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.dist))
});

gulp.task('vendors', () => {
  return gulp.src(config.vendors.src)
    .pipe(gulp.dest(config.vendors.dist))
});

gulp.task('clean', () => {
  return del('./dist');
});

gulp.task('development', [
  'html',
  'js',
  'sass',
  'browsersync-run',
]);

gulp.task('browser', [
  'server',
  'html',
  'js',
  'sass',
  'vendors',
  'images',
]);

gulp.task('dev', ['browser']);
gulp.task('default', ['development']);

const config      = require('./config.js');
const gulp        = require('gulp');
const sourcemaps  = require('gulp-sourcemaps');
const babel       = require('gulp-babel');
const del         = require('del');
const watch       = require('gulp-watch');
const sass        = require('gulp-sass');
const browsersync = require('browser-sync').create();
const notify      = require('gulp-notify');

gulp.task('browsersync-run', () => {
  browsersync.init(config.browsersync.options);
});

gulp.task('js', () => {
  del(config.js.del);
  return gulp.src(config.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', notify.onError({ message: 'Error: <%= error.message %>' }))
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
  del(config.html.del);
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
  del(config.sass.del);
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

gulp.task('sass-watch', ['sass'], () => {
  return watch([config.sass.src], () => {
    gulp.start('sass');
  });
});

gulp.task('development', [
  'html-watch',
  'js-watch',
  'sass-watch',
  'browsersync-run',
]);

gulp.task('default', ['development']);

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del');
const csso = require('gulp-csso');
const gulpStylelint = require('gulp-stylelint');
const pugLinter = require('gulp-pug-linter');
const webpackConfig = require('./webpack.config');

gulp.task('lint:template', () => (
  gulp
    .src('./**/*.pug')
    .pipe(pugLinter({ reporter: 'default' }))
));

const paths = {
  root: './dist',
  templates: {
    src: './src/**/*.pug',
    dest: './dist/',
  },
  styles: {
    src: './src/**/*.scss',
    dest: './dist/',
  },
  scripts: {
    src: ['./src/**/*.js', './src/**/*.vue'],
    dest: './dist/',
  },
  images: {
    src: './src/img/**/*',
    dest: './dist/images/',
  },
};

function server() {
  browserSync.init({
    server: paths.root,
  });
  browserSync.watch(`${paths.root}/**/*.*`, browserSync.reload);
}

function clean() {
  return del(paths.root);
}

function templates() {
  return gulp.src(paths.templates.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function lintCss() {
  return gulp.src('./src/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.scripts.src, scripts);
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.lintCss = lintCss;

gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, lintCss),
  ),
);

gulp.task(
  'start',
  gulp.series(
    gulp.parallel(watch, server),
  ),
);

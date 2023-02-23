const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del');
const csso = require('gulp-csso');
const gulpStylelint = require('gulp-stylelint');

const paths = {
  root: './dist',
  templates: {
    pages: './src/*.pug',
    src: './src/*.pug',
    dest: './dist/',
  },
  modules: {
    src: './src/modules/*.pug',
    dest: './dist/modules/',
  },
  styles: {
    main: './src/*.scss',
    src: './src/*.scss',
    dest: './dist/',
  },
  components: {
    src: './src/components/*.scss',
    dest: './dist/components/',
  },
  sripts: {
    src: './srs/*js',
    dest: './dist/',
  },
  images: {
    src: './src/img/content-image/*',
    dest: './dist/images/content-image',
  },
  icons: {
    src: './src/img/icons/*',
    dest: './dist/images/icons',
  },

};

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.modules.src, modules);
  gulp.watch(paths.components.src, components);
}

function server() {
  browserSync.init({
    server: paths.root,
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function clean() {
  return del(paths.root);
}

function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

function modules() {
  return gulp.src(paths.modules.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

function components() {
  return gulp.src(paths.components.src)
    .pipe(sass({ pretty: true}))
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
  return gulp.src(paths.sripts.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.sripts.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function icons() {
  return gulp.src(paths.icons.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.icons.dest));
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

exports.templates = templates;
exports.modules = modules;
exports.styles = styles;
exports.components = components;
exports.scripts = scripts;
exports.images = images;
exports.icons = icons;
exports.clean = clean;
exports.lintCss = lintCss;

gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(styles, templates, modules, components, images, icons, scripts, lintCss),
  ),
);

gulp.task(
  'start',
  gulp.series(
    gulp.parallel(watch, server),
  ),
);

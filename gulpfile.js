import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgo';
import { stacksvg } from "gulp-stacksvg"
import del from 'del';


// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// html
export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// script
export const script = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// img

export const images = () => {
  return gulp.src('source/img/*.jpg')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

// webp

const createWebp = () => {
  return gulp.src('source/img/*.jpg')
  .pipe(squoosh( {
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
}

// svg sprite

export const sprite = () => {
  return gulp.src('source/img/*.svg')
  .pipe(svgo())
  .pipe(stacksvg({
    inlineSvg: true
  }))
  .pipe(rename('stack.svg'))
  .pipe(gulp.dest('build/img'));
}

// fonts, favicons

export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest',
    'source/img/favicons/*',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// clean

export const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

//  build

export const build = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(
  html,
  styles,
  script,
  createWebp,
  sprite,
  ),
  gulp.series(
  server,
  watcher
));


export default gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(
  html,
  styles,
  script,
  createWebp,
  sprite,
  ),
  gulp.series(
  server,
  watcher
));

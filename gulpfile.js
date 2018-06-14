const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync')
const gcmq = require('gulp-group-css-media-queries')
const scss = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const path = require('path')

const config = {
  src: './',
  css: {
    src: '/dev/style.scss',
    watch: '/dev/**/*.scss',
    dest: path.resolve(__dirname, '/public/css')
  },
  html: {
    src: './public/index.html'
  }
}

gulp.task('build', () => {
  gulp.src(config.src + config.css.src)
    .pipe(scss())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(config.src + config.css.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync'], () => {
  gulp.watch(config.src + config.css.watch, ['dev'])
  gulp.watch(config.src + config.html.src, browserSync.reload)
})

gulp.task('dev', () => {
  gulp.src(config.src + config.css.src)
    .pipe(scss())
    .pipe(gulp.dest(config.src + config.css.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('optiimages', () => {
  return gulp.src('images/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(config.src + '/public/images'))
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: config.src + '/public'
    }
  })
})

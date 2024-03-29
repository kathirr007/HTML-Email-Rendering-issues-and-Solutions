var gulp = require('gulp'),
  browsersync = require('browser-sync'),
  pngcrush = require('imagemin-pngcrush'),
  clean = require('del'),
  jQuery = require('jquery'),
  // jQuery = require('scrollmagic'),
  pkg = require('./package.json'),
  $ = require('gulp-load-plugins')({ lazy: true })
var env,
  devBuild,
  jsSources,
  bootstrapSources,
  sassSources,
  htmlSources,
  jsonSources,
  imgSources,
  sourceDir,
  nodeModules,
  outputDir
var sassOpts = {}
env = process.env.NODE_ENV || 'development'
devBuild = process.env.NODE_ENV || 'development'
sourceDir = 'sources/'
outputDir = env == 'development' ? 'builds/development/' : 'dist/'
nodeModules = './node_modules/'
bootstrapSources = nodeModules + 'bootstrap-sass/'
fonts = [bootstrapSources + 'assets/fonts/**/*', sourceDir + 'assets/fonts/*.*']
imgSources = [sourceDir + 'assets/images/**/*']
jsSources = [
  nodeModules + 'jquery/dist/jquery.min.js',
  nodeModules + 'scrollmagic/scrollmagic/minified/**/*',
  bootstrapSources + 'assets/javascripts/bootstrap.min.js',
  sourceDir + 'assets/js/*.js'
]
sassSources = [
  bootstrapSources + 'assets/stylesheets/**/*.scss',
  sourceDir + 'assets/scss/**/*.scss'
]
// htmlSources = [sourceDir + '*.html'];
htmlSources = {
  in: sourceDir + '*.html',
  watch: [sourceDir + '*.html', sourceDir + 'template/**/*'],
  out: outputDir,
  context: {
    devBuild: devBuild,
    author: pkg.author,
    version: pkg.version
  }
}
jsonSources = [sourceDir + 'assets/json/*.json']
sassOpts = {
  outputStyle: env == 'development' ? 'nested' : 'compressed',
  precison: 3,
  errLogToConsole: true,
  includePaths: [bootstrapSources + 'assets/stylesheets']
}
gulp.task('clean', cb => {
  clean(outputDir)
  cb()
})
gulp.task('fonts', () => {
  return gulp
    .src(fonts)
    .pipe(gulp.dest(outputDir + 'assets/fonts'))
    .pipe($.connect.reload())
})
gulp.task(
  'sass',
  gulp.parallel('fonts', () => {
    return gulp
      .src(sassSources)
      .pipe($.jsbeautifier())
      .pipe($.sourcemaps.init())
      .pipe($.sass(sassOpts).on('error', $.sass.logError))
      .pipe(
        $.autoprefixer({
          overrideBrowserslist: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
          ]
        })
      )
      .pipe($.sourcemaps.write('./maps'))
      .pipe(gulp.dest(outputDir + 'assets/css/'))
      .pipe($.connect.reload())
  })
)
gulp.task('html', () => {
  return gulp
    .src(sourceDir + '*.html')
    .pipe($.preprocess({ context: { devBuild: devBuild } }))
    .pipe($.jsbeautifier())
    // .pipe(
    //   $.if(devBuild === 'production', $.htmlmin({ collapseWhitespace: true }))
    // )
    .pipe(gulp.dest(outputDir))
    .pipe($.connect.reload())
})
gulp.task('images', () => {
  return gulp
    .src(imgSources)
    .pipe($.newer(outputDir + 'assets/images'))
    .pipe(
      $.if(
        env === 'production',
        $.imagemin({
          progressive: true,
          svgoPlugin: [{ removeViewBox: false }],
          use: [pngcrush()]
        })
      )
    )
    .pipe(gulp.dest(outputDir + 'assets/images'))
    .pipe($.connect.reload())
})
gulp.task('js', () => {
  return gulp
    .src(jsSources)
    .pipe($.preprocess())
    .pipe($.if(env === 'production', $.uglify()))
    .pipe(gulp.dest(outputDir + 'assets/js'))
    .pipe($.connect.reload())
})
gulp.task('json', () => {
  return (
    gulp
      .src(jsonSources)
      .pipe($.preprocess())
      // .pipe($.jsbeautifier())
      .pipe($.jsonminify())
      .pipe($.if(env === 'production', $.jsonminify()))
      .pipe(gulp.dest(outputDir + 'assets/json'))
  )
})
gulp.task('jsontest', () => {
  return (
    gulp
      .src(jsonSources)
      .pipe($.preprocess())
      // .pipe($.jsbeautifier())
      .pipe($.jsonminify())
      .pipe($.if(env === 'production', $.jsonminify()))
      .pipe(gulp.dest(outputDir + 'assets/json'))
  )
})
gulp.task(
  'deploy',
  gulp.parallel('html', 'sass', 'js', 'images', 'json', () => {
    return gulp.src('./builds/development/**/*').pipe($.ghPages())
  })
)
gulp.task('connect', cb => {
  $.connect.server({
    root: outputDir,
    livereload: true
  })
  cb()
})
gulp.task('browsersync', cb => {
  browsersync({
    server: {
      baseDir: outputDir
    },
    open: false,
    notify: true
  })
  cb()
})
gulp.task(
  'watch',
  gulp.parallel('connect', cb => {
    gulp.watch(jsSources, gulp.series('js'))
    gulp.watch(jsonSources, gulp.series('json'))
    gulp.watch(sassSources, gulp.series('sass'))
    gulp.watch(imgSources, gulp.series('images'))
    gulp.watch(htmlSources.watch, gulp.series('html'))
    cb()
  })
) // default travis CI

gulp.task(
  'build',
  gulp.parallel('html', 'sass', 'js', 'images', 'json', cb => cb())
)
// default gulp
gulp.task(
  'default',
  gulp.parallel('html', 'sass', 'js', 'images', 'json', 'watch')
)

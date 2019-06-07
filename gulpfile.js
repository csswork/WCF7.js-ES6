var gulp = require('gulp');
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');


gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload({ start: true }));
});

// gulp.task('uglify', function() {
//   gulp.src([
//     './script/libs/jquery.js',
//     './script/libs/*.js'
//   ])
//     .pipe(uglify('libs.min.js', {
//       outSourceMap: true
//     }))
//     .pipe(gulp.dest('./script'))
//     .pipe(livereload({ start: true }));
// });

var watcher = gulp.watch('./sass/*.scss', ['compass']);
watcher.on('change', function(event) {
  livereload.listen();
  console.log('File ' + event.path + ' was ' + event.type + ', updated styles...');
});

// var watcherScript = gulp.watch('./script/libs/*.js', ['uglify']);
// watcherScript.on('change', function(event) {
//   livereload.listen();
//   console.log('File ' + event.path + ' was ' + event.type + ', running uglify js...');
// });

var watcherFun = gulp.watch('./script/*.js');
watcherFun.on('change', function(event) {
  livereload.reload(event.path);
  console.log('File ' + event.path + ' was ' + event.type + ', updated script...');
});

var watcherPhp = gulp.watch('./*.php');
watcherPhp.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', updated php...');
    livereload.changed(event.path);
});

var watcherPhp2 = gulp.watch('./*/*.php');
watcherPhp2.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', updated php...');
    livereload.changed(event.path);
});
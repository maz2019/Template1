var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  minify = require('gulp-minify'),
  notify = require("gulp-notify");
  
  

// HTML Task
gulp.task("html", function () {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(notify('HTML Task Done'))
    .pipe(livereload());
});
// CSS Task
gulp.task('css', function () {
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
});
// JS Task
gulp.task("js", function () {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});
// Compress Files
// gulp.task('compress', function(){
//   return gulp.src('dist/**/*.*')
//         .pipe(zip('website.zip'))
//         .pipe(gulp.dest('.'))
        // .pipe(notify('Compress Done'))

// });
// Upload Design with ftp
// gulp.task( 'deploy', function () {
 
//   var conn = ftp.create( {
//       host:     'm-elazhary.info',
//       user:     'me',
//       password: 'mypass',
//       parallel: 10,
//   } );

  
  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

//   return gulp.src( ['dist/**/*.*'], { base: '.', buffer: false } )
//       .pipe( conn.newer( '/public_html' ) ) // only upload newer files
//       .pipe( conn.dest( '/public_html' ) )
//       .pipe(livereload())

// } );
// Watch Task
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("stage/html/*.pug", ["html"]);
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], ["css"]);
  gulp.watch("stage/js/*.js", ["js"]);
  // gulp.watch("dist/**/*.*", ["compress"]);
  // gulp.watch("dist/**/*.*", ["deploy"]);
});

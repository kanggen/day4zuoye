var gulp = require('gulp');
var server = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path')
var url = require('url')

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            // open: true,
            livereload: true,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                // console.log(pathname)
                if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
                } else if (pathname === '/list') {

                } else if (pathname === '/icon') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src/icon', 'iconfont.css')))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    console.log(pathname + 1)
                    var src = '';
                    if (path.extname(pathname) === '.css') {
                        src = 'src/css';
                    } else if (path.extname(pathname) === '.js') {
                        src = 'src/js'
                    } else if (path.extname(pathname) === '.jpg') {
                        src = 'src/img'
                    }

                    res.end(fs.readFileSync(path.join(__dirname, src, pathname)))
                }
            }
        }))
})
gulp.task('dev', gulp.series('server', 'sass', 'watch'))
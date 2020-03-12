var gulp = require("gulp"),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('html', function(){
    gulp.src('app/index.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch', ['browserSync'],function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/index.html', ['html']);
    // інші ресурси
});

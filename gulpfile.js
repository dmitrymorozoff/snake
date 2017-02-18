var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('jade', function() {
    gulp.src('src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'uglify', 'sass', 'jade'], function() {
    gulp.watch('src/sass/**/*.scss', [sass]);
    gulp.watch('src/*.jade', [jade]);
    gulp.watch('src/js/**/*.js', [uglify]);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
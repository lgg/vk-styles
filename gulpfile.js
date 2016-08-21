/* Vars */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus = require('gulp-stylus');


/* Sources */
var src_soft = 'sources/vk-soft-fixes/**/*.styl';
var src_rounds = 'sources/vk-remove-rounds/**/*.styl';


/* Destination folder */
var DEST = 'dist/';


/* Other */
var browsers_ver = ['not ie <= 9', 'iOS > 7'];


/* Tasks */
gulp.task('default', ['build', 'watch']);

gulp.task('build', [
    'reloadStylus'
]);


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(src_soft, ['reloadStylus']);
    gulp.watch(src_rounds, ['reloadStylus']);
});



/* -------------------- Stylus */
//Reload
gulp.task('reloadStylus', function () {
    gulp.src(src_soft)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-soft-fixes.css"))
        .pipe(gulp.dest(DEST));

    gulp.src(src_rounds)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-remove-rounds.css"))
        .pipe(gulp.dest(DEST));
});
/* Vars */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    cleancss = require('gulp-clean-css');


/* Sources */
var src_soft = 'sources/vk-soft-fixes/**/*.styl',
    src_rounds = 'sources/vk-remove-rounds/**/*.styl',
    src_soft_us = 'sources/userstyles.org/vk-soft-fixes.styl',
    src_rounds_us = 'sources/userstyles.org/vk-remove-rounds.styl';


/* Destination folder */
var DEST = 'dist/';


/* Other */
var browsers_ver = ['not ie <= 10', 'iOS > 7'];


/* Tasks */
gulp.task('default', ['build', 'watch']);

gulp.task('build', [
    'buildStylus',
    'buildStylusForUserstyles'
]);

gulp.task('build-us', [
    'buildStylusForUserstyles'
]);


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(src_soft, ['reloadStylus']);
    gulp.watch(src_rounds, ['reloadStylus']);
});


/* -------------------- Stylus func */

function compileStylus(src, filename, dest) {
    gulp.src(src)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat(filename))
        .pipe(gulp.dest(dest));
}

function buildStylus(src, filename, dest) {
    gulp.src(src)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat(filename))
        .pipe(cleancss({}))
        .pipe(gulp.dest(dest));
}

/* -------------------- Stylus */
//Reload
gulp.task('reloadStylus', function () {
    compileStylus(src_soft, "vk-soft-fixes.css", DEST);
    compileStylus(src_rounds, "vk-remove-rounds.css", DEST);
});

//Build
gulp.task('buildStylus', function () {
    buildStylus(src_soft, "vk-soft-fixes.css", DEST);
    buildStylus(src_rounds, "vk-remove-rounds.css", DEST);
});

//Build
gulp.task('buildStylusForUserstyles', function () {
    buildStylus(src_soft_us, "vk-soft-fixes.us.css", DEST);
    buildStylus(src_rounds_us, "vk-remove-rounds.us.css", DEST);
});
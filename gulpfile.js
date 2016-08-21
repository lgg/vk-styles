/* Vars */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus = require('gulp-stylus'),
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

//Build
gulp.task('buildStylus', function () {
    gulp.src(src_soft)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-soft-fixes.css"))
        .pipe(cleancss({}))
        .pipe(gulp.dest(DEST));

    gulp.src(src_rounds)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-remove-rounds.css"))
        .pipe(cleancss({}))
        .pipe(gulp.dest(DEST));
});

//Build
gulp.task('buildStylusForUserstyles', function () {
    gulp.src(src_soft_us)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-soft-fixes.us.css"))
        .pipe(cleancss({}))
        .pipe(gulp.dest(DEST));

    gulp.src(src_rounds_us)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: browsers_ver,
            cascade: false
        }))
        .pipe(concat("vk-remove-rounds.us.css"))
        .pipe(cleancss({}))
        .pipe(gulp.dest(DEST));
});
const gulp = require("gulp");
const sass = require("gulp-sass");
const image = require("gulp-image");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

//copy html files
function copyHTML() {
    return gulp.src("./src/*.html")
    .pipe(gulp.dest("./dist/"))
}

// compile scss to css THEN MINIFY CSS
function style() {
    //TODO: Find my SCSS file
    return gulp.src("./src/Sass/**/*.scss")
    //TODO: Pass that file through Sass compiler
    .pipe(sass().on("error", sass.logError))
    //TODO: MINIFY THE Newly transform CSS
    .pipe(cleanCSS())
    //TODO: Pass location to save compiled CSS
    .pipe(gulp.dest("./dist/CSS"))
    //TODO: stream changes to all browsers
    .pipe(browserSync.stream())
}

function minImage() {
    return gulp.src("./src/Images/*")
    .pipe(image({
        jpegRecompress: true,
        jpegoptim: false,
        mozjpeg: false,
        concurrent: 10
    }))
    .pipe(gulp.dest("./dist/Images"))
}

function copyIcons() {
    return gulp.src("./src/Icons/**/*")
    .pipe(gulp.dest("./dist/Icons"))
}

function transpileMinifyJS() {
    return gulp.src("./src/JS/index.js")
    .pipe(babel({
        presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/JS"))
}

function watch() {
    browserSync.init({
        //SETUP SERVER
        server: {
            // DIRECTORY TO SERVE THE FILES FROM
            baseDir: "./dist"
        }
    });
    //NOTE: parametres for gulp.watch = location to watch and name of the task
    gulp.watch("./src/Sass/**/*.scss", style);
    gulp.watch("./src/Images/*", minImage)
    gulp.watch("./src/JS/index.js", transpileMinifyJS);
    gulp.watch("./dist/*.html").on("change", browserSync.reload);
    gulp.watch("./src/JS/index.js").on("change", browserSync.reload);
}

exports.copyHTML = copyHTML;
exports.style = style;
exports.minImage = minImage;
exports.watch = watch;
exports.transpileMinifyJS = transpileMinifyJS;
exports.copyIcons = copyIcons;
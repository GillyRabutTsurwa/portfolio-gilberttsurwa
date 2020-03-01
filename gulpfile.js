const gulp = require("gulp");
const sass = require("gulp-sass");
const htmlMin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

function minifyHTML() {
	return (
		gulp
			.src("./src/*.html")
			.pipe(htmlMin({
				collapseWhitespace: true
			}))
			.pipe(gulp.dest("./dist/"))
	);
}

function style() {
	return (
		gulp
			.src("./src/Sass/*.scss")
			.pipe(sass().on("error", sass.logError))
			.pipe(cleanCSS())
			.pipe(gulp.dest("./dist/CSS"))
			.pipe(browserSync.stream())
	);
}

function copyImages() {
	return gulp.src("./src/Images/*").pipe(gulp.dest("./dist/Images"));
}

function copyIcons() {
	return (
		gulp
			.src("./src/Icons/**/*")
			.pipe(gulp.dest("./dist/Icons"))
	);
}

function transpileMinifyJS() {
	return (
		gulp
			.src("./src/JS/index.js")
			.pipe(
				babel({
					presets: [ "@babel/preset-env" ]
				})
			)
			.pipe(uglify())
			.pipe(gulp.dest("./dist/JS"))
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	gulp.watch("./src/*.html", minifyHTML);
	gulp.watch("./src/Sass/*.scss", style);
	gulp.watch("./src/Images/*", copyImages);
	gulp.watch("./src/JS/index.js", transpileMinifyJS);
	gulp.watch("./src/*.html").on("change", browserSync.reload);
	gulp.watch("./src/JS/index.js").on("change", browserSync.reload);
}

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.copyImages = copyImages;
exports.watch = watch;
exports.transpileMinifyJS = transpileMinifyJS;
exports.copyIcons = copyIcons;

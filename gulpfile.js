const gulp = require("gulp");
const sass = require("gulp-sass");
const htmlMin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

function minifyHTML() {
	return gulp
		.src("./src/*.html")
		.pipe(
			htmlMin({
				collapseWhitespace: true,
				removeComments: true
			})
		)
		.pipe(gulp.dest("./dist/"));
}

function style() {
	return gulp
		.src("./src/sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest("./dist/css"))
		.pipe(browserSync.stream());
}

function copyImages() {
	return gulp.src("./src/images/*").pipe(gulp.dest("./dist/images"));
}

function copyIcons() {
	return gulp.src("./src/icons/**/*").pipe(gulp.dest("./dist/icons"));
}

function copyDocs() {
	return gulp.src("./src/docs/*").pipe(gulp.dest("./dist/docs"));
}

function transpileMinifyJS() {
	return (
		gulp
			.src("./src/js/*.js")
			/**
		 * .pipe(
			babel({
				presets: [ "@babel/preset-env" ]
			})
		)
		 */
			.pipe(gulp.dest("./dist/js"))
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
		browser: "google chrome"
	});
	gulp.watch("./src/*.html", minifyHTML);
	gulp.watch("./src/sass/**/*.scss", style);
	gulp.watch("./src/images/*", copyImages);
	gulp.watch("./src/js/*.js", transpileMinifyJS);
	gulp.watch("./src/*.html").on("change", browserSync.reload);
	// no need to watch copydocs
	gulp.watch("./src/js/index.js").on("change", browserSync.reload);
}

exports.minifyHTML = minifyHTML;
exports.style = style;
exports.copyImages = copyImages;
exports.transpileMinifyJS = transpileMinifyJS;
exports.copyIcons = copyIcons;
exports.copyDocs = copyDocs;
exports.watch = watch;

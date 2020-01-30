//TODO: INSTALL ALL GULP Packages NEEDED
//NOTE: Needed for everything else to work. The engine
const gulp = require("gulp");
//NOTE: Looks for Sass files and transpiles it to CSS
const sass = require("gulp-sass");
//NOTE: Optimises and compresses JPEG images.... or so it seems
const image = require("gulp-image");
//NOTE: Minifies our CSS
const cleanCSS = require("gulp-clean-css");
/**
 * NOTE: Transpiles our ES6 to ES5
 * @babel/core AND @babel/preset-env are needed for full transpilation to work
 */
const babel = require("gulp-babel");
//NOTE: Minifies our JS
const uglify = require("gulp-uglify");
/**
 * Ceci explique que fait browser-sync mieux que moi:
 * https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development
 */
const browserSync = require("browser-sync").create();

//TODO: COPY HTML FILES FROM SRC TO DIST USING A FUNCTION
function copyHTML() {
	// gulp.src("location of file(s)/folder(s) we want to select")
	return (
		gulp
			.src("./src/*.html")
			// Where we want to output the copied HTML folder. In our case, in our dist folder
			.pipe(gulp.dest("./dist/"))
	);
}

//TODO: COMPILE OUR SCSS TO CSS.
//TODO: THEN MINIFY OUR CSS
function style() {
	//TODO: Find my SCSS file in src folder
	return (
		gulp
			.src("./src/Sass/**/*.scss")
			//TODO: Pass that file through Sass compiler - our gulp-sass package under the
			// name sass handles this.
			//TODO: Addition modify for better error output
			.pipe(sass().on("error", sass.logError))
			//TODO: Minify the newly transformed CSS
			.pipe(cleanCSS())
			//TODO: Output the transformed SCSS-come-minified CSS to our inside a CSS foler inside our dist folder
			.pipe(gulp.dest("./dist/CSS"))
			//QUESTION: What does this do again? watch Kevin Powell's gulp video to refresh
			.pipe(browserSync.stream())
	);
}

//NOTE: Don't know if the parametres of this function minify it but it seemed to work fine
function copyImages() {
	return gulp.src("./src/Images/*").pipe(gulp.dest("./dist/Images"));
}

//TODO: Copy Icons folder (and ALL of its inner contents) from src to dist
function copyIcons() {
	//TODO: Find every subdirectory and folder (literally everything) inside our Icons folder
	return (
		gulp
			.src("./src/Icons/**/*")
			//TODO: Output all that in our Icons folder inside our dist folder
			.pipe(gulp.dest("./dist/Icons"))
	);
}

/** 
 * TODO: Transpile our ES6 javascript to ES5. This is important
 * TODO: Minify our newly transpiled ES5 JS.
 */
function transpileMinifyJS() {
	//TODO: Target desired file(s). Dans notre cas, c'est our index.js dedans le dossier src
	return (
		gulp
			.src("./src/JS/index.js")
			/**
     * NOTE: This code below transpiles our ES6 to ES5.
     * IMPORTANT:NOTE: @babel/core and @babel/preset-env need to be installed along babel
     * don't forget the "gulp-" prefix
     */
			.pipe(
				babel({
					//NOTE: @babel/preset-env package makes this line work
					presets: [ "@babel/preset-env" ]
				})
			)
			.pipe(uglify())
			.pipe(gulp.dest("./dist/JS"))
	);
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
	gulp.watch("./src/*.html", copyHTML);
	gulp.watch("./src/Sass/**/*.scss", style);
	gulp.watch("./src/Images/*", copyImages);
	gulp.watch("./src/JS/index.js", transpileMinifyJS);
	// gulp.watch("./dist/*.html").on("change", browserSync.reload);
	gulp.watch("./src/*.html").on("change", browserSync.reload);
	gulp.watch("./src/JS/index.js").on("change", browserSync.reload);
}

exports.copyHTML = copyHTML;
exports.style = style;
exports.copyImages = copyImages;
exports.watch = watch;
exports.transpileMinifyJS = transpileMinifyJS;
exports.copyIcons = copyIcons;

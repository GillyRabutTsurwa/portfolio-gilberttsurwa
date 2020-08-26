var gulp = require("./node_modules/gulp");
var minifyCSS = require("./node_modules/gulp-minify-css");
var concatCss = require("./node_modules/gulp-concat-css");
var plumber = require("./node_modules/gulp-plumber");

gulp.task("concat-css", function() {
	gulp
		.src([ "./devicon.css", "./devicon-colors.css" ])
		.pipe(plumber())
		.pipe(concatCss("./devicon.min.css"))
		.pipe(gulp.dest("./"));
});

gulp.task("minify-css", function() {
	gulp.src("./devicon.min.css").pipe(plumber()).pipe(minifyCSS()).pipe(gulp.dest("./"));
});

const { src, dest, watch, series, parallel } = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const uglify        = require('gulp-uglify');

const files = {
	sassPath: 'src/sass/**/*.scss',
	jsPath: 'src/js/**/*.js',
};

async function sassStylesTask() {
	return src(files.sassPath, { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist/css', { sourcemaps: '.' }));
}

async function sassEditorStylesTask() {
	return src(files.sassPath, { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist/css', { sourcemaps: '.' }));
}

async function jsTask() {
	return src(files.jsPath, { sourcemaps: true })
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(dest('dist/js', { sourcemaps: '.' }));
    return true;
}

async function watchTask() {
	watch(
		[files.sassPath, files.jsPath],
		{ interval: 1000, usePolling: true },
		series(parallel(sassStylesTask, sassEditorStylesTask, jsTask))
	);
}

exports.default = series(parallel(sassStylesTask, sassEditorStylesTask, jsTask), watchTask);
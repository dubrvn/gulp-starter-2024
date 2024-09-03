const {src, dest, watch, series, parallel} = require('gulp');
const browserSync = require("browser-sync").create();
const del = require('del');


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

// Обработка HTML
const html = () => {
	return src('./src/html/*.html')
	.pipe(plumber({
		errorHandler: notify.onError(error =>({
			title: "HTML",
			message: error.message
		}))
	}))
	.pipe(fileInclude())
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(dest('./public'))
	.pipe(browserSync.stream());
}

//Удаление директории
const clear = () => {
	return del("./public");
}


//Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: "./public"
		}
	});
}

//Наблюдение
const watcher = () => {
	watch("./src/html/**/*.html", html);
}

//Публичные задачи
exports.html = html;
exports.watcher = watcher;
exports.clear = clear;

//Сборка
exports.dev = series(
	clear,
	html,
	parallel(watcher, server)
);
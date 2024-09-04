const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();


//Конфигурация
const path = require("./config/path.js");


//Задачи
const clear = require('./task/clear.js')
const html = require('./task/html.js')
const css = require('./task/css.js')


//Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	});
}

//Наблюдение
const watcher = () => {
	watch(path.html.watch, html).on("all", browserSync.reload);
	watch(path.css.watch, css).on("all", browserSync.reload);
}

//Публичные задачи
exports.html = html;
exports.css = css;

//Сборка
exports.dev = series(
	clear,
	parallel(html, css),
	parallel(watcher, server)
);
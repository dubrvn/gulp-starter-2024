const {src, dest} = require("gulp");

//Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");


// Обработка Images
const img = () => {
	return src(path.img.src, {encoding: false})
	.pipe(plumber({
		errorHandler: notify.onError(error =>({
			title: "Images",
			message: error.message
		}))
	}))
	.pipe(newer(path.img.dest))
	.pipe(webp())
	.pipe(dest(path.img.dest))
	.pipe(src(path.img.src, {encoding: false}))
	.pipe(newer(path.img.dest))
	.pipe(gulpif(app.isProd, imagemin(app.imagemin)))
	.pipe(dest(path.img.dest));
}


module.exports = img;
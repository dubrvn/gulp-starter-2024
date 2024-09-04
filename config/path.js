const pathSrc = "./src";
const pathDest = "./public";

module.exports = {
	root: pathDest,

	html: {
		src: pathSrc + "/html/*.html",
		watch: pathSrc + "/html/**/*.html",
		dest: pathDest
	},

	css: {
		src: pathSrc + "/css/*.css",
		watch: pathSrc + "/css/**/*.css",
		dest: pathDest + "/css"
	}

}
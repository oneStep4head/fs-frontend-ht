var browserSync = require ('browser-sync');

	browserSync({
	server: "./",
	files: ["./*.html","./css/*.css","./js/*.js"],
	open: false
});
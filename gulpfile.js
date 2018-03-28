const gulp          = require("gulp");
const sass          = require("gulp-sass");
const tildeImporter = require("node-sass-tilde-importer");
const batch         = require("gulp-batch");
const watch         = require("gulp-watch");

gulp.task("sass", () => {
    return gulp.src("./src/stylesheets/scss/*.scss")
               .pipe(sass({
                              importer: tildeImporter
                          }))
               .pipe(gulp.dest("./src/stylesheets/css"));
});


gulp.task("default", ["sass"]);


gulp.task("watch-dev", ()=>{
    watch('./src/stylesheets/scss/*.scss', batch(function (events, done) {
        gulp.start('sass', done);
    }));
});

gulp.task("dev-mode", ["default", "watch-dev"]);
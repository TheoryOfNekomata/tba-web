/*global require*/

(function(require, undefined) {

    "use strict";

    var gulp = require("gulp");

    /*
     * Process styles
     */

    gulp.task("styles", function() {

        var utils = {
            compile: require("gulp-sass"),
            compress: require("gulp-uglifycss")
        };

        gulp.src("style.sass")
            .pipe(utils.compile({ indentedSyntax: true }))
            //.pipe(utils.compress())
            .pipe(gulp.dest("."));

    });

    /*
     * Process scripts
     */

    gulp.task("scripts", function() {

        var utils = {
            compress: require("gulp-uglify"),
            concat: require("gulp-concat")
        };

        gulp.src([
            "lib/jquery/dist/jquery.js",
            "lib/bootstrap-sass/assets/javascripts/bootstrap.js",
            "lib/packery/dist/packery.pkgd.js",
            "app/js/**/*.js"
            // add more globs here
        ])
            .pipe(utils.concat("script.js"))
            //.pipe(utils.compress())
            .pipe(gulp.dest("."));

    });

    /*
     * Test script
     */

    gulp.task("test", function() {

        var utils = {
            test: require("gulp-protractor")
        };

        gulp.src("app/tests/**/*.js")
            .pipe(utils.test())
            .pipe(gulp.dest("."));

    });

    /*
     * Default task
     */

    gulp.task("default", ["scripts", "styles"]);

})(require);

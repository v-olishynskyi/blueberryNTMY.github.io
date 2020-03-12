const { src, dest, task } = require("gulp");
const minify = require("gulp-minify");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");

function css() {
  return src("src/style/style.css")
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(dest("./build/css"));
}

function scripts() {
  return src("src/js/*.js")
    .pipe(minify())
    .pipe(dest("./build/js"));
}

task("css", css);
task("js", scripts);

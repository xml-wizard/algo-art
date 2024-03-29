import gulp from "gulp";
import { deleteSync } from "del";
import njk from "gulp-nunjucks-render";
import html from "gulp-beautify";
var { src, dest, series, watch } = gulp;

function watchFiles() {
  return watch(["assets/xml/**/*+(njk)"], _html);
}
function _html() {
  return src("assets/xml/pages/*.+(html|njk)")
    .pipe(njk({ path: ["assets/xml"] }))
    .pipe(dest("app"));
}
function clean() {
  return deleteSync(["app"]);
}

function js() {
  return src("*assets/js/*").pipe(dest("app"));
}
function css() {
  return src("*assets/css/algo-art.css").pipe(dest("app"));
}
export const build = series(_html, css);
export const _default = series(_html, js, css, watchFiles);

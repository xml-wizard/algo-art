import gulp from "gulp";
import { deleteSync } from "del";
import njk from "gulp-nunjucks-render";
import html from "gulp-beautify";
var { src, dest, series, watch } = gulp;

var clean = () => deleteSync(["app"]),
  _html = () =>
    src("assets/xml/pages/*.+(html|njk)")
      .pipe(njk({ path: ["assets/xml"] }))
      .pipe(html({ indent_size: 4, preserve_newlines: false }))
      .pipe(dest("app")),
  watchFiles = () => watch("src/html/**/*", _html);

export const build = series(clean, html);
export const _default = series(clean, html, watchFiles);

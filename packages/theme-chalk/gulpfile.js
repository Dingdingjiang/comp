const { series, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');


async function compile() {
  const autoprefixer = (await import('gulp-autoprefixer')).default

  return src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))  // 编译并处理错误
    .pipe(autoprefixer({  // 添加前缀
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())  // 压缩
    .pipe(dest('./lib'));  // 输出
}

exports.build = series(compile);
const { src, dest, parallel, series, watch } = require('gulp');

// 使用自动化加载插件
const plugins = require('gulp-load-plugins')();

// 开发服务器
const browserSync = require('browser-sync').create();

// 清空文件夹
const del = require('del');

// 返回当前命令行所在的工作目录
const cwd = process.cwd();
let config = {
  // default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**',
    },
  },
};

try {
  const loadConfig = require(`${cwd}/gulp.config.js`);
  config = Object.assign({}, config, loadConfig);
} catch (e) {}

// 样式编译
const style = () => {
  return src(config.build.paths.styles, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(browserSync.reload({ stream: true }));
};

// 脚本编译: require 的方式会依次向上找到相关依赖
const script = () => {
  return src(config.build.paths.scripts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(browserSync.reload({ stream: true }));
};

// 模板文件编译
const page = () => {
  return src(config.build.paths.pages, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(browserSync.reload({ stream: true }));
};

// 图片转化
const image = () => {
  return src(config.build.paths.styles, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

// 字体转化
const font = () => {
  return src(config.build.paths.fonts, {
    base: config.build.src,
    cwd: config.build.src,
  })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist));
};

// public 目录文件就是单纯的拷贝过去
const extra = () => {
  return src('**', {
    base: config.build.public,
    cwd: config.build.public,
  }).pipe(dest(config.build.dist));
};

// 开发服务器
const server = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style);
  watch(config.build.paths.scripts, { cwd: config.build.src }, script);
  watch(config.build.paths.pages, { cwd: config.build.src }, page);
  watch(
    [config.build.paths.images, config.build.paths.fonts],
    { cwd: config.build.src },
    browserSync.reload
  );
  watch('**', { cwd: config.build.public }, browserSync.reload);

  browserSync.init({
    notify: false,
    server: {
      baseDir: [config.build.temp, config.build.dist, config.build.public],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};

// 文件引用处理
const useref = () => {
  return src(config.build.paths.pages, {
    base: config.build.temp,
    cwd: config.build.temp,
  })
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(dest(config.build.dist));
};

// 清空构建文件夹
const clean = () => {
  return del([config.build.dist, config.build.temp]);
};

const compile = parallel(style, script, page);

const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);
const develop = series(compile, server);

module.exports = {
  develop,
  build,
  clean,
};

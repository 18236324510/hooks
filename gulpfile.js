const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const { async } = require('fast-glob');
// 实现clean
gulp.task('clean', async function () {
  await del('dist');
  await del('es');
  await del('lib');
});
gulp.task('esm', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});
gulp.task('cjs', function () {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});
gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('umd', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'UMD',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(babel())
    .pipe(gulp.dest('umd/'));
});

gulp.task('copyReadme', async function () {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});
exports.default = gulp.series(
  'clean',
  'esm',
  'cjs',
  'declaration',
  'umd',
  'copyReadme',
);

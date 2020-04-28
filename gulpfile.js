/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./tasks', { recurse: true });

gulp.task('default', (cb) => {
  cb()
});



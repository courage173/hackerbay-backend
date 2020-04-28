/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

gulp.task("swagger", (cb) => {
  const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "../api/swagger/swagger.yaml")));
  fs.writeFileSync(
    path.join(__dirname, "../public/swagger.json"),
    JSON.stringify(doc, null, " ")
  );

  cb()
});

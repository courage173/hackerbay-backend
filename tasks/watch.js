const gulp = require('gulp');
gulp.task("watch", (cb) => {
  gulp.watch("api/swagger/swagger.yaml", gulp.series("swagger"))
  cb()
})
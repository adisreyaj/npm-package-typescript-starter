var Terser = require('terser');
const fs = require('fs');
var path = require('path');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};
const DIST_FOLDER = './dist';
walk(DIST_FOLDER, function(err, results) {
  if (err) throw err;
  const jsFiles = results.filter((file) => file.endsWith('.js'));
  console.log(jsFiles);
  jsFiles.forEach((file) => {
    const result = Terser.minify(fs.readFileSync(file).toString(), {
      compress: true,
    });
    fs.writeFileSync(file, result.code);
  });
});

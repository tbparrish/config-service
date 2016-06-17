var exec = require("child_process").exec;

on("ConfigVersion", function() {
  return Promise.promise(function(resolve, reject, notify) {
    child = exec("for i in $(ls ../); do npm version | grep overwatch | tr -d \',:{; done", function (error, stdout, stderr) {
      if (error || stdout === '') {
        resolve( {'Overwatch': 'development'});
      }
      var version = _(stdout.split("\n")).map(function(line) {
        return line.split(' ');
      }).toObject();
      resolve(version);
    });
  });
});

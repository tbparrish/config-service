var exec = require("child_process").exec;

on("ConfigVersion", function() {
  return Promise.promise(function(resolve, reject, notify) {
    child = exec('rpm -qa | grep overwatch', function (error, stdout, stderr) {
      if (error || stdout === '') {
        resolve( {'version': 'development'});
      }
      resolve(stdout);
    });
  });
});

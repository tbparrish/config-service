var exec = require("child_process").exec;

on("ConfigVersion", function() {
  return Promise.promise(function(resolve, reject, notify) {
    child = exec("rpm -qa | grep overwatch", function (error, stdout, stderr) {
      if (error || stdout === '') {
        resolve( {'Overwatch': 'development'});
      }
      var version = _(stdout.split("\n")).map(function(line) {
        var parts = line.split('-');
        if (parts.length === 5) { // overwatch-auth-service-0.1.4-88.el7.centos.x86_64
        console.log(line, parts.length, parts[3], parts[4]);
          var name = parts[1] + "-" + parts[2];
          var version = parts[3] + "-" + parts[4].split('.')[0];
          return [name, version];
        } else if (parts.length === 4) { //overwatch-services-0.1.4-73.el7.centos.x86_64
        console.log(line, parts.length, parts[2], parts[3]);
          var ow_version = parts[2] + "-" + parts[3].split('.')[0];
          return ["Overwatch", ow_version];
        } else {
          return [];
        }
      }).toObject();
      resolve(version);
    });
  });
});

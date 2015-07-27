var MicroService = require('persephone-ms'),
    ms = new MicroService(),

    Promise = ms.promise;

function dropAndSync() {
  return Promise.promise(function (resolve, reject) {
    var db = ms._persistence.db;
    db.drop(function (err) {
      if (err) reject(err); else db.sync(function (err) {
        if (err) reject(err); else resolve();
      });
    });
  });
}

ms.ready.then(dropAndSync).then(function (){

  var system = new ms.models.Dashboard({
    type: 'overwatch', title: "Overwatch Metrics", description: "Measures of Overwatch performance",
    panels: [
      { type: 'line', query: 'overwatch-memory', title: "Memory Utilization" },
      { type: 'pie', query: 'overwatch-tcp', title: "TCP States" },
      { type: 'line', query: 'overwatch-eth0', title: "Network (eth0) Octets" },
      { type: 'line', query: 'overwatch-lo', title: "Network (lo) Octets" },
      { type: 'line', query: 'overwatch-disk', title: "Disk Utilization" },
      { type: 'bar', query: 'overwatch-load', title: "Load Averages" },
      { type: 'bar', query: 'overwatch-ports', title: "Local Port Connections" }
    ] 
  });

  system.save();

  var ksi = new ms.models.Dashboard({
    type: 'ksi', title: "KSI Metrics", description: "Measures of KSI performance",
    panels: [
      { type: 'line', query: 'ksi-customers', title: "Customers Seen" },
      { type: 'line', query: 'ksi-rounds', title: "Rounds Seen" },
      { type: 'number', query: 'ksi-highest', title: "Highest Round Number" },
      { type: 'line', query: 'ksi-response-time', title: "Percentiles Response Time (ms)" },
      { type: 'pie', query: 'ksi-availability', title: "Node Availability" },
      { type: 'bar', query: 'ksi-activity', title: "Activity By Source" },
      { type: 'bar', query: 'ksi-persistence', title: "CDDB Persistence State" }
    ] 
  });

  ksi.save();
});
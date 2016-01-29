var MicroService = require('persephone-ms'),
    ms = new MicroService(),

    Promise = ms.promise;

function createDashboard(data) {
  return ms.models.Dashboard.create(data).then(function (dashboard) {
    return Promise.map(data.panels, function (panel) {
      return dashboard.createPanel(panel);
    });
  });
}

var seedPromise = ms.ready.then(function () {
  return ms._persistence._sync(ms.config.ENVIRONMENT === "development");
}).then(function (){

  var system = {
    type: 'overwatch', title: "Overwatch Metrics",
    panels: [
      { chart: 'line', aggregation: 'overwatch-memory', title: "Memory Utilization" },
      { chart: 'pie', aggregation: 'overwatch-tcp', title: "TCP States" },
      { chart: 'line', aggregation: 'overwatch-eth0', title: "Network (eth0) Octets" },
      { chart: 'line', aggregation: 'overwatch-lo', title: "Network (lo) Octets" },
      { chart: 'line', aggregation: 'overwatch-disk', title: "Disk Utilization" },
      { chart: 'bar', aggregation: 'overwatch-load', title: "Load Averages" },
      { chart: 'bar', aggregation: 'overwatch-ports', title: "Local Port Connections" }
    ] 
  };

  return createDashboard(system);

}).then(function () {

  var ksi = {
    type: 'ksi', title: "KSI Metrics",
    panels: [
      { chart: 'line', aggregation: 'ksi-customers', title: "Customers Seen" },
      { chart: 'line', aggregation: 'ksi-rounds', title: "Rounds Seen" },
      { chart: 'number', aggregation: 'ksi-highest', title: "Highest Round Number" },
      { chart: 'line', aggregation: 'ksi-response-time', title: "Percentiles Response Time (ms)" },
      { chart: 'pie', aggregation: 'ksi-availability', title: "Node Availability" },
      { chart: 'bar', aggregation: 'ksi-activity', title: "Activity By Source" },
      { chart: 'bar', aggregation: 'ksi-persistence', title: "CDDB Persistence State" }
    ] 
  };

  return createDashboard(ksi);

}).then(function () {
  return ms.command('SystemPropertiesSet', { props: ms.config.systemProperties });
});

seedPromise.then(function () {
  ms.log.info("Dashboards and properties successfully seeded.");
}).timeout(5000).catch(function (err) {
  ms.log.error("Error while seeding data", err);
});

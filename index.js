var MicroService = require('persephone-ms'),
    ms = new MicroService(),

    Promise = ms.Promise,
    Dashboard = ms.models.Dashboard,
    Panel = ms.models.Panel;

function clearAll() {

  return Promise.node.call(models.Dashboard.find, {}).then(function (dashboards) {
    var dashboardDeletePromises = dashboards.map(function (dashboard) {
      var panelsDeletePromises = dashboard.panels.map(function (panel) { return Promise.node.call(panel.remove); })
      return Promise.all(panelsDeletePromises);
    }
    return Promise.all(dashboardDeletePromises);
  });
}

clearAll();

var system = new models.Dashboard({
  type: 'overwatch', title: "Overwatch Metrics", description: "Measures of Overwatch performance",
  panels: [
    new models.Panel(new { type: '', query: '', title: "Memory Utilization", x: 0, y: 8, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "TCP States", x: 0, y: 12, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Network (eth0) Octets", x: 2, y: 4, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Network (lo) Octets", x: 0, y: 4, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Disk Utilization", x: 2, y: 8, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Load Averages", x: 0, y: 0, w: 4, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Local Port Connections", x: 2, y: 12, w: 2, h: 4 })
  ] 
});

system.save();

var ksi = new models.Dashboard({
  type: 'ksi', title: "KSI Metrics", description: "Measures of KSI performance",
  panels: [
    new models.Panel(new { type: '', query: '', title: "Customers Seen", x: 0, y: 0, w: 1, h: 2 }),
    new models.Panel(new { type: '', query: '', title: "Rounds Seen", x: 1, y: 0, w: 1, h: 2 }),
    new models.Panel(new { type: '', query: '', title: "Highest Round Number", x: 2, y: 0, w: 1, h: 2 }),
    new models.Panel(new { type: '', query: '', title: "Percentiles Response Time (ms)", x: 0, y: 10, w: 3, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Node Availability", x: 0, y: 2, w: 2, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "Activity By Source", x: 0, y: 6, w: 3, h: 4 }),
    new models.Panel(new { type: '', query: '', title: "CDDB Persistence State", x: 2, y: 2, w: 1, h: 4 }),
  ] 
});

ksi.save();
var expect = require('expect.js');

var MicroService = require('persephone-ms'),
    ms = MicroService.forTest();

describe('Config service', function () {

  var testDashboard = {
    type: 'test', title: "TestDashboard", description: "That which is",
    panels: [
      { chart: 'line', aggregation: 'test-query', title: "Meaningless Numbers" }
    ]
  };

  before(function (done) {
    ms.ready.then(function () {
      ms._persistence.models.Dashboard.create(testDashboard, function (err, result) {
        if (err) done(err); else done();
      });
    }).catch(done);
  });

  it('should return preconfigured dashboards', function (done) {
    ms.query('DashboardGet', { type: 'test' }).then(function (overwatch) {
      expect(overwatch.type).to.be('test');
      done();
    }).catch(done);
  });
});
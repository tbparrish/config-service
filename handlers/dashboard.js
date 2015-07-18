on('GetDashboard', function (data) {
  return Promise.node.call(models.Dashboard.one, { type: data.type })
         .then(function (dashboard) {
           // TODO rhodri, make calls for each panel to elastic-interactor with panel.query + data.filters
           return dashboard;
         });
});
on('DashboardGet', function (data) {
  return Promise.node.call(models.Dashboard.one, { type: data.type });
});
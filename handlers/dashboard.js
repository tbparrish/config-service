on('DashboardGet', function (data) {
  return Promise.node.call(models.Dashboard.one.bind(models.Dashboard), { type: data.type });
});
on('DashboardGet', function (data) {
  return models.Dashboard.find({ type: data.type });
});
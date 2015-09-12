var Panel = model({
  name: 'Panel',
  properties: {
    chart: { type: Sequelize.STRING, allowNull: false },
    aggregation: { type: Sequelize.STRING, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false }
  }
});

var Dashboard = model({
  name: 'Dashboard',
  properties: {
    type: { type: Sequelize.STRING, allowNull: false },
    title: { type: Sequelize.STRING, allowNull: false }
  }
});

Dashboard.hasMany(Panel);
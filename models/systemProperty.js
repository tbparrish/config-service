model({
  name: "SystemProperty",
  properties: {
    name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    value: { type: Sequelize.TEXT, allowNull: false }
  }
})
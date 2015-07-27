var Panel = model({
  name: 'Panel',
  properties: {
    chart: { type: 'text', required: true },
    aggregation: { type: 'text', required: true },
    title: { type: 'text', required: true }
  }
});

var Dashboard = model({
  name: 'Dashboard',
  properties: {
    type: { type: 'text', required: true },
    title: { type: 'text', required: true }
  }
});

Dashboard.hasMany('panels', Panel, {}, { autoFetch: true });
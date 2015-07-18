var Panel = model({
  name: 'Panel',
  properties: {

    type: { type: 'text', required: true },
    query: { type: 'text', required: true },
    title: { type: 'text', required: true }

    x: { type: 'integer', required: true },
    y: { type: 'integer', required: true },
    w: { type: 'integer', required: true },
    h: { type: 'integer', required: true }
  }
});

var Dashboard = model({
  name: 'Dashboard',
  properties: {
    type: { type: 'text', required: true },
    title: { type: 'text', required: true },
    description: { type: 'text', required: true }
  }
});

Dashboard.hasMany('panels', Panel, {}, { autoFetch: true, key: true });
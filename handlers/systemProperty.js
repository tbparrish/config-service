on('SystemPropertiesGet', function (data) {
  return Promise.node.call(models.SystemProperty.find, { name: data.props }).then(function (props) {
    return _(props).map(function (prop) { return [prop.name, prop.value]; }).toObject();
  });
});

on('SystemPropertiesSet', function (data) {

  // Currently we are allowed to set any property – might want to restrict this only to existing props

  var existingProps = Promise.node.call(models.SystemProperty.find, { name: Object.keys(data.props) });
  var updateExistingProps = Promise.map(existingProps, function (prop) {
    prop.value = data.props[prop.name];
    return Promise.node.call(prop.save);
  });

  var existingKeys = Promise.map(existingProps, function (prop) { return prop.name; });
  var createNewProps = existingKeys.then(function (existing) {
    return _(data.props).filter(function (v, k) { return existing.indexOf(k) === -1; })
                        .map(function (v, k) { return Promise.node.call(models.SystemProperty.create, { name: k, value: v }); })
                        .toArray();
  });

  return Promise.join(Promise.all(updateExistingProps), Promise.all(createNewProps));
});
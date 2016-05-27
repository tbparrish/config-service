on('SystemPropertiesGet', function (data) {
    var query = data.props instanceof Array ? { $in: data.props } : data.props;
    var properties = models.SystemProperty.findAll({ where: { name: query }});
    return properties.then(function (props) {
        var systemSettings = _(props).map(function (prop) { return [prop.name, JSON.parse(prop.value)]; }).toObject()
        event('SystemPropertiesBroadcastEvent', systemSettings);
        return systemSettings;
    });
});

on('SystemPropertiesSet', function (data) {
    // Currently we are allowed to set any property – might want to restrict this only to existing props
    var existingProps = models.SystemProperty.findAll({ where: { name: { $in: Object.keys(data.props) }}});
    var updateExistingProps = Promise.map(existingProps, function (prop) {
        prop.value = JSON.stringify(data.props[prop.name]);
        return prop.save();
    });

    var existingKeys = Promise.map(existingProps, function (prop) { return prop.name; });
    var createNewProps = existingKeys.then(function (existing) {
        return _(data.props).filter(function (v, k) { return existing.indexOf(k) === -1; })
                        .map(function (v, k) {
                          return models.SystemProperty.create({ name: k, value: JSON.stringify(v) }); })
                        .toArray();
    });

    return Promise.join( Promise.all(updateExistingProps), Promise.all(createNewProps) )
            .then( function(promises) {
                var existing = promises[0]
                    .map( function(setting) { return JSON.parse(setting.value); })
                    .map( function(setting) { return JSON.parse(setting); });

                var created  = promises[1]
                    .map( function(setting) { return JSON.parse(setting.value); })
                    .map( function(setting) { return JSON.parse(setting); });

                event( 'SystemPropertiesUpdatedEvent', existing.concat(created) );
            })
            .then( function() {
                if( data.props.deployment ) {
                    var dev = JSON.parse(data.props.deployment);
                    config.overwatch = dev.overwatch;
                    config.logstash = dev.logstash;
                    config.elastic = dev.elasticsearch.hostname + ":" + dev.elasticsearch.port;
                    config.writeConfig();
                }
            });

});

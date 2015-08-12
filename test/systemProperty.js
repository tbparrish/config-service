var expect = require('expect.js');

var MicroService = require('persephone-ms'),
    ms = MicroService.forTest();

describe('System properties', function () {

  before(function (done) {
    ms.ready.then(done).catch(done);
  });

  it('should create new properties and retrieve them', function (done) {

    ms.command('SystemPropertiesSet', { props: { "a.b" : 1, "a.c" : 2 }}).then(function () {
      return ms.query('SystemPropertiesGet', { props: [ "a.b", "a.c" ] });
    }).then(function (props) {

      // Currently all values are coerced to strings
      expect(props["a.b"]).not.to.be(1);
      expect(props["a.c"]).not.to.be(2);
      expect(props["a.b"]).to.be('1');
      expect(props["a.c"]).to.be('2');

      done();
    }).catch(done);
  });

  it('should update existing properties and create new ones in a single request', function (done) {

    ms.command('SystemPropertiesSet', { props: { "a.b" : 3, "x.y": 4 }}).then(function () {
      return ms.query('SystemPropertiesGet', { props: [ "a.b", "a.c", "x.y" ] });
    }).then(function (props) {
      expect(props["a.b"]).to.be('3');
      expect(props["a.c"]).to.be('2');
      expect(props["x.y"]).to.be('4');
      done();
    }).catch(done);
  });

  it('should get a single property, as well as arrays of properties', function (done) {

    ms.query('SystemPropertiesGet', { props: "a.c" }).then(function (props) {
      expect(props["a.c"]).to.be('2');
      done();
    }).catch(done);
  })
});
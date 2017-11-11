
require('babel-polyfill');
const { expect } = require('chai');

const Coordinates = require('./Coordinates').default;
const Planet = require('./Planet').default;


describe('Coordinates', () => {
  const sun = new Planet(null, null, 1.3271244004193938E11, 'SUN');

  describe('#given keplerian coordinates', () => {
    it('should transform given coordinates #1', (done) => {
      const coords = new Coordinates(
        'keplerian',
        sun,
        2.279396637639759E+08,
        9.346247068632309E-02,
        1.848360767919282E+00,
        4.950714491202698E+01,
        2.866123437086139E+02,
        1.949103210687458E+02,
      );

      expect(coords.A.toPrecision(5)).to.equal((2.279396637639759E+08).toPrecision(5));
      expect(coords.EC.toPrecision(5)).to.equal((9.346247068632309E-02).toPrecision(5));
      expect(coords.IN.toPrecision(5)).to.equal((1.848360767919282E+00).toPrecision(5));
      expect(coords.OM.toPrecision(5)).to.equal((4.950714491202698E+01).toPrecision(5));
      expect(coords.W.toPrecision(5)).to.equal((2.866123437086139E+02).toPrecision(5));
      expect(coords.TA.toPrecision(5)).to.equal((1.949103210687458E+02).toPrecision(5));
      expect(coords.X.toPrecision(5)).to.equal((-2.452596693904087E+08).toPrecision(5));
      expect(coords.Y.toPrecision(5)).to.equal((3.865621134606801E+07).toPrecision(5));
      expect(coords.Z.toPrecision(5)).to.equal((6.829171995494565E+06).toPrecision(5));
      expect(coords.VX.toPrecision(5)).to.equal((-2.866579088084736E+00).toPrecision(5));
      expect(coords.VY.toPrecision(5)).to.equal((-2.186378569735167E+01).toPrecision(5));
      expect(coords.VZ.toPrecision(5)).to.equal((-3.878131768674731E-01).toPrecision(5));

      done();
    });
  });

  describe('#given cartesian coordinates', () => {
    it('should transform given coordinates #2', (done) => {
      const coords = new Coordinates(
        'cartesian',
        sun,
        -2.452596693904087E+08,
        3.865621134606801E+07,
        6.829171995494565E+06,
        -2.866579088084736E+00,
        -2.186378569735167E+01,
        -3.878131768674731E-01,
      );

      expect(coords.A.toPrecision(5)).to.equal((2.279396637639759E+08).toPrecision(5));
      expect(coords.EC.toPrecision(5)).to.equal((9.346247068632309E-02).toPrecision(5));
      expect(coords.IN.toPrecision(5)).to.equal((1.848360767919282E+00).toPrecision(5));
      expect(coords.OM.toPrecision(5)).to.equal((4.950714491202698E+01).toPrecision(5));
      expect(coords.W.toPrecision(5)).to.equal((2.866123437086139E+02).toPrecision(5));
      expect(coords.TA.toPrecision(5)).to.equal((1.949103210687458E+02).toPrecision(5));
      expect(coords.X.toPrecision(5)).to.equal((-2.452596693904087E+08).toPrecision(5));
      expect(coords.Y.toPrecision(5)).to.equal((3.865621134606801E+07).toPrecision(5));
      expect(coords.Z.toPrecision(5)).to.equal((6.829171995494565E+06).toPrecision(5));
      expect(coords.VX.toPrecision(5)).to.equal((-2.866579088084736E+00).toPrecision(5));
      expect(coords.VY.toPrecision(5)).to.equal((-2.186378569735167E+01).toPrecision(5));
      expect(coords.VZ.toPrecision(5)).to.equal((-3.878131768674731E-01).toPrecision(5));

      done();
    });
  });
});

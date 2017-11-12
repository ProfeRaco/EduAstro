
require('babel-polyfill');
const { expect } = require('chai');

const Body = require('./Body').default;

const earthOE = require('../../orbital_elements/json/earth.json');

describe('Body', () => {
  const Sun = new Body(
    null,
    null,
    {
      mu: 1.3271244004193938E11,
      radious: 6.955E5,
      density: 1.408,
      albedo: 0,
      surfaceGravity: 274,
      sideralRotationPeriod: 0,
      sideralOrbitPeriod: 0,
      escapeVelocity: 617.7,
    },
    '',
    'img/textures/sun.jpg',
    0x000000,
  );

  describe('#compute TA on different days', () => {
    const Earth = new Body(
      Sun,
      earthOE,
      {
        mu: 398600.440,
        radious: 6371,
        density: 5,
        albedo: 0.367,
        surfaceGravity: 9.81,
        sideralRotationPeriod: 23.93419,
        sideralOrbitPeriod: 1.0000174,
        escapeVelocity: 11.186,
      },
      '',
      'img/textures/earth.jpg',
      0x6bdb54,
    );

    it('Earth TA on 12/11/2017 should be 3.079294102129417E+02', (done) => {
      const coords = Earth.getPosition(new Date('11-12-2017'));

      expect(coords.TA.toPrecision(5)).to.equal((3.079294102129417E+02).toPrecision(5));

      done();
    });

    it('Earth TA on 13/11/2017 should be 3.093518197279604E+02', (done) => {
      const coords = Earth.getPosition(new Date('11-13-2017'));

      expect(coords.TA.toPrecision(5)).to.equal((3.093518197279604E+02).toPrecision(5));

      done();
    });

    it('Earth TA on 12/12/2017 should be 3.384723511392341E+02', (done) => {
      const coords = Earth.getPosition(new Date('12-12-2017'));

      expect(coords.TA.toPrecision(5)).to.equal((3.384723511392341E+02).toPrecision(5));

      done();
    });

    it('Earth TA on 12/02/2018 should be 3.940881679854236E+01', (done) => {
      const coords = Earth.getPosition(new Date('02-12-2018'));

      expect(coords.TA.toPrecision(5)).to.equal((3.940881679854236E+01).toPrecision(5));

      done();
    });
  });
});

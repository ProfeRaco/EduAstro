
import Body from './classes/Body';

// Get data from the orbital_elements
import mercuryOE from '../../orbital_elements/json/mercury.json';
import venusOE from '../../orbital_elements/json/venus.json';
import earthOE from '../../orbital_elements/json/earth.json';
import marsOE from '../../orbital_elements/json/mars.json';
import jupiterOE from '../../orbital_elements/json/jupiter.json';
import saturnOE from '../../orbital_elements/json/saturn.json';
import uranusOE from '../../orbital_elements/json/uranus.json';
import neptuneOE from '../../orbital_elements/json/neptune.json';
import plutoOE from '../../orbital_elements/json/pluto.json';

// Create Bodys
const Sun = new Body(
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
);
const Mercury = new Body(
  mercuryOE,
  {
    mu: 22032.09,
    radious: 2440,
    density: 6.955,
    albedo: 0.106,
    surfaceGravity: 3.701,
    sideralRotationPeriod: 58.6462,
    sideralOrbitPeriod: 0.2408467,
    escapeVelocity: 4.435,
  },
  '',
);
const Venus = new Body(
  venusOE,
  {
    mu: 324858.63,
    radious: 6051,
    density: 5.204,
    albedo: 0.65,
    surfaceGravity: 8.870,
    sideralRotationPerio: -243.0185,
    sideralOrbitPeriod: 0.61519726,
    escapeVelocity: 10.361,
  },
  '',
);
const Earth = new Body(
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
);
const Mars = new Body(
  marsOE,
  {
    mu: 42828.3,
    radious: 3389,
    density: 3.933,
    albedo: 0.150,
    surfaceGravity: 3.73,
    sideralRotationPeriod: 24.622962,
    sideralOrbitPeriod: 1.88081578,
    escapeVelocity: 5.027,
  },
  '',
);
const Jupiter = new Body(
  jupiterOE,
  {
    mu: 126686511,
    radious: 71492,
    density: 1.326,
    albedo: 0.52,
    surfaceGravity: 26,
    sideralRotationPeriod: 0.75677083333,
    sideralOrbitPeriod: 11.862615,
    escapeVelocity: 59.5,
  },
  '',
);
const Saturn = new Body(
  saturnOE,
  {
    mu: 37931207.8,
    radious: 60268,
    density: 0.687,
    albedo: 0.47,
    surfaceGravity: 11.2,
    sideralRotationPeriod: 0.44400925925,
    sideralOrbitPeriod: 29.447498,
    escapeVelocity: 35.5,
  },
  '',
);
const Uranus = new Body(
  uranusOE,
  {
    mu: 5793966,
    radious: 25362,
    density: 1.318,
    albedo: 0.51,
    surfaceGravity: 8.95,
    sideralRotationPeriod: 0.7183,
    sideralOrbitPeriod: 84.016846,
    escapeVelocity: 21.3,
  },
  '',
);
const Neptune = new Body(
  neptuneOE,
  {
    mu: 6835107,
    radious: 24624,
    density: 1.638,
    albedo: 0.41,
    surfaceGravity: 11.3,
    sideralRotationPeriod: 0.67125,
    sideralOrbitPeriod: 164.79132,
    escapeVelocity: 23.5,
  },
  '',
);
const Pluto = new Body(
  plutoOE,
  {
    mu: 872.4,
    radious: 1195,
    density: 1.83,
    albedo: 0.3,
    surfaceGravity: 0.611,
    sideralRotationPeriod: 0,
    sideralOrbitPeriod: 249.58932,
    escapeVelocity: 1.21,
  },
  '',
);

export { Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto };

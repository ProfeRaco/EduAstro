
import Body from './classes/Body';

// Get data from the orbital_elements
import mercuryOE from '../orbital_elements/json/mercury.json';
import venusOE from '../orbital_elements/json/venus.json';
import earthOE from '../orbital_elements/json/earth.json';
import marsOE from '../orbital_elements/json/mars.json';
import jupiterOE from '../orbital_elements/json/jupiter.json';
import saturnOE from '../orbital_elements/json/saturn.json';
import uranusOE from '../orbital_elements/json/uranus.json';
import neptuneOE from '../orbital_elements/json/neptune.json';

// Create Bodys
const Sun = new Body(
  'Sun', null,
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
  'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process. It is by far the most important source of energy for life on Earth. Its diameter is about 1.39 million kilometers, i.e. 109 times that of Earth, and its mass is about 330,000 times that of Earth, accounting for about 99.86% of the total mass of the Solar System. About three quarters of the Sun\'s mass consists of hydrogen (~73%); the rest is mostly helium (~25%), with much smaller quantities of heavier elements, including oxygen, carbon, neon, and iron.',
  'img/textures/sun.jpg',
  0x000000,
);
const Mercury = new Body(
  'Mercury', Sun,
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
  'img/textures/mercury.jpg',
  0xd58340,
);
const Venus = new Body(
  'Venus', Sun,
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
  'img/textures/venus.jpg',
  0xf0e442,
);
const Earth = new Body(
  'Earth', Sun,
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
  'Earth is the third planet from the Sun and the only object in the Universe known to harbor life. According to radiometric dating and other sources of evidence, Earth formed over 4 billion years ago. Earth\'s gravity interacts with other objects in space, especially the Sun and the Moon, Earth\'s only natural satellite. Earth revolves around the Sun in 365.26 days, a period known as an Earth year. During this time, Earth rotates about its axis about 366.26 times',
  'img/textures/earth.jpg',
  0x6bdb54,
);
const Mars = new Body(
  'Mars', Sun,
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
  'img/textures/mars.jpg',
  0x50e08a,
);
const Jupiter = new Body(
  'Jupiter', Sun,
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
  'img/textures/jupiter.jpg',
  0x5fddd1,
);
const Saturn = new Body(
  'Saturn', Sun,
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
  'img/textures/saturn.jpg',
  0x5855fa,
);
const Uranus = new Body(
  'Uranus', Sun,
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
  'img/textures/uranus.jpg',
  0xcd63db,
);
const Neptune = new Body(
  'Neptune', Sun,
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
  'img/textures/neptune.jpg',
  0xe0599e,
);

const bodies = [Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune];

export { bodies };

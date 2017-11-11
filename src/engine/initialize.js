
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
const Sun = new Body(null, null, 1.3271244004193938E11, '');
const Mercury = new Body('Mercury', mercuryOE, 22032.09, '');
const Venus = new Body('Venus', venusOE, 324858.63, '');
const Earth = new Body('Earth', earthOE, 398600.440, '');
const Mars = new Body('Mars', marsOE, 42828.3, '');
const Jupiter = new Body('Jupiter', jupiterOE, 126686511, '');
const Saturn = new Body('Saturn', saturnOE, 37931207.8, '');
const Uranus = new Body('Uranus', uranusOE, 5793966, '');
const Neptune = new Body('Neptune', neptuneOE, 6835107, '');
const Pluto = new Body('Pluto', plutoOE, 872.4, '');

export { Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto };

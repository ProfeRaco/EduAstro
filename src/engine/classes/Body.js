
import JulianDate from 'julian-date';
import _ from 'lodash';

import Coordinates from './Coordinates';

class Body {
  constructor(centralBody, data, mu, description) {
    this.centralBody = centralBody;
    this.data = data;
    this.mu = mu;
    this.description = description;

    this.computeRadiousOfInfluence();
  }

  getPosition(epoch, refSystem) {
    const julian = (new JulianDate(epoch)).julian();

    const dat = _.find(this.data, d => d.JDTDB - julian < 30);

    const coord = new Coordinates('keplerian', this.centralBody, dat.A, dat.EC, dat.IN, dat.OM, dat.W, dat.TA);

    if (refSystem) {
      return coord.changeReferenceSystem(refSystem);
    }
    return coord;
  }

  getAbsolutPosition(epoch) {
    let refSystem;
    if (this.centralBody) {
      refSystem = this.centralBody.getAbsolutPosition(epoch);
    } else {
      refSystem = new Coordinates('cartesian', null, 0, 0, 0, 0, 0, 0);
    }

    return this.getPosition(epoch, refSystem);
  }

  computeRadiousOfInfluence() {
    if (this.centralBody) {
      this.radiousInfluence = this.getPosition(new Date()).a * (this.mu / this.centralBody.mu);
    } else {
      this.radiousInfluence = Infinity;
    }
  }
}

export default Body;

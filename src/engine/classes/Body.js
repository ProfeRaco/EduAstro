
import JulianDate from 'julian-date';
import _ from 'lodash';

import Coordinates from './Coordinates';

class Body {
  constructor(centralBody, ephemerides, data, description, textureFilename) {
    this.centralBody = centralBody;
    this.ephemerides = ephemerides;
    this.mu = data.mu;
    this.radiousBody = data.radious; // km
    this.density = data.density; // g/cm3
    this.albedo = data.albedo;
    this.surfaceGravity = data.surfaceGravity; // m/s2
    this.sideralOrbitPeriod = data.sideralOrbitPeriod; // yrs
    this.sideralRotationPeriod = data.sideralRotationPeriod; // days
    this.escapeVelocity = data.escapeVelocity; // km/s
    this.description = description;
    this.textureFilename = textureFilename;

    this.computeRadiousOfInfluence();
  }

  getPosition(epoch, refSystem) {
    const julian = (new JulianDate(epoch)).julian();

    const dat = _.find(this.ephemerides, d => d.JDTDB - julian < 30);

    const DeltaT = dat.JDTDB - julian;

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

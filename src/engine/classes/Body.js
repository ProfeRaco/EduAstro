
import JulianDate from 'julian-date';
import _ from 'lodash';

import Coordinates from './Coordinates';

function newtonRaphson(fun, der, initial) {
  let x1 = initial;
  let x2 = initial + 1;
  let e = 1;

  while (e > 1E-6) {
    x2 = x1 - (fun(x2) / der(x2));
    e = Math.abs(x2 - x1);
    x1 = x2;
  }

  return x1;
}

class Body {
  constructor(centralBody, ephemerides, data, description, textureFilename, orbitColor) {
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
    this.orbitColor = orbitColor;

    this.computeRadiousOfInfluence();

    this.updateMeshPosition = this.updateMeshPosition.bind(this)
  }

  getPosition(epoch, refSystem) {
    if (!this.centralBody) {
      return new Coordinates('cartesian', null, 0, 0, 0, 0, 0, 0);
    }
    const julian = (new JulianDate(epoch)).julian();

    const dat = _.find(this.ephemerides, d => Math.abs(d.JDTDB - julian) < 30);

    const DeltaT = (dat.JDTDB - julian) * 86400;

    const n = Math.sqrt(this.centralBody.mu / (dat.A ** 3)); // Mean angular momentum

    const fun = EA => ((EA - (dat.EC * Math.cos(EA))) / n) - DeltaT;
    const der = EA => (1 / n) - ((dat.EC / n) * Math.cos(EA));
    const EA = newtonRaphson(fun, der, 0);
    const TA = Math.atan((Math.tan(EA / 2)) / (Math.sqrt((1 - dat.EC) / (1 + dat.EC))));
    // console.log('n', n)
    // console.log('DeltaT', DeltaT)
    // console.log('EA', EA)
    // console.log('TA', TA)

    const coord = new Coordinates('keplerian', this.centralBody, dat.A, dat.EC, dat.IN, dat.OM, dat.W, TA);

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
      this.radiousInfluence = this.getPosition(new Date()).A * (this.mu / this.centralBody.mu);
    } else {
      this.radiousInfluence = Infinity;
    }
  }

  attatchMesh(msh) {
    this.msh = msh;
  }

  updateMeshPosition(epoch, scaleFactor) {
    const pos = this.getAbsolutPosition(epoch);
    this.msh.position.x = pos.X / scaleFactor;
    this.msh.position.y = pos.Y / scaleFactor;
    this.msh.position.z = pos.Z / scaleFactor;
  }
}

export default Body;

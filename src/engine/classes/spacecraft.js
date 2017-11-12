
import Coordinates from './Coordinates'

function newtonRaphson(fun, der, initial) {
  let x1 = initial;
  let x2 = initial + 1;
  let e = 1;

  while (e > 1E-8) {
    x2 = x1 - (fun(x2) / der(x2));
    e = Math.abs(x2 - x1);
    x1 = x2;
  }

  return x1;
}

class Spacecraft {
  constructor(epoch, coordinates) {
    this.epoch = epoch;
    this.coordinates = coordinates;
    this.centralbody = coordinates.body;
    this.isSpacecraft = true;

    this.maneuvers = [];
    this.maneuvers.push({
      type: 'start',
      condition: {
        type: 'epoch',
        data: epoch,
      },
    });
  }

  addManouvre () {
    
  }

  removeManouvre () {
    
  }

  changeManouvre () {
    
  }
  
  getPosition(epoch, refSystem) {
    const DeltaT = epoch - this.epoch;

    const dat = this.coordinates;

    const n = Math.sqrt(this.centralBody.mu / (dat.A ** 3)); // Mean angular momentum

    const fun = EA => (((EA) - (dat.EC * Math.cos(EA))) / n) - DeltaT;
    const der = EA => (1 / n) - ((dat.EC / n) * Math.cos((EA / 180) * Math.PI));
    const EA1 = newtonRaphson(fun, der, 0);
    const sqrt = Math.sqrt((1 - dat.EC) / (1 + dat.EC));
    const EA2 = 2 * Math.atan(sqrt * Math.tan((dat.TA / 360) * Math.PI));
    const EA = EA1 + EA2; // Radiants
    let TA = (2 * (Math.atan(Math.tan(EA / 2)) / sqrt) * 180) / Math.PI; // Graus

    if (TA < 0) {
      TA = 360 + TA;
    }

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
    this.msh.updateMatrix();
  }
}

export default Spacecraft;


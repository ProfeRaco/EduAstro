

class Coordinates {
  constructor(type, body, a1, a2, a3, a4, a5, a6, refSystem) {
    this.body = body;
    this.refSystem = refSystem || body;

    switch (type) {
      case 'keplerian':
        this.A = a1; // Semi major-axis
        this.EC = a2; // Eccentricity
        this.IN = a3; // Inclination
        this.OM = a4; // Longitud of the rigth ascention node
        this.W = a5; // Argument of the perifocus
        this.TA = a6; // True anomaly
        this.processKeplerian(a1, a2, a3, a4, a5, a6);
        break;
      case 'cartesian':
        this.X = a1; // Semi major-axis
        this.Y = a2; // Eccentricity
        this.Z = a3; // Inclination
        this.VX = a4; // Longitud of the rigth ascention node
        this.VY = a5; // Argument of the perifocus
        this.VZ = a6; // True anomaly
        this.processCartesian(a1, a2, a3, a4, a5, a6);
        break;
      default:
        throw new Error('Cannot create "Coordinates" element, unknown coordinates type');
    }

    if (body) {
      this.EA = 2 * Math.atan(Math.sqrt(Math.sqrt((1 - this.EC) /
        (1 + this.EC))) * Math.tan(this.TA)); // Eccentric Anomaly
      this.n = Math.sqrt(body.mu / (this.A ** 3)); // Mean angular momentum
    }
  }

  convertKeplerianToCartesian(A, EC, IN, OM, W, TA) {
    if (!this.body) {
      return [0, 0, 0, 0, 0, 0];
    }

    const { mu } = this.body;

    let p = A * (1 - (EC * EC));
    p = Math.max(p, 1.e-30); // safety measure for the square root
    const f = Math.sqrt(mu / p);
    const cv = Math.cos(TA / (180 * Math.PI));
    const ecv = 1 + (EC * cv);
    const r = p / ecv;
    const u = W + TA;
    const cu = Math.cos(u / (180 * Math.PI));
    const su = Math.sin(u / (180 * Math.PI));
    const co = Math.cos(OM / (180 * Math.PI));
    const so = Math.sin(OM / (180 * Math.PI));
    const ci = Math.cos(IN / (180 * Math.PI));
    const si = Math.sin(IN / (180 * Math.PI));
    const cocu = co * cu;
    const sosu = so * su;
    const socu = so * cu;
    const cosu = co * su;
    const fx = cocu - (sosu * ci);
    const fy = socu + (cosu * ci);
    const fz = su * si;
    const vr = f * EC * Math.sin(TA / (180 * Math.PI));
    const vu = f * ecv;
    const X = r * fx;
    const Y = r * fy;
    const Z = r * fz;
    const VX = (vr * fx) - (vu * (cosu + (socu * ci)));
    const VY = (vr * fy) - (vu * (sosu - (cocu * ci)));
    const VZ = (vr * fz) + (vu * cu * si);

    return [X, Y, Z, VX, VY, VZ];
  }

  convertCartesianToKeplerian(X, Y, Z, VX, VY, VZ) {
    if (!this.body) {
      return [0, 0, 0, 0, 0, 0];
    }

    const { mu } = this.body;

    const twopi = Math.PI + Math.PI;

    const c1 = (Y * VZ) - (Z * VY);
    const c2 = (Z * VX) - (X * VZ);
    const c3 = (X * VY) - (Y * VX);
    const cc12 = (c1 * c1) + (c2 * c2);
    const cc = cc12 + (c3 * c3);
    const c = Math.sqrt(cc);
    const v02 = (VX * VX) + (VY * VY) + (VZ * VZ);
    const r0v0 = (X * VX) + (Y * VY) + (Z * VZ);
    const r02 = (X * X) + (Y * Y) + (Z * Z);
    const r0 = Math.sqrt(r02);
    const x = (r0 * v02) / mu;
    const cx = (cc / mu);
    const ste = (r0v0 * c) / (r0 * mu);
    const cte = (cx / r0) - 1.0;
    const A = r0 / (2.0 - x);
    const EC = Math.sqrt((ste * ste) + (cte * cte));
    const IN = Math.atan2(Math.sqrt(cc12), c3);
    let OM;
    let u;
    if (cc12 > (cc * 1.e-20)) {
      u = Math.atan2(c * Z, (Y * c1) - (X * c2));
      OM = Math.atan2(c1, -c2);
    } else {
      u = Math.atan2(Y, X) * Math.sign(c3);
      OM = 0.0;
    }

    let W;
    let TA;
    if (EC > 1.e-20) {
      TA = Math.atan2(ste, cte);
      W = u - TA;
    } else {
      TA = u;
      W = 0.0;
    }
    if (OM < 0.0) {
      OM += twopi;
    }
    if (W < 0.0) {
      W += twopi;
    }
    if (TA < 0.0) {
      TA += twopi;
    }

    return [A, EC, IN * (180 / Math.PI), OM * (180 / Math.PI), W * (180 / Math.PI), TA * (180 / Math.PI)];
  }

  processKeplerian(A, EC, IN, OM, W, TA) {
    const [X, Y, Z, VX, VY, VZ] = this.convertKeplerianToCartesian(A, EC, IN, OM, W, TA);

    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.VX = VX;
    this.VY = VY;
    this.VZ = VZ;
  }

  processCartesian(X, Y, Z, VX, VY, VZ) {
    const [A, EC, IN, OM, W, TA] = this.convertCartesianToKeplerian(X, Y, Z, VX, VY, VZ);

    this.A = A;
    this.EC = EC;
    this.IN = IN;
    this.OM = OM;
    this.W = W;
    this.TA = TA;
  }

  changeReferenceSystem(refSystem) {
    this.X = refSystem.X + this.X;
    this.Y = refSystem.Y + this.Y;
    this.Z = refSystem.Z + this.Z;
    this.VX = refSystem.VX + this.VX;
    this.VY = refSystem.VY + this.VY;
    this.VZ = refSystem.VZ + this.VZ;

    return this;
  }
}

export default Coordinates;

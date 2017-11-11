

class Spacecraft {
  constructor(epoch, coordinates) {
    this.epoch = epoch;
    this.coordinates = coordinates;

    this.maneuvers = [];
    this.maneuvers.push({
      type: 'start',
      condition: {
        type: 'epoch',
        data: epoch,
      },
    });
  }
}

export default Spacecraft;

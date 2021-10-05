var readTextFile = function (file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        callback(rawFile.responseText);
      }
    }
  };
  rawFile.send(null);
};

function TargetTrajectory(onReady) {

  let that = this
  this.positions = [];

  readTextFile("data/pre1.csv", function (data) {

    let lines = data.split("\n");
    for (var i = 0; i < lines.length - 1; i +=1) {

      var line = lines[i];
      var split = line.split(",");

      var x = parseFloat(split[0]);
      var z = parseFloat(split[1]);

      that.positions.push(new THREE.Vector3(-x, 0, z))

    }

  });

  onReady(this.positions)

}

function ActualTrajectory(onReady) {

  let that = this;

  this.counter = 0;

  this.positions = [];
  this.quaternions = [];

  readTextFile("data/vesselModel.csv", function (data) {

    let lines = data.split("\n");
    for (var i = 0; i < lines.length - 1; i += 1) {

      var line = lines[i];
      var split = line.split(",");

      var z = -parseFloat(split[2]);
      var x = -parseFloat(split[3]);
      var y = -parseFloat(split[4]);

      that.positions.push(new THREE.Vector3(x, y, z));

      let yaw = THREE.Math.DEG2RAD * parseFloat(split[5]);
      let pitch = THREE.Math.DEG2RAD * parseFloat(split[6]);
      let roll = THREE.Math.DEG2RAD * parseFloat(split[7]);

      that.quaternions.push(new THREE.Quaternion().setFromEuler(new THREE.Euler(pitch, yaw, roll)))

    }

    onReady(that.positions);

  });

}

ActualTrajectory.prototype.next = function () {

  if (this.counter < this.positions.length - 1) {
    this.counter++;
  } else {
    this.counter = 0;
  }

  return [this.positions[this.counter], this.quaternions[this.counter], this.counter];

};

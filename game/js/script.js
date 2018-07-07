let can = document.getElementById('can');
let p = 'px',
  width = 500,
  height = 500,
  resolution = 50, // You can to change resolution of pixels
  widthElement = width / resolution,
  heightElement = height / resolution;

can.style.width = width + p;
can.style.height = height + p;
can.style.background = 'red';

let element, random, state;
let mass = [];
let widthMass = resolution,
  heightMass = resolution;
for (let i = 0; i < widthMass; i++) {
  mass[i] = new Array(heightMass);
}

function rand() {
  for (let i = 0; i < widthMass; i++) {
    for (let j = 0; j < heightMass; j++) {
      random = Math.floor(Math.random() * 2);
      if (random) {
        mass[i][j] = 1;
      } else {
        mass[i][j] = 0;
      }
      // mass[i][j] = random;
    }
  }
}

function render() {
  can.innerHTML = '';
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      element = document.createElement('div');
      element.style.width = widthElement + p;
      element.style.height = heightElement + p;
      element.style.float = 'left';

      if (mass[i][j]) {
        element.style.background = '#000';
      } else {
        element.style.background = '#fff';
      }

      can.appendChild(element);
    }
  }
}
rand();
render();

function countSum(x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + widthMass) % widthMass;
      let row = (y + j + heightMass) % heightMass;

      sum += mass[col][row];
      // console.log(' for ' + mass[x][y] + 'sum += ' + mass[x + i][y + j]);
      // console.log('//////////////');
    }
  }
  sum -= mass[x][y];
  // console.log(
  //   'sum = ' + sum + ' for x = ' + x + ' y = ' + y + ' mass = ' + mass[x][y]
  // );

  return sum;
}
function move() {
  for (let i = 0; i < mass.length; i++) {
    for (let j = 0; j < mass.length; j++) {
      let c = countSum(i, j);
      if (mass[i][j] === 0 && c === 3) {
        setTimeout(() => {
          mass[i][j] = 1;
        });
      } else if (mass[i][j] === 1 && (c < 2 || c > 3)) {
        setTimeout(() => {
          mass[i][j] = 0;
        });
      }
    }
  }
  // console.log(mass);
  render();
}
setInterval(move, 0);

console.log(mass);

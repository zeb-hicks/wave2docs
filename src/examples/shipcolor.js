import { ShipSim, Ship } from "./ships.js";

let sim = new ShipSim(document.getElementById("cvs"));

let counter = [];
let colorIndex = [];
let colors = ["#000078","#001cf8","#08fc80","#f8e000","#f00000","#f00078","#08e078","#f01c80","#f8fc80","#08fcf8","#f01cf8","#f8e078","#d8d468","#b8dc78","#c85cf0","#f8dc68"];

for (let i = 0; i < 3; i++) {
  let ship = new Ship();
  sim.addShip(ship);
  counter.push(Math.random() * 0.6);
  colorIndex.push(i % 12);
}

sim.setLogic((dt) => {

  for (let i = 0; i < sim.ships.length; i++) {
    counter[i] += dt;
    if (counter[i] > 0.6) {
      colorIndex[i] = (colorIndex[i] + 1) % colors.length;
      sim.ships[i].color = colors[colorIndex[i]];
      counter[i] = 0;
    }
  }

});

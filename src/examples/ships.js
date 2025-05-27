export class ShipSim {
  canvas = null;
  g = null;
  w = 0;
  h = 0;
  ships = [];
  logic = () => {};
  pt = 0;
  dt = 0;
  constructor(canvas) {
    this.canvas = canvas;
    this.g = canvas.getContext("2d");
    this.w = canvas.width;
    this.h = canvas.height;
    this.pt = performance.now();
    this.dt = 0;
    requestAnimationFrame(() => this.draw());
  }
  draw() {
    requestAnimationFrame(() => this.draw());
    this.dt = (performance.now() - this.pt);
    this.pt += this.dt;
    this.dt /= 1000;
    this.logic(this.dt);
    if (this.g) {
      this.g.clearRect(0, 0, this.w, this.h);
      this.physics(this.dt);
      for (let ship of this.ships) {
        ship.draw(this.g);
      }
    }
  }
  physics(dt) {
    for (let ship of this.ships) {
      ship.pos = ship.pos.add(ship.vel.mul(dt));
      ship.pos = ship.pos.wrap(new Rect(-10, -10, this.w + 20, this.h + 20));
      ship.rot += ship.rvel * dt;
      ship.rot = ship.rot % (Math.PI * 2);
    }
  }
  addShip(ship) {
    this.ships.push(ship);
  }
  setLogic(logic) {
    this.logic = logic;
  }
}

export class Ship {
  pos = new V2();
  vel = new V2();
  rot = 0;
  rvel = 0;
  color = "#ffffff";

  constructor({pos, vel, rot, rvel, color} = {}) {
    let r1 = new V2(Math.random(), Math.random());
    let r2 = new V2(Math.random(), Math.random());
    this.pos = pos instanceof V2 ? pos : new V2(1920, 1080).mul(r1);
    this.vel = vel instanceof V2 ? vel : new V2(200, 200).mul(r2).sub(new V2(100, 100));
    this.rot = rot || (Math.random() * Math.PI * 2);
    this.rvel = rvel || (Math.random() * 30 - 15);
    this.color = color || `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
  }

  draw(g) {
    let state = g.save();
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.rot);
    g.fillStyle = this.color;
    g.beginPath();
    g.moveTo(0, -15);
    g.lineTo(8, 12);
    g.lineTo(-8, 12);
    g.closePath();
    g.fill();
    g.restore(state);
  }
}

function umod(a, b) { return a - Math.floor(a / b) * b; }

export class V2 {
  x = 0;
  y = 0;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add(v)     { return new V2(this.x + v.x, this.y + v.y); }
  sub(v)     { return new V2(this.x - v.x, this.y - v.y); }
  mul(b)     { if (b instanceof V2) { return new V2(this.x * b.x, this.y * b.y); }
               else                 { return new V2(this.x * b, this.y * b); }}
  div(b)     { if (b instanceof V2) { return new V2(this.x / b.x, this.y / b.y); }
               else                 { return new V2(this.x / n, this.y / n); }}
  copy()     { return new V2(this.x, this.y); }
  set(x, y)  { this.x = x; this.y = y; return this; }
  umod(b)    { return new V2(umod(this.x, b.x), umod(this.y, b.y)); }
  wrap(rect) { return this.sub(rect.pos).umod(rect.size).add(rect.pos); }
}

export class Rect {
  pos = new V2();
  size = new V2();
  constructor(x, y, w, h) {
    this.pos = new V2(x, y);
    this.size = new V2(w, h);
  }
  contains(v) {
    return v.x >= this.pos.x && v.x <= this.pos.x + this.size.x &&
         v.y >= this.pos.y && v.y <= this.pos.y + this.size.y;
  }
}

export function from565to888(c) {
  c = Number.parseInt(c, 16);
  let b = c & 0b11111;
  let g = (c >> 5) & 0b111111;
  let r = (c >> 11) & 0b11111;

  b <<= 3;
  g <<= 2;
  r <<= 3;

  function h2(n) {
    if (n < 0xf) return "0" + n.toString(16);
    return n.toString(16);
  }

  return "#" + h2(r) + h2(g) + h2(b);
}

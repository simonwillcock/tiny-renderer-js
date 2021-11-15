export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone = function () {
    return new Vec2(this.x, this.y);
  }

  add = function (v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
    } else {
      this.x += v.x;
      this.y += v.y;
    }
    return this;
  };

  subtract = function (v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
    }
    return this;
  };

  multiply = function (v: number | Vec2): Vec2 {
    if (typeof v === "number") {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  };


  toJSON = function () {
    return {x: this.x, y: this.y};
  };
  toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
  };
}
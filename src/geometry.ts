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

  clamp = function (min: number, max: number): Vec2 {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }


  toJSON = function () {
    return {x: this.x, y: this.y};
  };
  toString = function() {
    return `(${this.x}, ${this.y})`;
  };
}

export class Vec3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number | Vec3, y?: number, z?: number) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y;
      this.z = z;
    } else {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    }
    return this;
  }

  clone = function () {
    return new Vec3(this.x, this.y, this.z);
  }

  add = function (v: number | Vec3): Vec3 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
      this.z += v;
    } else {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    }
    return this;
  };

  subtract = function (v: number | Vec3): Vec3 {
    if (typeof v === "number") {
      this.x += v;
      this.y += v;
      this.z += v;
    } else {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
    }
    return this;
  };

  multiply = function (v: number | Vec3): Vec3 {
    if (typeof v === "number") {
      this.x *= v;
      this.y *= v;
      this.z *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
    }
    return this;
  };

  dotProduct = function (v: Vec3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  divide = function(v: number | Vec3): Vec3 {
    if (typeof v === "number") {
      this.x /= v;
      this.y /= v;
      this.z /= v;
    } else {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
    }
    return this;
  }

  normalize = function (bounds: number = 1): Vec3 {
    return new Vec3(this).multiply(1 / this.length());
  };

  power = function (v: number | Vec3): Vec3 {
    if (typeof v === "number") {
      this.x **= v;
      this.y **= v;
      this.z **= v;
    } else {
      this.x **= v.x;
      this.y **= v.y;
      this.z **= v.z;
    }
    return this;
  }

  crossProduct = function(v: Vec3) {
    return new Vec3(
      this.y * v.z - this.z * v.y, 
      this.z * v.x - this.x * v.z, 
      this.x * v.y - this.y * v.x);
  }


  toJSON = function () {
    return {x: this.x, y: this.y, z: this.z};
  };
  toString = function() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  };
}
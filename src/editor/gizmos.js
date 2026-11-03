import * as PIXI from 'pixi.js';


export class Gizmos {

  static getCreatorGizmo() {
    return new CreatorGizmo();
  }

  static COLOR = 0x409EFF;

  static getOriginGizmo() {
    const g = new BaseGizmo();
    g.moveTo(-20, 0).lineTo(20, 0).moveTo(0, -20).lineTo(0, 20).stroke({width: 1, color: 0x409EFF});
    return g;
  }

  static getFloorGizmo() {
    const g = new BaseGizmo();
    g.rect(0, 0, 10000, 10000)
      .fill({color: Gizmos.COLOR, alpha: 0.1})
      .stroke({width: 1, color: Gizmos.COLOR});

    g.blendMode = 'add';
    return g;
  }

  static getCircleGizmo() {
    return new CircleGizmo();
  }

  static getRingGizmo() {
    return new RingGizmo();
  }

  static getBoxGizmo() {
    return new BoxGizmo();
  }

  static getClickGizmo() {
    return new ClickGizmo();
  }
}


// export class CreatorGizmo extends BaseGizmo {
//   constructor() {
//     super();
//     this.lineStyle(1, 0x00ff00);
//     this.drawCircle(0,0,20);
//   }
// }

export class ClickGizmo extends PIXI.Graphics {
  constructor() {
    super();
    this.circle(0, 0, 15).fill({color: Gizmos.COLOR, alpha: 0.3});
    this.visible = false;
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 100);
  }
}


export class CircleGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const angle = params.angle;
    const radius = params.radius;
    const color = Gizmos.COLOR;

    this.clear();

    if (angle === 0 || angle === 2 * Math.PI) {
      this.circle(0, 0, radius).fill({color, alpha: 0.2});
    } else {
      const px = Math.cos(-angle * 0.5) * radius;
      const py = Math.sin(-angle * 0.5) * radius;

      this.moveTo(0, 0)
        .lineTo(px, py)
        .arc(0, 0, radius, -angle * 0.5, angle * 0.5)
        .lineTo(0, 0)
        .fill({color, alpha: 0.2});
    }

    this.moveTo(0, 0).lineTo(radius + 15, 0).stroke({width: 1, color, alpha: 0.7});

  }
}

export class RingGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const angle = params.angle;
    const radius = params.radius;
    const color = Gizmos.COLOR;

    this.clear();

    if (angle === 0 || angle === 2 * Math.PI) {
      this.circle(0, 0, radius);
    } else {
      this.arc(0, 0, radius, -angle * 0.5, angle * 0.5);
    }
    this.stroke({width: 10, color, alpha: 0.3});
    this.moveTo(0, 0).lineTo(radius + 15, 0).stroke({width: 1, color, alpha: 0.7});
  }
}

export class BoxGizmo extends PIXI.Graphics {
  constructor() {
    super();
  }

  redraw(params) {
    const width = params.width;
    const height = params.height;
    const color = Gizmos.COLOR;

    this.clear()
      .rect(-width * 0.5, -height * 0.5, width, height)
      .fill({color, alpha: 0.3})
      .moveTo(0, 0).lineTo(width * 0.5 + 15, 0)
      .stroke({width: 1, color, alpha: 0.7});
  }
}

export class BaseGizmo extends PIXI.Graphics {
  constructor() {
    super();
    this.color = 0x0000ff;
  }

  redraw() {

  }

}

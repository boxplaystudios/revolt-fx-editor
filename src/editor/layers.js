import * as PIXI from 'pixi.js';
import {ClickGizmo, Gizmos} from "./gizmos";

export class Layers extends PIXI.Container {
  constructor() {
    super();

    this.gizmoLayer = new PIXI.Container();
    this.backgroundLayer = new PIXI.Container();
    this.contentLayer0 = new PIXI.Container();

    // pixi 8's ParticleContainer only takes `Particle`s, not the sprites revolt-fx makes, so there is
    // one content container (as in the games).
    this.standardContainer = new PIXI.Container();

    this.contentLayer1 = this.standardContainer;

    this.contentLayer2 = new PIXI.Container();
    this.originLayer = new PIXI.Container();
    this.infoLayer = new PIXI.Container();

    this.clickGizmo = new ClickGizmo();

    // Effects and their gizmos, in EFFECT coordinates: 1:1 with the screen, or the game's scene
    // coordinates while the game is shown behind the canvas (see `setWorld`).
    this.world = new PIXI.Container();
    this.world.addChild(this.contentLayer0);
    this.world.addChild(this.standardContainer);
    this.world.addChild(this.contentLayer2);
    this.world.addChild(this.gizmoLayer);

    this.addChild(this.backgroundLayer);
    this.addChild(this.infoLayer);
    this.addChild(this.originLayer);
    this.addChild(this.world);


    this.floorGizmoLayer = new PIXI.Container();
    this.floorGizmo = Gizmos.getFloorGizmo();

    this.floorGizmoLayer.addChild(this.floorGizmo);

    this.gizmoLayer.addChild(this.floorGizmoLayer);

    this.floorGizmo.visible = false;

    this.backgroundLayer.eventMode = 'static';

    this.gizmoLayer.addChild(this.clickGizmo);


    const g = this.backgroundSolid = new PIXI.Graphics();
    g.rect(0, 0, 100, 100).fill(0xffffff);

    this.backgroundLayer.addChild(g);

    this.setBackgroundColor(0x333333);
  }


  setWorld(scale, x, y) {
    this.world.scale.set(scale);
    this.world.position.set(x, y);
  }

  setBackgroundColor(color) {
    this.backgroundSolid.tint = color;
  }

  resize(width, height) {
    console.log('resize', width, height);
    this.backgroundSolid.width = width;
    this.backgroundSolid.height = height;
  }
}

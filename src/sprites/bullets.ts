import { Container, DisplayObject, Graphics } from "pixi.js";
import appConstants from "../common/constants";
import { shoot } from "../common/eventHub";
import { play } from "../common/sound";
import { destroySprite } from "../common/utils";

let bullets: Container<DisplayObject>;
let timeout: NodeJS.Timeout | null;

export const initBullets = () => {
    bullets = new Container();
    bullets.name = appConstants.containers.bullets;
    return bullets;
};

export const clearBullets = () => {
    bullets.children.forEach((b) => {
        bullets.removeChild(b);
        b.destroy({ children: true });
    });
};

export const addBullet = (coord: { x: number ; y: number }) => {
    if (timeout) {
  
        return;
    }

    const bullet = new Graphics();
    bullet.beginFill(0xffffff);
    bullet.drawRect(0, 0, 5, 10);
    bullet.endFill();

    bullet.position.set(coord.x, coord.y - 10);
    bullets.addChild(bullet);
    timeout = setTimeout(() => {
        timeout = null;
    }, appConstants.timeouts.playerShoots);
   
    play(appConstants.sounds.shot)
};

export const bulletTick = () => {
    const toRemove: DisplayObject[] = [];
    bullets.children.forEach((b) => { 
        b.position.y -= appConstants.speed.bullet ;
        if (b.position.y < 0) {
            shoot()
            toRemove.push(b);
        }
    });
    toRemove.forEach((b) => {
       destroySprite(b)
    });
};

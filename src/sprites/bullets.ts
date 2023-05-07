import { Container, DisplayObject, Graphics } from "pixi.js";
import appConstants from "../common/constants";

let bullets: Container<DisplayObject>;
let timeout;

const bulletSpeed = 1;

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

export const addBullet = (coord: { x: number | undefined; y: number }) => {
    // if(timeout){
    //     //sound
    //     return
    // }

    const bullet = new Graphics();
    bullet.beginFill(0xffffff);
    bullet.drawRect(0, 0, 5, 10);
    bullet.endFill();

    bullet.position.set(coord.x, coord.y - 10);
    bullets.addChild(bullet);

    //sound play

    timeout = setTimeout(() => {
        timeout = null;
    }, appConstants.timeouts.playerShoots);
};

export const destroyBullet = (bullet: DisplayObject) => {
    bullets.removeChild(bullet);
    bullet.destroy({ children: true });
    //add explosion BOOM
};

export const bulletTick = () => {
    const toRemove: DisplayObject[] = [];
    bullets.children.forEach((b) => {
        b.position.y -= bulletSpeed * 2;
        if (b.position.y < 0) {
            toRemove.push(b);
        }
    });
    toRemove.forEach((b) => {
        bullets.removeChild(b);
        b.destroy({ children: true });
    });
};

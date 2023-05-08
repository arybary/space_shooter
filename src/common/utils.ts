import { DisplayObject } from "pixi.js";

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkCollision = (object1: DisplayObject, object2: DisplayObject) => {
    if (object1 && object2 && object1 !== object2) {
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds2.x < bounds1.x + bounds1.width &&
            bounds2.y < bounds1.y + bounds1.height
        );
    }
    return false;
};


export const destroySprite = (sprite: DisplayObject) => {
    sprite.parent.removeChild(sprite);
    sprite.destroy({ children: true });
};


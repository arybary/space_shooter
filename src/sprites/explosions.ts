import { AnimatedSprite, Container, Texture } from "pixi.js";
import appConstants from "../common/constants";
import { allTextureKeys } from "../common/textures";
import { getTexture } from "../common/assets";
import { destroySprite } from "../common/utils";
import { play } from "../common/sound";

interface Coord {
    x: number;
    y: number;
}

let explosions: Container<AnimatedSprite>;

export const initExplosions = () => {
    explosions = new Container();
    explosions.name = appConstants.containers.explosion;

    return explosions;
};

export const addExplosion = ({ x, y }: Coord) => {
    const textures: Texture[] = getTexture(allTextureKeys.explosion).animations.Explosion_Sequence_A;
    const explosion = new AnimatedSprite(textures);
    explosion.loop = false;
    explosion.animationSpeed = 0.2;
    explosion.anchor.set(0.5);
    explosion.position.set(x, y);
    explosions.addChild(explosion);
    explosion.play();
    play(appConstants.sounds.explosionAsteroid);
};

export const explosionTick = () => {
    const toRemove: AnimatedSprite[] = [];
    explosions.children.forEach((explosion) => {
        if (!explosion.playing) {
            toRemove.push(explosion);
        }
    });
    toRemove.forEach((e) => {
        destroySprite(e);
    });
};

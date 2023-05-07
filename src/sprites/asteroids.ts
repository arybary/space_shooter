import { AnimatedSprite, Application, Assets, Container, DisplayObject, Graphics } from "pixi.js";
import { allTextureKeys } from "../common/textures";

let asteroids: Container<DisplayObject>;

export const addAsteroids = (app: Application) => {
    asteroids = new Container();
    const asteroidsCount = 10;
    console.log(Assets.loader.parsers);
    return asteroids;
};

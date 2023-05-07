import * as PIXI from "pixi.js";
import { Application, ICanvas } from "pixi.js";
import { loadAssets } from "./common/assets";
import appConstants from "./common/constants";
import { initBullets } from "./sprites/bullets";
import { addPlayer } from "./sprites/player";
import { addStars } from "./sprites/stars";
import { addAsteroids } from "./sprites/asteroids";
import initInteraction from "./interaction";

const WIDTH = appConstants.size.WIDTH;
const HEIGHT = appConstants.size.HEIGHT;

export const app = new PIXI.Application({
    background: "#000000",
    antialias: true,
    width: WIDTH,
    height: HEIGHT,
});

export interface GameState {
    stopped: boolean;
    moveLeftActive: boolean;
    moveRightActive: boolean;
    app: Application<ICanvas>;
    mousePosition?: number;
}

export const gameState: GameState = {
    stopped: false,
    moveLeftActive: false,
    moveRightActive: false,
    app,
};

const createScene = () => {
    console.log("greateScene");
    document.body.appendChild(app.view as HTMLCanvasElement);

    const rootContainer = app.stage;
    rootContainer.interactive = true;
    rootContainer.hitArea = app.screen;
    const stars = addStars(app);
    rootContainer.addChild(stars);

    const bullets = initBullets();
    rootContainer.addChild(bullets);

    const player = addPlayer(app);
    rootContainer.addChild(player);

    const asteroids = addAsteroids(app);
    rootContainer.addChild(asteroids);

    return app;
};

export const initGame = () => {
    loadAssets((progress) => {
        console.log(progress);
        if (progress === 100) {
            createScene();
            initInteraction();
        }
    });
};

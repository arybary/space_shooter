import { Application } from "pixi.js";
import { loadAssets } from "./common/assets";
import appConstants from "./common/constants";
import { initBullets } from "./sprites/bullets";
import { initExplosions } from "./sprites/explosions";
import { addPlayer } from "./sprites/player";
import { addStars } from "./sprites/stars";
import { initInfo } from "./sprites/infoPanel";
import { addAsteroids } from "./sprites/asteroids";
import initInteraction from "./interaction";
import { EventHub, youLose } from "./common/eventHub";
import { play } from "./common/sound";
import { getYouLose, getYouWin } from "./sprites/messages";

const WIDTH = appConstants.size.WIDTH;
const HEIGHT = appConstants.size.HEIGHT;

export const app = new Application({
    background: "#000000",
    antialias: true,
    width: WIDTH,
    height: HEIGHT,
});

const createScene = () => {
    console.log("greateScene");
    document.body.appendChild(app.view as HTMLCanvasElement);

    const rootContainer = app.stage;
    rootContainer.interactive = true;
    rootContainer.hitArea = app.screen;

    const stars = addStars(app);
    const info = initInfo();
    const bullets = initBullets();
    const explosions = initExplosions();
    const player = addPlayer(app);
    const asteroids = addAsteroids(app);
    rootContainer.addChild(stars, info, asteroids, player, bullets, explosions);

    EventHub.on(appConstants.events.youWin, () => {
        app.ticker.stop()
        app.stage.addChild(getYouWin())
        setTimeout(() => play(appConstants.sounds.youWin), 1000)
      })
    
      EventHub.on(appConstants.events.youLose, () => {
        app.ticker.stop()
        rootContainer.addChild(getYouLose())
        setTimeout(() => play(appConstants.sounds.gameOver), 1000)
      })

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



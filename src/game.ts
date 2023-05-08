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
import { EventHub } from "./common/eventHub";
import { play } from "./common/sound";
import { getMessangeEndGame } from "./sprites/messages";
import { initTimer } from "./sprites/timer";

const { WIDTH, HEIGHT } = appConstants.size;

export const app = new Application({
    background: "#000000",
    antialias: true,
    width: WIDTH,
    height: HEIGHT,
});

export const rootContainer = app.stage;

const createScene = () => {
    document.body.appendChild(app.view as HTMLCanvasElement);

    rootContainer.interactive = true;
    rootContainer.hitArea = app.screen;

    const stars = addStars();
    const info = initInfo();
    const timer = initTimer();
    const bullets = initBullets();
    const explosions = initExplosions();
    const player = addPlayer();
    const asteroids = addAsteroids();
    
    rootContainer.addChild(stars, info, timer, asteroids, player, bullets, explosions);

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

EventHub.on(appConstants.events.youWin, () => {
    app.ticker.stop();
    app.stage.addChild(getMessangeEndGame("You Win!"));
    setTimeout(() => play(appConstants.sounds.youWin), 1000);
});

EventHub.on(appConstants.events.youLose, () => {
    app.ticker.stop();
    rootContainer.addChild(getMessangeEndGame("You Lose!"));
    setTimeout(() => play(appConstants.sounds.gameOver), 1000);
});

EventHub.on(appConstants.events.restartGame, () => location.reload());

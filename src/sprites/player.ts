import { Application, Sprite } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";
import { shoot } from "../common/eventHub";
import { allTextureKeys } from "../common/textures";
import { addBullet } from "./bullets";

let player: Sprite;
let lockTimeout: NodeJS.Timeout | null;

export const addPlayer = (app: Application) => {
    if (player) {
        return player;
    }

    player = new Sprite(getTexture(allTextureKeys.spaceShip));
    player.name = appConstants.containers.player;
    player.anchor.set(0.5);
    player.scale.set(0.3);
    player.position.set(app.view.width / 2, app.view.height - 50);
    return player;
};

export const lockPlayer = () => {
    if (lockTimeout) {
        return;
    }

    lockTimeout = setTimeout(() => {
        lockTimeout = null;
    }, appConstants.timeouts.playerLock);
};

export const getPlayer = () => player;

export const playerShoots = () => {
    if (!lockTimeout) {
         shoot()
        addBullet({ x: player.position.x, y: player.position.y });
    }
};

export const playerTick = () => {
    if (lockTimeout) {
        player.alpha = 0.5;
    } else {
        player.alpha = 1;
    }
};

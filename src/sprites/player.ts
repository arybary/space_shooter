import { Sprite } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";
import { allTextureKeys } from "../common/textures";
import { addBullet } from "./bullets";

let player: Sprite;
let lockTimeout: NodeJS.Timeout | null;
const speed = appConstants.speed.player;
const { WIDTH, HEIGHT } = appConstants.size;

export const addPlayer = () => {
    if (player) {
        return player;
    }

    player = new Sprite(getTexture(allTextureKeys.spaceShip));
    player.name = appConstants.containers.player;
    player.anchor.set(0.5);
    player.scale.set(0.3);
    player.position.set(WIDTH / 2, HEIGHT - 50);
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
        addBullet({ x: player.position.x, y: player.position.y });
    }
};

export const playerMovLeft = () => {
    if (player.x - speed > 20) {
        player.x -= speed;
    }
};

export const playerMovRight = () => {
    if (player.x + speed < WIDTH - 20) {
        player.x += speed;
    }
};

export const playerTick = () => {
    if (lockTimeout) {
        player.alpha = 0.5;
    } else {
        player.alpha = 1;
    }
};

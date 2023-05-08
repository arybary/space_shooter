import { utils } from "pixi.js";
import appConstants from "./constants";

export const EventHub = new utils.EventEmitter();

export const asteroidKill = () => {
    EventHub.emit(appConstants.events.asteroidKilled);
};

export const shoot = () => {
    EventHub.emit(appConstants.events.shoot);
};

export const youWin = () => {
    EventHub.emit(appConstants.events.youWin);
};
export const youLose = () => {
    EventHub.emit(appConstants.events.youLose);
};
export const restartGame = () => {
    EventHub.emit(appConstants.events.restartGame);
};

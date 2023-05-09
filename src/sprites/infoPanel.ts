import { Container, Graphics, Text, TextStyle } from "pixi.js";
import appConstants from "../common/constants";
import { EventHub, youLose, youWin } from "../common/eventHub";

let info: Container;
let asteroidText: Text;
let bulletsText: Text;
let bulletsCount = appConstants.count.bullets;
let asteroidCount = appConstants.count.asteroid;

const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"],
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: "round",
});

export const initInfo = () => {
    info = new Container();
    info.name = appConstants.containers.infoPanel;

    const infoPanel = new Container();

    infoPanel.position.x = 20;
    infoPanel.position.y = 20;

    const graphics = new Graphics();
    graphics.lineStyle(1, 0xff00ff, 1);
    graphics.beginFill(0x650a5a, 0.25);
    graphics.drawRoundedRect(0, 0, 150, 100, 16);
    graphics.endFill();
    infoPanel.addChild(graphics);

    asteroidText = new Text(`asteroid:${asteroidCount}`, style);
    asteroidText.anchor.set(0.5);
    asteroidText.x = 80;
    asteroidText.y = 30;
    asteroidText.name = "asteroidtext";
    infoPanel.addChild(asteroidText);

    bulletsText = new Text(`bullets:${bulletsCount}`, style);
    bulletsText.anchor.set(0.5);
    bulletsText.x = 80;
    bulletsText.y = 70;
    bulletsText.name = "bulletsText";
    infoPanel.addChild(bulletsText);
    info.addChild(infoPanel);
    info.alpha = 0.6;

    return info;
};

EventHub.on(appConstants.events.asteroidKilled, () => {
    asteroidCount -= 1;
    asteroidText.text = `asteroid:${asteroidCount}`;
    if (asteroidCount === 0) {
        youWin();
    }
});

EventHub.on(appConstants.events.shoot, () => {
    bulletsCount -= 1;
    bulletsText.text = `bullets:${bulletsCount}`;

    if (asteroidCount > bulletsCount) {
        youLose();
    }
});

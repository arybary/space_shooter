import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";
import { EventHub, youLose, youWin } from "../common/eventHub";
import { muteAll, unmuteAll } from "../common/sound";
import { allTextureKeys } from "../common/textures";

let info;
let asteroidText: Text;
let bulletsText: Text;
let bulletsCount = appConstants.count.bullets;
let asteroidCount = appConstants.count.asteroid;
let effectsOff: Sprite;
let effectsOffStatus = false;

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
    const effectsOffTexture = getTexture(allTextureKeys.effectsOff);
    const effectsOnTexture = getTexture(allTextureKeys.effectsOn);

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

    const effectsButton = new Container();
    effectsButton.x = appConstants.size.WIDTH - 100;
    effectsButton.y = 100;
    effectsButton.name = "musicButton";

    const graphicsEffectsOff = new Graphics();
    graphicsEffectsOff.lineStyle(2, 0xff00ff, 1);
    graphicsEffectsOff.beginFill(0x650a5a, 0.25);
    graphicsEffectsOff.drawCircle(15, 15, 30);
    graphicsEffectsOff.endFill();
    effectsButton.addChild(graphicsEffectsOff);

    effectsOff = new Sprite(effectsOffStatus ? effectsOffTexture : effectsOnTexture);
    if (effectsOffStatus) {
        muteAll();
    } else {
        unmuteAll();
    }

    effectsOff.x = -9;
    effectsOff.y = -9;
    effectsOff.name = "effectsOff";
    effectsButton.addChild(effectsOff);
    effectsButton.interactive = true;
    effectsButton.on("pointertap", () => {
        effectsOffStatus = !effectsOffStatus;
        effectsOff.texture = effectsOffStatus ? effectsOffTexture : effectsOnTexture;
        if (effectsOffStatus) {
            muteAll();
        } else {
            unmuteAll();
        }
    });

    info.addChild(effectsButton);

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

    if (bulletsCount === 0 && asteroidCount > 0) {
        youLose();
    }
});

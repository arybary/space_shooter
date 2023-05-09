import { Container, Graphics, Sprite } from "pixi.js";
import { muteAll, unmuteAll } from "../common/sound";
import { allTextureKeys } from "../common/textures";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";


let effectsOffStatus = false;
const { WIDTH } = appConstants.size;

export const initVolumeBtn = () => {
    const effectsOffTexture = getTexture(allTextureKeys.effectsOff);
    const effectsOnTexture = getTexture(allTextureKeys.effectsOn);

    const effectsButton = new Container();
    effectsButton.x = WIDTH - 100;
    effectsButton.y = 100;
    effectsButton.name = "musicButton";

    const graphicsEffectsOff = new Graphics();
    graphicsEffectsOff.lineStyle(2, 0xff00ff, 1);
    graphicsEffectsOff.beginFill(0x650a5a, 0.25);
    graphicsEffectsOff.drawCircle(15, 15, 30);
    graphicsEffectsOff.endFill();
    effectsButton.addChild(graphicsEffectsOff);

    const effectsOff = new Sprite(effectsOffStatus ? effectsOffTexture : effectsOnTexture);
    if (effectsOffStatus) {
        muteAll();
    } else {
        unmuteAll();
    }

    effectsOff.x = -9;
    effectsOff.y = -9;
    effectsOff.name = "effectsOff";
    effectsButton.addChild(effectsOff);
    effectsButton.eventMode = 'dynamic';
    effectsButton.on("pointertap", () => {
        effectsOffStatus = !effectsOffStatus;
        effectsOff.texture = effectsOffStatus ? effectsOffTexture : effectsOnTexture;
        if (effectsOffStatus) {
            muteAll();
        } else {
            unmuteAll();
        }
    });
    return effectsButton;
};

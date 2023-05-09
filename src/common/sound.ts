import { Howl } from "howler";
import appConstants from "./constants";

const allSounds = {
    [appConstants.sounds.shot]: new Howl({
        src: ["assets/sounds/shot.mp3"],
        volume: 0.5,
    }),

    [appConstants.sounds.explosion]: new Howl({
        src: ["assets/sounds/explosion.mp3"],
        volume: 0.5,
    }),
    [appConstants.sounds.gameOver]: new Howl({
        src: ["assets/sounds/game_over.mp3"],
        volume: 1,
    }),
    [appConstants.sounds.youWin]: new Howl({
        src: ["assets/sounds/you_win.mp3"],
        volume: 0.5,
    }),
};

export const play = (id: string) => allSounds[id].play();

export const muteAll = () => {
    Howler.mute(true);
};

export const unmuteAll = () => {
    Howler.mute(false);
};

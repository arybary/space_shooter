import { Text } from "pixi.js";
import { youLose } from "../common/eventHub";
import appConstants from "../common/constants";

const { WIDTH } = appConstants.size;
const { startTime } = appConstants.timer;

let timerText: Text;
let timeLeft: number = startTime;

export const initTimer = () => {
    timerText = new Text("1:00", { fontSize: 36, fill: "white" });
    timerText.name = appConstants.containers.timer;
    timerText.anchor.set(0.5);
    timerText.position.set(WIDTH - 100, 50);
    return timerText;
};

export const timerTick = (delta: number) => {
    timeLeft -= delta / 60;

    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor(timeLeft % 60)
        .toString()
        .padStart(2, "0");
    const timeString = `${minutes}:${seconds}`;

    timerText.text = timeString;

    if (timeLeft <= 1) {
        youLose();
    }
};

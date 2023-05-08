import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { EventHub, youLose, youWin } from "../common/eventHub";
import appConstants from "../common/constants";

const { WIDTH } = appConstants.size;
const { startTime} = appConstants.timer;
//let time = startTime;
let timerText: Text;

export const initTimer = () => {
    timerText = new Text("1:00", { fontSize: 48, fill: "white" });
    timerText.anchor.set(0.5);
    timerText.position.set(WIDTH - 100, 50);
    return timerText;
};

let remainingTime = startTime;

EventHub.on(appConstants.events.timer, () => {
    remainingTime--;
    timerText.text = `${remainingTime}`;
    if (remainingTime === 0) {
        youLose();
    }
});

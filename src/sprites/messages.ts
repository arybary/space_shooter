import { Container, Graphics, Text, TextStyle } from "pixi.js";
import appConstants from "../common/constants";
import { restartGame } from "../common/eventHub";

const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
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

const youLoseMessage = new Container();
youLoseMessage.interactive = true;

const graphics = new Graphics();
graphics.lineStyle(1, 0xff00ff, 1);
graphics.beginFill(0x650a5a, 0.25);
graphics.drawRoundedRect(0, 0, 250, 100, 16);
graphics.endFill();

youLoseMessage.addChild(graphics);

const text = new Text("You Lose!", style);
text.anchor.set(0.5);
text.x = 250 / 2;
text.y = 100 / 2;
youLoseMessage.addChild(text);
youLoseMessage.on("pointertap", () => {
    restartGame(appConstants.events.youLose);
});

export const getYouLose = () => {
    youLoseMessage.position.x = appConstants.size.WIDTH / 2 - youLoseMessage.width / 2;
    youLoseMessage.position.y = appConstants.size.HEIGHT / 2 - youLoseMessage.height / 2;
    return youLoseMessage;
};

const youWinMessage = new Container();
youWinMessage.interactive = true;

const graphics2 = new Graphics();
graphics2.lineStyle(1, 0xff00ff, 1);
graphics2.beginFill(0x650a5a, 0.25);
graphics2.drawRoundedRect(0, 0, 250, 100, 16);
graphics2.endFill();

youWinMessage.addChild(graphics2);

const text2 = new Text("You Win!", style);
text2.anchor.set(0.5);
text2.x = 250 / 2;
text2.y = 100 / 2;
youWinMessage.addChild(text2);
youWinMessage.on("pointertap", () => {
    restartGame(appConstants.events.youWin);
});

export const getYouWin = () => {
    youWinMessage.position.x = appConstants.size.WIDTH / 2 - youWinMessage.width / 2;
    youWinMessage.position.y = appConstants.size.HEIGHT / 2 - youWinMessage.height / 2;
    return youWinMessage;
};

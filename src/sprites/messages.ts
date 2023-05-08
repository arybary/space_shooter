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


export const getMessangeEndGame = (massage:string)=>{
const messageContainer = new Container();
messageContainer.interactive = true;

const graphics2 = new Graphics();
graphics2.lineStyle(1, 0xff00ff, 1);
graphics2.beginFill(0x650a5a, 0.25);
graphics2.drawRoundedRect(0, 0, 250, 100, 16);
graphics2.endFill();

messageContainer.addChild(graphics2);

const text2 = new Text(massage, style);
text2.anchor.set(0.5);
text2.x = 250 / 2;
text2.y = 100 / 2;
messageContainer.addChild(text2);
messageContainer.on("pointertap", () => {
    restartGame();
});


    messageContainer.position.x = appConstants.size.WIDTH / 2 - messageContainer.width / 2;
    messageContainer.position.y = appConstants.size.HEIGHT / 2 - messageContainer.height / 2;
    return messageContainer;

}
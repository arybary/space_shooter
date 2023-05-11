import { Container, DisplayObject, Graphics } from "pixi.js";
import appConstants from "../common/constants";
import { randomIntFromInterval } from "../common/utils";

let stars: Container<DisplayObject>;
const { WIDTH, HEIGHT } = appConstants.size;

export const addStars = () => {
    stars = new Container();
    stars.name = appConstants.containers.stars;

    for (let i = 0; i < appConstants.count.stars; i++) {
        const star = new Graphics();
        const x = randomIntFromInterval(0, WIDTH);
        const y = randomIntFromInterval(0, HEIGHT);
        const radius = randomIntFromInterval(0, 2);

        star.beginFill(0xffffff, 1);
        star.drawCircle(x, y, radius);
        star.endFill();

        stars.addChild(star);
    }
    return stars;
};

export const starsTick = () => {
    stars.children.forEach((star) => {
        star.alpha = Math.random() * 0.5 + 0.5;
    });
};

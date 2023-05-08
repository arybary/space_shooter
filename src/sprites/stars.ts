import { Container, DisplayObject, Graphics } from "pixi.js";
import appConstants from "../common/constants";

let stars: Container<DisplayObject>;
const { WIDTH, HEIGHT } = appConstants.size;

export const addStars = () => {
    stars = new Container();
    for (let i = 0; i < appConstants.count.stars; i++) {
        const star = new Graphics();
        const x = Math.random() * WIDTH;
        const y = Math.random() * HEIGHT;
        const radius = Math.random() * 3;

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

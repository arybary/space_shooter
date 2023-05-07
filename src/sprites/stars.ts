import { Application, Container, DisplayObject, Graphics } from "pixi.js";

let stars: Container<DisplayObject>;

export const addStars = (app: Application) => {
    stars = new Container();
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = new Graphics();
        const x = Math.random() * app.view.width;
        const y = Math.random() * app.view.height;
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

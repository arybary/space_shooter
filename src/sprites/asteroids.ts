import { AnimatedSprite, Application, Container, DisplayObject, Point, Texture } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";
import { allTextureKeys } from "../common/textures";
import { checkCollision, randomIntFromInterval } from "../common/utils";

class Asteroid extends AnimatedSprite {
    public vx: number;
    public vy: number;

    constructor(textures: Texture[]) {
        super(textures);

        this.vx = 2;
        this.vy = 2;
    }
}

let asteroids: Container<Asteroid>;

export const addAsteroids = (app: Application) => {
    asteroids = new Container();
    const asteroidsCount = 10;
    const textures: Texture[] = getTexture(allTextureKeys.asteroid).animations.image_part;

    for (let i = 0; i < asteroidsCount; i++) {
        const x = randomIntFromInterval(0, app.view.width);
        const y = randomIntFromInterval(0, app.view.height);

        const asteroid = new Asteroid(textures);
        asteroid.position.set(x, y);
        asteroid.anchor.set(0.5);
        asteroid.animationSpeed = 0.3;
        asteroid.vx = Math.random() * 10 - 5;
        asteroid.vy = Math.random() * 10 - 5;
        asteroid.loop = true;

        asteroid.play();
        console.log(asteroid);

        asteroids.addChild(asteroid);
    }
    return asteroids;
};

export const asteroidsTick = (delta: number, width: number, height: number) => {
    asteroids.children.forEach((asteroid, i) => {
        asteroid.x += Math.cos(i) * asteroid.vx;
        asteroid.y += Math.sin(i) * asteroid.vy;

        if (asteroid.x < 0) {
            asteroid.vx *= -1;
            asteroid.x = 0;
        } else if (asteroid.x > width) {
            asteroid.vx *= -1;
            asteroid.x = width;
        }
        if (asteroid.y < 0) {
            asteroid.vy *= -1;
            asteroid.y = 0;
        } else if (asteroid.y > height) {
            asteroid.vy *= -1;
            asteroid.y = height;
        }

        asteroids.children.forEach((other) => {
            if (asteroid === other) {
                return;
              }
              if (asteroid.getBounds().intersects(other.getBounds())) {
                // Расходятся в противоположных направлениях
                asteroid.vx *= -1;
                asteroid.vy *= -1;
                other.vx *= -1;
                other.vy *= -1;
              }
        });
    });
};

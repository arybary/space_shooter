import { AnimatedSprite, Container, Texture } from "pixi.js";
import { getTexture } from "../common/assets";
import appConstants from "../common/constants";
import { allTextureKeys } from "../common/textures";
import { randomIntFromInterval } from "../common/utils";
import { addExplosion } from "./explosions";

const { WIDTH, HEIGHT } = appConstants.size;

let asteroids: Container<Asteroid>;

export class Asteroid extends AnimatedSprite {
    public vx: number;
    public vy: number;

    constructor(textures: Texture[]) {
        super(textures);
        this.vx = 2;
        this.vy = 2;
    }
}

export const addAsteroids = () => {
    asteroids = new Container();
    asteroids.name = appConstants.containers.asteroids;
    const textures: Texture[] = getTexture(allTextureKeys.asteroid).animations.image_part;

    for (let i = 0; i < appConstants.count.asteroid; i++) {
        const x = randomIntFromInterval(0, WIDTH);
        const y = randomIntFromInterval(0, HEIGHT - 200);

        const asteroid = new Asteroid(textures);
        asteroid.position.set(x, y);
        asteroid.anchor.set(0.5);
        asteroid.animationSpeed = 0.3;
        asteroid.vx = Math.random() * 10 - 5;
        asteroid.vy = Math.random() * 10 - 5;
        asteroid.loop = true;
        asteroid.rotation = (i / 5) * (Math.PI * 2);
        asteroid.play();
        asteroids.addChild(asteroid);
    }
    return asteroids;
};
export const destroyAsteroid = (asteroid: Asteroid) => {
    addExplosion(asteroid.position);
};

export const recalculateAliveAsteroids = () => {
    return;
};

export const asteroidsTick = () => {
    asteroids.children.forEach((asteroid, i) => {
        asteroid.x += Math.cos(i) * asteroid.vx;
        asteroid.y += Math.sin(i) * asteroid.vy;

        if (asteroid.x < 0) {
            asteroid.vx *= -1;
            asteroid.x = 0;
        } else if (asteroid.x > WIDTH) {
            asteroid.vx *= -1;
            asteroid.x = WIDTH;
        }
        if (asteroid.y < 0) {
            asteroid.vy *= -1;
            asteroid.y = 0;
        } else if (asteroid.y > HEIGHT) {
            asteroid.vy *= -1;
            asteroid.y = HEIGHT;
        }
    });
};

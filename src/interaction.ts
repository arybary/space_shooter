import { getPlayer, lockPlayer, playerShoots, playerTick } from "./sprites/player";
import { bulletTick } from "./sprites/bullets";
import { app } from "./game";
import { starsTick } from "./sprites/stars";
import { Asteroid, asteroidsTick } from "./sprites/asteroids";
import { addExplosion, explosionTick } from "./sprites/explosions";
import appConstants from "./common/constants";
import { Container, DisplayObject } from "pixi.js";
import { checkCollision, destroySprite } from "./common/utils";
import { asteroidKill } from "./common/eventHub";

const checkAllCollisions = () => {
    const rootContainer = app.stage;
    const asteroids: Container<Asteroid> | null = rootContainer.getChildByName(appConstants.containers.asteroids);
    const bullets: Container<DisplayObject> | null = rootContainer.getChildByName(appConstants.containers.bullets);
    const player = rootContainer.getChildByName(appConstants.containers.player);

    if (asteroids && bullets) {
        const toRemove: DisplayObject[] = [];
        bullets.children.forEach((bullet) => {
            asteroids.children.forEach((asteroid) => {
                if (asteroid && bullet) {
                    if (checkCollision(asteroid, bullet)) {
                        console.log("попал");
                        toRemove.push(bullet);
                        toRemove.push(asteroid);
                        addExplosion(asteroid.position);
                        asteroidKill()
                    }
                }
            });
        });
        toRemove.forEach((sprite) => destroySprite(sprite));
    }

    if (asteroids && player) {
        asteroids.children.forEach((b) => {
            if (checkCollision(b, player)) {
                lockPlayer();
            }
        });
    }
};

const initInteraction = () => {
    const width = app.view.width;
    const height = app.view.height;
    const speedShip = 10;
    console.log("initInteraction");
    const ship = getPlayer();
    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "ArrowLeft":
                if (ship.x - speedShip > 20) {
                    ship.x -= speedShip;
                }
                break;
            case "ArrowRight":
                if (ship.x + speedShip < width - 20) {
                    ship.x += speedShip;
                }
                break;
            case "Space":
                playerShoots();
                break;
        }
    });

    app.ticker.add(() => {
        starsTick();
        playerTick();
        bulletTick();
        explosionTick();
        asteroidsTick(1, width, height);
        checkAllCollisions();
    });
};

export default initInteraction;

import { lockPlayer, playerMovLeft, playerMovRight, playerShoots, playerTick } from "./sprites/player";
import { bulletTick } from "./sprites/bullets";
import { starsTick } from "./sprites/stars";
import { Asteroid, asteroidsTick } from "./sprites/asteroids";
import { addExplosion, explosionTick } from "./sprites/explosions";
import appConstants from "./common/constants";
import { Container, DisplayObject } from "pixi.js";
import { checkCollision, destroySprite } from "./common/utils";
import { asteroidKill, shoot, timer } from "./common/eventHub";
import { app, rootContainer } from "./game";


const checkAllCollisions = () => {
    const asteroids: Container<Asteroid> | null = rootContainer.getChildByName(appConstants.containers.asteroids);
    const bullets: Container<DisplayObject> | null = rootContainer.getChildByName(appConstants.containers.bullets);
    const player = rootContainer.getChildByName(appConstants.containers.player);

    if (asteroids && bullets) {
        const toRemove: DisplayObject[] = [];
        bullets.children.forEach((bullet) => {
            asteroids.children.forEach((asteroid) => {
                if (asteroid && bullet) {
                    if (checkCollision(asteroid, bullet)) {
                        toRemove.push(bullet);
                        toRemove.push(asteroid);
                        addExplosion(asteroid.position);
                        asteroidKill();
                        shoot()
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
    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "ArrowLeft":
                playerMovLeft();
                break;
            case "ArrowRight":
                playerMovRight();
                break;
            case "Space":
                playerShoots();
                break;
        }
    });
    setInterval(()=>timer(),1000)
    app.ticker.add(() => {
        starsTick();
        playerTick();
        bulletTick();
        explosionTick();
        asteroidsTick();
        checkAllCollisions();
  
    });
};

export default initInteraction;

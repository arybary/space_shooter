import { getPlayer, playerShoots } from "./sprites/player";
import { bulletTick } from "./sprites/bullets";
import { app } from "./game";
import { starsTick } from "./sprites/stars";
import { asteroidsTick } from "./sprites/asteroids";

const initInteraction = () => {
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
                if (ship.x + speedShip < app.view.width - 20) {
                    ship.x += speedShip;
                }
                break;
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            playerShoots();
        }
    });

    app.ticker.add(() => {
        starsTick();
        bulletTick();
        asteroidsTick(1, app.view.width, app.view.height);
    });
};

export default initInteraction;

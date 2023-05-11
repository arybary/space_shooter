const appConstants = {
    size: {
        WIDTH: 1280,
        HEIGHT: 720,
    },
    containers: {
        stars: "stars",
        player: "player",
        bullets: "bullets",
        asteroids: "asteroids",
        explosion: "explosion",
        infoPanel: "infoPanel",
        timer: "timer",
        volume: "volume",
    },
    timeouts: {
        playerLock: 5000,
        playerShoots: 1000,
        timer: 60,
    },
    count: {
        stars: 500,
        asteroid: 6,
        bullets: 10,
    },
    speed: {
        bullet: 10,
        player: 10,
        asteroid: 3,
    },
    events: {
        infoUpdated: "infoUpdated",
        asteroidKilled: "asteroidKilled",
        shoot: "shoot",
        youWin: "youWin",
        youLose: "youLose",
        restartGame: "restartGame",
    },
    sounds: {
        shot: "shot",
        explosionAsteroid: "explosionAsteroid",
        explosionPlayer: "explosionPlayer",
        gameOver: "gameOver",
        youWin: "youWin",
    },
};

export default appConstants;

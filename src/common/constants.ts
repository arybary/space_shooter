const appConstants = {
    size: {
        WIDTH: 1280,
        HEIGHT: 720,
    },
    containers: {
        player: "player",
        bullets: "bullets",
        asteroids: "asteroids",
        explosion: "explosion",
        infoPanel: "infoPanel",
    },
    timeouts: {
        playerLock: 5000,
        playerShoots: 1000,
    },
    count: {
        stars: 500,
        asteroid: 4,
        bullets:10
    },
    speed: {
        bullet: 10,
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
        shot: 'shot',
        miss: 'miss',
        explosion: 'explosion',
        gameOver: 'gameOver',
        youWin: 'youWin',
        background: 'background',
    },
};

export default appConstants;

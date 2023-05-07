import { Assets, ProgressCallback } from "pixi.js";
import appTextures, { allTextureKeys } from "./textures";

Object.entries(appTextures).forEach(([key, value]) => {
    Assets.add(key, value);
});

const textures = new Map();

export const loadAssets = (onProgress: ProgressCallback) => {
    const keys = Object.values(allTextureKeys);
    Assets.load([...keys], onProgress).then((data) => {
        Object.entries(data).forEach(([key, value]) => {
            textures.set(key, value);
        });

        onProgress(100);
    });
};

export const getTexture = (id: string) => {
    if (textures.has(id)) {
        return textures.get(id);
    }
    return null;
};

import { OfflineCompiler } from "./image-target/offline-compiler.js";
import { loadImage, createCanvas ,Image, Canvas } from "canvas";
import { promises as fs } from "fs";
import path from "path";
import { CompileResult } from "./entities/target-manifest.js";

export class MindCompiler {

    private async prepareImage(path: string, maxWidth: number) : Promise<Image | Canvas>
    {
        const img = await loadImage(path);

        // Already small enough?
        if (img.width <= maxWidth) {
            return img;
        }

        // Resize while keeping aspect ratio
        const scale = maxWidth / img.width;

        const width = maxWidth;
        const height = Math.round(img.height * scale);

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        console.log(
            `Resized ${img.width}x${img.height} -> ${width}x${height}`
        );

        return canvas;
    }

    private compileManifest(imagePaths: string[]): CompileResult {
        return {
            targets: imagePaths.map((imagePath, index) => ({
                targetIndex: index,
                filename: path.basename(imagePath),
            }))
        };
    }

    async compile(imagePaths: string[],maxImageSize: number = 1080): Promise<Uint8Array> {

        const images = await Promise.all(
            imagePaths.map(async (pathn) => 
                this.prepareImage(pathn,maxImageSize)
            )
        );

        const compiler = new OfflineCompiler();

        await compiler.compileImageTargets(images, (percent : number) => {
                console.log(`Progress ${percent.toFixed(1)}%`);
            });
 
        return compiler.exportData();
    }

    async compileToFile(
        imagePaths: string[],
        output: string,
        manifest: string,
        maxImageSize:number
    ) {
        const buffer = await this.compile(imagePaths,maxImageSize);
        const compileRes = this.compileManifest(imagePaths);
        await Promise.all([
            fs.writeFile(output, buffer),
            fs.writeFile(manifest, JSON.stringify(compileRes, null, 2), "utf8")
        ]);
    }
}
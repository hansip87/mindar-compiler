import { MindCompiler } from "./compiler.js";

async function main() {
    console.time("compile");
    const compiler = new MindCompiler();

    await compiler.compileToFile(
        [
            "./sample/card.jpg"
        ],
        "./sample/targets.mind",
        "./sample/targets.manifest",
        1280
    );

    console.log("Done");
    console.timeEnd("compile");
}

main();
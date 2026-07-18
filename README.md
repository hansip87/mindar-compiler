# mindar-compiler

Standalone Node.js image target compiler extracted from MindAR.

## Credits

This project is based on the offline compiler implementation from
https://github.com/hiukim/mind-ar-js

Original author:
Hiukim

This project adds:

- TypeScript support
- Standalone npm package
- Worker Thread compatibility
- Progress callback improvements
- Node.js event loop yielding
- Docker support
- GitHub Packages publishing

### How to Use
- Add .npmrc
    ```
    @hansip87:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=ghp_your_pat_token
    ```
- Add to package.json dependency
    ```
    "dependencies": {...
    "@hansip87/mindar-compiler": "^1.0.5",
    }
    ```
- Add to your background worker 
    ```
    import { MindCompiler } from "@hansip87/mindar-compiler";
    const compiler = new MindCompiler();

    await compiler.compileToFile(
        inputImagePaths,    //string[] of image input path with reserved order
        outputFilePath,     //string absolute path of mind target output
        manifestFilePath,   //string absolute path of json file for front end setup
        1280                //maximum width of file input.
    );
    ```


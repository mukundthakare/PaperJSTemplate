# paperjs-Template
A fundamental **Paper.js starter project** using webpack to make your day a bit easier.

## Features
- Typescript/javascript source support
- Sample Paper.js drawpad app
- Clear project hierarchy
- Auto cache busting source files
- Fast development and minified distribution builds

## Usage

### Setup
1) Clone the repository
2) Do npm install
3) Do npm run dev to run the project

### Development
During the development you should run the development task, this will transpile your source files and copy all needed assets. Every time the watcher notices that a source file or asset is changed, it will build again. Please note that the typescript type checking is done in the background to improve performance and will not stop the build.

```
npm run dev
```

After running the development task you can go to ``http://localhost:8080`` in your favorite web browser and see the results. If you want to browse the files you can look in the ``_build/dev`` folder.

### Distribution
Running the distribution task will do the same as the development tasks to the source files and assets, but it will minify the transpiled source files into a smaller bundle.
```
npm run dist
```
You can browse the resulting files in the ``_build/dist`` directory or run ``http-server`` here to see it in the browser.
import { Path, setup, Tool } from "paper";

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    setup(canvas);

    // Create a simple drawing tool:
    let tool: Tool = new Tool();
    let path: Path;

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = (event) => {
        path = new Path();
        path.strokeColor = 'black';
        path.add(event.point);
    }

    tool.onMouseDrag = (event) => {
        path.add(event.point);
    }
};

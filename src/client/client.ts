import * as paper from 'paper';
let project: paper.Project;

function init() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  project = new paper.Project(canvas);
  project.activate();
  moveOriginToBottomLeft();
}

function addShape() {
  let x = 150;
  const y = 50;
  const y2 = 175;
  const fillColor_1 = new paper.Color('red');
  const strokeColor_1 = new paper.Color('black');
  const fillColor_2 = new paper.Color('yellow');
  const strokeColor_2 = new paper.Color('pink');
  for (let i = 0; i < 20; i++) {
    const center = new paper.Point(x, y);
    const radius = 20;
    const circle = new paper.Path.Circle(center, radius);
    circle.strokeColor = strokeColor_1;
    circle.fillColor = fillColor_1;

    const center2 = new paper.Point(x, y2);
    const radius2 = 20;
    const circle2 = new paper.Path.Circle(center2, radius2);
    circle2.strokeColor = strokeColor_2;
    circle2.fillColor = fillColor_2;

    x = x + 25;
  }
}

function moveOriginToBottomLeft() {
  const height = project.view.size.height;
  const matrix = new paper.Matrix(1, 0, 0, -1, 0, height);  // Flip Y-axis and translate down
  project.view.transform(matrix);
}

init();
addShape();
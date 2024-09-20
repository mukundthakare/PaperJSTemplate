import * as paper from 'paper';

let project: paper.Project;
let rectangleList: paper.Path.Rectangle[] = [];
let circleList: paper.Path.Circle[] = [];
let text: paper.PointText;
let frameCount = 0;

function init() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  project = new paper.Project(canvas);
  project.activate();
  project.view.onFrame = onFrame;
  moveOriginToBottomLeft();
}

function addCircles() {
  let x = 150;
  const y = 50;
  const y2 = 175;
  const fillColor_1 = new paper.Color('red');
  const strokeColor_1 = new paper.Color('black');
  const fillColor_2 = new paper.Color('yellow');
  const strokeColor_2 = new paper.Color('pink');
  for (let i = 0; i < 50; i++) {
    const center = new paper.Point(x, y);
    const radius = 40;
    const circle = new paper.Path.Circle(center, radius);
    circle.strokeColor = strokeColor_1;
    circle.fillColor = fillColor_1;

    const center2 = new paper.Point(x, y2);
    const radius2 = 50;
    const circle2 = new paper.Path.Circle(center2, radius2);
    circle2.strokeColor = strokeColor_2;
    circle2.fillColor = fillColor_2;

    x = x + 25;
    circleList.push(circle);
    circleList.push(circle2);
  }
}

function moveOriginToBottomLeft() {
  const height = project.view.size.height;
  const matrix = new paper.Matrix(1, 0, 0, -1, 0, height);  // Flip Y-axis and translate down
  project.view.transform(matrix);
}

function LaunchPencileApp() {
  let tool: paper.Tool = new paper.Tool();
  let path: paper.Path;
  // Define a mousedown and mousedrag handler
  tool.onMouseDown = (event: { point: paper.PointLike | paper.Segment | number[]; }) => {
    path = new paper.Path();
    path.strokeColor = new paper.Color('pink');
    path.strokeWidth = 15;
    path.opacity = 0.9;
    path.selected = true;
    path.add(event.point);
  }
  tool.onMouseDrag = (event: { point: paper.PointLike | paper.Segment | number[]; }) => {
    path.add(event.point);
  }
}


function onFrame(event: any) {
  frameCount++;
  //rotate rectangle
  for (let i = 0; i < rectangleList.length; i++) {
    const rectangle = rectangleList[i];
    if (rectangle) {

      // Increment the hue of the fill color
      if (rectangle.fillColor && rectangle.fillColor.hue) rectangle.fillColor.hue += 1;

      // Rotate the rectangle by a small angle (e.g., 1 degree) each frame
      rectangle.rotate(5); // Rotate 1 degree clockwise
    }
  }

  for (let i = 0; i < circleList.length; i++) {
    let circle = circleList[i];
    if (circle && circle.fillColor) {
      if (frameCount % 10 === 0) {
        circle.position = getRandomPointInView();
      }
      circle.fillColor.hue += 1
    }
  }

  text.fillColor = paper.Color.random();
  text.fillColor.brightness = 1;
  text.fillColor.saturation = 1;
  if (frameCount % 30 === 0) {
    text.position = getRandomPointInView();
  }
}

function getRandomPointInView(): paper.Point {
  const viewWidth = project.view.size.width - 150;
  const viewHeight = project.view.size.height - 150;

  const randomX = Math.random() * viewWidth;
  const randomY = Math.random() * viewHeight;

  return new paper.Point(randomX, randomY);
}

function LaunchRotationOfRectangle() {
  for (let i = 0; i < 400; i++) {
    let center = getRandomPointInView();

    // Make sure the center point is adjusted so the rectangle is fully within the view
    let size = new paper.Size(50, 50);
    let topLeft = new paper.Point(center.x - size.width / 2, center.y - size.height / 2);

    let rect = new paper.Path.Rectangle(topLeft, size);

    // Set fill color and stroke color to make the rectangle visible
    rect.fillColor = new paper.Color({
      hue: Math.random() * 360, // Random color hue for each rectangle
      saturation: 1,
      brightness: 1
    });

    rect.strokeColor = new paper.Color('black');  // Optional: add stroke for visibility

    rectangleList.push(rect);
  }
}

function addText() {
  // Create a centered text item at the center of the view:
  text = new paper.PointText({
    point: new paper.Point(project.view.center.x, project.view.size.height - project.view.center.y), // Adjust Y position
    justification: 'center',
    fontSize: 130,
    fillColor: 'black'
  });

  text.content = 'Mukund';

  const height = project.view.size.height;
  const matrix = new paper.Matrix(1, 0, 0, -1, 0, height);  // Flip Y-axis and translate down
  text.transform(matrix);
}


init();
addCircles();
LaunchPencileApp();
LaunchRotationOfRectangle();
addText();
import Paper from "paper";
import Kolor from "kolorwheel";
import {
  getRandomInt,
  remapNumbers,
  getRandomElement,
  getRandomArbitrary
} from "./util";
import { rectToGrid } from "./draw";
let randomPt = new Paper.Point(getRandomInt(0, 1080), getRandomInt(0, 1080));

const randomCircles = cell => {
  let randomN = getRandomInt(0, 5);
  if (randomN < 3) {
    let cir = new Paper.Path.Circle(cell.bounds.center, getRandomInt(50, 200));
    cir.fillColor = "black";
  } else {
    let cir = new Paper.Path.Circle(cell.bounds.center, getRandomInt(30, 100));
    cir.fillColor = "black";
  }
};
const metroLines = cell => {
  let pth = new Paper.Path();
  pth.add(new Paper.Point(0, 0));
  pth.add(new Paper.Point(0, 100));
  pth.add(new Paper.Point(100, 0));
  pth.add(new Paper.Point(0, 0));
  pth.strokeColor = "black";
  pth.strokeWidth = 2;
  pth.strokeJoin = "round";
  pth.fillColor = "red";
  pth.fillColor.alpha = 0.3;
  pth.scale(0.5);
  pth.bounds.center.set(cell.bounds.center);
  if (cell.name == "red") {
    let n = getRandomInt(0, 6);
    pth.rotate(90);
    if (n <= 3) {
      pth.rotate(180);
    }
  }
};
const slicedCircles = cell => {
  let cir = new Paper.Path.Circle(cell.bounds.center, cell.bounds.width / 2);
  cir.strokeColor = "black";
  cir.strokeWidth = 50;
  cir.strokeCap = "round";
  let seg = cir.segments[getRandomInt(0, cir.segments.length - 1)].location;
  let seg2 = cir.segments[getRandomInt(0, cir.segments.length - 1)].location;
  let newP = cir.split(seg);
  let newP2 = cir.split(seg2);

  newP.strokeWidth = 0;
};

const randomPolygons = cell => {
  let cir = new Paper.Path.Rectangle(
    cell.bounds.center,
    cell.bounds.width - 300
  );
  cir.fillColor = "black";
  // cir.selected = true;
  let pt = cir.segments[getRandomInt(0, cir.segments.length - 1)].point;
  pt.x += 100;
  pt.y += 100;
  cir.rotate(getRandomInt(0, 360));
};
const traingleArrow = cell => {
  let poly = new Paper.Path.RegularPolygon(cell.bounds.center, 3, 20);
  poly.fillColor = "red";
  poly.rotate(getRandomElement([0, 30, 60, 90, 120, 150]));
};
const rotatedSquareDashes = cell => {
  let rect = new Paper.Path.Rectangle(cell.bounds.center, cell.bounds.width);
  // rect.strokeColor = "black";
  // rect.strokeWidth = 5;
  rect.bounds.center.set(cell.bounds.center);
  let lineGroup = new Paper.Group();
  for (let i = 0; i < cell.bounds.width / 10; i++) {
    let ln = new Paper.Path.Line(rect.bounds.topLeft, rect.bounds.bottomLeft);
    ln.strokeWidth = 2;
    ln.strokeColor = "red";
    lineGroup.addChild(ln);
  }
  for (let i = 0; i < lineGroup.children.length; i++) {
    lineGroup.children[i].position.x += 10 * i;
  }

  lineGroup.rotate(getRandomElement([45, 135]));
  // lineGroup.rotate(getRandomElement([0, 45, 90, 135, 180]));
};
const dashedZigZags = cell => {
  if (cell.name == "red") {
    // rotatedSquareDashes(cell);
    let rect = new Paper.Path.Rectangle(
      cell.bounds.center,
      cell.bounds.width - 80
    );
    rect.bounds.center.set(cell.bounds.center);
    // rect.strokeWidth = 5;
    // rect.strokeColor = "black";
    let points = [];

    for (let i = 0; i < 5; i++) {
      points.push(rect.getPointAt(getRandomInt(10, rect.length - 10)));
    }
    let ln = new Paper.Path(points);
    ln.strokeColor = "black";
    ln.strokeWidth = 50;
    ln.strokeJoin = "round";
    ln.strokeCap = "round";
    ln.dashArray = [1, 70];
  }
};
const randomCellColor = cell => {
  let baseColor = new Kolor("#6B5EFF");
  baseColor.h = getRandomInt(0, 10);
  cell.fillColor = baseColor.getHex();
  cell.strokeColor = baseColor.getHex();
};
const rotatedTriangles = cell => {
  let baseColor = new Kolor("#000000");
  baseColor.l = getRandomInt(0, 60);
  let poly = new Paper.Path();
  poly.add(cell.bounds.topRight);
  poly.add(cell.bounds.bottomRight);
  poly.add(cell.bounds.bottomLeft);
  poly.fillColor = baseColor.getHex();
  poly.strokeColor = baseColor.getHex();
  if (getRandomInt(0, 1)) {
    poly.rotate(getRandomElement([0, 90, 180, 270, 360]));
  }
};
const squiggleCircles = cell => {
  for (let i = 0; i < 11; i++) {
    let cir = new Paper.Path.Circle(cell.bounds.center, i * 4);
    cir.strokeColor = "red";
    cir.strokeWidth = 2;
    cir.segments[0].point.x += getRandomInt(0, 5);
    cir.rotate(getRandomInt(0, 360));
  }
};
const randomChecker = cell => {
  let n = getRandomInt(0, 5);
  cell.fillColor = "white";
  cell.strokeWidth = 1;
  cell.strokeColor = "white";
  if (cell.name == "red") {
    cell.fillColor = "black";
    cell.strokeColor = "black";
    cell.strokeWidth = 1;
  }
  if (cell.name == "blue") {
    if (n < 2) {
      cell.fillColor = "black";
      cell.strokeColor = "black";
      cell.strokeWidth = 1;
    }
  }
};
const cornerPattern = cell => {
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    cell.bounds.width - 40
  );
  let rect2 = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    cell.bounds.width - 50
  );
  let rect3 = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(cell.bounds.width, 30)
  );
  let rect4 = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(30, cell.bounds.height)
  );
  let sub1 = rect.subtract(rect2);
  let sub2 = sub1.subtract(rect3);
  let corner = sub2.subtract(rect4);
  corner.fillColor = "#EDDDD4";
  corner.bounds.center.set(cell.bounds.center);
  // corner.rotate(getRandomElement([0, 90, 180]), cell.bounds.center);
  // corner.rotate(getRandomElement([0, 90, 180]), cell.bounds.center);
  // corner.rotate(-45, cell.bounds.center);
  // if (cell.name === "red") {
  //   corner.rotate(45, cell.bounds.center);
  // }

  let distance = cell.bounds.center.getDistance(randomPt);
  let t = remapNumbers(distance, [0, 1080], [0, 180]);
  corner.rotate(t, cell.bounds.center);
};
const spacePattern = cell => {
  cell.fillColor = "#14283A";
  cell.strokeColor = "#14283A";
  cell.strokeWidth = 3;
  let rand = getRandomInt(0, 5);

  if (rand < 1) {
    let cirRadius = getRandomInt(1, 15);
    let cir = new Paper.Path.Circle(cell.bounds.center, cirRadius);
    cir.fillColor = "white";
    cir.fillColor.alpha = 0.8;
    let minWidth = cell.bounds.topLeft.x;
    let maxWidth = cell.bounds.topRight.x;
    let minHeight = cell.bounds.topLeft.y;
    let maxHeight = cell.bounds.bottomLeft.y;
    // console.log("cirRadius", cirRadius);
    // console.log("width", cir.bounds.width);
    cir.bounds.center.set(
      new Paper.Point(
        getRandomInt(minWidth + cirRadius, maxWidth - cirRadius),
        getRandomInt(minHeight + cirRadius, maxHeight - cirRadius)
      )
    );
  }
};
const mazePattern = cell => {
  let rect = new Paper.Path.Rectangle(
    cell.bounds.center,
    cell.bounds.width / 2
  );
  rect.fillColor = "#CFD11A";
  rect.strokeColor = "#CFD11A";
  rect.strokeWidth = 2;

  let midRect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    cell.bounds.width / 2
  );
  rect.bounds.center.set(cell.bounds.center);

  midRect.fillColor = "#CFD11A";
  midRect.strokeColor = "#CFD11A";
  midRect.strokeWidth = 2;

  let n = getRandomInt(0, 5);
  midRect.bounds.center.set(cell.bounds.rightCenter);
  if (n < 2) {
    midRect.bounds.center.set(cell.bounds.bottomCenter);
  }
  if (
    midRect.bounds.bottomRight.x > Paper.project.view.bounds.width ||
    midRect.bounds.bottomRight.y > Paper.project.view.bounds.height
  ) {
    midRect.remove();
  }
};
const hilalPattern = cell => {
  let cir = new Paper.Path.Circle(cell.bounds.center, cell.bounds.width / 2);
  let cir2 = new Paper.Path.Circle(cir.getPointAt(0), cell.bounds.width - 100);
  let inter = cir.subtract(cir2);
  inter.scale(0.8);
  inter.fillColor = "black";
  // inter.rotate(getRandomInt(0, 360));
  inter.rotate(getRandomElement([0, 45, 90, 135, 180, 225, 270, 315, 360]));
  // inter.rotate(getRandomElement([0, 45, 90,180, 225, 360]));
};
const pyramidRotated = cell => {
  // poppingCircles(cell);
  cell.fillColor = "yellow";
  let shape = new Paper.Path(
    cell.bounds.topLeft,
    cell.bounds.bottomLeft,
    cell.bounds.bottomRight
  );
  shape.fillColor = "black";
  if (cell.name === "red") {
    shape.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
  }
};
const gradientRect = cell => {
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(20, cell.bounds.height)
  );
  let divisions = 5;
  for (let i = 1; i < divisions; i++) {
    let rectClone = rect.clone();
    rectClone.bounds.width += i * (cell.bounds.width / divisions) + 5;
    if (cell.name === "red") {
      rectClone.rotate(90, cell.bounds.center);
    }
    rectClone.fillColor = "red";
    rectClone.fillColor.alpha = 0.1;
  }
};
const tessRoundedRect = cell => {
  let rect = new Paper.Rectangle(
    new Paper.Point(cell.bounds.center.x, cell.bounds.center.y),
    50
  );
  let path = new Paper.Path.Rectangle(rect, getRandomInt(0, 20));
  // path.fillColor = "#F2E3BC";
  path.strokeColor = "#F2E3BC";
  path.strokeWidth = 5;
  if (cell.name === "red") {
    // path.scale(1.5);
  }
  // path.rotate(getRandomElement([0, 45, -45]));
  // path.rotate(getRandomInt(0, 360));
  path.bounds.center.set(cell.bounds.center);
};
const osciliatingInLine = (cell, i) => {
  let path = new Paper.Path(
    cell.bounds.topLeft,
    new Paper.Point(cell.bounds.topRight.x, cell.bounds.topRight.y)
  );
  // path.strokeColor = "red";
  // path.strokeWidth = 8;
  // path.strokeCap = "round";
  path.bounds.center.set(cell.bounds.center);
  let offset = 0;
  let n = 45;
  path.rotate(n * i);
  let cir = new Paper.Path.Circle(path.getPointAt(path.length), 10);
  cir.fillColor = "blue";
  let forwardMvmnt = true;
  cir.onFrame = function() {
    if (offset == 0) {
      forwardMvmnt = true;
    } else if (offset == Math.round(path.length) - 1) {
      forwardMvmnt = false;
      // offset--;
    }
    if (forwardMvmnt == true) {
      this.bounds.center.set(path.getPointAt(offset));
      offset++;
    } else if (forwardMvmnt == false) {
      this.bounds.center.set(path.getPointAt(offset));
      offset--;
    }
  };
  path.onFrame = function() {
    this.rotation += 0.1 * i;
  };
};
const wavyTriangles = (cell, i) => {
  let offset = 0;
  let n = 35;
  // path.rotate(45);
  let tri = new Paper.Path.RegularPolygon(
    cell.bounds.center,
    3,
    cell.bounds.width / 2
  );
  tri.fillColor = "black";
  let cir = new Paper.Path.Circle(cell.bounds.center, cell.bounds.width / 2);
  // cir.strokeColor = "black";
  // cir.strokeWidth = 10;
  cir.rotate(n * i);
  // let forwardMvmnt = true;
  // let rotation = getRandomInt(1, 10);
  tri.segments[0].point.set(cir.getPointAt(offset));
  tri.onFrame = function() {
    if (offset <= Math.round(cir.length - 1)) {
      this.segments[0].point.set(cir.getPointAt(offset));
      // this.rotate(rotation, cell.bounds.center);
      offset++;
    } else {
      offset = 0;
    }
  };
};
const wavyCircles = (cell, i) => {
  let path = new Paper.Path.Circle(cell.bounds.center, 20);
  // path.strokeColor = "red";
  // path.strokeWidth = 5;
  // path.strokeCap = "round";

  // path.bounds.center.set(cell.bounds.center);
  let offset = 0;
  let n = 35;
  path.rotate(n * i);
  // path.rotate(45);
  let cir = new Paper.Path.Circle(path.getPointAt(path.length - 1), 10);
  cir.fillColor = "black";
  // let forwardMvmnt = true;
  cir.onFrame = function() {
    if (offset <= Math.round(path.length - 1)) {
      this.bounds.center.set(path.getPointAt(offset));
      offset++;
    } else {
      offset = 0;
    }
  };
};
const textInCells = cell => {
  var text = new Paper.PointText(cell.bounds.center);
  text.fillColor = "black";
  text.fontSize = cell.bounds.width / 2;
  text.justification = "center";
  // text.fontFamily = "marydale, sans-serif";
  text.fontWeight = getRandomElement([
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000
  ]);
  text.position.y += text.bounds.height;
  // let placeholder =
  //   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur nam nostrum animi consectetur repellat illo, soluta voluptatibus maxime numquam iure quia aspernatur quidem dolores molestias suscipit, vero obcaecati explicabo quasi?";
  let placeholder =
    "لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبوأنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريأكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواسأيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايتنيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولباكيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم";
  text.content = getRandomElement(placeholder.toUpperCase().split(""));
  // text.rotate(45)
  // getRandomInt(0, 5) < 3 ? text.rotate(90) : text.rotate(0);
};
const harmonicRotatedLines = (cell, randomPt) => {
  let ln = new Paper.Path.Line(new Paper.Point(0, 0), new Paper.Point(0, 20));
  ln.bounds.center.set(cell.bounds.center);
  ln.strokeColor = "black";
  ln.strokeCap = "round";
  ln.strokeWidth = 10;
  let ds = ln.bounds.center.getDistance(randomPt);
  let t = remapNumbers(ds, [0, 1080], [0, 360]);
  ln.rotate(t, ln.bounds.center);
};
const harmonicPointyLeaf = (cell, randomPt) => {
  let angles = [0, 90, 180, 360];
  let cir = Paper.Path.Circle(cell.bounds.topLeft, cell.bounds.width);
  let cir2 = Paper.Path.Circle(cell.bounds.bottomRight, cell.bounds.width);
  let inter = cir.intersect(cir2);
  // inter.bounds.center.set(cell.bounds.center);
  // inter.fillColor = "red";
  // inter.rotate(angles[getRandomInt(0, angles.length - 1)]);
  // if (cell.name === "red") {
  //   inter.rotate(90);
  inter.fillColor = "#5472A3";
  // } else {
  //   inter.rotate(angles[getRandomInt(0, 1)]);
  //   inter.fillColor = "#C0CFE8";
  // }
  let distance = inter.bounds.center.getDistance(randomPt);
  let t = remapNumbers(distance, [0, 1080], [0, 360]);
  inter.rotate(t, inter.bounds.center);
  inter.scale(0.5);
};
const gradientBlackCells = (cell, randomPt) => {
  let distance = cell.bounds.center.getDistance(randomPt);
  let t = remapNumbers(distance, [0, 500], [0, 1]);
  cell.scale(1.1);
  cell.fillColor += t;
};
const importedGraphic = (cell, randomPt) => {
  Paper.project.importSVG("../src/imgs/drip-group.svg", function(p) {
    p.bounds.center.set(cell.bounds.center);
    // p.scale(0.3);
    // p.rotate(getRandomInt(0, 45));
    p.fillColor = "black";

    let distance = p.bounds.center.getDistance(randomPt);
    let t = remapNumbers(distance, [500, getRandomInt(1000, 2000)], [0, 360]);
    p.rotate(t, p.bounds.center);
    p.scale(0.4);
  });
};
const harmonicOsciliation = (cell, i, randomPt) => {
  // osciliatingInLine(cell, i);

  let path = new Paper.Path(
    cell.bounds.topLeft,
    new Paper.Point(cell.bounds.topRight.x + 10, cell.bounds.topRight.y)
  );
  // path.strokeColor = "red";
  // path.strokeWidth = 8;
  // path.strokeCap = "round";
  path.bounds.center.set(cell.bounds.center);
  let offset = 0;
  // let n = 45;
  // path.rotate(n * i);
  let cir = new Paper.Path.Circle(path.getPointAt(path.length), 5);
  cir.fillColor = "blue";
  let forwardMvmnt = true;

  let ds = path.bounds.center.getDistance(randomPt);
  let t = remapNumbers(ds, [0, 100], [0, 360]);
  path.rotate(t, path.bounds.center);

  cir.onFrame = function() {
    if (offset == 0) {
      forwardMvmnt = true;
    } else if (offset == Math.round(path.length) - 1) {
      forwardMvmnt = false;
      // offset--;
    }
    if (forwardMvmnt == true) {
      this.bounds.center.set(path.getPointAt(offset));
      offset++;
    } else if (forwardMvmnt == false) {
      this.bounds.center.set(path.getPointAt(offset));
      offset--;
    }
  };
};
const randomPolygonRect = cell => {
  let path = new Paper.Path([
    new Paper.Point(
      cell.bounds.topLeft.x,
      getRandomInt(cell.bounds.topLeft.y, cell.bounds.bottomLeft.y)
    ), //topLeft point
    new Paper.Point(
      cell.bounds.topRight.x,
      getRandomInt(cell.bounds.topRight.y, cell.bounds.bottomRight.y)
    ), //bottomLeft point
    new Paper.Point(
      cell.bounds.topRight.x,
      getRandomInt(cell.bounds.topRight.y, cell.bounds.bottomRight.y)
    ), //topRight point
    new Paper.Point(
      cell.bounds.topLeft.x,
      getRandomInt(cell.bounds.topLeft.y, cell.bounds.bottomLeft.y)
    ) //bottomRight point
  ]);
  let color = new Kolor([
    getRandomInt(0, 100),
    getRandomInt(0, 100),
    getRandomInt(0, 100)
  ]);
  color.h = getRandomInt(5, 125);
  path.fillColor = color.getHex();
  // path.fillColor.alpha = 0.3;
  path.closed = true;
  path.strokeWidth = 0;
  // path.smooth();
  // path.rotate(90)
};
const maydanPattern = cell => {
  if (cell.name === "red") {
    Paper.project.importSVG("../src/imgs/maydan/pyramid.svg", function(p) {
      p.bounds.center.set(cell.bounds.center);
      p.scale(0.4);
      p.fillColor = "#F7AD00";
      p.rotate(getRandomElement([0, 180]));
      p.rotate(45);
    });
  } else {
    Paper.project.importSVG("../src/imgs/maydan/halfTime.svg", function(p) {
      p.bounds.center.set(cell.bounds.center);
      p.scale(0.4);
      p.rotate(getRandomElement([0, 180]));
      if (getRandomInt(0, 10) <= 5) {
        p.fillColor = "#F2465A";
        // p.fillColor = "white";
      }
      p.rotate(45);
    });
  }
};
const organicRectangle = cell => {
  let baseColor = new Kolor([10, 100, getRandomInt(0, 100)]);
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(100, 200)
  );
  rect.bounds.center.set(cell.bounds.center);
  let path = new Paper.Path([
    rect.bounds.topRight,
    rect.bounds.topLeft,
    rect.bounds.bottomLeft,
    rect.bounds.bottomRight
  ]);
  path.segments.map(seg => {
    seg.point.x += getRandomInt(0, 80);
    seg.point.y += getRandomInt(0, 80);
  });
  path.fillColor = baseColor.getHex();
  console.log(baseColor.getHex());
  rect.remove();
  // path.rotate(getRandomElement([0,90,180,270,360]));
  path.rotate(getRandomElement([45, -45]));
  path.bounds.center.set(cell.bounds.center);
};
const gridWithin = cell => {
  // organicRectangle(cell);
  let rotationN = getRandomInt(0, 5);
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(cell.bounds.width, cell.bounds.height)
  );
  // rect.fillColor = "blue";
  if (getRandomInt(0, 10) < 5) {
    let gGroup = rectToGrid(rect, 5, 5);
    gGroup.children.map(miniCell => {
      let dot = new Paper.Path.Circle(miniCell.bounds.center, 10);
      dot.fillColor = "red";
    });
  } else {
    let gGroup2 = rectToGrid(rect, 1, 5);
    // if (getRandomInt(0, 10) < 5) {
    gGroup2.rotate(90, gGroup2.bounds.center);
    // }
    gGroup2.children.map(miniCell => {
      let dash = new Paper.Path.Rectangle(
        miniCell.bounds.topLeft,
        new Paper.Size(miniCell.bounds.width - 40, miniCell.bounds.height - 40)
      );
      dash.bounds.center.set(miniCell.bounds.center);
      // dash.fillColor = "red";
      let line = new Paper.Path.Line(
        dash.bounds.topCenter,
        dash.bounds.bottomCenter
      );
      line.strokeWidth = 2;
      // line.strokeColor = "blue";
      let anchors = [];
      let divisions = 5;
      for (let k = 0; k <= divisions; k++) {
        let pt = line.getPointAt((line.length / divisions) * k);
        // pt.x -= 20;
        if (k % 2 == 0) {
          pt.x += 20;
        }
        anchors.push(pt);
      }
      let pth = new Paper.Path(anchors);
      pth.bounds.center.set(dash.bounds.center);
      pth.strokeColor = "red";
      pth.strokeWidth = 6;
      pth.smooth();
      rotationN < 4 ? pth.rotate(90, cell.bounds.center) : "";
      rotationN < 3 ? pth.rotate(180, cell.bounds.center) : "";
      rotationN < 2 ? pth.rotate(270, cell.bounds.center) : "";
      rotationN < 1 ? pth.rotate(360, cell.bounds.center) : "";
    });
  }
};
const rotatedDashesRect = cell => {
  let rect = new Paper.Path.Rectangle(cell.bounds.topLeft, cell.bounds.width);
  // rect.strokeColor = "green";
  // textInCells(cell);
  let smallerGrid = rectToGrid(rect, 3, 3);
  smallerGrid.children.map(c => {
    let dash = new Paper.Path.Rectangle(
      c.bounds.topLeft,
      new Paper.Size(c.bounds.width, c.bounds.height - 30)
    );
    dash.bounds.center.set(c.bounds.center);
    dash.fillColor = "#EB5E28";
    dash.strokeColor = "#EB5E28";
    // dash.rotate(getRandomElement([0, 90]), c.bounds.center);
    dash.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
    // dash.rotate(getRandomElement([ 45, -45]), cell.bounds.center);
  });
};
const printMaze = cell => {
  let path = new Paper.Path(cell.bounds.bottomLeft, cell.bounds.topRight);
  // path.strokeWidth = cell.bounds.width / 2 - 2;
  path.strokeWidth = 3;
  path.strokeColor = "#F3E8EE";
  path.strokeCap = "round";
  path.rotate(getRandomElement([0, 90]), cell.bounds.center);
};
const zigZagMaze = cell => {
  let path = new Paper.Path(cell.bounds.bottomLeft, cell.bounds.topRight);
  // path.strokeColor = "black";
  path.strokeWidth = 10;
  let anchors = [];
  let divs = 3;
  // let divs = getRandomInt(2, 3);
  for (let i = 0; i <= divs; i++) {
    let pt = path.getPointAt((path.length / divs) * i);
    // if (i % 2 ==  getRandomInt(0, 1)) {
    if (i % 2 == 0) {
      // pt.x -= 30;
      // pt.x += 15;
      // pt.y += 15;
      pt.y += 30;
    }
    let dot = new Paper.Path.Circle({
      center: pt,
      // fillColor: "red",
      radius: 10
    });
    anchors.push(pt);
  }
  let lastPath = new Paper.Path(anchors);
  lastPath.strokeColor = "black";
  lastPath.strokeWidth = 5;
  lastPath.strokeCap = "round";
  // lastPath.smooth();
  lastPath.rotate(getRandomElement([0, 90, 270]));
};
const halfRect = cell => {
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(cell.bounds.width, cell.bounds.height)
  );
  // rect.strokeColor = "white";
  let halfRect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(cell.bounds.width, cell.bounds.height / 2)
  );
  halfRect.fillColor = "#0CF574";
  halfRect.strokeColor = "#0CF574";
  halfRect.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
};
const tiltedMaze = cell => {
  let rect = new Paper.Path.Rectangle(
    cell.bounds.topLeft,
    new Paper.Size(cell.bounds.width, cell.bounds.height)
  );
  let g = rectToGrid(rect, 2, 2);
  let n = getRandomArbitrary(0, 5);
  g.children.map(c => {
    if (n >= 2.5) {
      let dash3 = new Paper.Path.Line(c.bounds.topLeft, c.bounds.bottomRight);
      dash3.strokeColor = "#05204A";
      dash3.strokeWidth = 15;
      dash3.strokeCap = "square";
    } else {
      let dash4 = new Paper.Path.Line(c.bounds.topRight, c.bounds.bottomLeft);
      dash4.strokeColor = "#05204A";
      dash4.strokeWidth = 15;
      dash4.strokeCap = "square";
    }
  });
};
const innerMaze = (cell, x, y, i, borderCells) => {
  let anchors = [
    cell.bounds.topLeft,
    cell.bounds.leftCenter,
    cell.bounds.center,
    cell.bounds.rightCenter,
    cell.bounds.bottomRight
  ];

  let path = new Paper.Path({
    segments: anchors,
    strokeColor: "#EBF5EE",
    strokeWidth: 10,
    strokeCap: "round"
  });
  if (borderCells) {
    if (i % x == 0 || i < x || borderCells.includes(i) || i > x * y - x - 1) {
      if (cell.name === "red") {
        path.rotate(90, cell.bounds.center);
      } else {
        path.rotate(180, cell.bounds.center);
      }
    } else {
      path.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
    }
  } else {
    path.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
  }
};
const lineDots = cell => {
  let anchors = [
    cell.bounds.topLeft,
    cell.bounds.topRight,
    cell.bounds.bottomRight
  ];

  let p = new Paper.Path({
    segments: anchors,
    // strokeColor: "#AAEFDF",
    strokeColor: "#DECDF5",
    strokeWidth: 20,
    strokeCap: "round"
  });
  p.fillColor = "#DECDF5";
  let r = 20;
  p.rotate(getRandomElement([0, 90, 180, 270, 360]), cell.bounds.center);
  let cir = new Paper.Path.Circle(cell.bounds.bottomLeft, r);
  cir.fillColor = "#DECDF5";
  let cir2 = new Paper.Path.Circle(cell.bounds.bottomRight, r);
  cir2.fillColor = "#DECDF5";
  let cir3 = new Paper.Path.Circle(cell.bounds.topLeft, r);
  cir3.fillColor = "#DECDF5";
  let cir4 = new Paper.Path.Circle(cell.bounds.topRight, r);
  cir4.fillColor = "#DECDF5";
};
export {
  lineDots,
  innerMaze,
  tiltedMaze,
  halfRect,
  zigZagMaze,
  printMaze,
  rotatedDashesRect,
  gridWithin,
  organicRectangle,
  maydanPattern,
  randomPolygonRect,
  tessRoundedRect,
  wavyTriangles,
  osciliatingInLine,
  wavyCircles,
  harmonicOsciliation,
  gradientRect,
  pyramidRotated,
  hilalPattern,
  cornerPattern,
  mazePattern,
  spacePattern,
  randomChecker,
  wavyLines,
  squiggleCircles,
  rotatedTriangles,
  randomCellColor,
  rotatedDashedLines,
  dashedZigZags,
  rotatedSquareDashes,
  traingleArrow,
  randomPolygons,
  tessPoly,
  tessBlob,
  gradientBlackCells,
  blackCells,
  harmonicPointyLeaf,
  harmonicRotatedLines,
  slicedRectangles,
  rotatedLines,
  tiltedLines,
  slicedCircles,
  poppingCircles,
  rotatedDashes,
  ribbons,
  smoshedCircles,
  plusSign,
  metroLines,
  circleStars,
  circleSubtract,
  pointyLeaf,
  halfPies,
  textInCells,
  randomCircles,
  importedGraphic,
  halfCircles,
  overlappingCircles,
  rotatedArches
};
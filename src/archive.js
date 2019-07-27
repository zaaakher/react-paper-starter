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

	// let distance = cell.bounds.center.getDistance(randomPt);
	// let t = remapNumbers(distance, [0, 1080], [0, 180]);
	corner.rotate(t, cell.bounds.center);
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
export {
	innerMaze,
	maydanPattern,
	wavyCircles,
	harmonicOsciliation,
	gradientRect,
	hilalPattern,
	cornerPattern,
	randomChecker,
	rotatedTriangles,
	randomCellColor,
	dashedZigZags,
	rotatedSquareDashes,
	traingleArrow,
	randomPolygons,
	gradientBlackCells,
	harmonicPointyLeaf,
	harmonicRotatedLines,
	slicedCircles,
	metroLines,
	textInCells,
	randomCircles,
	importedGraphic
};

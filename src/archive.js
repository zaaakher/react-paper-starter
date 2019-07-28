import Paper from "paper";
import {
	getRandomInt,
	remapNumbers,
	getRandomElement,
} from "./util";



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
	gradientRect,
	hilalPattern,
	cornerPattern,
	gradientBlackCells,
	harmonicRotatedLines,
	textInCells,
	importedGraphic
};

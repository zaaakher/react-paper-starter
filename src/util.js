import Paper from "paper";

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

const getRandomElement = arr => arr[getRandomInt(0, arr.length - 1)];
const remapNumbers = (value, sourceRange, targetRange) => {
	let oldRange = sourceRange[1] - sourceRange[0];
	let newRange = targetRange[1] - targetRange[0];
	return ((value - sourceRange[0]) * newRange) / oldRange + targetRange[0];
};

const makeGrid = (cols, rows) => {
	let cellW = Paper.project.view.bounds.width / cols;
	let cellH = Paper.project.view.bounds.height / rows;
	let gridGroup = new Paper.Group();
	let pt = new Paper.Point(0, 0);
	for (let i = 0; i < rows; i++) {
		pt.set(new Paper.Point(0, cellH * i));
		for (let j = 0; j < cols; j++) {
			let cell = new Paper.Path.Rectangle(pt, new Paper.Size(cellW, cellH));
			gridGroup.addChild(cell);

			if (i % 2 === 1) {
				if (j % 2 === 0) {
					cell.name = "red";
				} else {
					cell.name = "blue";
				}
			}
			if (i % 2 === 0) {
				if (j % 2 === 1) {
					cell.name = "red";
				} else {
					cell.name = "blue";
				}
			}

			pt.set(cell.bounds.topRight);
		}
	}
	gridGroup.bounds.center.set(Paper.project.view.center);
	return gridGroup;
};
const rectToGrid = (rect, cols, rows) => {
	let cellW = rect.bounds.width / cols;
	let cellH = rect.bounds.height / rows;
	let gridGroup = new Paper.Group();
	let pt = new Paper.Point(rect.bounds.topLeft.x, rect.bounds.topLeft.y);
	for (let i = 0; i < rows; i++) {
		pt.set(new Paper.Point(rect.bounds.topLeft.x, cellH * i));
		for (let j = 0; j < cols; j++) {
			let cell = new Paper.Path.Rectangle(pt, new Paper.Size(cellW, cellH));
			gridGroup.addChild(cell);
			// cell.strokeColor = "red";
			// cell.strokeWidth = 2;
			if (i % 2 === 1) {
				if (j % 2 === 0) {
					cell.name = "red";
				} else {
					cell.name = "blue";
				}
			}
			if (i % 2 === 0) {
				if (j % 2 === 1) {
					cell.name = "red";
				} else {
					cell.name = "blue";
				}
			}

			pt.set(cell.bounds.topRight);
		}
	}
	gridGroup.bounds.center.set(rect.bounds.center);
	// gridGroup.scale(0.9);
	return gridGroup;
};
export {
	rectToGrid,
	makeGrid,
	getRandomElement,
	remapNumbers,
	getRandomInt,
	getRandomArbitrary
};

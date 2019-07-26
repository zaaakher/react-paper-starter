import Paper from "paper";
import { makeGrid, getRandomInt, getRandomElement } from "./util";

let patterns = {
	"Wavy Circles": function(properties) {
		let cirColor = properties.color;
		let gridGroup = makeGrid(properties.columns, properties.rows);
		let cirGroup = new Paper.Group();
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path.Circle(
				cell.bounds.center,
				window.innerWidth / 50
			);
			let offset = 0;
			let n = 35;
			path.rotate(n * i);
			let cir = new Paper.Path.Circle(
				path.getPointAt(path.length - 1),
				properties.size
			);
			cirGroup.addChild(cir);
			cir.fillColor = cirColor;
			cir.onFrame = function() {
				if (offset <= Math.round(path.length - 1)) {
					this.bounds.center.set(path.getPointAt(offset));
					offset++;
				} else {
					offset = 0;
				}
			};

			return cell;
		});
		gridGroup.view.scale(0.8);
		return cirGroup;
	},
	"Half Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			cir.removeSegment(0);
			cir.rotate(getRandomInt(0, 360));
			cir.fillColor = properties.color;
			return cell;
		});
	},
	"Rotated Arches": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let arc = new Paper.Path.Arc(
				cell.bounds.topLeft,
				cell.bounds.topRight,
				cell.bounds.bottomRight
			);
			arc.bounds.center.set(cell.bounds.center);
			// arc.strokeWidth = getRandomInt(3, 30);
			arc.strokeWidth = properties.size;
			arc.strokeColor = properties.color;
			arc.strokeCap = "round";
			arc.scale(0.4);
			arc.rotate(getRandomElement([0, 45, -45, 90, -90]));
			return cell;
		});
	},
	"Random Cricles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			//Add cell code here
			let randomN = getRandomInt(0, 5);
			if (randomN < 3) {
				let cir = new Paper.Path.Circle(
					cell.bounds.center,
					getRandomInt(1, properties.size)
				);
				cir.fillColor = properties.color;
			} else {
				let cir = new Paper.Path.Circle(
					cell.bounds.center,
					getRandomInt(1, properties.size)
				);
				cir.fillColor = properties.color;
			}
			//cell code ends here
			return cell;
		});
	},
	"Overlapping Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			//Add cell code here
			let cirSize = getRandomInt(1, properties.size);
			let cir = new Paper.Path.Circle(cell.bounds.center, cirSize);
			cir.fillColor = "#EEC0C6";
			let offset = getRandomInt(1, cir.length - 1);
			let cir2Size = getRandomInt(1, properties.size);
			let cir2 = new Paper.Path.Circle(cir.getPointAt(offset), cir2Size);
			cir2.fillColor = "#EEC0C6";
			let inter = cir.intersect(cir2);
			inter.fillColor = "#00B2CA";
			//cell code ends here
			return cell;
		});
	},
	"Half Pies": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			//Add cell code here
			let colors = ["#000000", "#2E2E2E", "#5C5C5C", "#8B8B8B", "#B9B9B9"];
			let angles = [0, 90, 180, 360];
			let cir = new Paper.Path.Circle(
				cell.bounds.bottomLeft,
				cell.bounds.width
			);
			let shape = cir.intersect(cell);
			let color = colors[getRandomInt(0, colors.length - 1)];
			shape.strokeColor = color;
			shape.fillColor = color;
			shape.rotate(angles[getRandomInt(0, angles.length - 1)]);
			//cell code ends here
			return cell;
		});
	},
	"Pointy Leaf": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			//Add cell code here
			// let colors = ["#000000", "#2E2E2E", "#5C5C5C", "#8B8B8B", "#B9B9B9"];

			let angles = [0, 90, 180, 360];
			let cir = Paper.Path.Circle(cell.bounds.topLeft, cell.bounds.width);
			let cir2 = Paper.Path.Circle(cell.bounds.bottomRight, cell.bounds.width);
			let inter = cir.intersect(cir2);

			inter.fillColor = "red";
			// inter.rotate(angles[getRandomInt(0, angles.length - 1)]);
			if (cell.name === "red") {
				inter.rotate(90);
				inter.fillColor = "#B9B9B9";
			} else {
				inter.rotate(angles[getRandomInt(0, 1)]);
				inter.fillColor = "#5C5C5C";
			}
			inter.scale(0.9);
			//cell code ends here
			return cell;
		});
	},
	"Place holder": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			//Add cell code here

			//cell code ends here
			return cell;
		});
	}
};
export default patterns;

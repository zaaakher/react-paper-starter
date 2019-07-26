import Paper from "paper";
import Kolor from "kolorwheel";
import {
	makeGrid,
	getRandomInt,
	getRandomElement,
	remapNumbers,
	getRandomArbitrary
} from "./util";

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
		gridGroup.remove();
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
		gridGroup.remove();
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
			arc.strokeWidth = properties.size;
			arc.strokeColor = properties.color;
			arc.strokeCap = "round";
			arc.scale(0.4);
			arc.rotate(getRandomElement([0, 45, -45, 90, -90]));
			return cell;
		});
		gridGroup.remove();
	},
	"Random Cricles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
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
			return cell;
		});
		gridGroup.remove();
	},
	"Overlapping Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cirSize = getRandomInt(1, properties.size);
			let cir = new Paper.Path.Circle(cell.bounds.center, cirSize);
			cir.fillColor = "#EEC0C6";
			let offset = getRandomInt(1, cir.length - 1);
			let cir2Size = getRandomInt(1, properties.size);
			let cir2 = new Paper.Path.Circle(cir.getPointAt(offset), cir2Size);
			cir2.fillColor = "#EEC0C6";
			let inter = cir.intersect(cir2);
			inter.fillColor = "#00B2CA";
			return cell;
		});
		gridGroup.remove();
	},
	"Half Pies": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
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
			return cell;
		});
		gridGroup.remove();
	},
	"Pointy Leaf": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let angles = [0, 90, 180, 360];
			let cir = Paper.Path.Circle(cell.bounds.topLeft, cell.bounds.width);
			let cir2 = Paper.Path.Circle(cell.bounds.bottomRight, cell.bounds.width);
			let inter = cir.intersect(cir2);

			inter.fillColor = "red";
			if (cell.name === "red") {
				inter.rotate(90);
				inter.fillColor = "#B9B9B9";
			} else {
				inter.rotate(angles[getRandomInt(0, 1)]);
				inter.fillColor = "#5C5C5C";
			}
			inter.scale(0.9);
			return cell;
		});
		gridGroup.remove();
	},
	"Black Cells": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			// cell.strokeWidth = properties.strokeSize;
			let n = getRandomInt(0, 5);
			if (n < 5) {
				cell.fillColor = properties.color;
			}
			return cell;
		});
	},
	"Circle Subtract": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let colors = ["#C0CFE8", "#98AFD3", "#5472A3", "#29384F", "#011638"];
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			let cir2 = new Paper.Path.Circle(
				cell.bounds.bottomRight,
				properties.size
			);
			let cir3 = new Paper.Path.Circle(cell.bounds.topLeft, properties.size);
			let inter1 = cir.subtract(cir2);
			let inter = inter1.subtract(cir3);
			inter.fillColor = colors[getRandomInt(0, colors.length - 1)];
			let angles = [0, 90, 180, 360];
			if (cell.name === "red") {
				inter.rotate(angles[getRandomInt(0, 1)]);
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Circle Stars": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let n = getRandomInt(0, 6);
			if (n <= 3) {
				let cir = new Paper.Path.Circle(cell.bounds.center, cell.bounds.width);
				cir.fillColor = properties.color;
				cir.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));
			} else {
				let rect = new Paper.Path.Rectangle(
					cell.bounds.topLeft,
					cell.bounds.width
				);
				rect.bounds.center.set(cell.bounds.center);
				rect.fillColor = properties.color;
				rect.rotate(45);
				rect.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Plus Sign": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let ln = new Paper.Path.Line(
				cell.bounds.topLeft,
				cell.bounds.bottomRight
			);
			let ln2 = new Paper.Path.Line(
				cell.bounds.topRight,
				cell.bounds.bottomLeft
			);
			let gr = new Paper.Group([ln, ln2]);
			gr.strokeColor = properties.color;
			gr.strokeCap = "round";
			gr.strokeWidth = properties.strokeSize;
			let n = getRandomInt(0, 5);
			if (n <= 3) {
				gr.rotate(45);
			}
			gr.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));
			return cell;
		});
		gridGroup.remove();
	},
	"Smoshed Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			cir.strokeColor = properties.color;
			cir.strokeWidth = properties.strokeSize;
			cir.removeSegment(getRandomInt(0, cir.segments.length - 1));
			return cell;
		});
		gridGroup.remove();
	},
	Ribbons: function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			let seg = cir.segments[1];
			let seg2 = cir.segments[3];
			seg2.point.set(cell.bounds.center);
			seg.point.set(cell.bounds.center);
			cir.rotate(getRandomInt(0, 360));
			cir.strokeWidth = properties.strokeSize;
			cir.strokeColor = properties.color;
			return cell;
		});
		gridGroup.remove();
	},
	"Rotated Dashes": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let pol = new Paper.Path.RegularPolygon(
				cell.bounds.center,
				3,
				properties.size
			);
			pol.strokeWidth = properties.strokeSize;
			pol.strokeColor = properties.color;
			pol.removeSegment(getRandomInt(0, pol.segments.length - 1));
			pol.strokeJoin = "round";
			return cell;
		});
		gridGroup.remove();
	},
	"Tilted Lines": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let randomN = getRandomInt(0, 20);
			let line = new Paper.Path.Line(
				cell.bounds.topLeft,
				new Paper.Point(cell.bounds.topCenter.x + 10, cell.bounds.topCenter.y)
			);
			line.bounds.center.set(cell.bounds.center);
			line.strokeColor = properties.color;
			line.strokeWidth = properties.strokeSize;
			line.strokeCap = "round";
			if (randomN <= 5) {
				line.rotate(-45);
			} else if (randomN > 5 && randomN <= 10) {
				line.rotate(45);
			} else if (randomN > 10 && randomN <= 15) {
				line.rotate(90);
			} else {
				line.rotate(0);
			}
			line.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));

			return cell;
		});
		gridGroup.remove();
	},
	"Tilted Lines 2": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let randomN = getRandomInt(0, 20);
			let line = new Paper.Path.Line(
				cell.bounds.topLeft,
				new Paper.Point(cell.bounds.topRight.x, cell.bounds.topRight.y)
			);
			line.bounds.center.set(cell.bounds.center);
			line.strokeColor = properties.color;
			line.strokeWidth = properties.strokeSize;
			line.strokeCap = "round";

			if (randomN <= 5) {
				line.rotate(45);
			} else if (randomN <= 10 && randomN > 5) {
				line.rotate(90);
			}
			line.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));
			return cell;
		});
		gridGroup.remove();
	},
	"Sliced Rectangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.topRight,
				cell.bounds.width
			);
			rect.strokeWidth = properties.strokeSize;
			rect.strokeColor = properties.color;
			rect.strokeCap = "round";
			rect.strokeJoin = "round";
			rect.bounds.center.set(cell.bounds.center);
			rect.fillColor = properties.color;
			rect.removeSegment(getRandomInt(0, rect.segments.length));
			rect.scale(remapNumbers(properties.size, [0.1, 20], [0.1, 1]));
			return cell;
		});
		gridGroup.remove();
	},
	"Tessellated Blobs": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			// let baseColor = new Kolor("#6B5EFF");
			let baseColor = new Kolor("#000000");
			baseColor.l = getRandomInt(0, 80);
			if (cell.name === "red") {
				let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
				cir.fillColor = baseColor.getHex();
				// cir.selected = true;
				let pt = cir.segments[getRandomInt(0, cir.segments.length - 1)].point;
				pt.x += properties.modifySize * 2;
				pt.y += properties.modifySize * 2;
				cir.rotate(getRandomInt(0, 360));
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Tessellated Poly": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			if (cell.name === "red") {
				let cir = new Paper.Path.Rectangle(cell.bounds.center, properties.size);
				cir.fillColor = properties.color;
				let pt = cir.segments[getRandomInt(0, cir.segments.length - 1)].point;
				pt.x += properties.modifySize * 2;
				pt.y += properties.modifySize * 2;
				cir.rotate(getRandomInt(0, 360));
				cir.bounds.center.set(cell.bounds.center);
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Popping Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			cir.fillColor = properties.color;
			cir.onFrame = function() {
				let addSize;
				// let subSize;
				if (cir.bounds.size.width <= 30) {
					addSize = cir.bounds.size.add(
						new Paper.Size(getRandomArbitrary(0, 2))
					);
					cir.bounds.size.set(addSize);
					cir.bounds.center.set(cell.bounds.center);
				} else if (cir.bounds.size.width >= 30) {
					cir.bounds.size.set(new Paper.Size(2, 2));
				}
			};
			return cell;
		});
		gridGroup.remove();
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

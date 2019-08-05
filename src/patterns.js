import Paper from "paper";
import Kolor from "kolorwheel";
import {
	makeGrid,
	rectToGrid,
	getRandomInt,
	getRandomElement,
	remapNumbers,
	getRandomArbitrary
} from "./util";

let patterns = {
	Playground: function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			cir.fillColor = properties.color;
			return cell;
		});
		gridGroup.remove();
	},
	"Harmonic Lines": function(properties) {
		let randomPt = new Paper.Point(
			getRandomInt(10, Paper.project.view.size.height),
			getRandomInt(10, Paper.project.view.size.width)
		);

		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let line = new Paper.Path.Line(
				cell.bounds.bottomCenter,
				cell.bounds.topCenter
			);
			line.strokeColor = properties.color;
			line.strokeWidth = properties.strokeSize;
			line.strokeCap = "round";

			let distance = cell.bounds.center.getDistance(randomPt);
			let t = remapNumbers(distance, [0, 1080], [0, 360]);
			line.rotate(t, cell.bounds.center);
			line.scale(
				remapNumbers(
					properties.modifySize,
					[0.1, properties.maxRange],
					[0.1, 1]
				)
			);
			return cell;
		});
		gridGroup.remove();
	},
	"Dish Dashes": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let ln = new Paper.Path.Line(
				cell.bounds.topCenter,
				cell.bounds.bottomCenter
			);
			ln.strokeCap = "round";
			ln.strokeColor = properties.color;
			ln.strokeWidth = properties.strokeSize;
			if (getRandomInt(0, 3) < 2) {
				ln.scale(getRandomArbitrary(0.1, 0.8));
			}
			ln.rotate(properties.modifySize);
			return cell;
		});
		gridGroup.remove();
	},
	"Cell Columns": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let grid = rectToGrid(cell, properties.modifySize, 1);
			grid.children.map(cell => {
				cell.strokeColor = properties.color;
				cell.strokeWidth = properties.strokeSize;
				return cell;
			});
			if (getRandomInt(0, 3) < 2) {
				grid.rotate(90);
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Wavy Circles": function(properties) {
		let cirColor = properties.color;
		let gridGroup = makeGrid(properties.columns, properties.rows);
		let cirGroup = new Paper.Group();
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path.Circle(
				cell.bounds.center,
				// window.innerWidth / 50
				properties.modifySize
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
	"Wavy Circles 2": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path(
				cell.bounds.topLeft,
				new Paper.Point(cell.bounds.topRight.x, cell.bounds.topRight.y)
			);
			path.bounds.center.set(cell.bounds.center);
			let offset = 0;
			let n = 45;
			path.rotate(n * i);
			let cir = new Paper.Path.Circle(
				path.getPointAt(path.length),
				properties.size
			);
			cir.fillColor = properties.color;
			let forwardMvmnt = true;
			cir.onFrame = function() {
				if (offset === 0) {
					forwardMvmnt = true;
				} else if (offset === Math.round(path.length) - 1) {
					forwardMvmnt = false;
				}
				if (forwardMvmnt === true) {
					this.bounds.center.set(path.getPointAt(offset));
					offset++;
				} else if (forwardMvmnt === false) {
					this.bounds.center.set(path.getPointAt(offset));
					offset--;
				}
			};
			path.onFrame = function() {
				this.rotation += 0.1 * i;
			};
			return cell;
		});
		gridGroup.remove();
	},
	"Wavy Rectangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let offset = 0;
			let n = 35;
			let tri = new Paper.Path.Rectangle(cell.bounds.center, properties.size);
			tri.fillColor = properties.color;
			let cir = new Paper.Path.Circle(tri.bounds.center, properties.modifySize);
			cir.rotate(n * i);
			tri.bounds.center.set(cell.bounds.center);
			cir.bounds.center.set(cell.bounds.center);
			tri.segments[0].point.set(cir.getPointAt(offset));
			tri.onFrame = function() {
				if (offset <= Math.round(cir.length - 2)) {
					this.segments[0].point.set(cir.getPointAt(offset));
					offset++;
				} else {
					offset = 0;
				}
			};
			return cell;
		});
		gridGroup.remove();
	},
	"Wavy Triangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let offset = 0;
			let n = 35;
			let tri = new Paper.Path.RegularPolygon(
				cell.bounds.center,
				3,
				properties.size
			);
			tri.fillColor = properties.color;
			let cir = new Paper.Path.Circle(
				cell.bounds.center,
				// cell.bounds.width / 2
				properties.modifySize
			);
			cir.rotate(n * i);
			tri.segments[0].point.set(cir.getPointAt(offset));
			tri.onFrame = function() {
				if (offset <= Math.round(cir.length - 1)) {
					this.segments[0].point.set(cir.getPointAt(offset));
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
	"Black Cells 2": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let n = getRandomInt(0, 5);
			if (cell.name === "red") {
				cell.fillColor = "black";
				cell.strokeColor = "black";
				cell.strokeWidth = 1;
			}
			if (cell.name === "blue") {
				if (n < 2) {
					cell.fillColor = "black";
					cell.strokeColor = "black";
					cell.strokeWidth = 1;
				}
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
	"Circles Rectangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Rectangle(
				new Paper.Point(cell.bounds.center.x, cell.bounds.center.y),
				properties.size
			);
			let path = new Paper.Path.Rectangle(rect, getRandomInt(0, 20));
			// path.fillColor = "#F2E3BC";
			path.strokeColor = properties.color;
			path.strokeWidth = properties.strokeSize;
			if (cell.name === "red") {
				path.scale(1.5);
			}
			// path.rotate(getRandomElement([0, 45, -45]));
			// path.rotate(getRandomInt(0, 360));
			path.bounds.center.set(cell.bounds.center);
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
	"Sliced Circles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size / 2);
			cir.strokeColor = properties.color;
			cir.strokeWidth = properties.strokeSize;
			cir.strokeCap = "round";
			let seg = cir.segments[getRandomInt(0, cir.segments.length - 1)].location;
			let seg2 =
				cir.segments[getRandomInt(0, cir.segments.length - 1)].location;
			let newP = cir.split(seg);
			let newP2 = cir.split(seg2);

			newP.strokeWidth = 0;
			newP2.strokWidth = 0;
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
	"Squiggle Circle": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			for (let i = 0; i < 1; i++) {
				let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
				cir.strokeColor = properties.color;
				cir.strokeWidth = properties.strokeSize;

				cir.segments[0].point.x += getRandomInt(0, properties.modifySize);
				cir.rotate(getRandomInt(0, 360));
				cir.bounds.center.set(cell.bounds.center);
			}
			return cell;
		});
		gridGroup.remove();
	},
	Space: function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rand = getRandomInt(0, 5);
			if (rand < 1) {
				let cirRadius = getRandomInt(1, properties.size);
				let cir = new Paper.Path.Circle(cell.bounds.center, cirRadius);
				cir.fillColor = properties.color;
				let minWidth = cell.bounds.topLeft.x;
				let maxWidth = cell.bounds.topRight.x;
				let minHeight = cell.bounds.topLeft.y;
				let maxHeight = cell.bounds.bottomLeft.y;
				cir.bounds.center.set(
					new Paper.Point(
						getRandomInt(minWidth + cirRadius, maxWidth - cirRadius),
						getRandomInt(minHeight + cirRadius, maxHeight - cirRadius)
					)
				);
			}
			return cell;
		});
		gridGroup.remove();
	},
	Maze: function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.center,
				cell.bounds.width / 2
			);
			rect.fillColor = properties.color;
			rect.strokeColor = properties.color;
			rect.strokeWidth = properties.strokeSize;

			let midRect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				cell.bounds.width / 2
			);
			rect.bounds.center.set(cell.bounds.center);

			midRect.fillColor = properties.color;
			midRect.strokeColor = properties.color;
			midRect.strokeWidth = properties.strokeSize;

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
			return cell;
		});
		gridGroup.remove();
	},
	"Maze 2": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.center,
				cell.bounds.width / 2
			);
			// rect.fillColor = properties.color;
			// rect.strokeColor = properties.color;
			// rect.strokeWidth = properties.strokeSize;

			let midRect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				cell.bounds.width / 2
			);
			rect.bounds.center.set(cell.bounds.center);

			midRect.fillColor = properties.color;
			midRect.strokeColor = properties.color;
			midRect.strokeWidth = properties.strokeSize;

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
			return cell;
		});
		gridGroup.remove();
	},
	"Maze 3": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				new Paper.Size(cell.bounds.width, cell.bounds.height)
			);
			let g = rectToGrid(rect, properties.modifySize, properties.modifySize);
			let n = getRandomArbitrary(0, 5);
			g.children.map(c => {
				if (n >= 2.5) {
					let dash3 = new Paper.Path.Line(
						c.bounds.topLeft,
						c.bounds.bottomRight
					);
					dash3.strokeColor = properties.color;
					dash3.strokeWidth = properties.strokeSize;
					dash3.strokeCap = "square";
				} else {
					let dash4 = new Paper.Path.Line(
						c.bounds.topRight,
						c.bounds.bottomLeft
					);
					dash4.strokeColor = properties.color;
					dash4.strokeWidth = properties.strokeSize;
					dash4.strokeCap = "square";
				}
				return c;
			});
			return cell;
		});
		gridGroup.remove();
	},
	"Rotated Pyramids": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let shape = new Paper.Path(
				cell.bounds.topLeft,
				cell.bounds.bottomLeft,
				cell.bounds.bottomRight
			);
			shape.fillColor = properties.color;
			if (cell.name === "red") {
				shape.rotate(
					getRandomElement([0, 90, 180, 270, 360]),
					cell.bounds.center
				);
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Random Pol": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
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
			path.closed = true;
			path.strokeWidth = 0;
			return cell;
		});
		gridGroup.remove();
	},
	"Organic Rectangle": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let baseColor = new Kolor([10, 100, getRandomInt(0, 100)]);
			let rect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				new Paper.Size(properties.size, properties.size * 2)
			);
			rect.bounds.center.set(cell.bounds.center);
			let path = new Paper.Path([
				rect.bounds.topRight,
				rect.bounds.topLeft,
				rect.bounds.bottomLeft,
				rect.bounds.bottomRight
			]);
			path.segments.map(seg => {
				seg.point.x += getRandomInt(0, properties.modifySize);
				seg.point.y += getRandomInt(0, properties.modifySize);
				return seg;
			});
			path.fillColor = baseColor.getHex();
			rect.remove();
			// path.rotate(getRandomElement([0,90,180,270,360]));
			path.rotate(getRandomElement([45, -45]));
			path.bounds.center.set(cell.bounds.center);
			return cell;
		});
		gridGroup.remove();
	},
	"Glitchy Rectangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				// cell.bounds.width
				properties.size
			);
			let smallerGrid = rectToGrid(rect, 3, 3);
			smallerGrid.children.map(c => {
				let dash = new Paper.Path.Rectangle(
					c.bounds.topLeft,
					new Paper.Size(
						c.bounds.width,
						c.bounds.height - properties.modifySize
					)
				);
				dash.bounds.center.set(c.bounds.center);
				dash.fillColor = properties.color;
				dash.strokeColor = properties.color;
				dash.strokeWidth = properties.strokeSize;
				dash.rotate(
					getRandomElement([0, 90, 180, 270, 360]),
					cell.bounds.center
				);
				return c;
			});
			return cell;
		});
		gridGroup.remove();
	},
	"Print Maze": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path(cell.bounds.bottomLeft, cell.bounds.topRight);
			path.strokeWidth = properties.strokeSize;
			path.strokeColor = properties.color;
			path.strokeCap = "round";
			path.rotate(
				getRandomElement([0, properties.modifySize]),
				cell.bounds.center
			);
			return cell;
		});
		gridGroup.remove();
	},
	"ZigZag Maze": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path(cell.bounds.bottomLeft, cell.bounds.topRight);
			let anchors = [];
			let divs = getRandomInt(2, 6);
			for (let i = 0; i <= divs; i++) {
				let pt = path.getPointAt((path.length / divs) * i);
				if (i % 2 === 0) {
					pt.y += properties.modifySize * 2;
				}

				anchors.push(pt);
				path.remove();
			}
			let lastPath = new Paper.Path(anchors);
			lastPath.strokeColor = properties.color;
			lastPath.strokeWidth = properties.strokeSize;
			lastPath.strokeCap = "round";
			// lastPath.smooth();
			lastPath.rotate(getRandomElement([0, 90, 270]));
			return cell;
		});
		gridGroup.remove();
	},
	"Line Dots": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let anchors = [
				cell.bounds.topLeft,
				cell.bounds.topRight,
				cell.bounds.bottomRight
			];

			let p = new Paper.Path({
				segments: anchors,
				strokeColor: properties.color,
				strokeWidth: properties.strokeSize,
				strokeCap: "round"
			});
			let r = properties.size;
			p.rotate(getRandomElement([0, 90, 180, 360]), cell.bounds.center);
			let cir = new Paper.Path.Circle(cell.bounds.bottomLeft, r);
			cir.fillColor = properties.color;
			let cir2 = new Paper.Path.Circle(cell.bounds.bottomRight, r);
			cir2.fillColor = properties.color;
			let cir3 = new Paper.Path.Circle(cell.bounds.topLeft, r);
			cir3.fillColor = properties.color;
			let cir4 = new Paper.Path.Circle(cell.bounds.topRight, r);
			cir4.fillColor = properties.color;
			return cell;
		});
		gridGroup.remove();
	},
	"Half Rect": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let halfRect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				new Paper.Size(properties.size, properties.size / 2)
			);
			halfRect.fillColor = properties.color;
			halfRect.strokeColor = properties.color;
			halfRect.rotate(
				getRandomElement([0, 90, 180, 270, 360]),
				cell.bounds.center
			);

			return cell;
		});
		gridGroup.remove();
	},
	"Grid Within": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(
				cell.bounds.topLeft,
				new Paper.Size(cell.bounds.width, cell.bounds.height)
			);
			if (getRandomInt(0, 10) < 5) {
				let gGroup = rectToGrid(
					rect,
					properties.modifySize,
					properties.modifySize
				);
				gGroup.children.map(miniCell => {
					let dot = new Paper.Path.Circle(
						miniCell.bounds.center,
						properties.size
					);
					dot.fillColor = properties.color;
					return miniCell;
				});
			}
			return cell;
		});

		gridGroup.remove();
	},
	"Random Colors": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let baseColor = new Kolor(properties.color);
			baseColor.l += getRandomInt(0, properties.modifySize);
			cell.fillColor = baseColor.getHex();
			cell.strokeColor = baseColor.getHex();
			return cell;
		});
	},
	"Colored Triangles": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let baseColor = new Kolor(properties.color);
			baseColor.l = getRandomInt(0, properties.modifySize);
			let poly = new Paper.Path();
			poly.add(cell.bounds.topRight);
			poly.add(cell.bounds.bottomRight);
			poly.add(cell.bounds.bottomLeft);
			poly.fillColor = baseColor.getHex();
			poly.strokeColor = baseColor.getHex();
			if (getRandomInt(0, 1)) {
				poly.rotate(getRandomElement([0, 90, 180, 270, 360]));
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Dashed Polylines": function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			if (cell.name === "red") {
				let rect = new Paper.Path.Rectangle(
					cell.bounds.center,
					cell.bounds.width - properties.size
				);
				rect.bounds.center.set(cell.bounds.center);
				let points = [];

				for (let i = 0; i < 5; i++) {
					points.push(rect.getPointAt(getRandomInt(10, rect.length - 10)));
				}
				let ln = new Paper.Path(points);
				ln.strokeColor = properties.color;
				ln.strokeWidth = properties.strokeSize;
				ln.strokeJoin = "round";
				ln.strokeCap = "round";
				ln.dashArray = [1, properties.modifySize];
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Rotated Stripes": function(properties) {
		//70 1 40
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let rect = new Paper.Path.Rectangle(cell.bounds.center, properties.size);
			rect.bounds.center.set(cell.bounds.center);
			let lineGroup = new Paper.Group();
			for (let i = 0; i < cell.bounds.width / 10; i++) {
				let ln = new Paper.Path.Line(
					rect.bounds.topLeft,
					rect.bounds.bottomLeft
				);
				ln.strokeWidth = properties.strokeSize;
				ln.strokeColor = properties.color;
				lineGroup.addChild(ln);
			}
			for (let i = 0; i < lineGroup.children.length; i++) {
				lineGroup.children[i].position.x += properties.modifySize * i;
			}

			lineGroup.rotate(getRandomElement([45, 135]));
			return cell;
		});
		gridGroup.remove();
	},
	Metro: function(properties) {
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let pth = new Paper.Path();

			pth.add(new Paper.Point(0, 0));
			pth.add(new Paper.Point(0, 100));
			pth.add(new Paper.Point(100, 0));
			pth.add(new Paper.Point(0, 0));

			pth.strokeJoin = "round";
			pth.fillColor = properties.color;
			pth.scale(0.5);
			pth.bounds.center.set(cell.bounds.center);
			if (cell.name === "red") {
				let n = getRandomInt(0, 6);
				pth.rotate(90);
				if (n <= 3) {
					pth.rotate(180);
				}
			}
			return cell;
		});
		gridGroup.remove();
	},
	"Harmonic Dots": function(properties) {
		let randomPt = new Paper.Point(
			getRandomInt(10, Paper.project.view.size.height),
			getRandomInt(10, Paper.project.view.size.width)
		);
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path(
				cell.bounds.topLeft,
				new Paper.Point(cell.bounds.topRight.x + 10, cell.bounds.topRight.y)
			);
			path.bounds.center.set(cell.bounds.center);
			let offset = 0;
			let cir = new Paper.Path.Circle(path.getPointAt(path.length), 5);
			cir.fillColor = "blue";
			let forwardMvmnt = true;

			let ds = path.bounds.center.getDistance(randomPt);
			let t = remapNumbers(ds, [0, 100], [0, 360]);
			path.rotate(t, path.bounds.center);

			cir.onFrame = function() {
				if (offset === 0) {
					forwardMvmnt = true;
				} else if (offset === Math.round(path.length) - 1) {
					forwardMvmnt = false;
				}
				if (forwardMvmnt === true) {
					this.bounds.center.set(path.getPointAt(offset));
					offset++;
				} else if (forwardMvmnt === false) {
					this.bounds.center.set(path.getPointAt(offset));
					offset--;
				}
			};
			return cell;
		});
		gridGroup.remove();
	},
	"Harmonic Leaves": function(properties) {
		let randomPt = new Paper.Point(
			getRandomInt(10, Paper.project.view.size.height),
			getRandomInt(10, Paper.project.view.size.width)
		);
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = Paper.Path.Circle(
				cell.bounds.topLeft,
				properties.size < 36 ? 40 : properties.size
			);
			let cir2 = Paper.Path.Circle(
				cell.bounds.bottomRight,
				properties.size < 36 ? 40 : properties.size
			);
			let inter = cir.intersect(cir2);
			inter.fillColor = properties.color;
			let distance = inter.bounds.center.getDistance(randomPt);
			let t = remapNumbers(distance, [0, 1080], [0, 360]);
			inter.rotate(t, inter.bounds.center);
			inter.scale(0.5);
			return cell;
		});
		gridGroup.remove();
	},
	"Rotated Moons": function(properties) {
		//31 1 86
		let gridGroup = makeGrid(properties.columns, properties.rows);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, properties.size);
			let cir2 = new Paper.Path.Circle(
				cir.getPointAt(0),
				properties.size - properties.modifySize
			);
			let inter = cir.subtract(cir2);
			inter.scale(0.8);
			inter.fillColor = properties.color;
			inter.rotate(getRandomElement([0, 45, 90, 135, 180, 225, 270, 315, 360]));
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
		gridGroup.remove();
	}
};
export default patterns;

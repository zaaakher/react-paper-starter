import Paper from "paper";
import { makeGrid, getRandomInt, getRandomElement } from "./util";

let patterns = {
	"Wavy Circles": function(size) {
		let cirColor = "white";
		let gridGroup = makeGrid(10, 10);
		let cirGroup = new Paper.Group();
		gridGroup.children.map((cell, i) => {
			let path = new Paper.Path.Circle(
				cell.bounds.center,
				window.innerWidth / 50
			);
			let offset = 0;
			let n = 35;
			path.rotate(n * i);
			let cir = new Paper.Path.Circle(path.getPointAt(path.length - 1), size);
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
	"Half Circles": function(size) {
		let gridGroup = makeGrid(10, 10);
		gridGroup.children.map((cell, i) => {
			let cir = new Paper.Path.Circle(cell.bounds.center, size);
			cir.removeSegment(0);
			cir.rotate(getRandomInt(0, 360));
			cir.fillColor = "red";
			return cell;
		});
		gridGroup.view.scale(0.8);
	},
	"Rotated Arches": function(size) {
		let gridGroup = makeGrid(10, 10);
		gridGroup.children.map((cell, i) => {
			let arc = new Paper.Path.Arc(
				cell.bounds.topLeft,
				cell.bounds.topRight,
				cell.bounds.bottomRight
			);
			arc.bounds.center.set(cell.bounds.center);
			// arc.strokeWidth = getRandomInt(3, 30);
			arc.strokeWidth = size;
			arc.strokeColor = "white";
			arc.strokeCap = "round";
			arc.scale(0.4);
			arc.rotate(getRandomElement([0, 45, -45, 90, -90]));
			return cell;
		});
	},
	"Random Cricles": function(size) {
		let gridGroup = makeGrid(10, 10);
		gridGroup.children.map((cell, i) => {
			//Add cell code here
			let randomN = getRandomInt(0, 5);
			if (randomN < 3) {
				let cir = new Paper.Path.Circle(
					cell.bounds.center,
					getRandomInt(1, size)
				);
				cir.fillColor = "white";
			} else {
				let cir = new Paper.Path.Circle(
					cell.bounds.center,
					getRandomInt(1, size)
				);
				cir.fillColor = "white";
			}
			//cell code ends here
			return cell;
		});
	},

	"Place holder": function(size) {
		let gridGroup = makeGrid(10, 10);
		gridGroup.children.map((cell, i) => {
			//Add cell code here

			//cell code ends here
			return cell;
		});
	}
};
export default patterns;

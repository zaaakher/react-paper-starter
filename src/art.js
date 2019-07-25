import Paper from "paper";
import { makeGrid } from "./util";
const wavyCircles = () => {
	let cirColor = "white";
	let gridGroup = makeGrid(10, 10);
	gridGroup.children.map((cell, i) => {
		let path = new Paper.Path.Circle(
			cell.bounds.center,
			window.innerWidth / 50
		);
		let offset = 0;
		let n = 35;
		path.rotate(n * i);
		let cir = new Paper.Path.Circle(path.getPointAt(path.length - 1), 10);
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
};
export { wavyCircles };

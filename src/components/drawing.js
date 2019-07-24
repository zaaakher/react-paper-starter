import React from "react";
import Paper from "paper";

class Drawing extends React.Component {
	componentDidMount() {
		Paper.setup(this.canvas);
		// let bg = new Paper.Path.Rectangle(
		//   new Paper.Point(0, 0),
		//   new Paper.Point(
		//     Paper.project.view.bounds.width,
		//     Paper.project.view.bounds.height
		//   )
		// );
		// bg.fillColor = "red";
		// let divising = 20;
		this.makeGrid(10, 10);
		// this.makeGrid(10,10);
		let circleGroup = Paper.project.activeLayer.children[0];

		circleGroup.children.map((cell, i) => {
			let path = new Paper.Path.Circle(cell.bounds.center, 50);
			// path.strokeColor = "red";
			// path.strokeWidth = 5;
			// path.strokeCap = "round";

			let offset = 0;
			let n = 35;
			path.rotate(n * i);
			let cir = new Paper.Path.Circle(path.getPointAt(path.length - 1), 10);
			cir.fillColor = "white";
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
		// circleGroup.scale(0.2);
		// Paper.project.view.scale(0.8);
		Paper.project.activeLayer.scale(0.8);
	}

	makeGrid = (cols, rows) => {
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
	};
	render() {
		return (
			<div>
				<canvas
					id="myCanvas"
					ref={ref => {
						this.canvas = ref;
					}}
					width={window.innerWidth - 100}
					height={window.innerHeight - 100}
					className="backgroundCanvas"
				/>
			</div>
		);
	}
}

export default Drawing;

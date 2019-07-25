import React from "react";
import Paper from "paper";
// import { makeGrid, getRandomInt } from "../util";
import { wavyCircles } from "../art";
class Drawing extends React.Component {
	componentDidMount() {
		Paper.setup(this.canvas);
		let bg = new Paper.Path.Rectangle(
			new Paper.Point(0, 0),
			new Paper.Point(this.canvas.width, this.canvas.height)
		);
		bg.bounds.center.set(Paper.view.center);
		// bg.fillColor = "red";
		bg.sendToBack();
		bg.opacity = 0.5;
		wavyCircles();
	}

	render() {
		return (
			<div
				style={{
					// backgroundColor: "blue",
					padding: 0,
					margin: 0,
					width: "100%",
					height: "100vh",
					display: "flex",
					justifyContent: "center"
				}}
				onClick={() => console.log("canvas clicked")}
			>
				<canvas
					id="myCanvas"
					ref={ref => {
						this.canvas = ref;
					}}
					width={window.innerWidth - 50}
					height={window.innerHeight - 50}
					className="backgroundCanvas"
				/>
			</div>
		);
	}
}

export default Drawing;

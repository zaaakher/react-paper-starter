import React from "react";
import Paper from "paper";

import patterns from "../art";
import { getRandomInt } from "../util";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 20,
			key: new Date(),
			pattern: "Half Circles",
			secondClick: false
		};
	}

	componentDidMount() {
		console.log("compnent did MOUNT");
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.pattern](this.state.size);
	}

	componentDidUpdate() {
		console.log("compnent did update");
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.pattern](this.state.size);
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
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<select
					style={{ color: "white" }}
					value={this.state.pattern}
					onChange={e =>
						this.setState({ pattern: e.target.value, key: new Date() })
					}
				>
					{Object.keys(patterns).map((pattern, index) => (
						<option key={index} value={pattern}>
							{pattern}
						</option>
					))}
				</select>
				<input
					style={{ width: "50%" }}
					type="range"
					min="1"
					max="20"
					name="size"
					value={this.state.size}
					onChange={e =>
						this.setState({ key: new Date(), size: e.target.value })
					}
				/>
				<canvas
					onClick={() => {
						this.setState({
							key: new Date(),
							size: getRandomInt(1, 20)
						});
					}}
					key={this.state.key}
					id="myCanvas"
					ref={ref => {
						this.canvas = ref;
					}}
					width={window.innerWidth - 50}
					height={window.innerHeight - 50}
					// height={window.innerHeight > 500 ? window.innerHeight - 50 : 500}
					// width={window.innerWidth < 500 ? window.innerWidth - 50 : 500}
					className="backgroundCanvas"
				/>
			</div>
		);
	}
}

export default Drawing;

import React from "react";
import Paper from "paper";
import { getRandomInt } from "../util";
import patterns from "../art";
class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 20,
			key: new Date(),
			pattern: "Half Circles"
		};
	}
	componentDidMount() {
		Paper.setup(this.canvas);
		patterns[this.state.pattern](this.state.size);
	}

	componentDidUpdate() {
		Paper.setup(this.canvas);
		patterns[this.state.pattern](this.state.size);
	}
	render() {
		return (
			<div
				style={{
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
					value={this.state.pattern}
					onChange={e =>
						this.setState({ pattern: e.target.value, key: new Date() })
					}
				>
					{Object.keys(patterns).map((pattern, index) => (
						<option value={pattern}>{pattern}</option>
					))}
				</select>
				<input
					style={{ width: "50%" }}
					type="range"
					min="1"
					max="20"
					name="size"
					onChange={e =>
						this.setState({ key: new Date(), size: e.target.value })
					}
				/>
				<canvas
					onClick={() => {
						console.log(this.state.size);
						this.setState({ key: new Date(), size: getRandomInt(3, 20) });
					}}
					key={this.state.key}
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

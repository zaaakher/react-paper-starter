import React from "react";
import Paper from "paper";

import patterns from "../patterns";
// import { getRandomInt } from "../util";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: new Date(),
			pattern: "Wavy Circles",
			maxRange: 50,
			properties: {
				size: 10,
				strokeSize: 1,
				color: "black",
				columns: 10,
				rows: 10
			}
		};
	}

	componentDidMount() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.pattern](this.state.properties);
		Paper.project.view.scale(0.8);
	}

	componentDidUpdate() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.pattern](this.state.properties);
		Paper.project.view.scale(0.8);
	}

	render() {
		return (
			<div
				style={{
					padding: 0,
					margin: 0,
					width: "100%",
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center"
				}}
			>
				<div>
					<p>Pattern</p>
					<select
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
					<p>Columns</p>
					<input
						type="number"
						name="columns"
						onChange={e =>
							this.setState({
								key: new Date(),
								properties: {
									...this.state.properties,
									columns: e.target.value
								}
							})
						}
					/>
					<p>Rows</p>
					<input
						type="number"
						name="rows"
						onChange={e =>
							this.setState({
								key: new Date(),
								properties: {
									...this.state.properties,
									rows: e.target.value
								}
							})
						}
					/>
					<p>Size</p>
					<input
						className="form-control-range"
						type="range"
						min="1"
						max={this.state.maxRange}
						name="size"
						value={this.state.properties.size}
						onChange={e =>
							this.setState({
								key: new Date(),
								properties: {
									...this.state.properties,
									size: e.target.value
								}
							})
						}
					/>
					<p>Stroke Size</p>
					<input
						className="form-control-range"
						type="range"
						min="1"
						max={this.state.maxRange}
						name="strokeSize"
						value={this.state.properties.strokeSize}
						onChange={e =>
							this.setState({
								key: new Date(),
								properties: {
									...this.state.properties,
									strokeSize: e.target.value
								}
							})
						}
					/>
				</div>
				<canvas
					onClick={() => this.setState({ key: new Date() })}
					ref={ref => (this.canvas = ref)}
					key={this.state.key}
					width={window.innerWidth < 500 ? window.innerWidth - 50 : 500}
					height={window.innerWidth < 500 ? window.innerWidth - 50 : 500}
					id="myCanvas"
					className="backgroundCanvas"
				/>
			</div>
		);
	}
}

export default Drawing;

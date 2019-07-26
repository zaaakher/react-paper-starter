import React from "react";
import Paper from "paper";

import patterns from "../patterns";
import Selectors from "./Selectors";
// import { getRandomInt } from "../util";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: new Date(),
			maxRange: 50,
			properties: {
				size: 10,
				strokeSize: 1,
				modifySize: 1,
				columns: 10,
				rows: 10,
				color: "black",
				bgColor: "white",
				pattern: "Wavy Circles"
			}
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.properties.pattern](this.state.properties);
		Paper.project.view.scale(0.8);
	}
	componentDidUpdate() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		patterns[this.state.properties.pattern](this.state.properties);
		Paper.project.view.scale(0.8);
	}
	handleChange(e) {
		let property = e.target.name;
		this.setState({
			key: new Date(),
			properties: {
				...this.state.properties,
				[property]: e.target.value
			}
		});
	}
	render() {
		return (
			<div
				style={{
					padding: "10px",
					margin: "10px",
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
					flexDirection: "row",
					alignItems: "center"
				}}
			>
				<Selectors
					mainState={this.state}
					handleChange={e => this.handleChange(e)}
				/>
				<canvas
					onClick={() => this.setState({ key: new Date() })}
					style={{ backgroundColor: this.state.properties.bgColor }}
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

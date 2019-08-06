import React from "react";
import Paper from "paper";

import Selectors from "./Selectors";
import { remapNumbers } from "../util";
// import { getRandomInt } from "../util";

class Drawing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: new Date(),
			properties: {
				method: "rotation",
				rotation: 10,
				maxRange: 50,
				size: 20,
				divisions: 7,
				strokeSize: 1,
				xOffset: 20,
				yOffset: 20,
				text: "Hello World!",
				color: "#000000",
				bgColor: "#ffffff"
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.makeCaligraphy = this.makeCaligraphy.bind(this);
	}
	componentDidMount() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		// patterns[this.state.properties.pattern](this.state.properties);
		this.makeCaligraphy(this.state.properties);
		Paper.project.view.scale(0.8);
	}
	componentDidUpdate() {
		Paper.setup(this.canvas);
		Paper.project.clear();
		// patterns[this.state.properties.pattern](this.state.properties);
		this.makeCaligraphy(this.state.properties);
		Paper.project.view.scale(0.8);
	}
	handleChange(e) {
		let property = e.target.name;
		if (e.target.type === "checkbox") {
			this.setState({
				key: new Date(),
				properties: {
					...this.state.properties,
					[property]: e.target.checked
				}
			});
		} else {
			this.setState({
				key: new Date(),
				properties: {
					...this.state.properties,
					[property]: e.target.value
				}
			});
		}
	}
	makeCaligraphy(props) {
		// console.log(props);

		let mainText = new Paper.PointText(Paper.view.center);
		mainText.content = props.text;
		mainText.justification = "center";
		mainText.fillColor = props.color;
		mainText.fontSize = props.size;
		mainText.position.x = remapNumbers(
			props.xOffset,
			[0, props.maxRange],
			[0, Paper.view.bounds.width]
		);
		mainText.position.y = remapNumbers(
			props.yOffset,
			[0, props.maxRange],
			[0, Paper.view.bounds.height]
		);
		const rotation = () => {
			let textGroup = new Paper.Group();

			for (let i = 0; i < props.divisions; i++) {
				let tempText = mainText.clone();
				tempText.rotate((360 / props.divisions) * i, Paper.view.center);
				textGroup.addChild(tempText);
			}
			textGroup.rotate(props.rotation, Paper.view.center);
			return textGroup;
		};

		const flipping = () => {
			let textGroup = new Paper.Group();
			let tempText = mainText.clone();

			tempText.scale(1, -1, Paper.view.center);
			textGroup.addChildren([mainText, tempText]);

			let flippedGroup = textGroup.clone();
			flippedGroup.scale(-1, 1, Paper.view.center);

			let mainGroup = new Paper.Group([textGroup, flippedGroup]);

			for (let i = 0; i < props.divisions; i++) {
				let tempGroup = mainGroup.clone();
				tempGroup.rotate((360 / props.divisions) * i, Paper.view.center);
			}
		};
		if (this.state.properties.method === "rotation") {
			rotation();
		} else {
			rotation().clone().scale(1, -1, Paper.view.center);
		}
		mainText.remove();
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
					justifyContent: "space-evenly",
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

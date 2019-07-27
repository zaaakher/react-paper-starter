import React, { Component } from "react";
import "./App.css";
import Drawing from "./components/drawing";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}
	render() {
		return (
			<div>
				{this.state.width < 700 ? (
					<div className="App-header">
						This app is not optimized for small screens. Please try it on a
						larger screen.
						<p />
					</div>
				) : (
					<Drawing />
				)}
			</div>
		);
	}
}

export default App;

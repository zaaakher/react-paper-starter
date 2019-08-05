import React from "react";
import patterns from "../patterns";

const Selectors = props => (
	<div className="selectors">
		<div>
			<p>Text: {props.mainState.properties.text}</p>
			<input type="text" name="text" onChange={props.handleChange} />

			<p>Divisions: {props.mainState.properties.divisions}</p>
			<input type="number" name="divisions" onChange={props.handleChange} />

			<p>Max Range: {props.mainState.properties.maxRange}</p>
			<input type="number" name="maxRange" onChange={props.handleChange} />

			<p>Size: {props.mainState.properties.size}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="size"
				value={props.mainState.properties.size}
				onChange={props.handleChange}
			/>
			{/* 
			<p>Stroke Size: {props.mainState.properties.strokeSize}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="strokeSize"
				value={props.mainState.properties.strokeSize}
				onChange={props.handleChange}
			/> */}

			<p>x-offset: {props.mainState.properties.xOffset}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="xOffset"
				value={props.mainState.properties.xOffset}
				onChange={props.handleChange}
			/>

			<p>y-offset: {props.mainState.properties.yOffset}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="yOffset"
				value={props.mainState.properties.yOffset}
				onChange={props.handleChange}
			/>
		</div>
		<div>
			<p>Color: {props.mainState.properties.color}</p>
			<input
				type="color"
				value={props.mainState.properties.color}
				name="color"
				onChange={props.handleChange}
			/>

			<p>Background Color: {props.mainState.properties.bgColor}</p>
			<input
				type="color"
				value={props.mainState.properties.bgColor}
				name="bgColor"
				onChange={props.handleChange}
			/>
		</div>
	</div>
);

export default Selectors;

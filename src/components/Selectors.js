import React from "react";
import patterns from "../patterns";

const Selectors = props => (
	<div className="selectors">
		<div>
			<p>Pattern: {props.mainState.properties.pattern}</p>
			<select
				name="pattern"
				value={props.mainState.properties.pattern}
				onChange={props.handleChange}
			>
				{Object.keys(patterns).map((pattern, index) => (
					<option key={index} value={pattern}>
						{pattern}
					</option>
				))}
			</select>

			<p>Columns: {props.mainState.properties.columns}</p>
			<input type="number" name="columns" onChange={props.handleChange} />

			<p>Rows: {props.mainState.properties.rows}</p>
			<input type="number" name="rows" onChange={props.handleChange} />

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

			<p>Stroke Size: {props.mainState.properties.strokeSize}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="strokeSize"
				value={props.mainState.properties.strokeSize}
				onChange={props.handleChange}
			/>

			<p>Modify: {props.mainState.properties.modifySize}</p>
			<input
				className="form-control-range"
				type="range"
				min="1"
				max={props.mainState.properties.maxRange}
				name="modifySize"
				value={props.mainState.properties.modifySize}
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

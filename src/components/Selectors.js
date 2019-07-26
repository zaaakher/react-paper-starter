import React from "react";
import patterns from "../patterns";

const Selectors = props => (
	<div>
		<p>Pattern</p>
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
		<p>Columns</p>
		<input type="number" name="columns" onChange={props.handleChange} />
		<p>Rows</p>
		<input type="number" name="rows" onChange={props.handleChange} />
		<p>Size</p>
		<input
			className="form-control-range"
			type="range"
			min="1"
			max={props.mainState.maxRange}
			name="size"
			value={props.mainState.properties.size}
			onChange={props.handleChange}
		/>
		<p>Stroke Size</p>
		<input
			className="form-control-range"
			type="range"
			min="1"
			max={props.mainState.maxRange}
			name="strokeSize"
			value={props.mainState.properties.strokeSize}
			onChange={props.handleChange}
		/>
		<p>Modify</p>
		<input
			className="form-control-range"
			type="range"
			min="1"
			max={props.mainState.maxRange}
			name="modifySize"
			value={props.mainState.properties.modifySize}
			onChange={props.handleChange}
		/>
		<p>Color</p>
		<input type="color" name="color" onChange={props.handleChange} />
		<p>Background Color</p>
		<input type="color" name="bgColor" onChange={props.handleChange} />
	</div>
);

export default Selectors;

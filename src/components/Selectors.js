import React from "react";

const Selectors = props => (
	<div className="selectors">
		<div>
			{Object.keys(props.mainState.properties).map(key => {
				let p = props.mainState.properties[key];
				return (
					<div key={p.name}>
						<p>{p.label}</p>
						{p.type === "range" ? (
							<input
								type={p.type}
								name={p.name}
								min={1}
								value={p.value}
								max={props.mainState.properties.maxRange.value}
								onChange={props.handleChange}
							/>
						) : (
							<input
								type={p.type}
								name={p.name}
								value={p.value}
								onChange={props.handleChange}
							/>
						)}
					</div>
				);
			})}
		</div>
	</div>
);

export default Selectors;

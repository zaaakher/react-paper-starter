import React from "react";

const Selectors = props => (
	<div className="selectors">
			{Object.keys(props.mainState.dynamic).map(key => {
				let p = props.mainState.dynamic[key];
				return (
					<div>
						<p>{p.label}</p>
						<input
							type={p.type}
							name={p.name}
							value={p.value}
							onChange={props.handleChange}
						/>
					</div>
				);
			})}
	</div>
);

export default Selectors;

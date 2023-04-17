import React, { useState, useEffect } from 'react';

export function ColorDropdown(props) {
	const [colors, setColors] = useState([]);

	useEffect(() => {
		fetch('/api/v1/colors')
			.then(response => response.json())
			.then(data => setColors(data));
	}, []);

	return (
		<div>
		<label>Color:</label>
		<select value={props.value} onChange={props.onChange}>
			{colors.map(color => (
				//Si coloco en value u_colcode se imprime el codigo del color
				//cambie por u_coldesc para mostrar la descripcion
				<option key={color.u_colcode} value={color.u_coldesc}>{color.u_coldesc}</option>
			))}
		</select>
		</div>
	);
}


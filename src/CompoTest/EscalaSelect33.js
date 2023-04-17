import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
	{ label: "Grapes 🍇", value: "grapes" },
	{ label: "Mango 🥭", value: "mango" },
	{ label: "Strawberry 🍓", value: "strawberry" },
];

export function MySelect() {
	const [selected, setSelected] = useState([]);

	const overrideStrings = {
		selectSomeItems: "Selecciona opciones",
		allItemsAreSelected: selected.length === options.length ? selected.map(item => item.label).join(', ') : "Selecciona todas",
	}

	return (
		<div>
			<h1>Select Fruits</h1>
			
			<MultiSelect
				options={options}
				value={selected}
				onChange={setSelected}
				labelledBy="Select"
				overrideStrings={overrideStrings}
			/>
		</div>
	);
}
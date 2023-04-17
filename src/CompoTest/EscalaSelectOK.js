import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';

export function MySelect(props) {

	const [options, setOptions] = useState([]);
	const [selectedValues, setSelectedValues] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
		switch (event.target.value) {
			case 'ACM1':
				setOptions([
					{ label: '10', value: '10' },
					{ label: '12', value: '12' },
					{ label: '14', value: '14' },
				]);
				setSelectedValues([]);
				break;
			case 'TERN':
				setOptions([
					{ label: '32', value: '32' },
					{ label: '34', value: '34' },
					{ label: '36', value: '36' },
				]);
				setSelectedValues([]);
				break;
			case 'CAM2':
				setOptions([
					{ label: 'S', value: 'S' },
					{ label: 'M', value: 'M' },
					{ label: 'L', value: 'L' },
				]);
				setSelectedValues([]);
				break;
			default:
				setOptions([]);
				setSelectedValues([]);
				break;
		}
	};

	const handleMultiSelect = (event) => {
		setSelectedValues(event.value);
	};

	useEffect(() => {
		props.setSelectedOption(selectedOption);
		props.setSelectedValuesState(selectedValues);
	}, [selectedOption, selectedValues]);

	return (
		<div>
			<label htmlFor="my-select">Escala:</label>
			<select id="my-select" onChange={handleSelectChange}>
				<option value="">Seleccione</option>
				<option value="ACM1">ACM1</option>
				<option value="TERN">TERN</option>
				<option value="CAM2">CAM2</option>
			</select>

			<br />

			<label htmlFor="my-multiselect">Tallas:</label>
			<MultiSelect
				id="my-multiselect"
				value={selectedValues}
				options={options}
				onChange={handleMultiSelect}
				multiple // permite la selección de múltiples valores
			/>

		</div>
	);
}

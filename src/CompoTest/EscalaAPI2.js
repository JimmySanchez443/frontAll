import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';

export function MySelect(props) {
	// Opciones del primer select
	const escalaOptions = [
		{ value: 'ACM1', label: 'ACM1' },
		{ value: 'TERN', label: 'TERN' },
		{ value: 'CAM2', label: 'CAM2' },
	];

	// Opciones del segundo select para cada escala
	const [tallasOptions, setTallasOptions] = useState({
		ACM1: [
			{ value: '10', label: '10' },
			{ value: '12', label: '12' },
			{ value: '14', label: '14' },
		],
		TERN: [
			{ value: '32', label: '32' },
			{ value: '34', label: '34' },
			{ value: '36', label: '36' },
		],
		CAM2: [
			{ value: 'S', label: 'S' },
			{ value: 'M', label: 'M' },
			{ value: 'L', label: 'L' },
		],
	});

	// Estado para controlar la opción seleccionada en el primer select
	const [selectedEscala, setSelectedEscala] = useState('');
	const [selectedTallas, setSelectedTallas] = useState([]);



	const handleEscalaChange = (e) => {
		setSelectedEscala(e.target.value);
		setSelectedTallas([]);
	};

	// Pasamos la selección al padre mediante props
	useEffect(() => {
		props.onSelectChange(selectedEscala, selectedTallas);
	}, [selectedEscala, selectedTallas]);

	return (
		<div>
			<label>Escala:</label>
			<select value={selectedEscala}
				onChange={handleEscalaChange}>
				<option value="">Selecciona</option>
				{escalaOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			<label>Tallas:</label>
			<MultiSelect
				value={selectedTallas}
				options={tallasOptions[selectedEscala]}
				onChange={(e) => setSelectedTallas(e.value)}
				optionLabel="label"
				display="chip"
			/>


		</div>
	);
}
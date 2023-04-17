import React, { useState, useEffect } from 'react';

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { MySelect } from './EscalaSelectOK'




export function MyForm() {
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedValues, setSelectedValuesState] = useState([]);
	
	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.log('Escala seleccionadas:', selectedOption);
		console.log('Tallas seleccionadas:', selectedValues);
	};


	return (
		<>
			<form onSubmit={handleFormSubmit}>


				<MySelect setSelectedOption={setSelectedOption} setSelectedValuesState={setSelectedValuesState} />

				<button type="submit" onSubmit={handleFormSubmit}>Mostrar2</button>
			</form>
		</>
	);
}

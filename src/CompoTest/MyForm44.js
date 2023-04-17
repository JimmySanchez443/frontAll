import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export function MyForm()  {
	const [selectValue, setSelectValue] = useState('');
	const [multiSelectValue, setMultiSelectValue] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [codProValue, setCodProValue] = useState('');

	useEffect(() => {
		const multiSelectValues = multiSelectValue.map((option) => option.value).join('.');
		const codPro = `${selectValue}.${multiSelectValues}-${inputValue}`;
		setCodProValue(codPro);
	}, [selectValue, multiSelectValue, inputValue]);

	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	};

	const handleMultiSelectChange = (selectedOptions) => {
		setMultiSelectValue(selectedOptions);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	return (
		<div>
			<label>
				Selecciona una opción:
				<select value={selectValue} onChange={handleSelectChange}>
					<option value=""></option>
					<option value="X">X</option>
					<option value="Y">Y</option>
					<option value="Z">Z</option>
				</select>
			</label>
			<label>
				Selecciona múltiples opciones:
				<Select
					options={[
						{ value: '1', label: 'Opción 1' },
						{ value: '2', label: 'Opción 2' },
						{ value: '3', label: 'Opción 3' },
						{ value: '4', label: 'Opción 4' },
					]}
					value={multiSelectValue}
					onChange={handleMultiSelectChange}
					isMulti
				/>
			</label>
			<label>
				Ingresa un valor:
				<input type="text" value={inputValue} onChange={handleInputChange} />
			</label>
			<label>
				Valor concatenado:
				<input type="text" value={codProValue} readOnly />
			</label>
		</div>
	);
}

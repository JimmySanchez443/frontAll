import React, { useState, useEffect } from 'react';

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { ColorDropdown } from './ColorsSelect'

import { MySelect } from './EscalaSelect2'


export function MyForm() {

	const [sa_anexo, setName] = useState('');
	const [itemcode, setSku] = useState('');
	const [sa_color, setColor] = useState('');

	const [selectedEscala, setSelectedEscala] = useState('');
	const [selectedTallas, setSelectedTallas] = useState([]);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		console.log('Anexo seleccionado:', sa_anexo);
		console.log('SKU seleccionado:', itemcode);
		console.log('Color seleccionado:', sa_color);
		console.log('Escala seleccionada:', selectedEscala);
		console.log('Tallas seleccionadas:', selectedTallas);
	};

	return (
		<>
			<form style={{ display: 'flex' }} onSubmit={handleFormSubmit}>
				<div>
					<label>
						Anexo:
						<input type="text" value={sa_anexo} onChange={(e) => setName(e.target.value)} />
					</label>
				</div>

				<div>
					<label>
						SKU:
						<input type="text" value={itemcode} onChange={(e) => setSku(e.target.value)} />
					</label>
				</div>

				<div>
					<ColorDropdown value={sa_color} onChange={(e) => setColor(e.target.value)} />
				</div>

				<MySelect setSelectedOption={setSelectedEscala} setSelectedValues={setSelectedTallas} />

				<button type="submit">Mostrar</button>

			</form>
		</>
	);
}

import React, { useState, useEffect } from 'react';

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { MySelect } from './CompoTest/EscalaSelect'
import { ColorDropdown } from './CompoTest/ColorsSelect'



export function MyForm() {
	const [tipo, setSelectValue] = useState('C');

	const handleTipoChange = (event) => {
		setSelectValue(event.target.value);
	};

	let marca, procedencia;

	switch (tipo) {
		case 'C':
			marca = 'PICAL';
			procedencia = 'IMPORTADO';
			break;
		case 'X':
			marca = 'PRIVATE';
			procedencia = 'LOCAL';
			break;
		case 'F':
			marca = 'FUNKY';
			procedencia = 'IMPORTADO';
			break;
		default:
			marca = '';
			procedencia = '';
	}

	const [sa_anexo, setName] = useState('');
	const [itemcode, setSku] = useState('');
	const [sa_color, setColor] = useState('');


	const [escala, setSelectedEscala] = useState('');
	const [tallas, setSelectedTallas] = useState([]);

	const handleSelectChange = (escala, tallas) => {
		setSelectedEscala(escala);
		setSelectedTallas(tallas);
	};


	const concatData = tallas.map((talla) => `${tipo}.${sa_anexo}-${talla}`);

	const tableData = tallas.map((tallas,index) => ({
		tipo,
		marca,
		procedencia,
		sa_anexo,
		itemcode,
		sa_color,
		escala,
		tallas,
		concat: concatData[index] // Nueva propiedad concatenada

	}));

	return (
		<>
			<form style={{ display: 'flex' }} >

				<div>
					<label>
						Tipo:
						<select value={tipo} onChange={handleTipoChange}>
							<option value="C">C</option>
							<option value="X">X</option>
							<option value="F">F</option>
						</select>
					</label>
					<label>
						Marca:
						<input type="text" value={marca} readOnly />
					</label>
					<label>
						Proced.:
						<input type="text" value={procedencia} readOnly />
					</label>
				</div>
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
				
				<MySelect onSelectChange={handleSelectChange} />



			</form>


			<table>
				<thead>
					<tr>
						<th>Tipo</th>
						<th>Marca</th>
						<th>Proced</th>
						<th>Anexo</th>
						<th>SKU</th>
						<th>Color</th>
						<th>Escala</th>
						<th>Tallas</th>
						<th>Concat</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((data, index) => (
						<tr key={index}>
							<td>{data.tipo}</td>
							<td>{data.marca}</td>
							<td>{data.procedencia}</td>
							<td>{data.sa_anexo}</td>
							<td>{data.itemcode}</td>
							<td>{data.sa_color}</td>
							<td>{data.escala}</td>
							<td>{data.tallas}</td>
							<td>{data.concat}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

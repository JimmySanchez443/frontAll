import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { ColorDropdown } from './ColorsSelect'


export function MyForm() {
	
	
	const [options, setOptions] = useState([
		{ label: 'New York', value: 'NY' },
		{ label: 'Rome', value: 'RM' },
		{ label: 'London', value: 'LDN' },
		{ label: 'Istanbul', value: 'IST' },
		{ label: 'Paris', value: 'PRS' },
	]);

	const [sa_anexo, setName] = useState('');
	const [itemcode, setSku] = useState('');
	const [sa_color, setColor] = useState('');
	const [onhand, setQuantity] = useState('');
	
	const [selectedCities, setSelectedCities] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			sa_anexo,
			itemcode,
			sa_color,
			onhand,
			selectedCities,
		};

		axios.post('/api/v1/anexos', data)
			.then(response => {
				console.log(data);
				console.log(response.data);
			})
			.catch(error => {
				console.log(data);
				console.log(error);

			});
	};

	const tableData = selectedCities.map((city) => ({
		sa_anexo,
		itemcode,
		sa_color,
		city,
	}));

	return (
		<>
			<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
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

				<div>
					<label>
						Cant:
						<input type="text" value={onhand} onChange={(e) => setQuantity(e.target.value)} />
					</label>
				</div>

				<div>
				<label>Tallas:</label>
					<MultiSelect
						value={selectedCities}
						options={options}
						onChange={(e) => setSelectedCities(e.value)}
						display="chip"
						//optionLabel="label"
						optionLabel="value"
						filter={false}
					/>
				</div>

				<div>
					<button type="submit">Submit</button>
				</div>
			</form>

			<table>
				<thead>
					<tr>
						<th>Anexo</th>
						<th>SKU</th>
						<th>Color</th>
						<th>Ciudad</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((data, index) => (
						<tr key={index}>
							<td>{data.sa_anexo}</td>
							<td>{data.itemcode}</td>
							<td>{data.sa_color}</td>
							<td>{data.city}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

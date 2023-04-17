import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EstiloEscala.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { MultiSelect } from 'primereact/multiselect';

import { Authenticate, Logout } from './APIAuth';

export function MyEscala(props) {
	const [items, setItems] = useState([]);
	const [selectedItemCode, setSelectedItemCode] = useState('');
	const [selectedTallas, setSelectedTallas] = useState([]);

	const [tallas, setTallas] = useState([]);

	useEffect(() => {

		async function fetchData() {
			let isAuthenticated = false; //agrega una variable para verificar si se autenticó correctamente
			try {
				// Step 1: check if already authenticated
				if (!isAuthenticated) {
					const authToken = await Authenticate();

					if (authToken === 200) {
						// Step 4: get the items and tallas
						const itemsResponse = await axios.get('https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc', { withCredentials: true });
						const itemsData = itemsResponse.data;
						setItems(itemsData);
						isAuthenticated = true;
					}
					console.log('Escala login');

				}
			} catch (error) {
				console.log('Escala', error);
			} finally {
				// Step 5: close the connection if authenticated
				if (isAuthenticated) {

					//await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
					await Logout();
					console.log('escala logout')
				}
			}
		}

		fetchData();
	}, []);




	useEffect(() => {
		async function fetchTallas() {
			if (selectedItemCode) {
				try {
					const authToken = await Authenticate();

					if (authToken === 200) {
						// Step 4: get the items and tallas
						const response = await axios.get(`https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection&$filter=Code eq '${selectedItemCode}'&$orderby=U_SclDesc asc`, { withCredentials: true });
						const data = response.data.value[0].ARGNS_SIZECollection;
						setTallas(data.map(item => ({ label: item.U_SizeCode, value: item.U_SizeCode })));
					}
					console.log('Tallas login');

				} catch (error) {
					console.log('Tallas', error);

				} finally {
					await Logout();
					console.log('tallas logout')
				}
			}
		}

		fetchTallas();
	}, [selectedItemCode]);

	useEffect(() => {
		setSelectedTallas([]);
	}, [selectedItemCode]);


	const handleSelectChange = (event) => {
		const selectedItem = items.value.find(item => item.U_SclDesc === event.target.value);
		setSelectedItemCode(selectedItem?.Code || '');
		setSelectedTallas([]);
		props.onSelectedItemChange(selectedItem?.U_SclCode || '');

	};

	const handleChange = (e) => {
		setSelectedTallas(e.value);
		props.onSelectedTallasChange(e.value);
	}

	return (
		<div>
			<select className="select-fixed-height" onChange={handleSelectChange}>
				<option value="">Seleccione</option>
				{items.value?.map((item) => (
					<option key={item.Code}>{item.U_SclDesc}</option>
				))}
			</select>



			<MultiSelect
				value={selectedTallas}
				options={tallas}
				onChange={handleChange}
				optionLabel="label"
				display="chip"
			/>
		</div>
	);
}
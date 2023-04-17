import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EstiloEscala.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { MultiSelect } from 'primereact/multiselect';

export function MyEscala(props) {
	const [items, setItems] = useState([]);
	const [selectedItemCode, setSelectedItemCode] = useState('');
	const [selectedTallas, setSelectedTallas] = useState([]);

	const [tallas, setTallas] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				// Step 1: authenticate and get the cookie
				const authResponse = await axios.post('https://192.168.246.228:50000/b1s/v1/Login', {
					CompanyDB: 'SBO_MANAMER_PRD_202112',
					UserName: '9pro02',
					Password: 'Man123'
				}, { withCredentials: true });

				// Step 2: get the items and tallas
				const itemsResponse = await axios.get('https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc', { withCredentials: true });
				const itemsData = itemsResponse.data;
				setItems(itemsData);

				if (selectedItemCode) {
					const tallasResponse = await axios.get(`https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection&$filter=Code eq '${selectedItemCode}'&$orderby=U_SclDesc asc`, { withCredentials: true });
					const tallasData = tallasResponse.data.value[0].ARGNS_SIZECollection;
					setTallas(tallasData.map(item => ({ label: item.U_SizeCode, value: item.U_SizeCode })));
				}

				// Step 3: close the connection
				const logoutResponse = await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
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
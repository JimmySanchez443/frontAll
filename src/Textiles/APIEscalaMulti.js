import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SelectEscala.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { MultiSelect } from 'primereact/multiselect';


export function MyEscala() {
	const [items, setItems] = useState([]);
	
	const [selectedTallas, setSelectedTallas] = useState([]);
	

	useEffect(() => {
		async function fetchItems() {
			try {
				// Step 1: authenticate and get the cookie
				const authResponse = await axios.post('https://192.168.246.228:50000/b1s/v1/Login', {
					CompanyDB: 'SBO_MANAMER_PRD_202112',
					UserName: '9pro02',
					Password: 'Man123'
				}, { withCredentials: true });

				// Step 2: get the items
				const itemsResponse = await axios.get('https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc', { withCredentials: true });
				//const itemsData = itemsResponse.data;
				const itemsData = itemsResponse.data.value.map((item) => ({
					label: item.U_SclDesc,
					value: item.Code
				}));
				setItems(itemsData);

				// Step 3: close the connection
				const logoutResponse = await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
			} catch (error) {
				console.log(error);
			}
		}

		fetchItems();
	}, []);



	return (
		<div>
			
			<MultiSelect
				value={selectedTallas}
				options={items}
				onChange={(e) => setSelectedTallas(e.value)}
				optionLabel="label"
				display="chip"
			/>
		</div>
	);
}
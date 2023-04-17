import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import "./SelectEscala.css";

export function Escalas() {
	const [items, setItems] = useState([]);


	const agent = new HttpsProxyAgent({
		host: 'my-proxy-server.com',
		port: 8080,
		rejectUnauthorized: false // desactiva la verificación del certificado SSL
	});


	useEffect(() => {
		// Paso 1: autenticarse y obtener la cookie
		axios.post('https://192.168.246.228:50000/b1s/v1/Login', {
			CompanyDB: 'SBO_MANAMER_PRD_202112',
			UserName: '9pro02',
			Password: 'Man123'
		}, { withCredentials: true }, {

			httpsAgent: agent // agrega la instancia de HttpsProxyAgent como opción

		}).then(response => {



			// Paso 2: obtener la lista de items
			//return axios.get('https://192.168.246.228:50000/b1s/v1/ARGNS_COLOR?$select=U_ColCode,U_ColDesc',
			return axios.get('https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc',
			//return axios.get("https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection&$filter=Code eq '10003'",
			//return axios.get("https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection&$filter=Code eq '10001'",
				{ withCredentials: true }
			);
		}).then(response => {
			console.log(response); // muestra la respuesta de la petición en la consola
			setItems(response.data);
			
			//const data = response.data.value[0].ARGNS_SIZECollection;
      		//setItems(data.map(item => item.U_SizeCode));

			// Paso 4: cerrar la conexión
			return axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null,
				//{headers: {Cookie: cookie}}
				{ withCredentials: true }

			);
		}).catch(error => {
			console.log(error);
		});
	}, []);



	return (
		<div>
			<select className="select-fixed-height">
				{items.value && items.value.map((item) => (
					//<option key={item.U_ColCode}>{item.U_ColDesc}</option>
					<option key={item.Code}>{item.U_SclDesc}</option>
				))}
			</select>
		</div>
	);
	
}
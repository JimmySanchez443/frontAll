import React, { useState, useEffect } from 'react';

import { MyEscala } from './APIEscalaV2'
import { MyColors } from './APIColores'
import { MyFamily } from './APIFamilia'
import { MySubFamily } from './APISubFamilia'
import { MyMarcaExt } from './APIMarcaExterna'
import { MyMarca } from './APIMarca'
import { MyOrigin } from './APIProcedencia'
import CountrySelector from './APIPais'
import MyTableMongo from './APITablaMongo'
import MyTableData from './APITablaData'
import { MyBodega } from './APIBodegas'
import { MyEstilo } from './APIEstilo'
import { MyModUltSAP } from './APIModSAP'

import axios from 'axios';
//import './EstiloForm.css'
import './EstiloTablaForm.css'

export function MyForm() {

	let procedencia;//marca,
	const [u_argns_year, setAnio] = useState(new Date().getFullYear());
	const [u_cxs_sldc, setDescuento] = useState('Y');
	const [tipo, setTipo] = useState('Mod');
	const [combo, setSelectValue] = useState('C');
	const [sa_anexo, setName] = useState('');
	const [mongoData, setMongoData] = useState([]);
	const [itemcode, setSku] = useState('');
	const [sa_color, setColor] = useState('');

	const [u_argns_int_flia, setCodeFamilia] = useState('');
	const [nameFamilia, setNameFamilia] = useState('');


	const [u_argns_int_estilo, setCodeEstilo] = useState('');
	const [nameEstilo, setNameEstilo] = useState('');

	const [subFamilia, setSubFamilia] = useState('');
	const [u_argns_brand, setMarcaExt] = useState('');

	const [codeMarca, setCodeMarca] = useState('');
	const [nameMarca, setNameMarca] = useState('');

	const [ultimoMod, setUltimoMod] = useState('');

	const [u_argns_int_proced, setOrigin] = useState('');
	const [u_argns_coo, setPais] = useState('');
	const [defaultwarehouse, setBodega] = useState('');
	const [escala, setSelectedEscala] = useState('');
	const [u_argns_size, setSelectedTallas] = useState([]);
	//PRECIO Y CANTIDAD
	const [onhand, setCantidad] = useState('');
	const [sa_preciouni, setPrecioUni] = useState('');
	const [price, setPrice] = useState('');
	const [sa_ppmxmayor, setPpmxMayor] = useState('');

	//ACTUALIZAR EL MODELO
	const [selectedMarca, setSelectedMarca] = useState('');
	const [selectedOrigin, setSelectedOrigin] = useState('');
	const [selectedSubFamily, setSelectedSubFamily] = useState('');

	switch (combo) {
		case 'C':
			//marca = 'PICAL';
			procedencia = 'IMPORTADO';
			break;
		case 'X':
			//marca = 'PRIVATE';
			procedencia = 'LOCAL';
			break;
		case 'F':
			//marca = 'FUNKY';
			procedencia = 'IMPORTADO';
			break;
		default:
			//marca = '';
			procedencia = '';
	}


	const handleComboChange = (event) => {
		setSelectValue(event.target.value);
	};

	const handleSelectedItemChange = (escala) => {
		setSelectedEscala(escala);
	};

	const handleSelectedTallasChange = (tallas) => {
		setSelectedTallas(tallas);
	};

	const handleColorChange = (sa_color) => {
		setColor(sa_color);
	};

	const handleCountryChange = (u_argns_coo) => {
		setPais(u_argns_coo.toUpperCase());
	};

	/*const handleFamilyChange = (familia) => {
		console.log('familia form',familia);
		setFamilia(familia);
	};*/

	const handleFamilyChange = (code, value, label) => {
		setCodeFamilia(value);
		setNameFamilia(label);
		//const familiaObj = { value: value, label: label };
		console.log('familia form', code, value, label);
		//setFamilia(familiaObj);
	};

	const handleSubFamilyChange = (code, value) => {
		console.log('Subfamilia form', code, value);
		setSubFamilia(value);
	};

	const handleEstiloChange = (code, value, label) => {
		setCodeEstilo(value);
		setNameEstilo(label);
		//const estiloObj = { value: value, label: label };
		console.log('estilo form', code, value, label);
		//setEstilo(estiloObj);
	};

	const handleMarcaExtChange = (marcaExt) => {
		setMarcaExt(marcaExt);
	};

	const handleMarcaChange = (marca) => {
		setCodeMarca(marca);
	};


	const handleOriginChange = (u_argns_int_proced) => {
		setOrigin(u_argns_int_proced);
	};

	const handleTipoChange = (event) => {
		setTipo(event.target.value);
	};

	const handleChangeDesc = (event) => {
		setDescuento(event.target.value);
	};

	const handleBodegaChange = (defaultwarehouse) => {
		setBodega(defaultwarehouse);
	};

	/*function handleUltimoChange(valor) {
		setUltimoMod(valor);
	}*/

	function handleUltimoChange(valor) {
		setUltimoMod(valor);
	}




	useEffect(() => {
		setSelectedTallas([]);
	}, [escala]);

	//const concatData = u_argns_size.map((talla) => `${codeMarca}${u_argns_int_proced}${subFamilia}.${ultimoMod}-${sa_color}-${talla}`);
	const concatData = u_argns_size.map((talla) => `${ultimoMod}-${sa_color}-${talla}`);

	const tableData = u_argns_size.map((u_argns_size, index) => ({
		combo,
		u_argns_brand,
		procedencia,
		u_argns_coo,//pais
		sa_anexo,
		//codeMarca,//marca
		selectedMarca,
		
		u_argns_year,//anio
		ultimoMod,
		u_cxs_sldc,//descuento
		defaultwarehouse,//bodega
		itemcode,
		sa_color,
		//familia,
		//familia: familia.value, // mostrar el value en la columna familia
		//familia: familia.label, // mostrar el label en la columna familia
		//familia: { value: familia.value, label: familia.label },
		//familia: { u_argns_int_flia: familia.value, nameFamily: familia.label },
		u_argns_int_flia,
		nameFamilia,
		//subFamilia,
		selectedSubFamily,
		
		//estilo: { value: estilo.value, label: estilo.label },
		u_argns_int_estilo,//estilo
		nameEstilo,
		//u_argns_int_proced,//procedencia
		selectedOrigin,
		
		tipo,
		escala,

		u_argns_size,//tallas
		concat: concatData[index], // Nueva propiedad concatenada
		//CANTIDAD Y PRECIOS
		onhand,
		sa_preciouni,
		price,
		sa_ppmxmayor

	}));

	const resetForm = () => {
		setSku('');
		setSelectedEscala('');
		setSelectedTallas([]);
		//setTipo('Mod');
		//CANTIDAD Y PRECIOS
		setCantidad('');
		setPrecioUni('');
		setPrice('');
		setPpmxMayor('');

	}

	const handleGetClick = () => {
		axios.get(`/api/v1/anexos/sa/${sa_anexo}`)
			.then(response => {
				setMongoData(response.data);
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}


	return (
		<>


			<div style={{ display: 'flex', flexWrap: 'wrap' }}>


				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div>
						<label>
							combo:
							<select value={combo} onChange={handleComboChange}>
								<option value="C">C</option>
								<option value="X">X</option>
								<option value="F">F</option>
							</select>
						</label>
					</div>
					<div>
						<label>
							Marca:
							<MyMarca onSelectChange={(marca) => setSelectedMarca(marca)} />
						</label>
					</div>
					<div>
						<label>
							MarcaExt:
							<MyMarcaExt onSelectChange={handleMarcaExtChange} />
						</label>
					</div>
					<div>
						<label>
							Proc:
							<MyOrigin onSelectChange={(u_argns_int_proced) => setSelectedOrigin(u_argns_int_proced)} />
						</label>
					</div>
					<div>
						<label>
							campoAux.:
							<input type="text" value={procedencia} readOnly />
						</label>
					</div>

				</div>



				<div style={{ display: 'flex', flexWrap: 'wrap' }}>

					<div>
						<label>
							Anexo:
							<input type="text" value={sa_anexo} onChange={(e) => setName(e.target.value)} />
						</label>
					</div>
					<div>
						<label>
							Año:
							<input type="text" value={u_argns_year} onChange={(e) => setAnio(e.target.value)} />
						</label>
					</div>
					<div>
						<label>
							Desc:
							<select value={u_cxs_sldc} onChange={handleChangeDesc}>
								<option value="Y">Y</option>
								<option value="N">N</option>
							</select>
						</label>
					</div>
					<div>
						<label>
							SKU:
							<input type="text" value={itemcode} onChange={(e) => setSku(e.target.value)} />
						</label>
					</div>
					<div>
						<label>
							Color:</label>
						<MyColors onSelectChange={handleColorChange} />
					</div>
					<div>
						<label>
							Tipo:
							<select value={tipo} onChange={handleTipoChange}>
								<option value="Mod">Moda</option>
								<option value="Bac">Basico</option>
							</select>
						</label>
					</div>
					<div>
						<label>Bodega:
							<MyBodega onBodegaChange={handleBodegaChange} />
						</label>
					</div>
				</div>







				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div>
						<label>
							Familia:</label>
						<MyFamily onSelectChange={handleFamilyChange} />
					</div>
					<div>
						<label>
							SubFamilia:</label>
						<MySubFamily onSelectChange={(code, value) => setSelectedSubFamily( value)} />
						
						
						
						
					</div>
					<div>
						<label>
							Escala:</label>
						<MyEscala onSelectedItemChange={handleSelectedItemChange}
							onSelectedTallasChange={handleSelectedTallasChange} />
					</div>

					<div>
						<CountrySelector onCountryChange={handleCountryChange} />
					</div>

					<div>
						<label>
							Estilo:</label>
						<MyEstilo onSelectChange={handleEstiloChange} />
					</div>

					<MyModUltSAP
						selectedMarca={selectedMarca}
						selectedOrigin={selectedOrigin}
						selectedSubFamily={selectedSubFamily}
						onUltimoChange={handleUltimoChange}
					/>


				</div>

				<div style={{ display: 'flex', flexWrap: 'wrap' }}>

					<div>
						<label>
							Cant:
							<input type="text" value={onhand} onChange={(e) => setCantidad(e.target.value)} />
						</label>
					</div>
					<div>
						<label>
							Precio Uni:
							<input type="text" value={sa_preciouni} onChange={(e) => setPrecioUni(e.target.value)} />
						</label>
					</div>

					<div>
						<label>
							Precio:
							<input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
						</label>
					</div>
					<div>
						<label>
							Precio X Mayor:
							<input type="text" value={sa_ppmxmayor} onChange={(e) => setPpmxMayor(e.target.value)} />
						</label>
					</div>

				</div>

			</div>

			<br></br>
			<br></br>

			<MyTableData data={tableData} resetForm={resetForm} handleGetClick={handleGetClick} />
			<br></br>

			<MyTableMongo data={mongoData} />

		</>
	);
}

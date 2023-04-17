import{ useState} from 'react';
import { MultiSelect } from 'primereact/multiselect';

export function MultipleOpc() {

	const [selectedCities, setSelectedCities] = useState([]);
	
	const [options, setOptions] = useState([
		{ label: 'New York', value: 'NY' },
		{ label: 'Rome', value: 'RM' },
		{ label: 'London', value: 'LDN' },
		{ label: 'Istanbul', value: 'IST' },
		{ label: 'Paris', value: 'PRS' },
	]);

	return (
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
	);
}
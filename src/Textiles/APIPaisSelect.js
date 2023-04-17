import React, { Component } from "react";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";

import "/node_modules/flag-icon-css/css/flag-icons.min.css";



export function CountryFlag(props) {
	return (
		<span
			className={"flag-icon flag-icon-" + props.code}
			style={{ fontSize: props.size || "14px" }}
		/>
	);
}

export const CountryFlagSelectOption = props => {
	return (
		<components.Option {...props}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<CountryFlag size={props.flagSize} code={props.value.toLowerCase()} />
				{props.label}
			</div>
		</components.Option>
	);
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
	const code = (props.hasValue && props.getValue()[0].value) || false;

	return (
		<div style={{ display: "flex", flexGrow: 1 }}>
			{(code && <CountryFlag code={code.toLowerCase()} />) || null}
			<components.ValueContainer {...props}>
				{children}
			</components.ValueContainer>
		</div>
	);
};

const styles = {
	valueContainer: (base, state) => {
		const height = "25px";
		const width = "100px";
		return { ...base, height, width };
	}
};

export default class CountrySelector extends Component {
	constructor(props) {
		super(props);
		console.log(countryList().getData());
		this.state = {
			options: countryList().getData(),
			//value: null
			value: { value: "CN", label: "China" } // selecciona China por defecto
		};

		// obtener el nombre del país por defecto
		const defaultCountry = this.getCountryName(this.state.value.value);

		// pasar el nombre del país al componente padre en el estado inicial
		this.props.onCountryChange(defaultCountry);
	}

	getCountryName = code => {
		const country = this.state.options.find(option => option.value === code);
		return country ? country.label : "";
	};

	changeHandler = value => {
		const selectedCountry = this.state.options.find(option => option.value === value.value);

		this.setState({ value });
		//this.props.onCountryChange(value.value); // Llama a la función pasada como prop
		this.props.onCountryChange(selectedCountry.label); // Pasa el nombre del país seleccionado

	};



	render() {
		return (
			<Select
				styles={styles}
				options={this.state.options}
				value={this.state.value}
				onChange={this.changeHandler}
				components={{
					Option: CountryFlagSelectOption,
					ValueContainer: CountryFlagValueContainer
				}}
			/>
		);
	}
}

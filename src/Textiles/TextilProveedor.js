import React, { useState, useEffect } from "react";
import Select from "react-select";
import { countries } from "country-data-list";

export function MyProveedores({ dataProvedor, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const optionList = dataProvedor.map((item) => ({
    value: item.CardCode,
    label: item.CardName,
    country: item.Country,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const countryName = getCountryName(selectedOption.country);
    onSelectChange(selectedOption.value, selectedOption.label, countryName);
  };

  const getCountryName = (code) => {
    return countries[code]?.name || "";
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "0.5rem",
        }}
      >
        <span>Proveedor</span>
        <Select
          options={optionList}
          placeholder=""
          value={selectedOption}
          onChange={handleSelectChange}
          isSearchable={true}
          styles={{
            container: (provided) => ({
              ...provided,
              width: 150,
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: 12, // Tamaño de fuente deseado
            }),
            option: (provided) => ({
              ...provided,
              fontSize: 12, // Tamaño de fuente deseado
            }),
          }}
        />
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Select from "react-select";

export function MyEstilo({ dataEstilo, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const optionList = dataEstilo.map((item) => ({
    value: item.Code,
    label: item.Name,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption.value, selectedOption.label);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Estilo</span>
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
          control: (provided) => ({
            ...provided,
            height: 15, // Altura deseada
          }),
        }}
      />
    </div>
  );
}

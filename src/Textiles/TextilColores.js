import React, { useState, useEffect } from "react";
import Select from "react-select";

export function MyColors({ dataColores, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const optionList = dataColores.map((item) => ({
    value: item.U_ColCode,
    label: item.U_ColDesc,
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
      <span>Color</span>
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
  );
}

import React, { useState, useEffect } from "react";
import Select from "react-select";

export function MyOrigin({ dataOrigin, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const optionList = dataOrigin.map((item) => ({
    value: item.Code,
    label: item.Name,
    codeExxis: item.U_CG3_CODEX,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(
      selectedOption.value,
      selectedOption.label,
      selectedOption.codeExxis
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Procedencia</span>
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

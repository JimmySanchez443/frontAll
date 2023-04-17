import React, { useState, useEffect } from "react";
import Select from "react-select";

export function MyTipoBM({ dataTipoBM, onSelectChange }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Transformar los datos de "dataCodMarca" en un arreglo de objetos compatibles con react-select
  const optionList = dataTipoBM.map((item) => ({
    value: item.Code,
    label: item.Name,
  }));

  // Función para obtener el valor del campo "Code" de la opción seleccionada
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelectChange(selectedOption.value, selectedOption.label);
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
        <span>Tipo BM</span>
        <Select
          options={optionList}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder=""
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
    </>
  );
}

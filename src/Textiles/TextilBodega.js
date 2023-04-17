import React, { useState, useEffect } from "react";
import Select from "react-select";

export function MyBodega({ onBodegaChange }) {
  const opciones = [
    { value: "MGRALMTZ", label: "GENERAL MATRIZ" },
    { value: "MPICAMTZ", label: "PICAL MATRIZ" },
    { value: "MPVLBMTZ", label: "PRIVATE LABEL MATRIZ" },
    { value: "MFUFIMTZ", label: "FUNKY FISH MATRIZ" },
  ];

  const [bodega, setBodega] = useState(null);

  function handleBodegaChange(selectedOption) {
    setBodega(selectedOption);
    onBodegaChange(selectedOption.value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Bodega</span>
      <Select
        value={bodega}
        options={opciones}
        placeholder=""
        onChange={handleBodegaChange}
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
          /*control: (provided) => ({
                            ...provided,
                            height: 15, // Altura deseada
                        }),*/
        }}
      />
    </div>
  );
}

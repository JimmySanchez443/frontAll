import React, { useState, useEffect } from "react";

import Select from "react-select";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

export function MyDescuento(props) {
  const opciones = [
    { value: "Y", label: "SI" },
    { value: "N", label: "NO" },
  ];

  const [descuento, setDescuento] = useState("Y");

  function handleDescuentoChange(selectedOption) {
    setDescuento(selectedOption);
    props.onDescuentoChange(selectedOption.value); // Llamada a la función de devolución de llamada
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Descuento</span>
      <Select
        value={descuento}
        options={opciones}
        placeholder="SI"
        onChange={handleDescuentoChange}
        isSearchable={true}
        styles={{
          container: (provided) => ({
            ...provided,
            width: 80,
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

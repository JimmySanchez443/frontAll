import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MultiSelect } from "primereact/multiselect";
import { Authenticate, Logout } from "./TextilAuth";
import axios from "axios";

export function MyEscala({
  dataEscala,
  dataTallas,
  onSelectedItemChange,
  onSelectedTallasChange,
}) {
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedTallas, setSelectedTallas] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const optionList = dataEscala.map((item) => ({
    value: item.Code,
    label: item.U_SclDesc,
    codeEsc: item.U_SclCode,
  }));

  const tallas = dataTallas.map(({ code, sizeCode, sizeDesc }) => ({
    code,
    sizeCode,
    sizeDesc,
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    dataEscala.find((item) => item.U_SclDesc === selectedOption.value);
    setSelectedItemCode(selectedOption.value);
    setSelectedTallas([]);
    onSelectedItemChange(selectedOption.codeEsc);
  };

  const handleChange = (e) => {
    setSelectedTallas(e.value);
    onSelectedTallasChange(e.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "0.5rem",
        }}
      >
        <span>Escala</span>
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

        <span>Tallas:</span>
        <MultiSelect
          value={selectedTallas}
          options={tallas.filter((talla) => talla.code === selectedItemCode)}
          placeholder=""
          onChange={handleChange}
          optionLabel="sizeCode"
          optionValue="sizeCode"
          display="chip"
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

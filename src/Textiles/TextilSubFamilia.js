import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Authenticate, Logout } from "./TextilAuth";
import axios from "axios";

export function MySubFamily({
  dataSflia,
  setCodeCuerpo,
  setNameCuerpo,
  onSelectedCuerpoChange,
  onSelectChange,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cuerpoOptions, setCuerpoOptions] = useState([]);
  const [selectedCuerpoOption, setSelectedCuerpoOption] = useState(null);

  // Transformar los datos de "dataCodMarca" en un arreglo de objetos compatibles con react-select
  const optionList = dataSflia.map((item) => ({
    value: item.Code,
    label: item.Name,
    cuerpo: item.U_Cuerpo,
  }));

  // Función para obtener el valor del campo "Code" de la opción seleccionada
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedCuerpoOption(null); // Limpiar la opción seleccionada en el segundo Select
    setCuerpoOptions([]); // Limpiar las opciones del segundo Select
    console.log(selectedOption.value, selectedOption.cuerpo);
    onSelectChange(selectedOption.value, selectedOption.label);
    setCuerpoOptions([]);
  };

  // Hacer la petición GET al servidor al seleccionar una opción del Select
  useEffect(() => {
    async function fetchSubFamilyData() {
      if (selectedOption && selectedOption.cuerpo) {
        const authToken = await Authenticate();

        if (authToken === 200) {
          const url = `https://192.168.246.228:50000/b1s/v1/U_CG3_COD_CUERPO?$select=Code,Name&$filter=U_Cuerpo eq '${selectedOption.cuerpo}' &$orderby= Name`;
          try {
            const response = await axios.get(url, { withCredentials: true });

            const options = response.data.value.map((item) => ({
              value: item.Code,
              label: item.Name,
            }));
            setCuerpoOptions(options);
          } catch (error) {
            console.error(error.message);
          } finally {
            await Logout();
          }
        }
      }
    }
    fetchSubFamilyData();
  }, [selectedOption]);

  const handleSecondSelectChange = (selectedOption) => {
    setSelectedCuerpoOption(selectedOption);
    onSelectedCuerpoChange({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };

  useEffect(() => {
    setCodeCuerpo("");
    setNameCuerpo("");
  }, [selectedOption]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "0.5rem",
        }}
      >
        <span>SubFamilia</span>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "0.5rem",
        }}
      >
        <span>Cuerpo</span>
        <Select
          options={cuerpoOptions}
          placeholder=""
          onChange={handleSecondSelectChange}
          value={selectedCuerpoOption}
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

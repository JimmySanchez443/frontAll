import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useLocalState } from "../utli/useLocalStorage";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

async function unicosAnexos(user, tipoAnexo) {
  return (
    fetch(
      `/api2/api/v1/anexos/sa_anexo?username=${user}&sa_codetipoanexo=${tipoAnexo}`
    )
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .catch((error) => console.error(error))
  );
}

async function detalleAnexos(user, tipoAnexo, saAnexo) {
  return (
    fetch(
      `/api2/api/v1/anexos/lpu?username=${user}&sa_codetipoanexo=${tipoAnexo}&sa_anexo=${saAnexo}`
    )
      .then((response) => response.json())
      //.then((data) => console.log(data))
      .catch((error) => console.error(error))
  );
}

export function MyListAnexo() {
  const opciones = [
    { value: "01", label: "TEXTIL" },
    { value: "02", label: "ACCESORIOS" },
    { value: "03", label: "OTROS" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useLocalState("", "user");
  const [anexos, setAnexos] = useState([]);
  const [rowData, setRowData] = useState([]);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    setAnexos([]); // Resetear el estado de anexos
    console.log(`Option selected: ${selectedOption.value} ${user}`);
    const response = await unicosAnexos(user, selectedOption.value);
    const options = response
      .map((anexo) => ({
        value: anexo,
        label: anexo,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Ordenar las opciones alfabéticamente
    console.log(options);
    setAnexos(options);
  };

  const handleSelectAnexo = async (selectedAnexo) => {
    console.log(
      `User: ${user}, Tipo Anexo: ${selectedOption.value}, Anexo seleccionado: ${selectedAnexo.label}`
    );
    const response = await detalleAnexos(
      user,
      selectedOption.value,
      selectedAnexo.label
    );
    console.log(response);

    // Actualizar el estado rowData con la respuesta obtenida
    setRowData(response);
    console.log(rowData);
  };

  return (
    <>
      <Select
        options={opciones}
        value={selectedOption}
        onChange={handleChange}
      />

      <Select
        key={selectedOption ? selectedOption.value : "default"}
        options={anexos}
        onChange={handleSelectAnexo}
      />
      <div>
        <AgGridReact rowData={rowData} />
      </div>
    </>
  );
}

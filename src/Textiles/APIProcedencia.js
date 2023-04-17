import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EstiloEscala.css";
import Select from "react-select";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyOrigin(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let isAuthenticated = false;
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            const itemsResponse = await axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_PROC?$filter= U_CG3_CODEX ne null &$orderby=Name asc",
              { withCredentials: true }
            );
            //console.log('Pro exxis.',itemsResponse.data.value);
            setItems(itemsResponse.data.value);
            isAuthenticated = true;
          }
          console.log("proc login");
        }
      } catch (error) {
        console.log("Proced", error);
      } finally {
        if (isAuthenticated) {
          await Logout();
          console.log("proc logout");
        }
      }
    }

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedItem = items.find(
      (item) => item.Name === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    console.log("Procede", selectedOption.value);
    props.onSelectChange(
      selectedItem?.Code,
      selectedOption.value,
      selectedOption.label,
      selectedOption.codeExxis
    );
  };

  const optionList = items.map((item) => ({
    value: item.Code,
    label: item.Name,
    codeExxis: item.U_CG3_CODEX,
  }));

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

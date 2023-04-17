import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

const API_URL = "https://192.168.246.228:50000/b1s/v1";
const VALUE_PARAM_NAME = "Name";

export function MyTipoModelo(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: check if already authenticated
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            // Step 4: get the items and tallas
            const itemsResponse = await axios.get(
              `${API_URL}/U_CG3_TIPO_MOD?$orderby=${VALUE_PARAM_NAME} asc`,
              { withCredentials: true }
            );
            setItems(itemsResponse.data.value);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        // show error notification to user
      } finally {
        if (isAuthenticated) {
          await Logout();
        }
      }
    }

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedItem = items.find(
      (item) => item[VALUE_PARAM_NAME] === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    console.log(selectedOption.value);
    props.onSelectChange(
      selectedItem?.Code,
      selectedOption.value,
      selectedOption.label
    );
  };

  const optionList = items.map((item) => ({
    value: item.Code,
    label: item[VALUE_PARAM_NAME],
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>TipoModelo</span>
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

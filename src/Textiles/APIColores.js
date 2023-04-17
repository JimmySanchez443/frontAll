import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EstiloEscala.css";

import Select from "react-select";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyColors(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: check if already authenticated
        const authToken = await Authenticate();

        if (authToken === 200) {
          // Step 4: get the items and tallas
          const itemsResponse = await axios.get(
            "https://192.168.246.228:50000/b1s/v1/ARGNS_COLOR?$select=Code,U_ColCode,U_ColDesc&$orderby=U_ColDesc asc",
            { withCredentials: true }
          );
          setItems(itemsResponse.data.value);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("colores", error);
      } finally {
        // Step 5: close the connection if authenticated
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
      (item) => item.U_ColDesc === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    props.onSelectChange(
      selectedItem?.U_ColCode,
      selectedOption.value,
      selectedOption.label
    );
  };

  const optionList = items.map((item) => ({
    value: item.U_ColCode,
    label: item.U_ColDesc,
  }));

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

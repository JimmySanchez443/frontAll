import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyEstilo(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: check if already authenticated
        const authToken = await Authenticate();

        if (authToken === 200) {
          // Step 4: get the items and tallas
          const ESTILO_URL =
            "https://192.168.246.228:50000/b1s/v1/U_CG3_ESTILO?$orderby=Name asc";
          const itemsResponse = await axios.get(ESTILO_URL, {
            withCredentials: true,
          });
          setItems(itemsResponse.data.value);
          console.log("Estilo request completed successfully.");
        }
      } catch (error) {
        console.log("Error fetching Estilo items:", error);
      } finally {
        // Step 5: close the connection if authenticated
        await Logout();
        setIsLoading(false);
        console.log("Estilo logout");
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
    console.log(selectedOption.value);
    props.onSelectChange(
      selectedItem?.Code,
      selectedOption.value,
      selectedOption.label
    );
  };

  const optionList = items.map((item) => ({
    value: item.Code,
    label: item.Name,
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Estilo</span>
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

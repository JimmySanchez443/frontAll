import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyTipoBM(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: check if already authenticated
        if (!authenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            // Step 4: get the items and tallas
            const itemsResponse = await axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_TIPO_B_M?$orderby=Name asc",
              { withCredentials: true }
            );
            setItems(itemsResponse.data.value);
            setAuthenticated(true);
          }
          console.log("tipoBM login");
        }
      } catch (error) {
        console.log("tipoBM", error);
      } finally {
        // Step 5: close the connection if authenticated
        if (authenticated) {
          await Logout();
          console.log("tipoBM logout");
        }
      }
    }

    fetchData();
  }, [authenticated]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedItem = items.find(
      (item) => item.U_ColDesc === selectedOption.value
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
      <span>Tipo BM</span>
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

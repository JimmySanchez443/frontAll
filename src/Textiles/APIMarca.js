import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EstiloEscala.css";
import Select from "react-select";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyMarca(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let isAuthenticated = false; //agrega una variable para verificar si se autenticó correctamente
      try {
        // Step 1: check if already authenticated
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            // Step 4: get the items and tallas
            const itemsResponse = await axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_MARCA?$orderby=Name asc",
              { withCredentials: true }
            );
            //const itemsData = itemsResponse.data;
            //setItems(itemsData);
            setItems(itemsResponse.data.value);
            isAuthenticated = true;
          }
          console.log("Marca login");
        }
      } catch (error) {
        console.log("Marca", error);
      } finally {
        // Step 5: close the connection if authenticated
        if (isAuthenticated) {
          //await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
          await Logout();
          console.log("Marca logout");
        }
      }
    }

    fetchData();
  }, []);

  /*const handleSelectChange = (event) => {
		const selectedItem = items.value.find(item => item.Name === event.target.value);
		setSelectedItemCode(selectedItem?.Code || '');
		props.onSelectChange(selectedItem?.Code, event.value);
	};*/

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedItem = items.find(
      (item) => item.Name === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    console.log("marca", selectedOption.value);
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
      <span>Marca</span>
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

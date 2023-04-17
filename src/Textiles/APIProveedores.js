import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { countries } from "country-data-list";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MyProveedores(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");

  const optionList = items.map((item) => ({
    value: item.CardCode,
    label: item.CardName,
    country: item.Country,
  }));

  const [selectedOption, setSelectedOption] = useState(optionList[0]);

  //const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let isAuthenticated = false;
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            const itemsResponse = await axios.get(
              `https://192.168.246.228:50000/b1s/v1/BusinessPartners?$select=` +
                `CardCode,CardName,Country &$filter=CardType eq 'S' ` +
                `and U_CG3_TIPO_PROV eq '01' or U_CG3_TIPO_PROV eq '02' or ` +
                `U_CG3_TIPO_PROV eq '03' or U_CG3_TIPO_PROV eq '04' or ` +
                `U_CG3_TIPO_PROV eq '05' &$orderby=CardName asc`,
              { withCredentials: true }
            );

            setItems(itemsResponse.data.value);
            isAuthenticated = true;
          }
          console.log("proveedor login");
        }
      } catch (error) {
        console.log("proveedor", error);
      } finally {
        if (isAuthenticated) {
          await Logout();
          console.log("proveedor logout");
        }
      }
    }

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedItem = items.find(
      (item) => item.CardName === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.CardCode || "");
    const countryName = getCountryName(selectedOption.country);
    props.onSelectChange(
      selectedItem?.CardCode,
      selectedOption.value,
      selectedOption.label,
      countryName
    );
  };

  const getCountryName = (code) => {
    return countries[code]?.name || "";
  };

  return (
    <div
      style={{ flexDirection: "column", alignItems: "center", marginRight: "0.5rem" }}
    >
      <span>Proveedor</span>
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

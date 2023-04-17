import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EstiloEscala.css";
import Select from "react-select";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

export function MySubFamily(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let isAuthenticated = false;
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            const itemsResponse = await axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_SFLIA?$orderby=Name asc",
              { withCredentials: true }
            );
            setItems(itemsResponse.data.value);
            isAuthenticated = true;
          }
          console.log("subfamily login");
        }
      } catch (error) {
        console.log("subFamily", error);
      } finally {
        if (isAuthenticated) {
          await Logout();
          console.log("subfamily logout");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSecondSelectData() {
      if (selectedOption && selectedOption.cuerpo) {
        let isAuthenticated = false;
        try {
          if (!isAuthenticated) {
            const authToken = await Authenticate();

            if (authToken === 200) {
              const response = await axios.get(
                `https://192.168.246.228:50000/b1s/v1/U_CG3_COD_CUERPO?$select=Code,Name&$filter=U_Cuerpo eq '${selectedOption.cuerpo}' &$orderby= Name`,
                { withCredentials: true }
              );
              const options = response.data.value.map((item) => ({
                value: item.Code,
                label: item.Name,
              }));
              setSecondSelectOptions(options);
              isAuthenticated = true;
            }
            console.log("cuerpo login");
          }
        } catch (error) {
          console.log("cuerpo second select error", error);
        } finally {
          if (isAuthenticated) {
            await Logout();
            console.log("cuerpo logout");
          }
        }
      }
    }

    fetchSecondSelectData();
  }, [selectedOption]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedSecondOption(null); // Limpiar la opción seleccionada en el segundo Select
    const selectedItem = items.find(
      (item) => item.Name === selectedOption.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    console.log(
      "subfami",
      selectedOption.value,
      selectedOption.label,
      selectedOption.cuerpo
    );
    props.onSelectChange(
      selectedItem?.Code,
      selectedOption.value,
      selectedOption.label
    );
    setSecondSelectOptions([]);
  };

  const optionList = items.map((item) => ({
    value: item.Code,
    label: item.Name,
    cuerpo: item.U_Cuerpo,
  }));

  const handleSecondSelectChange = (selectedOption) => {
    setSelectedSecondOption(selectedOption);
    props.onSelectedCuerpoChange({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };

  useEffect(() => {
    props.setCodeCuerpo("");
    props.setNameCuerpo("");
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "0.5rem",
        }}
      >
        <span>Cuerpo</span>
        <Select
          options={secondSelectOptions}
          placeholder=""
          onChange={handleSecondSelectChange}
          value={selectedSecondOption}
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

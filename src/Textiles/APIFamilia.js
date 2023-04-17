import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

const api = axios.create({
  baseURL: "https://192.168.246.228:50000/b1s/v1/",
  withCredentials: true,
});

async function getFamilies() {
  const response = await api.get("U_CG3_FAMILIA", {
    params: {
      $orderby: "Name asc",
    },
  });
  return response.data.value;
}

export function MyFamily(props) {
  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const authToken = await Authenticate();
        if (authToken) {
          const itemsData = await getFamilies();
          if (isMounted) {
            setItems(itemsData);
          }
        }
      } catch (error) {
        console.log("Family", error);
      } finally {
        await Logout();
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectChange = useCallback(
    (selectedOption) => {
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
    },
    [items, props.onSelectChange]
  );

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
      <span>Familia</span>
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

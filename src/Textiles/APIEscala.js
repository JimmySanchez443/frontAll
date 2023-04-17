import React, { useState, useEffect } from "react";
import axios from "axios";
import { Authenticate, Logout } from "./APIAuth";
import Select from "react-select";
import { MultiSelect } from "primereact/multiselect";

export function MyEscala(props) {
  const [items, setItems] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");

  const [initialTallas, setInitialTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let isAuthenticated = false;
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            const itemsResponse = await axios.get(
              "https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc",
              { withCredentials: true }
            );
            setItems(itemsResponse.data.value);
            isAuthenticated = true;
          }
          console.log("Escala login");
        }
      } catch (error) {
        console.log("Escala", error);
      } finally {
        if (isAuthenticated) {
          await Logout();
          console.log("escala logout");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTallas() {
      let isAuthenticated = false;
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            const response = await axios.get(
              `https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection`,
              { withCredentials: true }
            );
            const data = response.data;
            const tallas = data.value.reduce((acc, obj) => {
              return [
                ...acc,
                ...obj.ARGNS_SIZECollection.map((size) => ({
                  code: size.Code,
                  sizeCode: size.U_SizeCode,
                  sizeDesc: size.U_SizeDesc,
                })),
              ];
            }, []);
            setTallas(tallas);
            setInitialTallas(tallas);

            isAuthenticated = true;
          }
          console.log("tallas login");
        }
      } catch (error) {
        console.log("tallas", error);
      } finally {
        if (isAuthenticated) {
          await Logout();
          console.log("tallas logout");
        }
      }
    }

    fetchTallas();
  }, []);

  useEffect(() => {
    setSelectedTallas([]);
  }, [selectedItemCode]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    items.find((item) => item.U_SclDesc === selectedOption.value);
    setSelectedItemCode(selectedOption.value);
    console.log("EscalaCode", selectedOption.value);
    setSelectedTallas([]);
    props.onSelectedItemChange(selectedOption.codeEsc);
    console.log("pasando codeescala", selectedOption.codeEsc);
  };

  const optionList = items.map((item) => ({
    value: item.Code,
    label: item.U_SclDesc,
    codeEsc: item.U_SclCode,
  }));

  const handleChange = (e) => {
    setSelectedTallas(e.value);
    props.onSelectedTallasChange(e.value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "0.5rem",
      }}
    >
      <span>Escala</span>
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
      <span>Tallas:</span>
      <MultiSelect
        value={selectedTallas}
        options={tallas.filter((talla) => talla.code === selectedItemCode)}
        placeholder=""
        onChange={handleChange}
        optionLabel="sizeCode"
        optionValue="sizeCode"
        display="chip"
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

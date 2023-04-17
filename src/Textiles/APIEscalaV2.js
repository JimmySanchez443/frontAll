import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Authenticate, Logout } from "./APIAuth";
import { MultiSelect } from "primereact/multiselect";
//import './EstiloMultiselect.css'

export function MyEscala(props) {
  const [items, setItems] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const [initialTallas, setInitialTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState([]);

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
              "https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc",
              { withCredentials: true }
            );
            const itemsData = itemsResponse.data;
            setItems(itemsData);
            isAuthenticated = true;
          }
          console.log("Escala login");
        }
      } catch (error) {
        console.log("Escala", error);
      } finally {
        // Step 5: close the connection if authenticated
        if (isAuthenticated) {
          //await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
          await Logout();
          console.log("escala logout");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTallas() {
      let isAuthenticated = false; //agrega una variable para verificar si se autenticó correctamente
      try {
        // Step 1: check if already authenticated
        if (!isAuthenticated) {
          const authToken = await Authenticate();

          if (authToken === 200) {
            // Step 4: get the items and tallas
            const response = await axios.get(
              `https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection`,
              { withCredentials: true }
            );
            //const data = response.data.value[0].ARGNS_SIZECollection;
            const data = response.data;
            // Iterar a través de cada objeto en la matriz "value"
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
            setInitialTallas(tallas); // Agregar esta línea

            isAuthenticated = true;
          }
          console.log("tallas login");
        }
      } catch (error) {
        console.log("tallas", error);
      } finally {
        // Step 5: close the connection if authenticated
        if (isAuthenticated) {
          //await axios.post('https://192.168.246.228:50000/b1s/v1/Logout', null, { withCredentials: true });
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

  const handleSelectChange = (event) => {
    const selectedItem = items.value.find(
      (item) => item.U_SclDesc === event.target.value
    );
    setSelectedItemCode(selectedItem?.Code || "");
    console.log(selectedItem?.Code || "");
    setSelectedTallas([]);
    props.onSelectedItemChange(selectedItem?.U_SclCode || "");
  };

  const handleChange = (e) => {
    setSelectedTallas(e.value);
    props.onSelectedTallasChange(e.value);
  };

  return (
    <div >
     
        Escala:
        <select className="select-fixed-height" onChange={handleSelectChange}>
          <option value="">Seleccione</option>
          {items.value?.map((item) => (
            <option key={item.Code}>{item.U_SclDesc}</option>
          ))}
        </select>
      
     
        Tallas:
        <MultiSelect
          value={selectedTallas}
          options={tallas.filter((talla) => talla.code === selectedItemCode)}
          placeholder="TALLAS"
          onChange={handleChange}
          optionLabel="sizeCode"
          optionValue="sizeCode"
          display="chip"
        />
    </div>
  );
}

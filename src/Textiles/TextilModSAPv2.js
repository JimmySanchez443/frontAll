import React, { useState, useEffect } from "react";
import axios from "axios";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./APIAuth";

/*async function grupoArticulo(selectedMarca, selectedOrigin) {
  try {
    if (selectedMarca && selectedOrigin) {
      const authToken = await Authenticate();

      if (authToken === 200) {
        const {
          data: { value: items },
        } = await axios.get(
          `https://192.168.246.228:50000/b1s/v1/ItemGroups?$select=Number, GroupName, U_CG3_CODGRP &$filter=U_CG3_CODGRP eq '${selectedMarca}${selectedOrigin}'`,
          { withCredentials: true }
        );
        

        if (items.length > 0) {
          console.log("DATA GRUPO", items[0].U_CG3_CODGRP);
          return items[0];
        }
      }
    }
    return ["", ""];
  } catch (error) {
    throw error; // Manejo de excepciones para propagar errores hacia arriba en la pila de llamadas
  } finally {
    await Logout();
    console.log("GrupoSAP logout");
  }
}*/

function grupoArt(dataGruporticulo, selectedMarca, selectedOrigin) {
  const optionList = dataGruporticulo.map((item) => ({
    value: item.Number,
    label: item.GroupName,
    grupo: item.U_CG3_CODGRP,
  }));
  if (selectedMarca && selectedOrigin) {
    const grupo = `${selectedMarca}${selectedOrigin}`;
    const objetoEncontrado = optionList.find(
      (objeto) => objeto.grupo === grupo
    );

    if (objetoEncontrado) {
      return { value: objetoEncontrado.value, label: objetoEncontrado.label };
    } else {
      console.log(`No se encontró un objeto con grupo igual a "${grupo}"`);
      return null;
    }
  } else {
    return null;
  }
}

async function modMongo(selectedMarca, selectedOrigin, selectedSubFamily) {
  try {
    if (selectedMarca && selectedOrigin && selectedSubFamily) {
      const {
        data: { uargnsmod: modeloMongo },
      } = await axios.get(
        `/api2/api/v1/anexos/mayor/${selectedMarca}${selectedOrigin}${selectedSubFamily}.`
      );

      return modeloMongo;
    } else {
      return "0";
    }
  } catch (error) {
    console.log("UltModMONGO", "NO EXITE REGISTROS");
    return "0";

    //throw error; // Manejo de excepciones para propagar errores hacia arriba en la pila de llamadas;
  }
}

async function modSAP(selectedMarca, selectedOrigin, selectedSubFamily) {
  try {
    if (selectedMarca && selectedOrigin && selectedSubFamily) {
      const authToken = await Authenticate();

      if (authToken === 200) {
        const {
          data: { value },
        } = await axios.get(
          `https://192.168.246.228:50000/b1s/v1/Items?$select=ItemCode&$filter=startswith(ItemCode, '${selectedMarca}${selectedOrigin}${selectedSubFamily}.') &$top=1&$orderby=ItemCode desc`,
          { withCredentials: true }
        );

        if (value.length !== 0) {
          const modeloSAP = value[0].ItemCode.substring(0, 10);
          return modeloSAP;
        } else {
          return "0"; // Retorno nulo en lugar de "0" cuando no hay resultados
        }
      }
    } else {
      return "0";
    }
  } catch (error) {
    console.log("UltModSAP", error);
    throw error; // Manejo de excepciones para propagar errores hacia arriba en la pila de llamadas
  } finally {
    await Logout();
    console.log("UltModSAP logout");
  }
}

export function MyModUltSAP(
  dataGruporticulo,
  selectedMarca,
  selectedOrigin,
  selectedSubFamily,
  onUltimoChange,
  setGrupoSAP
) {
  const [ultimo, setUltimo] = useState("");

  useEffect(() => {
    const result = grupoArt(dataGruporticulo, selectedMarca, selectedOrigin);
    if (result !== null) {
      const value = result.value;
      const label = result.label;
      console.log(value, label);
      setGrupoSAP(value, label);
    } else {
      console.log("No se encontró un objeto con el grupo indicado");
      setGrupoSAP("", "");
    }
  }, [selectedMarca, selectedOrigin, dataGruporticulo]);

  useEffect(() => {
    async function fetchData() {
      //const { selectedMarca, selectedOrigin, selectedSubFamily } = props;

      console.log(
        "Datoscodi",
        selectedMarca,
        selectedOrigin,
        selectedSubFamily
      );

      try {
        const [modUltiSAP, modUltMongo, result] = await Promise.all([
          modSAP(selectedMarca, selectedOrigin, selectedSubFamily),
          modMongo(selectedMarca, selectedOrigin, selectedSubFamily),
        ]);

        console.log("ult 5 SAP", modUltiSAP);
        console.log("ult 5 Mongo", modUltMongo);

        //props.setGrupoSAP(resultado.Number, resultado.GroupName);
        //console.log("DESDE APIModSAP", resultado.Number, resultado.GroupName);

        // Convertir las cadenas en números
        const numSAP = parseInt(
          modUltiSAP.replace(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.`,
            ""
          )
        );
        const numMongo = parseInt(
          modUltMongo.replace(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.`,
            ""
          )
        );

        let modMayor = 0;

        if (numSAP >= numMongo) {
          console.log("mayor es Num Mod SAP", numSAP);
          modMayor = numSAP;
        } else {
          console.log("mayor es  Num Mod Mongo", numMongo);
          modMayor = numMongo;
        }

        const numSAPtxt = `0000${(modMayor + 1).toString()}`;
        console.log("numSAPtxt", numSAPtxt);
        const ultimosCinco = numSAPtxt.slice(-5);
        console.log("ultimosCinco", ultimosCinco);

        if (ultimosCinco !== "00001") {
          setUltimo(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.${ultimosCinco}`
          );
          onUltimoChange(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.${ultimosCinco}`
          );
          console.log("SI ENCONTRO");
        } else {
          console.log("NO ENCONTRO");
          setUltimo("");
          onUltimoChange("");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [selectedMarca, selectedOrigin, selectedSubFamily]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Modelo</span>
      <input
        type="text"
        value={ultimo}
        placeholder=""
        onChange={(e) => setUltimo(e.target.value)}
        readOnly={true}
        style={{ width: "100px" }}
      />
    </div>
  );
}

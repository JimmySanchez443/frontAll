import React, { useState, useEffect } from "react";
import axios from "axios";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

import { Authenticate, Logout } from "./TextilAuth";

async function grupoArticulo(selectedMarca, selectedOrigin) {
  try {
    if (!selectedMarca || !selectedOrigin) {
      return ["", ""];
    }

    const authToken = await Authenticate();
    console.log("Login GrupoSAP", authToken);
    if (authToken !== 200) {
      return ["", ""];
    }

    const { data } = await axios.get(
      `https://192.168.246.228:50000/b1s/v1/ItemGroups`,
      {
        params: {
          $select: "Number, GroupName, U_CG3_CODGRP",
          $filter: `U_CG3_CODGRP eq '${selectedMarca}${selectedOrigin}'`,
        },
        withCredentials: true,
      }
    );
    const { value: items } = data;

    if (items.length === 0) {
      return ["", ""];
    }

    const [firstItem] = items;
    return firstItem;
  } catch (error) {
    throw new Error("Error obteniendo datos del grupo de artículo");
  } finally {
    await Logout();
    console.log("Logout GrupoSAP");
  }
}

async function modMongo(selectedMarca, selectedOrigin, selectedSubFamily) {
  try {
    if (!selectedMarca || !selectedOrigin || !selectedSubFamily) {
      return "0";
    }

    const {
      data: { uargnsmod },
    } = await axios.get(
      `/api2/api/v1/anexos/mayor/${selectedMarca}${selectedOrigin}${selectedSubFamily}.`
    );

    return uargnsmod;
  } catch (error) {
    //console.error("Error fetching data from Mongo:", error);
    console.log("No hay registros en Mongo");
    return "0";
  }
}

async function modSAP(selectedMarca, selectedOrigin, selectedSubFamily) {
  try {
    if (!selectedMarca || !selectedOrigin || !selectedSubFamily) {
      return "0";
    }

    const authToken = await Authenticate();
    console.log(authToken);

    if (authToken !== 200) {
      return "0";
    }

    const url = `https://192.168.246.228:50000/b1s/v1/Items?$select=ItemCode&$filter=startswith(ItemCode, '${selectedMarca}${selectedOrigin}${selectedSubFamily}.') &$top=1&$orderby=ItemCode desc`;

    const {
      data: { value: items },
    } = await axios.get(url, { withCredentials: true });

    if (items.length === 0) {
      return "0";
    }

    const modeloSAP = items[0].ItemCode.substring(0, 10);
    return modeloSAP;
  } catch (error) {
    console.log("ERROR modelo SAP", error);
    return "0";
  } finally {
    await Logout();
    console.log("Logout ModSAP");
  }
}

export function MyModUltSAP(props) {
  const [ultimo, setUltimo] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { selectedMarca, selectedOrigin, selectedSubFamily } = props;

      try {
        const [modUltiSAP, modUltMongo, resultado] = await Promise.all([
          modSAP(selectedMarca, selectedOrigin, selectedSubFamily),
          modMongo(selectedMarca, selectedOrigin, selectedSubFamily),
          grupoArticulo(selectedMarca, selectedOrigin),
        ]);

        props.setGrupoSAP(resultado.Number, resultado.GroupName);

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
          console.log("Mayor NumMod SAP", numSAP);
          modMayor = numSAP;
        } else {
          console.log("Mayor NumMod Mongo", numMongo);
          modMayor = numMongo;
        }

        const numSAPtxt = `0000${(modMayor + 1).toString()}`;
        const ultimosCinco = numSAPtxt.slice(-5);

        if (ultimosCinco !== "00001") {
          setUltimo(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.${ultimosCinco}`
          );
          props.onUltimoChange(
            `${selectedMarca}${selectedOrigin}${selectedSubFamily}.${ultimosCinco}`
          );
        } else {
          console.log("NO ENCONTRO");
          setUltimo("");
          props.onUltimoChange("");
        }
      } catch (error) {
        //console.log(error);

        console.log("ERROR modSAP");
      }
    }
    fetchData();
  }, [props.selectedMarca, props.selectedOrigin, props.selectedSubFamily]);

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

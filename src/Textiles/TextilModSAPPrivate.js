import React, { useState, useEffect } from "react";
import axios from "axios";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

//import { NumMod } from "./TextilNumMod";

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

export function MyModUltSAPPri({
  dataGruporticulo,
  selectedMarca,
  selectedOrigin,
  selectedSubFamily,
  onConcatenadoChange,
  setGrupoSAP,
  numeroMod,
}) {
  const numero = numeroMod;

  //Concatenar en modelo
  const [concatenado, setConcatenado] = useState("");

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
    const numSAPtxt = `00000${numero.toString()}`;
    const numMod = numSAPtxt.slice(-5);
    const nuevoConcatenado = `${selectedMarca}${selectedOrigin}${selectedSubFamily}.${numMod}`;

    setConcatenado(nuevoConcatenado);
    onConcatenadoChange(nuevoConcatenado);
  }, [
    selectedMarca,
    selectedOrigin,
    selectedSubFamily,
    numero,
    onConcatenadoChange,
    setGrupoSAP,
  ]);

  /*function verificarModelo() {
    console.log('Boton Verificar',concatenado);
    
  }*/

  return (
    <>
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
          value={concatenado}
          style={{ width: "150px", height: "35px" }}
          readOnly={true}
        />
      </div>
    </>
  );
}

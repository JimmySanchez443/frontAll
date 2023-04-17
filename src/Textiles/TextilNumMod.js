import React, { useState, useEffect } from "react";

export function NumMod({ onNumeroChange}) {
  const [numero, setNumero] = useState("");

  function handleNumeroChange(value) {
    setNumero(value);
    onNumeroChange(value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginRight: "0.5rem",
      }}
    >
      <span>Num</span>
      <input
        type="text"
        placeholder=""
        value={numero}
        onChange={(e) => {
          const regex = /^[0-9\b]+$/; // Expresión regular para solo permitir números enteros
          if (regex.test(e.target.value) || e.target.value === "") {
            handleNumeroChange(e.target.value);
          }
        }}
        style={{ width: "60px", height: "35px" }}
        maxLength="5"
        required
      />
    </div>
  );
}

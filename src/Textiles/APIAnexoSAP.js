import React from "react";

export function BotonSAP({ data }) {
  const datosFiltrados = data.map(({ Anexo, ItemCode, ItemName }) => ({
    Anexo,
    ItemCode,
    ItemName,
  }));

  console.log(datosFiltrados);

  return (
    <div>
      {datosFiltrados.map(({ Anexo, ItemCode, ItemName }) => (
        <div key={ItemCode}>
          <p>Anexo: {Anexo}</p>
          <p>ItemCode: {ItemCode}</p>
          <p>ItemName: {ItemName}</p>
        </div>
      ))}
    </div>
  );
}

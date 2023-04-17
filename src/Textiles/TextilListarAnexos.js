import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useLocalState } from "../utli/useLocalStorage";

import ExcelJS from "exceljs";
import FileSaver from "file-saver";


const opcionesTipoAnexo = [
  { value: "01", label: "TEXTIL PI-MH-JH" },
  { value: "02", label: "TEXTIL PRI" },
  { value: "03", label: "ACCESORIOS" },
  { value: "04", label: "OTROS" },
];

async function unicosAnexos(user, tipoAnexo) {
  if (!user || !tipoAnexo) {
    return {}; // o return ''
  }
  return fetch(
    `/api2/api/v1/anexos/sa_anexo?username=${user}&sa_codetipoanexo=${tipoAnexo}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

async function detalleAnexos(user, tipoAnexo, saAnexo) {
  if (!user || !tipoAnexo || !saAnexo) {
    return {}; // o return ''
  }

  return fetch(
    `/api2/api/v1/anexos/lpu?username=${user}&sa_codetipoanexo=${tipoAnexo}&sa_anexo=${saAnexo}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const MyListAnexo = () => {
  const [gridOptions, setGridOptions] = useState({
    defaultColDef: {
      //resizable: true,
    },
    columnDefs: [
      { headerName: "Id", field: "id", resizable: true, hide: true },
      { headerName: "Anexo", field: "sa_anexo", resizable: true },
      { headerName: "PO", field: "sa_po", resizable: true },
      { headerName: "Modelo", field: "uargnsmod", resizable: true },

      { headerName: "CodeBars", field: "barcode", resizable: true },

      { headerName: "ItemCode", field: "itemcode", resizable: true },
      { headerName: "ItemName", field: "itemname", resizable: true },


      { headerName: "REF. PROV.", field: "suppliercatalogno", resizable: true },
      { headerName: "CodeProv", field: "cardcode", resizable: true },
      { headerName: "NameProv", field: "sa_namecardcode", resizable: true },
      { headerName: "Pais", field: "u_argns_coo", resizable: true },
      {
        headerName: "Composicion",
        field: "u_argns_int_compii",
        resizable: true,
      },
      { headerName: "Año", field: "u_argns_year", resizable: true },

      { headerName: "Bodega", field: "defaultwarehouse", resizable: true },
      { headerName: "Code Color", field: "u_argns_col", resizable: true },
      { headerName: "Name Color", field: "sa_color", resizable: true },
      {
        headerName: "Code Tipo BM",
        field: "u_argns_int_tipo_b_m",
        resizable: true,
      },
      { headerName: "Name Tipo BM", field: "sa_nametipo_b_m", resizable: true },
      {
        headerName: "Code Estilo",
        field: "u_argns_int_estilo",
        resizable: true,
      },
      { headerName: "Name Estilo", field: "sa_nameestilo", resizable: true },
      {
        headerName: "Code Cuerpo",
        field: "u_argns_int_cuerpo",
        resizable: true,
      },
      { headerName: "Name Cuerpo", field: "sa_namecuerpo", resizable: true },
      { headerName: "Code Genero", field: "u_argns_div", resizable: true },
      { headerName: "Name Genero", field: "sa_namegenero", resizable: true },
      { headerName: "Descu", field: "u_cxs_sldc", resizable: true },

      { headerName: "Marca", field: "sa_codmarcacodi", resizable: true },
      { headerName: "Name Marca", field: "sa_namemarcacodi", resizable: true },
      { headerName: "MarcaExt", field: "u_argns_brand", resizable: true },
      {
        headerName: "Name MarcaExt",
        field: "sa_namemarcaext",
        resizable: true,
      },
      { headerName: "Proced", field: "u_argns_int_proced", resizable: true },
      {
        headerName: "Code Familia",
        field: "u_argns_int_flia",
        resizable: true,
      },
      { headerName: "Name Familia", field: "sa_namefamilia", resizable: true },
      { headerName: "SubFamilia", field: "u_argns_int_sflia", resizable: true },
      {
        headerName: "SubNameFamilia",
        field: "sa_namesubfamilia",
        resizable: true,
      },
      {
        headerName: "Code TipoMod",
        field: "u_argns_int_tipo_mod",
        resizable: true,
      },
      {
        headerName: "Name TipoMod",
        field: "sa_nametipomodelo",
        resizable: true,
      },
      { headerName: "Code Grupo", field: "itmsgrpcod", resizable: true },
      { headerName: "Name Grupo", field: "sa_nameitmsgrpcod", resizable: true },

      { headerName: "Escala", field: "u_argns_scl", resizable: true },
      { headerName: "Tallas", field: "u_argns_size", resizable: true },
      //CANTIDAD Y PRECIOS
      { headerName: "Cantidad", field: "onhand", resizable: true },
      { headerName: "Costo", field: "sa_preciouni", resizable: true },
      { headerName: "PrecioConIVA", field: "sa_pvpconiva", resizable: true },
      { headerName: "PrecioSinIVA", field: "price", resizable: true },
      { headerName: "Precio X Mayor", field: "sa_ppmxmayor", resizable: true },

      
    ],
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useLocalState("", "user");
  const [anexos, setAnexos] = useState([]);
  const [rowData, setRowData] = useState([]);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    setAnexos([]); // Resetear el estado de anexos
    setRowData([]); // Resetear el estado de anexos
    console.log(`Option selected: ${selectedOption.value} ${user}`);
    const response = await unicosAnexos(user, selectedOption.value);
    const options = response
      .map((anexo) => ({
        value: anexo,
        label: anexo,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Ordenar las opciones alfabéticamente
    console.log(options);
    setAnexos(options);
  };

  const handleSecondSelectChange = async (selectedAnexo) => {
    console.log(
      `User: ${user}, Tipo Anexo: ${selectedOption.value}, Anexo seleccionado: ${selectedAnexo.label}`
    );
    const response = await detalleAnexos(
      user,
      selectedOption.value,
      selectedAnexo.label
    );
    console.log("data segundo", response);

    setRowData(response);
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Anexo");

    // Agregar las columnas de la tabla a la hoja de Excel
    const columns = gridOptions.columnDefs.map((columnDef) => ({
      header: columnDef.headerName,
      key: columnDef.field,
    }));
    worksheet.columns = columns;

    const nombreArchivo = rowData[0]["sa_anexo"];

    // Agregar las filas de la tabla a la hoja de Excel
    rowData.forEach((rowData) => {
      worksheet.addRow(rowData);
    });

    // Descargar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, nombreArchivo + ".xlsx");
    });
  };

  const onGridReady = (params) => {
    setGridOptions((prevState) => ({
      ...prevState,
      api: params.api,
      columnApi: params.columnApi,
    }));
    params.api.sizeColumnsToFit();
  };

  function autoSizeAll() {
    const allColumnIds = gridOptions.columnApi
      .getAllColumns()
      .map((column) => column.getColId());
    gridOptions.columnApi.autoSizeColumns(allColumnIds);
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <div style={{ display: "flex" }}>
                <Select
                  options={opcionesTipoAnexo}
                  value={selectedOption}
                  onChange={handleChange}
                  isSearchable={true}
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: 150,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: 12,
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: 12,
                    }),
                  }}
                />

                <Select
                  options={anexos}
                  key={selectedOption ? selectedOption.value : "default"}
                  onChange={handleSecondSelectChange}
                  isSearchable={true}
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: 150,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: 12,
                    }),
                    option: (provided) => ({
                      ...provided,
                      fontSize: 12,
                    }),
                  }}
                />
              </div>
            </td>

            <td>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={exportToExcel}>Exportar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="ag-theme-alpine" style={{ height: 300, width: "99vw" }}>
        <AgGridReact
          columnDefs={gridOptions.columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          onFirstDataRendered={autoSizeAll}
        />
      </div>
    </>
  );
};

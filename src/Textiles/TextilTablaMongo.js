import { AgGridReact } from "ag-grid-react";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../utli/useLocalStorage";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { UltimoCodBarra } from "./APIBarraSAP";

import { BotonSAP } from "./APIAnexoSAP";
import { Authenticate, Logout } from "./TextilAuth";

async function UltCodBarSAP(prefixCodBar) {
  try {
    const authToken = await Authenticate();

    if (authToken === 200) {
      const {
        data: { value },
      } = await axios.get(
        `https://192.168.246.228:50000/b1s/v1/Items?$select=ItemCode,BarCode&$filter=startswith(BarCode,'${prefixCodBar}')&$orderby=BarCode desc&$top=1`,
        { withCredentials: true }
      );

      if (value.length !== 0) {
        const modeloSAP = value;
        console.log("Valor Get SAP", value);
        return modeloSAP;
      } else {
        return "0"; // Retorno nulo en lugar de "0" cuando no hay resultados
      }
    } else {
      return "0";
    }
  } catch (error) {
    console.log("UltCodBarSAP", error);
    throw error; // Manejo de excepciones para propagar errores hacia arriba en la pila de llamadas
  } finally {
    await Logout();
    console.log("UltCodBar logout");
  }
}

async function UltCodBarMongo(i) {
  const codbar = "10000014"; // o cualquier otro valor que desees

  const [codBarSAP] = await Promise.all([UltCodBarSAP(codbar)]);

  const ultCodBarSAP = codBarSAP[0]["BarCode"];

  const response = await fetch(`/api2/api/v1/anexos/max-barcode/${codbar}`);
  const ultCodBarMongo = await response.text();

  let codigoBarra = "";

  if (ultCodBarSAP >= ultCodBarMongo) {
    console.log("cod mayor SAP", ultCodBarSAP);
    codigoBarra = ultCodBarSAP;
  } else {
    console.log("cod mayor Mongo", ultCodBarMongo);
    codigoBarra = ultCodBarMongo;
  }

  const results = [];

  try {
    for (let j = 0; j < i; j++) {
      const cadena = String(parseInt(codigoBarra.substring(0, 12)) + j + 1);

      console.log("codigo bar suamdo", cadena);

      let evenPositionsSum = Array.from(cadena)
        .filter((digit, index) => index % 2 === 0)
        .reduce((sum, digit) => sum + parseInt(digit), 0);

      let oddPositionsSum =
        Array.from(cadena)
          .filter((digit, index) => index % 2 === 1)
          .reduce((sum, digit) => sum + parseInt(digit), 0) * 3;

      console.log("Valores sum", evenPositionsSum, oddPositionsSum);
      let result = evenPositionsSum + oddPositionsSum;
      let quotient = (Math.floor(result / 10) + 1) * 10;

      console.log("Sumas codigo barras", quotient, result);
      let digVerif = 0;

      if (quotient - 10 !== result) {
        digVerif = quotient - result;
      }

      const codigo = cadena.toString() + digVerif.toString();
      results.push(codigo);
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error; // propaga el error para que lo maneje el catch en el componente
  }
}

function MyTableMongo({ data, handleGetClick,codetipoanexo }) {
  const [user, setUser] = useLocalState("", "user");
  //const [codetipoanexo, setCodeTipoAnexo] = useState("01");

  const [gridOptions, setGridOptions] = useState({
    defaultColDef: {
      //resizable: true,
    },
    columnDefs: [
      { headerName: "Id", field: "id", resizable: true, hide: true },
      { headerName: "Anexo", field: "sa_anexo", resizable: true },
      { headerName: "PO", field: "sa_po", resizable: true },
      { headerName: "Modelo", field: "uargnsmod", resizable: true },

      {
        headerName: "CodeBars",
        field: "barcode",
        resizable: true,
        editable: true,
      },

      {
        headerName: "ItemCode",
        field: "itemcode",
        resizable: true,
        editable: true,
      },
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
        headerName: "NameSubFamilia",
        field: "sa_namesubfamilia",
        resizable: true,
      },
      {
        headerName: "Code Cuerpo",
        field: "u_argns_int_cuerpo",
        resizable: true,
      },
      { headerName: "Name Cuerpo", field: "sa_namecuerpo", resizable: true },
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

  const onDeleteSelected = useCallback(() => {
    const selectedRows = gridOptions.api.getSelectedRows();
    const selectedIds = [...new Set(selectedRows.map((row) => row.uargnsmod))];
    const supplierCatalogNos = [...new Set(selectedRows.map(row => row.suppliercatalogno))];

    const diccDelete = {};

    selectedIds.forEach((id, index) => {
      diccDelete[id] = supplierCatalogNos[index];
    });
    
    console.log(diccDelete);


    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar las filas seleccionadas?"
    );

    if (confirmDelete) {
      const deletePromises = Object.keys(diccDelete).map((uargnsmod) => {
        const suppliercatalogno = diccDelete[uargnsmod];

        return fetch(`/api2/api/v1/anexos/uargnsmod/${uargnsmod}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              return fetch(`/api2/api/v1/photos/sa/${suppliercatalogno}`, {
                method: "DELETE",
              });
            } else {
              throw new Error(
                `Error en la petición DELETE a http://localhost:8081/api/v1/anexos/uargnsmod/${uargnsmod}`
              );
            }
          })
          .catch((error) => {
            console.error(error);
            return Promise.reject(error);
          });
      });

      Promise.all(deletePromises)
        .then(() => {
          console.log("Peticiones OK");
          const rowsToRemove = gridOptions.rowData.filter((row) =>
            selectedIds.includes(row.uargnsmod)
          );
          gridOptions.api.applyTransaction({ remove: rowsToRemove });
          window.alert("Se eliminaron los datos seleccionados");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [gridOptions]);

  useEffect(() => {
    setGridOptions((prevState) => ({
      ...prevState,
      rowData: data,
    }));
  }, [data]);

  //const successfulRequests = [];
  //const failedRequests = [];

  const handleClick = async () => {
    const confirmSendSAP = window.confirm("¿Está seguro de enviar a SAP?");

    if (confirmSendSAP) {
      const datosFiltrados = data.map(
        ({
          itemcode,
          itemname,
          foreignname,
          itmsgrpcod,
          barcode,
          vatliable,
          purchaseitem,
          salesitem,
          inventoryitem,
          cardcode,
          suppliercatalogno,
          assetitem,
          manageserialnumbers,
          managebatchnumbers,
          defaultwarehouse,
          glmethod,
          managestockbywarehouse,
          wtliable,
          costaccountingmethod,
          planningsystem,
          procurementmethod,
          orderintervals,
          ordermultiple,
          leadtime,
          minorderquantity,
          itemtype,
          uomgroupentry,
          inventoryuomentry,
          defaultsalesuomentry,
          defaultpurchasinguomentry,
          u_tipo_bien,
          u_argns_col,
          uargnsmod,
          u_argns_scl,
          u_argns_size,
          u_argns_sizevo,
          u_argns_var,
          u_argns_coo,
          u_argns_year,
          u_argns_div,
          u_argns_season,
          u_argns_appgrp,
          u_argns_m_group,
          u_argns_m_type,
          u_argns_linecode,
          u_argns_brand,
          u_cxs_reit,
          u_cxs_sldc,
          u_argns_int_flia,
          u_argns_int_sflia,
          u_argns_int_dibujo,
          u_argns_int_cuello,
          u_argns_int_cuerpo,
          u_argns_int_puno,
          u_argns_int_proced,
          u_argns_int_perso,
          u_argns_int_tipo_b_m,
          u_argns_int_estilo,
          u_argns_int_tipo_mod,
          u_argns_int_compii,
          //
          price,
        }) => ({
          ItemCode: itemcode,
          ItemName: itemname,
          ForeignName: foreignname,
          ItemsGroupCode: itmsgrpcod,
          BarCode: barcode,
          VatLiable: vatliable,
          PurchaseItem: purchaseitem,
          SalesItem: salesitem,
          InventoryItem: inventoryitem,
          Mainsupplier: cardcode,
          SupplierCatalogNo: suppliercatalogno,
          AssetItem: assetitem,
          ManageSerialNumbers: manageserialnumbers,
          ManageBatchNumbers: managebatchnumbers,
          DefaultWarehouse: defaultwarehouse,
          GLMethod: glmethod,
          ManageStockByWarehouse: managestockbywarehouse,
          WTLiable: wtliable,
          CostAccountingMethod: costaccountingmethod,
          PlanningSystem: planningsystem,
          ProcurementMethod: procurementmethod,
          OrderIntervals: orderintervals,
          OrderMultiple: ordermultiple,
          LeadTime: leadtime,
          MinOrderQuantity: minorderquantity,
          ItemType: itemtype,
          UoMGroupEntry: uomgroupentry,
          InventoryUoMEntry: inventoryuomentry,
          DefaultSalesUoMEntry: defaultsalesuomentry,
          DefaultPurchasingUoMEntry: defaultpurchasinguomentry,
          U_TIPO_BIEN: u_tipo_bien,
          U_ARGNS_COL: u_argns_col,
          U_ARGNS_MOD: uargnsmod,
          U_ARGNS_SCL: u_argns_scl,
          U_ARGNS_SIZE: u_argns_size,
          U_ARGNS_SIZEVO: u_argns_sizevo,
          U_ARGNS_VAR: u_argns_var,
          U_ARGNS_COO: u_argns_coo,
          U_ARGNS_YEAR: u_argns_year,
          U_ARGNS_DIV: u_argns_div,
          U_ARGNS_SEASON: u_argns_season,
          U_ARGNS_APPGRP: u_argns_appgrp,
          U_ARGNS_M_GROUP: u_argns_m_group,
          U_ARGNS_M_TYPE: u_argns_m_type,
          U_ARGNS_LineCode: u_argns_linecode,
          U_ARGNS_Brand: u_argns_brand,
          U_CXS_REIT: u_cxs_reit,
          U_CXS_SLDC: u_cxs_sldc,
          U_ARGNS_INT_FLIA: u_argns_int_flia,
          U_ARGNS_INT_SFLIA: u_argns_int_sflia,
          U_ARGNS_INT_DIBUJO: u_argns_int_dibujo,
          U_ARGNS_INT_CUELLO: u_argns_int_cuello,
          U_ARGNS_INT_CUERPO: u_argns_int_cuerpo,
          U_ARGNS_INT_PUNO: u_argns_int_puno,
          U_ARGNS_INT_PROCED: u_argns_int_proced,
          U_ARGNS_INT_PERSO: u_argns_int_perso,
          U_ARGNS_INT_TIPO_B_M: u_argns_int_tipo_b_m,
          U_ARGNS_INT_ESTILO: u_argns_int_estilo,
          U_ARGNS_INT_TIPO_MOD: u_argns_int_tipo_mod,
          U_ARGNS_INT_COMPII: u_argns_int_compii,
          ItemPrices: [
            {
              PriceList: 1,
              Price: price,
              Currency: "USD",
              BasePriceList: 1,
              Factor: 1.0,
            },
          ],
        })
      );

      try {
        // Iniciar sesión
        const authToken = await Authenticate();

        console.log("mongo auth", authToken);
        if (authToken === 200) {
          console.log("mongo ingreso");
          // Realizar las peticiones POST
          await Promise.all(
            datosFiltrados.map((datos) =>
              fetch("https://192.168.246.228:50000/b1s/v1/Items", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
              })
            )
          );

          // Mostrar alerta indicando que se completaron las peticiones
          alert("Las peticiones POST se han completado correctamente.");
        }
        await Logout();
      } catch (error) {
        console.error(error);
        alert("Ha ocurrido un error al realizar las peticiones POST.");
      }
    }
  };

  const handleCodBarClick = async () => {
    const numObjects = data.length;

    // Contar objetos con campo "barcode" vacío
    const numObjectsWithoutBarcode = data.filter((obj) => !obj.barcode).length;

    console.log(
      `Hay ${numObjectsWithoutBarcode} objetos sin código de barras.`
    );

    // Generar códigos
    const codigos = await UltCodBarMongo(numObjectsWithoutBarcode);
    console.log("Codigos generados", codigos);

    // Armar diccionario
    const diccionario = data
      .filter((obj) => !obj.barcode)
      .reduce((dic, obj, index) => {
        dic[obj.id] = codigos[index];
        return dic;
      }, {});

    console.log("Diccionario:", diccionario);

    // Realizar peticiones PATCH
    for (const id in diccionario) {
      const body = {
        key: "barcode",
        value: diccionario[id],
      };
      const response = await fetch(`/api2/api/v1/anexos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        console.error(`Error al actualizar objeto ${id}: ${response.status}`);
      }
    }

    console.log("Peticiones PATCH completadas");
    handleGetClick(user, codetipoanexo);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: "99vw" }}>
      
      <button onClick={handleClick}>Enviar SAP</button>

      <button onClick={handleCodBarClick}>Codigo Barra</button>

      <button onClick={onDeleteSelected}>Eliminar Filas</button>
      <AgGridReact
        rowData={data}
        columnDefs={gridOptions.columnDefs}
        onGridReady={onGridReady}
        onFirstDataRendered={autoSizeAll}
        rowSelection={"multiple"}
      />
    </div>
  );
}

export default MyTableMongo;

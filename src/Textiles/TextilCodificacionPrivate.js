import React, { useState, useEffect, useRef } from "react";
import { Authenticate, Logout } from "./TextilAuth";
import axios from "axios";

import { MyMarca } from "./TextilMarca";
import { MyTipoBM } from "./TextilTipoBM";
import { MySubFamily } from "./TextilSubFamilia";
import { MyEscala } from "./TextilEscala";
import { MyProveedores } from "./TextilProveedor";
import { MyBodega } from "./TextilBodega";
import { MyColors } from "./TextilColores";
import { MyEstilo } from "./TextilEstilo";
import { MyTipoModelo } from "./TextilTipoModelo";
import { MyGenero } from "./TextilGenero";
import { MyDescuento } from "./TextilDescuento";
import { MyMarcaExt } from "./TextilMarcaExt";
import { MyOrigin } from "./TextilProcedencia";
import { MyFamily } from "./TextilFamilia";
import { MyModUltSAPPri } from "./TextilModSAPPrivate";
import { NumMod } from "./TextilNumMod";

import MyTableData from "./TextilTablaData";
import MyTableMongo from "./TextilTablaMongo";

//IMAGEN
import CargarImg from "./APIImagen";
import { DragAndDrop } from "./TextilImagen";
//IMAGEN

export function MyFormTextilPri() {
  const [dataProvedor, setDataProvedor] = useState([]);
  const [dataColores, setDataColores] = useState([]);
  const [dataSflia, setDataSflia] = useState([]);
  const [dataTipoBM, setDataTipoBM] = useState([]);
  const [dataEstilo, setDataEstilo] = useState([]);
  const [dataTipoModelo, setDataTipoModelo] = useState([]);
  const [dataGenero, setDataGenero] = useState([]);
  const [dataCodMarca, setDataCodMarca] = useState([]);
  const [dataMarcaExt, setDataMarcaExt] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [dataFamilia, setDataFamilia] = useState([]);
  const [dataEscala, setDataEscala] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [dataGrupoArticulo, setDataGrupoArticulo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Authenticate();
        console.log(response);
        if (response === 200) {
          const requests = [
            axios.get(
              `https://192.168.246.228:50000/b1s/v1/BusinessPartners?$select=` +
                `CardCode,CardName,Country &$filter=CardType eq 'S' ` +
                `and U_CG3_TIPO_PROV eq '01' or U_CG3_TIPO_PROV eq '02' or ` +
                `U_CG3_TIPO_PROV eq '03' or U_CG3_TIPO_PROV eq '04' or ` +
                `U_CG3_TIPO_PROV eq '05' &$orderby=CardName asc`,
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/ARGNS_COLOR?$select=Code,U_ColCode,U_ColDesc&$orderby=U_ColDesc asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_SFLIA?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_TIPO_B_M?$orderby=Name asc",
              { withCredentials: true }
            ),

            axios.get(
              `https://192.168.246.228:50000/b1s/v1/U_CG3_ESTILO?$orderby=Name asc`,
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_TIPO_MOD?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_ARGNS_DIV?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_MARCA?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_ARGNS_BRAND?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_COD_PROC?$filter= U_CG3_CODEX ne null &$orderby=Name asc",
              { withCredentials: true }
            ),

            axios.get(
              "https://192.168.246.228:50000/b1s/v1/U_CG3_FAMILIA?$orderby=Name asc",
              { withCredentials: true }
            ),
            axios.get(
              "https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=Code,U_SclCode,U_SclDesc&$orderby=U_SclDesc asc",
              { withCredentials: true }
            ),
            axios.get(
              `https://192.168.246.228:50000/b1s/v1/ARGNS_SCALE?$select=ARGNS_SIZECollection`,
              { withCredentials: true }
            ),
            axios.get(
              `https://192.168.246.228:50000/b1s/v1/ItemGroups?$select=Number, GroupName, U_CG3_CODGRP`,
              { withCredentials: true }
            ),
          ];

          const [
            resProvedor,
            resColores,
            resSflia,
            resTipoBM,
            resEstilo,
            resTipoModelo,
            resGenero,
            resCodMarca,
            resMarcaExt,
            resOrigin,
            resFamilia,
            resEscala,
            resTallas,
            resGrupoArt,
          ] = await Promise.all(requests);

          const dataProvedor = resProvedor.data.value;
          const dataColores = resColores.data.value;
          const dataSflia = resSflia.data.value;
          const dataTipoBM = resTipoBM.data.value;
          const dataEstilo = resEstilo.data.value;
          const dataTipoModelo = resTipoModelo.data.value;
          const dataGenero = resGenero.data.value;
          const dataCodMarca = resCodMarca.data.value;
          const dataMarcaExt = resMarcaExt.data.value;
          const dataOrigin = resOrigin.data.value;
          const dataFamilia = resFamilia.data.value;
          const dataEscala = resEscala.data.value;
          const dataTallas = resTallas.data;
          const tallas = dataTallas.value.reduce((acc, obj) => {
            return [
              ...acc,
              ...obj.ARGNS_SIZECollection.map((size) => ({
                code: size.Code,
                sizeCode: size.U_SizeCode,
                sizeDesc: size.U_SizeDesc,
              })),
            ];
          }, []);
          const dataGrupoArticulo = resGrupoArt.data.value;

          setDataProvedor(dataProvedor);
          setDataColores(dataColores);
          setDataSflia(dataSflia);
          setDataTipoBM(dataTipoBM);
          setDataEstilo(dataEstilo);
          setDataTipoModelo(dataTipoModelo);
          setDataGenero(dataGenero);
          setDataCodMarca(dataCodMarca);
          setDataMarcaExt(dataMarcaExt);
          setDataOrigin(dataOrigin);
          setDataFamilia(dataFamilia);
          setDataEscala(dataEscala);
          setTallas(tallas);
          setDataGrupoArticulo(dataGrupoArticulo);
        } else {
          throw new Error("No se pudo autenticar");
        }
      } catch (error) {
        //console.error(error.message);
        console.log("Error de Login From");
      } finally {
        await Logout(); // Espera a que el Logout termine antes de continuar
      }
    }

    fetchData();
  }, []);

  //Code TIPO ANEXO
  const [codetipoanexo, setCodeTipoAnexo] = useState("02");
  //TIPO ANEXO
  const [sa_tipoanexo, setTipoAnexo] = useState("TEXTILPRIV");

  //anexo
  const [sa_anexo, setName] = useState("");

  //po
  const [sa_po, setPO] = useState("");

  //referencia proveedor
  const [suppliercatalogno, setRefProv] = useState("");

  //anio
  const [u_argns_year, setAnio] = useState(new Date().getFullYear());

  //composicion
  const [u_argns_int_compii, setComposicion] = useState("");

  //marca
  const [sa_codmarcacodi, setSelectedMarca] = useState("");
  const [sa_namemarcacodi, setSelectedNameMarca] = useState("");
  const handleMarcaChange = (value, label) => {
    console.log("Marca form", value, label);
    setSelectedMarca(value);
    setSelectedNameMarca(label);
  };

  //procedencia para codificacion
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedNameOrigin, setSelectedNameOrigin] = useState("");
  //procedencia de exxis
  const [u_argns_int_proced, setSelectedProcSAP] = useState("");
  const handleOriginChange = (value, label, codeExxis) => {
    console.log("Origin form", value, label, codeExxis);
    setSelectedOrigin(value);
    setSelectedNameOrigin(label);
    setSelectedProcSAP(codeExxis);
  };

  //subfamilia
  const [u_argns_int_sflia, setSelectedSubFamily] = useState("");
  const [sa_namesubfamilia, setSelectedNameSubFamily] = useState("");
  const handleSubFamilyChange = (value, label) => {
    console.log("Subfamilia form", value, label);
    setSelectedSubFamily(value);
    setSelectedNameSubFamily(label);
  };

  //proveedor
  const [cardcode, setCodeProv] = useState("");
  const [sa_namecardcode, setNameProv] = useState("");
  //pais
  const [u_argns_coo, setPais] = useState("");
  const handleProvChange = (value, label, u_argns_coo) => {
    setCodeProv(value);
    setNameProv(label);
    setPais(u_argns_coo.toUpperCase());
    console.log("Prov form", value, label, u_argns_coo);
  };

  //Marca externa
  const [u_argns_brand, setSelectedMarcaExt] = useState("");
  const [sa_namemarcaext, setSelectedNameMarcaExt] = useState("");
  const handleMarcaExtChange = (value, label) => {
    console.log("MarcaExt form", value, label);
    setSelectedMarcaExt(value);
    setSelectedNameMarcaExt(label);
  };

  //descuento
  const [u_cxs_sldc, setDescuento] = useState("Y");
  const handleDescuentoChange = (u_cxs_sldc) => {
    setDescuento(u_cxs_sldc);
  };

  //color
  const [u_argns_col, setCodeColor] = useState("");
  const [sa_color, setNameColor] = useState("");
  const handleColorChange = (value, label) => {
    setCodeColor(value);
    setNameColor(label);
  };

  //familia
  const [u_argns_int_flia, setCodeFamilia] = useState("");
  const [sa_namefamilia, setNameFamilia] = useState("");
  const handleFamilyChange = (value, label) => {
    setCodeFamilia(value);
    setNameFamilia(label);
    //const familiaObj = { value: value, label: label };
    console.log("familia form", value, label);
    //setFamilia(familiaObj);
  };

  //tipo B_M
  const [u_argns_int_tipo_b_m, setCodeTipoBM] = useState("");
  const [sa_nametipo_b_m, setNameTipoBM] = useState("");
  const handleTipoBMChange = (value, label) => {
    setCodeTipoBM(value);
    setNameTipoBM(label);
  };

  //estilo
  const [u_argns_int_estilo, setCodeEstilo] = useState("");
  const [sa_nameestilo, setNameEstilo] = useState("");
  const handleEstiloChange = (value, label) => {
    setCodeEstilo(value);
    setNameEstilo(label);
    console.log("estilo form", value, label);
  };

  //tipo modelo
  const [u_argns_int_tipo_mod, setCodeTipoMod] = useState("");
  const [sa_nametipomodelo, setNameTipoMod] = useState("");
  const handleTipoModChange = (value, label) => {
    setCodeTipoMod(value);
    setNameTipoMod(label);
    console.log("tipoMod form", value, label);
  };

  //cuerpo
  const [u_argns_int_cuerpo, setCodeCuerpo] = useState("");
  const [sa_namecuerpo, setNameCuerpo] = useState("");
  const handleCuerpoChange = (selectedOption) => {
    setCodeCuerpo(selectedOption.value);
    setNameCuerpo(selectedOption.label);
  };

  //genero
  const [u_argns_div, setCodeGenero] = useState("HM");
  const [sa_namegenero, setNameGenero] = useState("HOMBRE");
  const handleGeneroChange = (value, label) => {
    setCodeGenero(value);
    setNameGenero(label);
    console.log("genero form", value, label);
  };

  //modelo
  const [uargnsmod, setUltimoConcatenado] = useState("");
  function handleConcatenadoChange(valor) {
    setUltimoConcatenado(valor);
  }
  //grupo SAP
  const [itmsgrpcod, setCodeGrupoSap] = useState("");
  const [sa_nameitmsgrpcod, setNameGrupoSap] = useState("");
  function handleGrupoSapChange(valor, label) {
    setCodeGrupoSap(valor);
    setNameGrupoSap(label);
  }

  //bodega
  const [defaultwarehouse, setBodega] = useState("");
  const handleBodegaChange = (defaultwarehouse) => {
    setBodega(defaultwarehouse);
  };

  //escala
  const [u_argns_scl, setSelectedEscala] = useState("");
  const handleSelectedItemChange = (u_argns_scl) => {
    setSelectedEscala(u_argns_scl);
  };

  //tallas
  const [u_argns_size, setSelectedTallas] = useState([]);
  const handleSelectedTallasChange = (tallas) => {
    setSelectedTallas(tallas);
  };

  //PRECIO Y CANTIDAD
  //cantidad
  const [onhand, setCantidad] = useState(0);
  //costo
  const [sa_preciouni, setPrecioUni] = useState(0);
  //precio sin iva
  const [price, setPrice] = useState(0);
  //precio x mayor
  const [sa_ppmxmayor, setPpmxMayor] = useState(0);

  //tabla mongo
  const [mongoData, setMongoData] = useState([]);

  const resetOrigin = () => {
    setSelectedSubFamily("");
    setSelectedNameSubFamily("");
  };

  useEffect(() => {
    setSelectedTallas([]);
  }, [u_argns_scl]);

  const itemcode = u_argns_size.map(
    (talla) => `${uargnsmod}-${u_argns_col}-${talla}`
  );

  const itemname = u_argns_size.map(
    (talla) =>
      `${sa_namesubfamilia} ${sa_namemarcaext} ${sa_namecuerpo} ${sa_color} ${talla}`
  );

  const tableData = u_argns_size.map((u_argns_size, index) => ({
    sa_anexo, //anexo
    sa_po, //po
    suppliercatalogno, //referencia proveedor
    cardcode, //code proveedor
    sa_namecardcode, //name proveedor
    u_argns_coo, //pais proveedor
    u_argns_int_compii, //composicion
    u_argns_year, //anio

    defaultwarehouse, //bodega
    u_argns_col, //code color
    sa_color, //name color
    u_argns_int_tipo_b_m, //tipo BM
    sa_nametipo_b_m, //name BM
    u_argns_int_estilo, //code estilo
    sa_nameestilo, // name estilo
    u_argns_int_cuerpo, //code cuerpo
    sa_namecuerpo, //name cuerpo
    u_argns_div, //code genero
    sa_namegenero, //name genero
    u_cxs_sldc, //descuento

    sa_codmarcacodi, //codeMarca
    sa_namemarcacodi, //nameMarca
    u_argns_brand, //code MarcaExt
    sa_namemarcaext, //name MarcaExt
    //selectedOrigin, //codeProcedenciaCodif
    u_argns_int_proced, //procedenciaSAP
    selectedNameOrigin, //nameProcedencia
    u_argns_int_flia, //code familia
    sa_namefamilia, //name familia
    u_argns_int_sflia, //codeSubFamily
    sa_namesubfamilia, //SubNameFamily
    uargnsmod, //modelo
    u_argns_int_tipo_mod, //code tipo modelo
    sa_nametipomodelo, //name tipo modelo
    itmsgrpcod, // code grupo
    sa_nameitmsgrpcod, // name grupo

    u_argns_scl, //code escala
    u_argns_size, //tallas

    //CANTIDAD Y PRECIOS
    onhand, //cantidad
    sa_preciouni, //costo
    price, //precio sin iva
    sa_ppmxmayor, //precio x mayor

    itemcode: itemcode[index], //Codigo SAP
    itemname: itemname[index], //Name codigo SAP
  }));

  const resetForm = () => {
    //setSelectedEscala('');
    setRefProv("");
    setSelectedTallas([]);
    //CANTIDAD Y PRECIOS
    setCantidad(0);
    setPrecioUni(0);
    setPrice(0);
    setPpmxMayor(0);
    setNumero("");
  };

  const handleGetClick = (user, codetipoanexo) => {
    //Peticion a Mongo para consultar los anexos
    //.get(`/api2/api/v1/anexos/mg?sa_tipoanexo=TEXTIL&sa_anexo=${sa_anexo}`)
    console.log("User", user, codetipoanexo);
    axios
      .get(
        `/api2/api/v1/anexos/lpu?username=${user}&sa_codetipoanexo=${codetipoanexo}&sa_anexo=${sa_anexo}`
      )
      .then((response) => {
        setMongoData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //IMAGEN
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  function handleSaveImage() {
    if (!suppliercatalogno || !selectedImage) {
      if (!suppliercatalogno) {
        alert("El campo ref prov está vacío");
      } else {
        //alert("No se ha seleccionado una imagen");
        console.log("No se ha seleccionado una imagen");
      }
      return;
    }
    const formData = new FormData();
    //formData.append("title", selectedImage.name);
    formData.append("title", suppliercatalogno);
    formData.append("image", selectedImage);

    fetch("/api2/api/v1/photos/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image saved:", data.id);
        setSelectedImage(null);
        fileInputRef.current.value = null;
      })
      .catch((error) => {
        console.error("Error saving image:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      });
    console.log("Imagen guardada");
  }
  //IMAGEN

  function handleKeyPress(event) {
    const prohibitedChars = /[.,:;'"[\]{}\\/|()+*?¡!?&^%$#@~`]/;
    if (prohibitedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  function handlePaste(event) {
    const pastedText = event.clipboardData.getData("text");
    //const replacedText = pastedText.replace(/\//g, '__');
    const replacedText = pastedText.replace(
      /[.,:;'"[\]{}\\/|()+*?¡!?&^%$#@~`]/g,
      "__"
    );
    event.preventDefault();
    event.target.value = replacedText;
    setRefProv(replacedText); // actualiza el estado con el nuevo valor
  }

  const [numeroMod, setNumero] = useState("");

  function handleNumeroChange(value) {
    setNumero(value);
  }

  return (
    <>
      <div className="d-flex">
        <div
          className="flex-shrink-0"
          style={{ width: "200px", height: "200px" }}
        >
          <DragAndDrop
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            fileInputRef={fileInputRef}
          />
        </div>

        <div className="flex-grow-1 ms-3">
          <div className="d-flex  align-items-left">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Anexo</span>
              <input
                type="text"
                placeholder=""
                value={sa_anexo}
                //onChange={(e) => setName(e.target.value)}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                style={{ width: "150px", height: "35px" }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>PO</span>
              <input
                type="text"
                placeholder=""
                value={sa_po}
                onChange={(e) => setPO(e.target.value.toUpperCase())}
                style={{ width: "150px", height: "35px" }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Ref. Prov.</span>
              <input
                type="text"
                placeholder=""
                value={suppliercatalogno}
                onChange={(e) => setRefProv(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                onPaste={handlePaste}
                style={{ width: "150px", height: "35px" }}
              />
            </div>
            <MyProveedores
              dataProvedor={dataProvedor}
              onSelectChange={handleProvChange}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Composicion</span>
              <input
                type="text"
                placeholder=""
                value={u_argns_int_compii}
                onChange={(e) => setComposicion(e.target.value.toUpperCase())}
                style={{ width: "307px", height: "35px" }}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Año</span>
              <input
                type="text"
                value={u_argns_year}
                onChange={(e) => setAnio(e.target.value)}
                style={{ width: "55px", height: "35px" }}
                maxLength="4"
                required
              />
            </div>

            <MyDescuento onDescuentoChange={handleDescuentoChange} />
          </div>

          <div className="d-flex  align-items-left">
            <MyBodega onBodegaChange={handleBodegaChange} />

            <MyColors
              dataColores={dataColores}
              onSelectChange={handleColorChange}
            />
            <MyTipoBM
              dataTipoBM={dataTipoBM}
              onSelectChange={handleTipoBMChange}
            />
            <MyEstilo
              dataEstilo={dataEstilo}
              onSelectChange={handleEstiloChange}
            />
            <MyTipoModelo
              dataTipoModelo={dataTipoModelo}
              onSelectChange={handleTipoModChange}
            />
            <MyGenero
              dataGenero={dataGenero}
              onSelectChange={handleGeneroChange}
            />
          </div>

          <div className="d-flex  align-items-left">
            <MyMarca
              dataCodMarca={dataCodMarca}
              onSelectChange={handleMarcaChange}
            />

            <MyMarcaExt
              dataMarcaExt={dataMarcaExt}
              onSelectChange={handleMarcaExtChange}
            />

            <MyOrigin
              dataOrigin={dataOrigin}
              onSelectChange={handleOriginChange}
            />

            <MyFamily
              dataFamilia={dataFamilia}
              onSelectChange={handleFamilyChange}
            />

            <MySubFamily
              dataSflia={dataSflia}
              setCodeCuerpo={setCodeCuerpo}
              setNameCuerpo={setNameCuerpo}
              onSelectChange={handleSubFamilyChange}
              onSelectedCuerpoChange={handleCuerpoChange}
            />

            <NumMod onNumeroChange={handleNumeroChange} />

            <MyModUltSAPPri
              dataGruporticulo={dataGrupoArticulo}
              selectedMarca={sa_codmarcacodi}
              selectedOrigin={selectedOrigin}
              selectedSubFamily={u_argns_int_sflia}
              onConcatenadoChange={handleConcatenadoChange}
              setGrupoSAP={handleGrupoSapChange}
              numeroMod={numeroMod}
            />
          </div>
          <div className="d-flex  align-items-left">
            <MyEscala
              dataEscala={dataEscala}
              dataTallas={tallas}
              onSelectedItemChange={handleSelectedItemChange}
              onSelectedTallasChange={handleSelectedTallasChange}
            />
          </div>
          <div className="d-flex  align-items-left">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Cantidad</span>
              <input
                type="text"
                placeholder=""
                value={onhand}
                //onChange={(e) => setCantidad(e.target.value)}
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/; // Expresión regular para solo permitir números enteros
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setCantidad(e.target.value);
                  }
                }}
                style={{ width: "150px" }}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>Costo</span>
              <input
                type="text"
                value={sa_preciouni}
                //onChange={(e) => setPrecioUni(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    // Verifica si el valor es un número válido
                    setPrecioUni(value);
                  }
                }}
                step="any"
                style={{ width: "150px" }}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>PrexMayor</span>
              <input
                type="text"
                value={sa_ppmxmayor}
                //onChange={(e) => setPpmxMayor(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    // Verifica si el valor es un número válido
                    setPpmxMayor(value);
                  }
                }}
                step="any"
                style={{ width: "150px" }}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "0.5rem",
              }}
            >
              <span>PreSinIva</span>
              <input
                type="text"
                value={price}
                //onChange={(e) => setPrice(e.target.value)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    // Verifica si el valor es un número válido
                    setPrice(value);
                  }
                }}
                step="any"
                style={{ width: "150px" }}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <br />

      <MyTableData
        codetipoanexo={codetipoanexo}
        sa_tipoanexo={sa_tipoanexo}
        data={tableData}
        resetForm={resetForm}
        handleGetClick={handleGetClick}
        resetOrigin={resetOrigin}
        handleSaveImage={handleSaveImage}
        selectedImage={selectedImage}
      />
      <br></br>

      <MyTableMongo
        data={mongoData}
        handleGetClick={handleGetClick}
        codetipoanexo={codetipoanexo}
      />
    </>
  );
}

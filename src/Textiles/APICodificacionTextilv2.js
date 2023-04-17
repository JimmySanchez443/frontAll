import React, { useState, useEffect, useRef } from "react";
import AuthContainer from "./AuthContainer";
import { MyEscala } from "./APIEscala";
import { MyColors } from "./APIColores";
import { MyFamily } from "./APIFamilia";
import { MySubFamily } from "./APISubFamilia";
import { MyMarcaExt } from "./APIMarcaExterna";
import { MyMarca } from "./APIMarca";
import { MyOrigin } from "./APIProcedencia";
import MyTableMongo from "./TextilTablaMongo";
import MyTableData from "./TextilTablaData";
import { MyBodega } from "./APIBodegas";
import { MyTipoBM } from "./APITipoBM";
import { MyModUltSAP } from "./APIModSAP";
import { MyProveedores } from "./APIProveedores";
import { MyDescuento } from "./APIDescuento";
import { MyCuerpo } from "./APICuerpo";
import { MyGenero } from "./APIGenero";
import { MyEstilo } from "./APIEstilo";
import { MyTipoModelo } from "./APITipoModelo";

//IMAGEN
import CargarImg from "./APIImagen";
import { DragAndDrop } from "./TextilImagen";
//IMAGEN

import axios from "axios";
import "./tabla.css";

export function MyFormTextil() {
  //anexo
  const [sa_anexo, setName] = useState("");

  //po
  const [sa_po, setPO] = useState("");

  //referencia proveedor
  const [suppliercatalogno, setRefProv] = useState("");

  //Marca externa
  const [u_argns_brand, setSelectedMarcaExt] = useState("");
  const [sa_namemarcaext, setSelectedNameMarcaExt] = useState("");
  const handleMarcaExtChange = (code, value, label) => {
    console.log("MarcaExt form", code, value, label);
    setSelectedMarcaExt(value);
    setSelectedNameMarcaExt(label);
  };

  //anio
  const [u_argns_year, setAnio] = useState(new Date().getFullYear());

  //descuento
  const [u_cxs_sldc, setDescuento] = useState("Y");
  const handleDescuentoChange = (u_cxs_sldc) => {
    setDescuento(u_cxs_sldc);
  };

  //composicion
  const [u_argns_int_compii, setComposicion] = useState("");

  //color
  const [u_argns_col, setCodeColor] = useState("");
  const [sa_color, setNameColor] = useState("");
  const handleColorChange = (code, value, label) => {
    setCodeColor(value);
    setNameColor(label);
  };

  //familia
  const [u_argns_int_flia, setCodeFamilia] = useState("");
  const [sa_namefamilia, setNameFamilia] = useState("");
  const handleFamilyChange = (code, value, label) => {
    setCodeFamilia(value);
    setNameFamilia(label);
    //const familiaObj = { value: value, label: label };
    console.log("familia form", code, value, label);
    //setFamilia(familiaObj);
  };

  //ARMAR EL CODIGO SAP
  //marca
  const [sa_codmarcacodi, setSelectedMarca] = useState("");
  const [sa_namemarcacodi, setSelectedNameMarca] = useState("");
  const handleMarcaChange = (code, value, label) => {
    console.log("Marca form", code, value, label);
    setSelectedMarca(value);
    setSelectedNameMarca(label);
  };

  //procedencia para codificacion
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedNameOrigin, setSelectedNameOrigin] = useState("");
  //procedencia de exxis
  const [u_argns_int_proced, setSelectedProcSAP] = useState("");
  const handleOriginChange = (code, value, label, codeExxis) => {
    console.log("Origin form", code, value, label, codeExxis);
    setSelectedOrigin(value);
    setSelectedNameOrigin(label);
    setSelectedProcSAP(codeExxis);
  };

  //subfamilia
  const [u_argns_int_sflia, setSelectedSubFamily] = useState("");
  const [sa_namesubfamilia, setSelectedNameSubFamily] = useState("");
  const handleSubFamilyChange = (code, value, label) => {
    console.log("Subfamilia form", code, value, label);
    setSelectedSubFamily(value);
    setSelectedNameSubFamily(label);
  };
  //ARMAR EL CODIGO SAP

  //proveedor
  const [cardcode, setCodeProv] = useState("");
  const [sa_namecardcode, setNameProv] = useState("");
  //pais
  const [u_argns_coo, setPais] = useState("");
  const handleProvChange = (code, value, label, u_argns_coo) => {
    setCodeProv(value);
    setNameProv(label);
    setPais(u_argns_coo.toUpperCase());
    console.log("Prov form", code, value, label, u_argns_coo);
  };

  //tipo B_M
  const [u_argns_int_tipo_b_m, setCodeTipoBM] = useState("");
  const [sa_nametipo_b_m, setNameTipoBM] = useState("");
  const handleTipoBMChange = (code, value, label) => {
    setCodeTipoBM(value);
    setNameTipoBM(label);
    console.log("tipoBM form", code, value, label);
  };

  //estilo
  const [u_argns_int_estilo, setCodeEstilo] = useState("");
  const [sa_nameestilo, setNameEstilo] = useState("");
  const handleEstiloChange = (code, value, label) => {
    setCodeEstilo(value);
    setNameEstilo(label);
    console.log("estilo form", code, value, label);
  };

  //tipo modelo
  const [u_argns_int_tipo_mod, setCodeTipoMod] = useState("");
  const [sa_nametipomodelo, setNameTipoMod] = useState("");
  const handleTipoModChange = (code, value, label) => {
    setCodeTipoMod(value);
    setNameTipoMod(label);
    console.log("tipoMod form", code, value, label);
  };

  //cuerpo
  const [u_argns_int_cuerpo, setCodeCuerpo] = useState("");
  const [sa_namecuerpo, setNameCuerpo] = useState("");
  const handleCuerpoChange = (selectedOption) => {
    setCodeCuerpo(selectedOption.value);
    setNameCuerpo(selectedOption.label);
    console.log("cuerpo form", selectedOption.value, selectedOption.label);
  };
  /*const handleCuerpoChange = ( value, label) => {
    //setCodeCuerpo(value);
    //setNameCuerpo(label);
    console.log("cuerpo form", label);
  };*/

  //genero
  const [u_argns_div, setCodeGenero] = useState("HM");
  const [sa_namegenero, setNameGenero] = useState("HOMBRE");
  const handleGeneroChange = (code, value, label) => {
    setCodeGenero(value);
    setNameGenero(label);
    console.log("genero form", code, value, label);
  };

  //modelo
  const [uargnsmod, setUltimoMod] = useState("");
  function handleUltimoChange(valor) {
    setUltimoMod(valor);
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
    

    //familia,
    //familia: familia.value, // mostrar el value en la columna familia
    //familia: familia.label, // mostrar el label en la columna familia
    //familia: { value: familia.value, label: familia.label },
    //familia: { u_argns_int_flia: familia.value, nameFamily: familia.label },
    //estilo: { value: estilo.value, label: estilo.label },
  }));

  const resetForm = () => {
    //setSelectedEscala('');
    setSelectedTallas([]);
    //CANTIDAD Y PRECIOS
    setCantidad(0);
    setPrecioUni(0);
    setPrice(0);
    setPpmxMayor(0);
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
    if (!uargnsmod) {
      alert("El campo modelo está vacío");
      return;
    }
    const formData = new FormData();
    //formData.append("title", selectedImage.name);
    formData.append("title", uargnsmod);
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

  return (
    <>
      <div className="d-flex">
        <AuthContainer>
          
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
                  style={{ width: "150px", height: "35px" }}
                />
              </div>

              <MyProveedores onSelectChange={handleProvChange} />

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
                  required
                />
              </div>
            </div>

            <div className="d-flex  align-items-left">
              <MyBodega onBodegaChange={handleBodegaChange} />

              <MyColors onSelectChange={handleColorChange} />

              <MyTipoBM onSelectChange={handleTipoBMChange} />

              <MyEstilo onSelectChange={handleEstiloChange} />

              <MyTipoModelo onSelectChange={handleTipoModChange} />

              <MyGenero onSelectChange={handleGeneroChange} />

              <MyDescuento onDescuentoChange={handleDescuentoChange} />
            </div>

            <div className="d-flex  align-items-left">
              <MyMarca onSelectChange={handleMarcaChange} />

              <MyMarcaExt onSelectChange={handleMarcaExtChange} />

              <MyOrigin onSelectChange={handleOriginChange} />

              <MyFamily onSelectChange={handleFamilyChange} />

              <MySubFamily
                setCodeCuerpo={setCodeCuerpo}
                setNameCuerpo={setNameCuerpo}
                onSelectChange={handleSubFamilyChange}
                onSelectedCuerpoChange={handleCuerpoChange}
              />

              <MyModUltSAP
                selectedMarca={sa_codmarcacodi}
                selectedOrigin={selectedOrigin}
                selectedSubFamily={u_argns_int_sflia}
                onUltimoChange={handleUltimoChange}
                setGrupoSAP={handleGrupoSapChange}
              />
            </div>

            <div>
              <MyEscala
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
        </AuthContainer>
      </div>

      <br />

      <MyTableData
        data={tableData}
        resetForm={resetForm}
        handleGetClick={handleGetClick}
        resetOrigin={resetOrigin}
        handleSaveImage={handleSaveImage}
        selectedImage={selectedImage}
      />
      <br></br>

      <MyTableMongo data={mongoData} handleGetClick={handleGetClick} />
    </>
  );
}

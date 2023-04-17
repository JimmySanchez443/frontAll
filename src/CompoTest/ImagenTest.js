import React, { useState, useRef } from "react";
import CargarImg from "./APIImagen";
import BotonImg from "./BotonImg";


export function MyFormTextil() {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  function handleSaveImage() {
    const formData = new FormData();
    formData.append("title", selectedImage.name);
    formData.append("image", selectedImage);

    fetch("/api/v1/photos/add", {
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

  return (
    <div>
      <CargarImg selectedImage={selectedImage} setSelectedImage={setSelectedImage} fileInputRef={fileInputRef}/>
      <BotonImg
        handleSaveImage={handleSaveImage}
        selectedImage={selectedImage}
      />
    </div>
  );
}

//export default MyFormTextil;

/*
import React, { useState, useRef  } from "react";


export function MyFormTextil() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  function handleSaveImage() {
    const formData = new FormData();
    //formData.append("title", "My Image Title");
    formData.append("title", selectedImage["name"]);
    formData.append("image", selectedImage);

    fetch("/api/v1/photos/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image saved:", data.id);
        setSelectedImage(null); // Establecer la imagen seleccionada como nula
        fileInputRef.current.value = null;
        
      })
      .catch((error) => {
        console.error("Error saving image:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
      });
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleImageChange} ref={fileInputRef}/>
        {selectedImage && (
          <div style={{ width: "100px", height: "auto" }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Imagen seleccionada"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </div>
      <button onClick={handleSaveImage}>Guardar</button>
    </>
  );
}
*/

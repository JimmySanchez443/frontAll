import React from "react";

export function CargarImg({ selectedImage, setSelectedImage, fileInputRef }) {
  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  const handleImageReset = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  
  return (
    <div >
      <input
        type="file"
        placeholder="kol"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleSelectClick}>IMAGEN</button>
      {selectedImage && (
        <div style={{ width: "100px", height: "auto" }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Imagen seleccionada"
            style={{ width: "100%", height: "100%" }}
          />
           <button onClick={handleImageReset}>Quitar</button>
        </div>
      )}
    </div>
  );
}

export default CargarImg;

import React, { useState, useRef } from "react";

export function DragAndDrop({ selectedImage, setSelectedImage, fileInputRef }) {
  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  const handleImageReset = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedImage(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /*const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedImage(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };*/

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "150px",
          height: "150px",
          border: "1px solid black",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Imagen seleccionada"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        ) : (
          <p>Suelta una imagen</p>
        )}
      </div>
      <div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {selectedImage && <button onClick={handleImageReset}>Quitar</button>}
        <button onClick={handleSelectClick}>Imagen</button>
      </div>
    </div>
  );
}

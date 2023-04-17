import React from "react";

function BotonImg({ handleSaveImage, selectedImage  }) {
  return (
    <button onClick={() => handleSaveImage(selectedImage)}>GuardarCOMP</button>
  );
}

export default BotonImg;

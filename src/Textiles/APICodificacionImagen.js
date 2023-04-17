import React from "react";
import Dropzone from "react-dropzone";
var XLSX = require("xlsx");

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      images: [],
    };
  }

  handleDrop = (acceptedFiles) => {
    // Leer el archivo de Excel y extraer las imágenes
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const images = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length >= 2) {
          const imageName = row[1];
          const imageData = row[0].match(/base64,(.*)$/)[1];
          images.push({ name: imageName, data: imageData });
        }
      }

      // Guardar las imágenes en LocalStorage
      images.forEach((image) => {
        localStorage.setItem(image.name, JSON.stringify(image));
      });

      // Actualizar el estado del componente
      this.setState({
        files: acceptedFiles,
        images,
      });
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  };

  render() {
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
              Arrastra y suelta un archivo Excel aquí o haz clic para
              seleccionar uno.
            </p>
            <ul>
              {this.state.files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
            <ul>
              {Object.keys(localStorage).map((key) => {
                const image = JSON.parse(localStorage.getItem(key));
                return <li key={key}>{image.name}</li>;
              })}
            </ul>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default FileInput;

/*import React, { useState, useEffect } from "react";

import imageToBase64 from 'image-to-base64/browser'

var XLSX = require("xlsx");

function FileInput() {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const selectedImageColumn = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false, // Obtener contenido de la celda como texto
      }).map((row) => row[0]);

      console.log('selectedImageColumn',selectedImageColumn);

      Promise.all(
        selectedImageColumn.map((image) =>
          imageToBase64(image.match(/data:image\/\w+;base64,/)[1]) // Extraer contenido base64 de la imagen
        )
      ).then((base64Images) => {
        setImages(base64Images);
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {images.map((image, index) => (
        <img key={index} src={`data:image/png;base64,${image}`} alt={`Image ${index}`} />
      ))}
    </div>
  );
}

export default FileInput;*/

/*import React from "react";
var XLSX = require("xlsx");

export default function FileInput() {
  const [data, setData] = React.useState([]);

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (event) => {
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      //const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
      console.log(rows);

      setData(rows);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
      <table>
        <thead>
          <tr>
            <th>selectedImage</th>
            <th>suppliercatalogno</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td><img src={row.selectedImage} alt="" /></td>
              <td>{row.suppliercatalogno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/

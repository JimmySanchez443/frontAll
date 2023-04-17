
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

function Usuario(){
    const [data, setData] = useState([]);


  useEffect(() => {
         fetch('/api1/v1/usuario')
          .then(response => response.json())
          .then(data => setData(data));
          console.log(data);
      }, []);

      
      function idLog(rowData) {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
          fetch('/api1/v1/delete/usuario/'+rowData.id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(() => {
              // Si la solicitud DELETE es exitosa, actualiza los datos de la tabla
              fetch('/api1/v1/usuario')
                .then(response => response.json())
                .then(data => setData(data));
                
            })
            .catch(error => {
              console.log(error);
            });
        }
      }

   
      const deleteButton = (rowData) => {
        return (
          <Button
            icon="pi pi-trash"
            onClick={()=>idLog(rowData)}
          />
        );
      };
  return (

    <div>
        <div>
            <h1>Tabla de Usuarios</h1>

        </div>

    <div>
    <div className="p-fluid">
       
    <DataTable value={data}>
  <Column field="nombre" header="Nombre"></Column>
  <Column field="username" header="Apellido"></Column>
  <Column field="enabled" header="Activo"></Column>
  <Column field={deleteButton} header="Eliminar"></Column>
</DataTable>
</div>
    </div>
    </div>
 
  );
};

export default Usuario;
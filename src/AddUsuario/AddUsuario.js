import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';

const AddUsuario = () => {
    let[nombre,setNombre]= useState("");  
    let[usuario,setUsuario]=useState("");
    let[password,setPassword] =useState("");
    let[repeatp,setRepeatp] = useState("");
    let[enabled,setEnabled] = useState(true);
    let[admin,setAdmin] = useState(false);
    let[estadoUserName,setEstadoUserName]=useState(true);
    const[data,setData] =useState([]);

    const [showDialog, setShowDialog] = useState(false);
    const [showDialog1, setShowDialog1] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
   //seteo a vacio cuando guardo un usario

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api1/v1/usuario');
      const json = await response.json();
      setData(json); 
      
    };
    fetchData();
  }, []);
  const ultimoRegistro1 = data.slice(-1).pop();

    const handleBorrar=(event)=>{
        setNombre("");
        setUsuario("");
        setPassword("");
        setRepeatp("");
        }
        // evento cuando envio una solicitud post para guaradar un usuario
    function SendRequest(){
        // valido que las contraseñas 
  
        
        
        if((password !== repeatp) ){
            // a priori la variable se encuentra en false 
            setShowDialog(true);
          
        }else if(data.some((usuario1) => usuario1.username === usuario)){
                setShowDialog2(true);
            }
            else{
        
                const ultimoRegistro = data.slice(-1).pop();
                console.log(ultimoRegistro.id);
                if(admin == true){
                    const requestBody={
                        id:(ultimoRegistro.id+1),
                        nombre: nombre,
                        username: usuario,
                        password:password,
                        enabled:enabled,
                        rol:[
                            {
                                id:1
                            }
                        ]
                    };
                    fetch("/api1/v1/usuario",{
                        headers:{
                            "Content-type":"application/json",
                        },
                        method: "post",
                        body: JSON.stringify(requestBody),
                    })
                      .then(response=>{
                        if(response.status == 200){
                            setShowDialog1(true);
                            handleBorrar();
                        }
                      })
                      .then(data => console.log(data));
                }else{
                    const requestBody={
                        id:(ultimoRegistro.id+1),
                        nombre: nombre,
                        username: usuario,
                        password:password,
                        enabled:enabled,
                        rol:[
                            {
                                id:2
                            }
                        ]
                    };
                    fetch("/api1/v1/usuario",{
                        headers:{
                            "Content-type":"application/json",
                        },
                        method: "post",
                        body: JSON.stringify(requestBody),
                    })
                      .then(response=>{
                        if(response.status == 200){
                            setShowDialog1(true);
                            handleBorrar();
                        }
                      })
                      .then(data => console.log(data));
                }
        
      
            }
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una petición AJAX
    // o utilizarlos para actualizar el estado del componente padre, por ejemplo.
  };

  const handleCheckboxChange = (event) => {
    setEnabled(event.checked);
  };

  const handleCheckboxChangeAdmin = (event) => {
    setAdmin(event.checked);
  };  
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-fluid">
        <h1>Ingrese un nuevo Usuario</h1>
        <div className="p-field">
          <label htmlFor="nombre">Nombre:</label>
          <InputText id="nombre" name="nombre" value={nombre} onChange={(event)=>setNombre(event.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="apellido">Usuario:</label>
          <InputText id="apellido" name="apellido" value={usuario} onChange={(event)=>setUsuario(event.target.value)}/>
        </div>
        <div className="p-field">
          <label htmlFor="edad">Contraseña:</label>
          <InputText type="password" id="edad" name="edad" value={password} onChange={(event)=>setPassword(event.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="direccion">Repetir Contraseña:</label>
          <InputText type="password" id="direccion" name="direccion" value={repeatp} onChange={(event)=>setRepeatp(event.target.value)} />
        </div>
        <div className="p-field">
        <label htmlFor="direccion">Usuario activado</label><br/>
        <Checkbox inputId="myCheckbox" value={enabled}checked={enabled} onChange={handleCheckboxChange} />
        </div>
        <div className="p-field">
        <label htmlFor="direccion">Usuario Administrador</label><br/>
        <Checkbox inputId="myCheckbox1" value={admin}checked={admin} onChange={handleCheckboxChangeAdmin} />
        </div>

       
        <div className="p-field">
          <Button label="Guardar" onClick={()=>SendRequest()}  />
        </div>
        <div>
        <Dialog
             visible={showDialog}
             onHide={() => setShowDialog(false)}
                header="Las contraseñas no coinciden"
>
                 <p>Por favor, asegúrate de que las contraseñas sean iguales.</p>
        </Dialog>
        </div>
        <div>
        <Dialog
             visible={showDialog1}
             onHide={() => setShowDialog1(false)}
                header="Usuario Creado Correcto"
>
                 <p>Usuario creado.</p>
        </Dialog>
        </div>
        <div>
        <Dialog
             visible={showDialog2}
             onHide={() => setShowDialog2(false)}
                header="Username ya registrado"
>
                 <p>Por favor ingresa otro nombre de usuario.</p>
        </Dialog>
        </div>
       
      </div>
    </form>
  );
};

export default AddUsuario;
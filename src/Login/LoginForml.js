//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons

import '../Login/Login.css'
import "primeicons/primeicons.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useLocalState } from "../utli/useLocalStorage";



function LoginPage() {
    const[getJwt,setJwt]=useLocalState("","getJwt");
    const[user,setUser]=useLocalState("","user");
    const[nombre,setNombre]=useLocalState("","nombre");
    const[rol,setRol]=useLocalState("","rol");
    const[username,setUsername]= useState("");  
    const[password,setPassword]=useState("");


    function sendLoginRequest(){
       
        console.log("envio una peticion")
        const requestBody={
            username: username,
            password: password,
        };

        
        fetch("/api1/v1/login",{
            headers:{
                "Content-type":"application/json",
            },
            method: "post",
            body: JSON.stringify(requestBody),
        }).then(response=>{
            if (response.status === 200)
            return  Promise.all([response.json(),response.headers]);
        else
            return Promise.reject("Credenciales Invalidas ");
        })
        .then(([body,headers])=>{
            setUser(body['username']);
            setNombre(body['nombre']);
            setJwt(headers.get("authorization"));
            setRol(body.rol[0].authority);
            window.location.href = "dashboard";
        }).catch((message) => {
            alert(message);
        });  
    
    }
    
    return (
        <div className="login-container">
        <div className="login-box">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img src="/manamer.jpg" alt="hyper" height={120} className="mb-1" />
            <div className="text-900 text-3xl font-medium mb-3">Bienvenido a Codificación </div>
            <span className="text-600 font-medium line-height-3">Por favor ingresa</span>
           
        </div>
    
        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Usuario</label>
            <InputText id="usuario" type="text" placeholder="usuario" className="w-full mb-3"
            value={username} 
            onChange={(event)=>setUsername(event.target.value)}
            />
    
            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText type="password" placeholder="Password" className="w-full mb-3"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            />
    
          
            <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={()=>sendLoginRequest()} />
           
        </div>
    </div>
    </div>
    </div>

    );
}




export default LoginPage;  

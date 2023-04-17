import axios from "axios";
import "./EstiloEscala.css";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/saga-blue/theme.css";

export async function Authenticate() {
  try {
    /*const authResponse = await axios.post('https://192.168.246.228:50000/b1s/v1/Login', {

			CompanyDB: process.env.REACT_APP_COMPANY_DB,
			UserName: process.env.REACT_APP_USER_NAME,
			Password: process.env.REACT_APP_PASSWORD

		}, { withCredentials: true });*/

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CompanyDB: process.env.REACT_APP_COMPANY_DB,
        UserName: process.env.REACT_APP_USER_NAME,
        Password: process.env.REACT_APP_PASSWORD,
      }),
      credentials: "include",
    };

    const authResponse = await fetch(
      "https://192.168.246.228:50000/b1s/v1/Login",
      requestOptions
    );
    return authResponse.status;
  } catch (error) {
    //console.log('login', error);
    if (error.response) {
      // si la respuesta incluye un código de error, lo muestra en la consola
      console.log("Error de autenticación:", error.response.status);
    }
    return error.response.status;
  }
}

export async function Logout() {
  try {
    /*await axios.post("https://192.168.246.228:50000/b1s/v1/Logout", null, {
      withCredentials: true,
    });*/
    const requestOptions = {
      method: "POST",
      credentials: "include",
    };

    await fetch("https://192.168.246.228:50000/b1s/v1/Logout", requestOptions);
  } catch (error) {
    console.log("ERROR EN Logout");
  }
}

import React, { useState, useEffect } from "react";
import { Authenticate, Logout } from "./TextilAuth";
import axios from "axios";

export async function UltimoCodBarra() {
  console.log("API BARRA SAP INGRESO");
  try {
    const authToken = await Authenticate();
    console.log(authToken);

    if (authToken === 200) {

        const response = await axios.get(
            "https://192.168.246.228:50000/b1s/v1/Items?$select=ItemCode,BarCode&$filter=startswith(BarCode,'10000014')&$orderby=BarCode desc&$top=1",
            { withCredentials: true }
          );

      return response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await Logout();
  }
}

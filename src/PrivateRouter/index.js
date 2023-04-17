import { Navigate } from "react-router-dom";
import { useLocalState } from "../utli/useLocalStorage"


const PrivateRoute=({ children }) => {
    const [getJwt,setJwt] = useLocalState("","getJwt");
    return getJwt ? children : <Navigate to = "/"/>;

}

export default PrivateRoute;
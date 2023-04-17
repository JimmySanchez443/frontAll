
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/PrincipalForm';
import LoginPage from './Login/LoginForml';
import PrivateRoute from '../src/PrivateRouter/index'


function App() {

  return (
 
      <Routes>
        <Route path='/Dashboard' element = {
        <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>
        }/>
        <Route path='/' element = {<LoginPage/>} />
      </Routes>

  );
}

export default App;

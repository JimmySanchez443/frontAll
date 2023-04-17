import logo from './logo.svg';
import './App.css';
import {Col, Container,Row} from 'reactstrap';
import ListaAnexos from './ListaAnexos';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [anexos, setAnexos]=useState([]);
  
  const cargarAnexos =()=>{
	  axios.get('/api/v1/anexos').then(({data})=>setAnexos(data));
  }
	
  useEffect(cargarAnexos,[]);
	
  return (
    <>
    	<Container>
    		<Row>
    			<Col>
    				<ListaAnexos anexos={anexos} />
    			</Col>
    		</Row>
    	</Container>
    </>
  );
}

export default App;

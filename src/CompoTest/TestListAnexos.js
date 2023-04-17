
const axios = require('axios');
axios.get('http://localhost:8080/api/v1/anexos') //Returning pledges using a get-query
.then((response) => { // Data retrieval and processing
console.log(response.data);})
.catch((error) => { // If the query fails, an error will be displayed on the terminal.
console.error(error);});
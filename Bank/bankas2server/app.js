const express = require('express');
const app = express();

const cors = require('cors');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');


const port = 3009;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/clients', (req, res) => {

  const data = fs.readFileSync('./Data/clients.json', 'utf-8');

  res.json({
    clients: JSON.parse(data),
  });

});


app.post('/clients', (req, res) => {
  
  let data = fs.readFileSync('./Data/clients.json', 'utf-8');
  const client = {...req.body.client};
  data = JSON.parse(data);
  data.push(client);
  data = JSON.stringify(data);
  fs.writeFileSync('./Data/clients.json', data);

  res.json();

});


app.put('/clients/:id', (req, res) => {
  
  let data = fs.readFileSync('./Data/clients.json', 'utf-8');
  data = JSON.parse(data);

  data = data.map(client => client.id === req.params.client.id ? req.body.client : client);

  data = JSON.stringify(data);
  fs.writeFileSync('./Data/clients.json', data);

  res.json();

});


  app.delete('/clients/:id', (req, res) => {
 
    let data = fs.readFileSync('./Data/clients.json', 'utf-8');
    data = JSON.parse(data);
    data = data.filter(client => client.id !== req.params.id);
    data = JSON.stringify(data);
    fs.writeFileSync('./Data/clients.json', data);
  
    res.json();


});


app.listen(port, () => {
  console.log(`Bank server on port ${port}`);
});
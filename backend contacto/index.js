// index.js
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contacts');
const cors = require('cors');
app.use(cors());


app.use(express.json()); // Middleware para JSON
app.use('/contacts', contactRoutes); // Prefijo para rutas de contactos

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Bienvenido a la Agenda de Contactos API');
});

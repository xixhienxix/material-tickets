const express = require('express');
// const  multipart  =  require('connect-multiparty');
const bodyParser = require('body-parser')
// const multer = require('multer')
const cors = require('cors');


const ticketsController = require('./controllers/tickets')
const campanasController = require('./controllers/campanas')
const plantelController = require('./controllers/plantel')
const areasController = require('./controllers/areas')
const usuariosController = require('./controllers/usuarios')
const preguntasController = require('./controllers/preguntas')
const loginController = require('./controllers/login')



// Create an instance of the http server to handle HTTP requests
const app = express();

app.use(cors());

// Start the server on port 3000
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (request, response) => {
    response.send({
        message: 'Bienvenido a la API!'
    });
});

app.get('/api',(request,response)=>{
    response.send("V.3.0.0 16/12/2021");
});

//Tickets
app.get('/api/tickets',ticketsController.getTickets)
app.get('/api/tickets/:id',ticketsController.getTicketsByID)
app.post('/api/tickets',ticketsController.postTickets)
app.put('/api/tickets',ticketsController.actualizaTickets)
app.post('/api/tickets',ticketsController.completarTicket)

//Campanas
app.get('/api/campanas',campanasController.getCampanas)
app.get('/api/campana/:id',campanasController.getCampanasByID)

//Planteles
app.get('/api/plantel',plantelController.getPlanteles)

//Areas
app.get('/api/areas',areasController.getAreas)

//Usuarios
app.get('/api/usuarios',usuariosController.getUsuarios)
app.get('/api/usuario/:usuario',usuariosController.getUsuariosByID)
app.post('/api/usuario/nuevo',usuariosController.nuevoUsuario)

//Preguntas
app.get('/api/preguntas',preguntasController.getPreguntas)

//Login
app.post('/api/change',loginController.cambioPassword)
app.post('/api/conectado/:id',loginController.conectado)
app.post('/api/desconectado/:id',loginController.desconectado)
app.delete('/users/:id',loginController.borrarUsuario)
app.post('/api/signup',loginController.registro)
// app.post('/api/signup/:id',loginController.registroByID)
app.post('/api/register',loginController.signup)
app.post('/api/login',loginController.login)

app.use(function(error, req, res, next){
    res.json(error);
  });
  
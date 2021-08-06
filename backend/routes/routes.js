// Load the MySQL pool connection
const pool_prod = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Invalid GET!'
        });
    });

    app.get('/api/campanas', (request, response) => {
        pool.query('SELECT * FROM campanas', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/api/campana/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM campanas WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    //TICKETS
    app.get('/api/tickets', (request, response) => {
        pool.query('SELECT * FROM tickets', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/api/tickets/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM tickets WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/api/tickets', (req, response) => {
        const fecha_Inicio=new Date(req.body.Fecha_Inicio)
        const fecha_Fin=new Date(req.body.Fecha_Fin)
        const fecha_Seguimeinto=new Date(req.body.Fecha_Seguimeinto)

        const fecha_InicioSQL = fecha_Inicio.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_FinSQL = fecha_Fin.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_SeguimientoSQL = fecha_Seguimeinto.toJSON().slice(0, 19).replace('T', ' ');

        var sql = ('INSERT INTO tickets (Descripcion,'
        +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
        +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto,Color)'
        +'VALUES ?');

        var values = [
            [req.body.Descripcion,req.body.Estatus,
            req.body.Responsable,req.body.Supervisado,
            req.body.Creado_Por,fecha_InicioSQL,
            fecha_FinSQL,fecha_SeguimientoSQL,
            req.body.Hora_Abierto,req.body.Color],
          ];

        pool.query(sql,[values], function (err, result) {
          if (err){

            response.status(400).json({
                message: err
              });
          } else

          response.status(201).json({
            result
          });
          console.log("1 record inserted");
        });
    });

    // Update an existing user
    app.put('/api/tickets', (request, response) => {
        const id = request.body.ID;
        const color = request.body.Color;
        var sql = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
        var values = request.body.Color

        pool.query(sql,[values], function (err, result) {
            if (err){
  
              response.status(400).json({
                  message: err
                });
            } else
  
            response.status(201).json({
              result
            });
            console.log("1 record inserted");
          });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });

    // app.use(function(req, res) {
    //     res.redirect('/')
    // });
}

// Export the router
module.exports = router;
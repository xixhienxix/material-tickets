const conn = require('../functions/conections')

exports.getTickets = async (req,res,next) =>
{

    conn.stablishedConnection().then((db)=>{
        db.query('SELECT * FROM tickets', (error, result) => {
            if (error) {res.status(400).send(error)}
else{
    res.status(200).send(result);

}
        });
        conn.closeDbConnection(db)
})
}

exports.getTicketsByID = async (req,res,next) =>
{
 
    conn.stablishedConnection().then((db)=>{
        const id = req.params.id;

        db.query('SELECT * FROM tickets WHERE id = ?', id, (error, result) => {
            if (error) {res.status(400).send(error)}
            else {
                res.status(200).send(result);
            }
        });
        conn.closeDbConnection(db)
    })

}

exports.postTickets = async (req,res,next) =>
{
 
    
    conn.stablishedConnection().then((db)=>{
        const fecha_Inicio=new Date(req.body.tickets.Fecha_Inicio)
        const fecha_Fin=new Date(req.body.tickets.Fecha_Fin)
        const fecha_Seguimeinto=new Date(req.body.tickets.Fecha_Seguimeinto)

        const fecha_InicioSQL = fecha_Inicio.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_FinSQL = fecha_Fin.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_SeguimientoSQL = fecha_Seguimeinto.toJSON().slice(0, 19).replace('T', ' ');

        var sql = ('INSERT INTO tickets (Area,Descripcion,'
        +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
        +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto,Color)'
        +'VALUES ?');

        var values = [
            [req.body.tickets.Area,
            req.body.tickets.Descripcion,req.body.tickets.Estatus,
            req.body.tickets.Responsable,req.body.tickets.Supervisado,
            req.body.tickets.Creado_Por,fecha_InicioSQL,
            fecha_FinSQL,fecha_SeguimientoSQL,
            req.body.tickets.Hora_Abierto,req.body.tickets.Color],
          ];

          db.query(sql,[values], function (err, result) {
          if (err){

            res.status(400).json({
                message: err
              });
          } else

            conn.email(req.body.receptor,req.body.tickets.Responsable,req.body.tickets.Descripcion)
          
            res.status(201).json({
            result
          });
        });
        conn.closeDbConnection(db)
    })


}

exports.actualizaTickets = async (req,res,next) =>
{
 
    conn.stablishedConnection().then((db)=>{
        const id = req.body.ID;
        const color = req.body.Color;
        var sql = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
        var values = req.body.Color

        db.query(sql,[values], function (err, result) {
            if (err){
  
              res.status(400).json({
                  message: err
                });
            } else
  
            res.status(201).json({
              result
            });

        });
        conn.closeDbConnection(db)
    })


}

exports.completarTicket = async (req,res,next) =>
{
 
    conn.stablishedConnection().then((db)=>{ 
        const id = req.params.id;
        const desc = req.body.descripcionCompletado;
        var sql = ('UPDATE tickets SET Estatus = ? WHERE id = '+id+'');
        var sql2 = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
        var sql3 = ('UPDATE tickets SET Fecha_Fin = ? WHERE id = '+id+'');
        var sql4 = ('UPDATE tickets SET nota_completado = ? WHERE id = '+id+'');
        var values = '#FFFFFF';
        var values1 = 0;
        var fechaFin = new Date();

        db.query(sql,[values1], function (err, result) {
            if (err){
                    console.log(err)
            } else
            console.log("estatus Actualizado ID: ",id );
          });
        db.query(sql2,[values], function (err, result) {
            if (err){
                    console.log(err)
            } else
            console.log("Tarea completada ID: ",id);
            res.status(201).json({
                result
                });
            });  
            db.query(sql3,[fechaFin], function (err, result) {
                if (err){
                        console.log(err)
                } else
                console.log("estatus Actualizado ID: ",id );
            });
            db.query(sql4,[desc], function (err, result) {
                if (err){
                        console.log(err)
                } else
                console.log("desc Actualizada ID: ",id );
            });
        conn.closeDbConnection(db)
    })

}
const conn = require('../functions/conections')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const private_key='b8b96d8661599441631edc161db8d15c'

exports.cambioPassword = async (req,res,next) =>
{


    conn.stablishedConnection().then((db)=>{
        const user = req.body.ID
        const nueva = req.body.nueva
        var sql = ('update usuarios set password = ? where ID = ? ;');
        db.query(sql,[nueva,user], function (err, result) {
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

exports.conectado = async (req,res,next) =>
{

    conn.stablishedConnection().then((db)=>{
        var sql = ('UPDATE usuarios SET conectado = true WHERE ID = ?');

        var values = [
            [req.params.id],
          ];

          db.query(sql,[values], function (err, result) {
          if (err){

            res.status(400).json({
                message: err
              });
          } else

          res.status(201).json({
            result
          });
          console.log("Usuario Coenctado");
        });
        conn.closeDbConnection(db)
    })
}

exports.desconectado = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        var sql = ('UPDATE usuarios SET conectado = false WHERE ID= ?');

    var values = [
        [req.params.id],
      ];

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

exports.borrarUsuario = async (req,res,next) =>
{
 
    conn.stablishedConnection().then((db)=>{
        const id = req.params.id;

        db.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) {res.status(400).send(error)}
            else { res.status(200).send('User deleted.');   }
        });
        conn.closeDbConnection(db)
    })
}

exports.registro = async (req,res,next) =>
{
 
    conn.stablishedConnection().then((db)=>{
        const user = req.body.password
        const email = req.body.email

        var sql = ('INSERT INTO tickets (Area,Descripcion,'
        +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
        +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto,Color)'
        +'VALUES ?');

        var values = [
            [req.body.Area,
            req.body.Descripcion,req.body.Estatus,
            req.body.Responsable,req.body.Supervisado,
            req.body.Creado_Por,fecha_InicioSQL,
            fecha_FinSQL,fecha_SeguimientoSQL,
            req.body.Hora_Abierto,req.body.Color],
          ];

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

// exports.registroByID = async (req,res,next) =>
// {
//     var id=req.params.id
//     conn.stablishedConnection().then((db)=>{

//         var sql = ('INSERT into usuarios (Nombre,) ? WHERE id = '+id+'');
//         var sql2 = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
//         var values = '#FFFFFF'
//         var values1 = 0

//         db.query(sql,[values1], function (err, result) {
//             if (err){
//                     console.log(err)
//             } else
//             console.log("estatus Actualizado ID: ",id );
//           });
//           db.query(sql2,[values], function (err, result) {
//             if (err){
//                     console.log(err)
//             } else
//             console.log("Tarea completada ID: ",id);
//             res.status(201).json({
//                 result
//           });
//         });  
//         conn.closeDbConnection(db)
//     })
// }

exports.signup = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        let user = {
            ID:undefined,
            Nombre:req.body.nombre,
            Area:req.body.area,
            Rol:'Usuario',
            Usuario:req.body.usuario,
            Password:bcrypt.hashSync(req.body.password),
        }
    var sql = 'INSERT INTO usuarios (Nombre,Area,Rol,Usuario,Password,conectado) VALUES (?,?,?,?,?,?)'

        db.query(sql,[req.body.nombre,req.body.area,'Usuario',req.body.usuario,user.Password],(err,result)=>{
            if(err){
                res.status(500).send('Algo Salio Mal')
            }
            console.log(result)

            const expiresIn=24*60*60
            const accessToken= jwt.sign({id:result.ID,nombre:result.usuario,password:result.password},private_key,{expiresIn:expiresIn})
            user.expiresIn=expiresIn
            user.accesToken=accessToken
            
            res.send({user})
        })
      
        conn.closeDbConnection(db)
    })
  
}

exports.login = async (req,res,next) =>
{
    
    conn.stablishedConnection().then((db)=>{
        
        const expiresIn = 60*60*60*6
        var sqlquery="SELECT * FROM usuarios where Usuario=? AND Password=?"

        db.query(sqlquery,[req.body.usuario,req.body.password],function (err, rows) {
            if(rows.length>0)
            {
                result = rows[0];

                jwt.sign({id:result.ID,user:result.Usuario,password:result.Password},private_key,{expiresIn:expiresIn},
                    (err,accesToken)=>{
                    if(err){
                        res.status(409).send('Algo Salio mal')
                    }
    
                    result.conectado=true,
                    result.accessToken=accesToken
                    result.expiresIn=expiresIn
                    res.status(200).send(result);
    
                })
            }
            else
            {
                res.status(409).send('Algo Salio mal')  
            }
            
        })

        conn.closeDbConnection(db)
    })
  
}
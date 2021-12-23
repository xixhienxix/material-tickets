const conn = require('../functions/conections')

exports.getUsuarios = async (req,res,next) =>
{
        conn.stablishedConnection().then((db)=>{
            db.query('SELECT * FROM usuarios', (error, result) => {
                if (error) {
                    res.status(400).send(error)
                }
                else {
                    res.status(200).send(result);
                }
                closeDbConnection(db);
            });
        })
}

exports.getUsuariosByID = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        var values = req.params.usuario
        var sql ='SELECT * FROM usuarios WHERE Usuario=?'

        db.query(sql,[values], function (err, result) {
            if (err){
  
              res.status(400).json({
                  message: err
                });
            } else
                res.status(200).send(result)
            });
            conn.closeDbConnection(db)
    })
}

exports.nuevoUsuario = async (req,res,next) =>
{
    
    conn.stablishedConnection().then((db)=>{
        var sqlSearch=("Select * From usuarios where Usuario = ? ")
        var values2 =[req.body.Usuario]

        var sql = ('INSERT INTO usuarios (Nombre,Area,'
        +'Rol,Usuario,plantel,Password,Puesto)'
        +'VALUES ?');

        var sqlUpdate = ("UPDATE usuarios SET Nombre=?,Area=?,Rol=?,Usuario=?,Plantel=?,Password=?,Puesto=? WHERE Usuario=?")
        var updateParams =[req.body.Nombre,
            req.body.Area,
            req.body.Rol,
            req.body.Usuario,
            req.body.plantel,
            req.body.Password,
            req.body.Puesto,
            req.body.Usuario]

        db.query(sqlSearch,[values2],function (err,result) {
            if(err){
                res.status(403).send(err)
            }
            
            if(result.length==0)
            {
            var values = [
                [req.body.Nombre,
                    req.body.Area,
                    req.body.Rol,
                    req.body.Usuario,
                    req.body.plantel,
                    req.body.Password,
                    req.body.Puesto],
              ];
              
              db.query(sql,[values], function (err, result) {
                if (err){
      
                  res.status(400).json({
                      message: err
                    });
                } else
                    res.status(200).send(result)
                });
                closeDbConnection(db)

            }

            else {
                db.query(sqlUpdate,updateParams, (error,result)=>{
                    if(error){
                        
                  res.status(400).json({
                    message: error
                  });
                    }else{
                        res.status(200).send(result)

                    }
                    closeDbConnection(db)

                })
            }
        })
    })
}
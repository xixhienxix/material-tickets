const conn = require('../functions/conections')

exports.getPreguntas = async (req,res,next) =>
{

    conn.stablishedConnection().then((db)=>{
        db.query('SELECT * FROM preguntas', (error, result) => {
            if (error) { res.status(400).send(error)}
        else
            { res.status(200).send(result);}
    });
        conn.closeDbConnection(db)
    })
}
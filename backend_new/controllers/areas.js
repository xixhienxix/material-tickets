const conn = require('../functions/conections')

exports.getAreas = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        db.query('SELECT * FROM areas', (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
                resizeTo.send(result);

                conn.closeDbConnection(db);
        });
    })
}
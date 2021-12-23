const conn = require('../functions/conections')

exports.getAreas = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        db.query('SELECT * FROM areas', (error, result) => {
            if (error) {
                response.status(500).send(error)
            }
                resolve.send(result);

                conn.closeDbConnection(db);
        });
    })
}
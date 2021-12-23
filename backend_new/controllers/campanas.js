const conn = require('../functions/conections')

exports.getCampanas = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        db.query('SELECT * FROM campanas', (error, result) => {
            if (error) throw error;
            conn.closeDbConnection(db)
            res.send(result);
        });
    })
}

exports.getCampanasByID = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        const id = request.params.id;

        db.query('SELECT * FROM campanas WHERE id = ?', id, (error, result) => {
            if (error) {
                res.status(400).send(error)
            }
            else {
                res.status(200).send(result);

            }
        });
        conn.closeDbConnection(db)
    })
}
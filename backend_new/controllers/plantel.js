const conn = require('../functions/conections')

exports.getPlanteles = async (req,res,next) =>
{
    conn.stablishedConnection().then((db)=>{
        db.query('SELECT DISTINCT plantel from usuarios', (error,rows)=>{
  
          let result=[]
  
          if(error){
              res.status(400).send(error);
              conn.closeDbConnection(db)
          }else
          for(let i=0;i<rows.length;i++)
          { 
              result.push(rows[i]);
          }
          conn.closeDbConnection(db)
          res.status(200).send(result)
      })
  
      })
}
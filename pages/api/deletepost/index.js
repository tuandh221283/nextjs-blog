import excuteQuery from '../../../lib/db';

export default async (req, res) => {
    try {
      //  console.log("req nom", req.query.id)
      const result = await excuteQuery({
          query: 'DELETE FROM post WHERE id = ?',
          values: [req.query.id],
      });
      //console.log( "ttt",result );	  
	  res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'max-age=180000');
		res.end(JSON.stringify(result));	  	
	  } catch ( error ) {
		  res.json(error);
			res.status(405).end();
	  }  
  
  }
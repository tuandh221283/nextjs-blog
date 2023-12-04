import excuteQuery from '../../../lib/db';

export default async (req, res) => {
    try {
      //  console.log("req nom", req.query.id)
      const result = await excuteQuery({
          query: 'SELECT id, title, content FROM post WHERE title LIKE ?',
          values: [req.query.id],
      });
      //console.log( "ttt",result );
	  if (result.length > 0){
	  res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'max-age=180000');
		res.end(JSON.stringify(result[0]));	  
	} else {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Cache-Control', 'max-age=180000');
		res.end(JSON.stringify(result));	 
	}
	  } catch ( error ) {
		  res.json(error);
			res.status(405).end();
	  }  
  
  }
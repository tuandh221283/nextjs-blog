import excuteQuery from '../../../lib/db';

export default async (req, res) => {
    try {
        //console.log("req nom", req.body)
      const result = await excuteQuery({
          query: 'SELECT id, name FROM category ORDER BY name ASC',
          values: [],
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
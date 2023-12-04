import excuteQuery from '../../../lib/db';

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
		let query = 'WHERE 1=1';
		let cateid = '';
		if (req.body.selectcate && req.body.selectcate != '0') {
			query = 'WHERE category_id=?';
			cateid = req.body.selectcate;
		}
		
      const result = await excuteQuery({
          query: 'SELECT id, title, content FROM post '+query+' ORDER BY id DESC',
          values: [req.body.selectcate],
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
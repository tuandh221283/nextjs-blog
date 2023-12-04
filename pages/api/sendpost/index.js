import excuteQuery from '../../../lib/db';

export default async (req, res) => {
    try {     
		let sql = {};
		if (req.body.id == 0) {			
			sql = {
			  query: 'INSERT INTO post(category_id, content,title) VALUES(?,?,?)',
			  values: [req.body.category_id, req.body.content, req.body.title],
		  };
		  
		} else {			
			sql = {
			  query: 'UPDATE post SET title=?, content=?, category_id=? WHERE  id=?',
			  values: [req.body.title, req.body.content, req.body.category_id, req.body.id],
		  };
		}
		
		const result = await excuteQuery(sql);
      //console.log( "ttt",result );
	  } catch ( error ) {
		  console.log( error );
	  }  
  
  }
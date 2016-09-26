const mysql = require("mysql");

declare var Promise:any;

function postComment (props:any) {
    return new Promise( (resolve:any,reject:any) => {

        let conn = mysql.createConnection(props.credentials);

        conn.connect(null);

        let insert = {
            comment_author:props.data.name,
            comment_author_email:props.data.email,
            comment_post_ID:props.data.id,
            comment_content:props.data.message,
            comment_date:new Date()
        };

        conn.query('INSERT INTO wp_ej_comments SET ?', insert, (err:any, result:any) => {

            if(err){reject(err);}

            conn.query( 'SELECT comment_ID, comment_post_ID, comment_author, comment_author_email, comment_date, comment_content ' +
                        'FROM wp_ej_comments WHERE comment_id = ? LIMIT 1', result.insertId, (err:any, commentResult:any) => {

                if(err){reject(err);}

                conn.end();

                resolve(commentResult[0]);

            });
        });
    })
}
export {postComment}
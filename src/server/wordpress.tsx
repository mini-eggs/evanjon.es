declare var Promise:any;

export default function (props:any): any {

    return new Promise( function (resolve:any,reject:any) {

        let mysql = require('mysql');

        // let Twitter = require('twitter-js-client').Twitter;
        //
        // let config = {
        //     "consumerKey": "VMdiS4ETh8l7TmGVSU71kt2x5",
        //     "consumerSecret": "XoP0QZNGz9Fn8Z3MQoqX8nHsA2A3k42ugu7sXbDSAqaQLER1M4",
        //     "accessToken": "3302668028-ACrvwPsa841rD985DcDZiZklxyblDZiS5qMGEwz",
        //     "accessTokenSecret": "ho0sfANhkuHJaHNQvWgKVE37N5L4fdwnFIyIxsxWOkgWG",
        //     "callBackUrl": "http://evanjon.es/"
        // };
        //
        // let twitter = new Twitter(config);

        let conn = mysql.createConnection(props),
            prefix : string = 'wp_ej_';

        conn.connect();

        interface WordpressObj {
            pages: any;
            posts: any;
            homepage: any;
            error: any;
            comments: any;
            twitter:any;
        }

        let wordpress: WordpressObj = {
            pages: [],
            posts: [],
            homepage: null,
            error: null,
            comments:null,
            twitter:[]
        };

        let query: string = "SELECT post_parent, guid as post_image FROM `wp_mi_posts` WHERE post_type = 'attachment'";

        conn.query(query, function(err:any, imageRows:any, fields:any) {

            if (err) reject(err);

            query = "SELECT * FROM `" + prefix + "posts` WHERE post_status = 'publish'";

            conn.query(query, function(err:any, rows:any, fields:any) {

                if (err) reject(err);

                for(var e = 0; e < rows.length; e++) {

                    var row = rows[e];

                    if(row.post_title == 'Homepage') {

                        wordpress.homepage = row;

                    } else if(row.post_title == 'Error') {

                        wordpress.error = row;

                    } else if(row.post_type == 'page') {

                        wordpress.pages.push(row);

                    } else if(row.post_type == 'post') {

                        for(var i = 0; i < imageRows.length; i++) {

                            var imageRow = imageRows[i];

                            if(row.ID == imageRow.post_parent) {
                                row['post_image'] = imageRow.post_image;
                            }

                        }
                        wordpress.posts.push(row);
                    }
                }

                query = "SELECT comment_ID, comment_post_ID, comment_author, comment_author_email, comment_date, comment_content FROM `" + prefix + "comments`";

                conn.query(query, function(err:any, commentRows:any, commentFields:any) {

                    if (err) reject(err);

                    wordpress.comments = commentRows;

                    // twitter.getUserTimeline({ screen_name: 'minieggs40', count: '3'}, function (err:any) {
                    //
                    //     reject(err);
                    //
                    // }, function (twitterData:any) {
                    //
                    //     twitterData = JSON.parse(twitterData);
                    //
                    //     for(let e=0;e<twitterData.length;e++){
                    //
                    //         let tweet = twitterData[e];
                    //
                    //         wordpress.twitter.push({
                    //             id: tweet.id,
                    //             user: {
                    //                 name: tweet.user.name,
                    //                 screen_name: tweet.user.screen_name,
                    //                 profile_image_url: tweet.user.profile_image_url
                    //             },
                    //             text: tweet.text,
                    //             created_at: tweet.created_at,
                    //             favorite_count: tweet.favorite_count,
                    //             retweet_count: tweet.retweet_count
                    //         });
                    //     }

                    resolve(wordpress);

                    conn.end();

                    // });
                });
            });
        });
    });
}
declare var __WORDPRESS__:any; //typescript cheat
declare var Headers:any;
declare var Request:any;
declare var fetch:any;
declare var Promise:any;

function wordpress () :any {

    var wordpress:any;

    if(typeof window == 'undefined') {
        wordpress = JSON.parse(process.env.CUSTOM_DATA);
    } else {
        wordpress = __WORDPRESS__;
    }
    return wordpress
}
export{wordpress}

function addComment(comment:any){
    var wordpress = __WORDPRESS__;
    wordpress.comments.push(comment);
    __WORDPRESS__ = wordpress;
}
export {addComment}

function request (type:string, data:any):any{

    return new Promise( function (resolve:any,reject:any) {

        var url = window.location.href;
        var arr = url.split("/");
        var host = arr[0] + "//" + arr[2];

        var headersObj = new Headers();
        headersObj.set('Content-Type', 'application/json');

        var requestObj = new Request(
            host + '/api/' + type, {
                method: 'POST',
                body:JSON.stringify(data),
                bodyUsed:true,
                headers: headersObj
            });

        fetch(requestObj).then( function (data:any) {
            data.json().then( function (json:any) {
                if(parseInt(json.status) > 0) {
                    resolve(json.text);
                } else {
                    reject(json.text)
                }
            }).catch( function ( err:any ) {
                reject(err);
            });
        }).catch( function (err:any) {
            reject(err);
        });
    });
}
export {request}
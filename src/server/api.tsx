import {postComment} from './content'

declare var Promise:any;

export default function(props:any):any {

    return new Promise( (resolve:any,reject:any) => {

        let creds = props.credentials,
            req = props.req,
            res = props.res;

        let type = req.url.split('/')[2];

        switch(type){
            case"postComment":
                postComment({credentials:creds, data:req.body}).then( (data:any) => {
                    resolve({status:1, text:data})
                }).catch( (err:any) => {
                    resolve({status:-1, text:err})
                });
                break;
            default:
                resolve({status:-1, text:'No data'});
                break;
        }

    })
}
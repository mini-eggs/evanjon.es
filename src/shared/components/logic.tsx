import {wordpress} from '../fetch'

function matchPage (url:string) {
    let type = url.split('/')[1],
        urlString = url.split('/')[2],
        wp = wordpress();
    for(let e=0; e < wp[type].length; e++){
        let item = wp[type][e];
        if(item.post_name == urlString) {
            return item;
        }
    }
    return {post_content:'Not found'};
}
export {matchPage}

function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export {capitalizeFirstLetter}

function merge (arr:any) :string {
    let classes:any=[];
    for(let e=0;e<arr.length;e++){
        classes.push(arr[e]);
    }
    return classes.join(' ');
}
export {merge}
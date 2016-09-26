import * as React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import routes from "../shared/routes";
import "../shared/favicon.ico";
import creds from './credentials'
import wordpress from './wordpress'
import api from './api'
import renderHTML from './html'

declare var Promise:any;

function serverSideRendering(req: any, res: any) {

	wordpress(creds).then(function(data:any)  {

		process.env['CUSTOM_DATA'] = JSON.stringify(data);

		match({ routes, location: req.url }, function(error: any, redirectLocation: any, renderProps: any) {
			if(error) {
				res.status(500).send(error.message);
			} else if(redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if(renderProps) {
				res.status(200).send(renderHTML(renderToString(<RouterContext {...renderProps} />), data));
			} else {
				res.status(404).send("Not found");
			}
		});

	}).catch( function (err:any) {

		res.status(404).send(JSON.stringify(err));

	});
}
export {serverSideRendering}

function getApiHandle(req:any, res:any) {
	return new Promise( function (resolve:any,reject:any) {
		api({credentials:creds, req:req, re:res}).then( function (data:any) {
			resolve(data);
		});
	});
}
export {getApiHandle}
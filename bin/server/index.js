const express = require("express");
const compress = require("compression");
const path = require("path");
const serverHandle = require("../../dist/server/server.bundle.js");
const server = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(compress({ threshold: 0 }));
server.use(express.static(path.resolve(__dirname, "..", "..", "dist", "client")));

server.use(function(req, res) {
	if(req.url.indexOf('/api/') > -1) {
		serverHandle.getApiHandle(req,res).then(function(data){
			res.end(JSON.stringify(data));
		});
	} else {
		serverHandle.serverSideRendering(req, res);
	}
});

server.listen(port, function() {
	var host = this.address().address;
	console.log("Server launched at http://%s:%s", host, port);
});

var webpack = require("webpack");
var ProgressPlugin = require("webpack/lib/ProgressPlugin");
var config = require("../../config/webpack.prod.js");
var readline = require('readline');

var compiler = webpack(config);

compiler.apply(new ProgressPlugin(function(percentage, log) {
	readline.clearLine();
	readline.cursorTo(0);
	process.stdout.write(Math.floor(percentage * 100) + "% " + log);
}));

compiler.run(function(err, stats) {
	if(err) { return console.error(err.message); }
	console.log(stats.toString({colors: true}));
});

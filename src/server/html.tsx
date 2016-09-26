export default function (componentHTML: any, wordpressData:any) {

    var html:string;

    if(process.env.NODE_ENV === "production")
        html = `<!DOCTYPE html>
            <html>
            
                <head>
                      <meta charset="UTF-8">
                      <title>Evan Jones</title>
                      <meta name="google-site-verification" content="lCEpTMeskTkf-kqgeJPjnVoYFnMSzFZjNwEVY0GHz8w" />
                      <meta content="IE=edge" http-equiv="X-UA-Compatible">
                      <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport">
                      <meta name="description" content="Web Developer">
                      <meta name="keywords" content="web, development, programming, react, vue, node, angular, javascript, typescript, php, computer, science">
                      <meta name="google-site-verification" content="lCEpTMeskTkf-kqgeJPjnVoYFnMSzFZjNwEVY0GHz8w" />
                      <meta name="copyright" content="Evan Jones">
                      <meta name="author" content="http://www.evanjon.es/">
                      <meta property="og:url"                content="http://www.evanjon.es/" />
                      <meta property="og:type"               content="website" />
                      <meta property="og:title"              content="Evan Jones" />
                      <meta property="og:description"        content="Web Developer" />
                      <meta property="og:image"              content="http://i.imgur.com/ZsLa6WO.png" />
                      <meta name="twitter:card" content="summary" />
                      <meta name="twitter:site" content="http://www.evanjon.es/" />
                      <meta name="twitter:creator" content="http://www.evanjon.es/" />
                      <link rel="stylesheet" href="/client.bundle.css">
                </head>
                <body>
                    <div id="app">${componentHTML}</div>
                    <script>__WORDPRESS__ = ${JSON.stringify(wordpressData)}</script>
                    <script src="/client.bundle.js"></script>
                </body>
            </html>`;
    else
        html = `<!DOCTYPE html>
            <html>
            
                <head>
                      <meta charset="UTF-8">
                      <title>Evan Jones</title>
                      <meta name="google-site-verification" content="lCEpTMeskTkf-kqgeJPjnVoYFnMSzFZjNwEVY0GHz8w" />
                      <meta content="IE=edge" http-equiv="X-UA-Compatible">
                      <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport">
                      <meta name="description" content="Web Developer">
                      <meta name="keywords" content="web, development, programming, react, vue, node, angular, javascript, typescript, php, computer, science">
                      <meta name="google-site-verification" content="lCEpTMeskTkf-kqgeJPjnVoYFnMSzFZjNwEVY0GHz8w" />
                      <meta name="copyright" content="Evan Jones">
                      <meta name="author" content="http://www.evanjon.es/">
                      <meta property="og:url"                content="http://www.evanjon.es/" />
                      <meta property="og:type"               content="website" />
                      <meta property="og:title"              content="Evan Jones" />
                      <meta property="og:description"        content="Web Developer" />
                      <meta property="og:image"              content="http://i.imgur.com/ZsLa6WO.png" />
                      <meta name="twitter:card" content="summary" />
                      <meta name="twitter:site" content="http://www.evanjon.es/" />
                      <meta name="twitter:creator" content="http://www.evanjon.es/" />
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="sha384-2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">
                      <style>@media(max-width:544px){.container {padding:0!important;}}</style>
                </head>
            
                <body>
                    <div id="app">${componentHTML}</div>
                    <script>__WORDPRESS__ = ${JSON.stringify(wordpressData)}</script>
                    <script src="http://localhost:8081/client.bundle.js"></script>
                </body>
            </html>`;





    var minify = require('html-minifier').minify;

    var options = {
        minifyCSS:true,
        minifyJS:true,
        removeComments:true,
        removeEmptyAttributes:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        collapseWhitespace:true,
        collapseInlineTagWhitespace:true,
    };

    return minify(html, options);
}
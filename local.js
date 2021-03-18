var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/wt', express.static(path.join(__dirname, 'walkthrough')));
app.use('/mindmap', express.static(path.join(__dirname, 'mindmap')));
app.use('/module', express.static(path.join(__dirname, 'module')));
app.get('/', function(req, res){
	console.log("method in get/: " + req.method);
    var qs = require('querystring');
   res.send("Hello World!");
});

app.post("/", function(req, res){
	var body = '';
	const regex = /!\[(.*?)\]\((.*?)\)/g;
	var m;
	var printResult = ( array ) => {
		var aResult = [];
    	var url = array[2];
    	var splited = url.split(".");
    	var oResult = {
    		"localFile": array[1] + "." + splited[splited.length-1],
    		"fileUrl": url
    	};
		aResult.push(oResult);
		return aResult;
	};
	req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

    req.on('end', function () {
            var post = qs.parse(body);
            var aResult = [];
            // res.send("your request is: " + post.markdown_source);
            while ((m = regex.exec(post.markdown_source)) !== null) {
    			if (m.index === regex.lastIndex) {
        			regex.lastIndex++;
    			}
    			aResult = aResult.concat(printResult(m));
    		}
    		console.log(aResult);
    		res.json(aResult);
    	});
	});
app.listen(process.env.PORT || 3000, function(){
     console.log("Example app listens on port 3000.");
});

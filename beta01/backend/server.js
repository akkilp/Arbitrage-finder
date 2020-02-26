const request = require('request');

request('http://hltv.com', function(err, res, body) {  
    console.log(body);
});
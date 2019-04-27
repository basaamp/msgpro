var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };
http.createServer(function (req, res) {
	var ioio = querystring.parse(req.url);
	//console.log(ioio.name + ioio.password)
	var signup = 'true';
res.writeHead(200, headers);
fs.readFile(path.join(__dirname, 'users.json'), {encoding: 'utf-8'}, function (err, data) {
if (err) throw err;
var users = JSON.parse(data)
var usersio = users;
var signup = 'true';
{
users.map((userarray, keys) => {
//users[keys].name === ioio.name && users[keys].password === ioio.password ? console.log(users[keys].password+ 222222) : false
if (users[keys].name === ioio.name && users[keys].password === ioio.password && ioio.signup === "false") {
	fs.readFile(path.join(__dirname, 'messages.json'), {encoding: 'utf-8'}, function (err, dataio) {
if (err) throw err;

//res.end(dataio);
var usersio = JSON.parse(dataio);
//console.log('userinfo correct')
usersio.splice(users.length, 0, {"username":users[keys].name,"messages": ioio.msgtxt})

 var userswrite = JSON.stringify(usersio);

 ioio.signup = 'false'; 
 if(ioio.msgtxt !== "" ) {
 fs.writeFile('messages.json', userswrite, function (err) {
if (err) throw err;
//console.log('Writing is done.');
fs.readFile(path.join(__dirname, 'messages.json'), {encoding: 'utf-8'}, function (err, dataio2) {
if (err) throw err;
res.end(dataio2);
console.log(dataio2)
});
});
 
 }
 
else {
	res.end(dataio)
}
});


} 
else if (ioio.signup === 'false') {
	
	//console.log('username and password didnt match')

}
	
	if(ioio.signup === 'true') {
		
usersio.splice(users.length, 0, {"name": ioio.name, "password": ioio.password})
// console.log(usersio)
 var userswrite = JSON.stringify(usersio);
 //console.log(userswrite)
 ioio.signup = 'false'; 
 fs.writeFile('users.json', userswrite, function (err) {
if (err) throw err;
//console.log('Writing is done.');

fs.readFile(path.join(__dirname, 'users.json'), {encoding: 'utf-8'}, function (err, dataio) {
if (err) throw err;
//console.log(dataio);
//console.log(222222222)
var signupstate = {"signup": "true"};
var signupio = JSON.stringify(signupstate)
res.end(signupio);
});
});

console.log('sinup true')
	}
	else {
		console.log('signup was not true')
	}



}) 
 }

//res.end(userswrite);
/*
{
users.map((userarray, keys) => {
users[keys].name === ioio.name && users[keys].password === ioio.password ? console.log(users[keys].password+ 222222) : false
}) 
 }
 */
//console.log(users[4].name);
});

//res.end('Hello World\n');


}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/')
var config = require('../../config.js');
var Netmask = require('netmask').Netmask;
var request = require('request');
var authorizedSubnet =  config.security.authorizedSubnet.map(function(subnet){
	return new Netmask(subnet)
})

exports.index = function(req, res){
  res.json( { status: 'ok' });
};

exports.favicon = function(req, res){
  res.writeHead(404);
  res.end();
};
//ToDo- Add a check for ip address
exports.phycore = function(req, res){
  var slackurl = config.slackbot.url;
  var authorizedIps = config.security.authorizedIps;
  var bitbucketIps = config.security.bitbucketIps;
  var author = req.body.actor.username;
  var payload = req.body.push.changes[0]['new'] ;
  var branch = payload.name;
  var message = payload.target.message;
  var action = payload.target.type;

  if (branch === config.repository.branch && action === 'commit'){
      myExec(config.action.phyCore);
      res.writeHead(200);
      var data = {text: action + " from " + author + " on " + branch};
      request.post(slackurl, data , function (err, res, body) {
        if (err) {
          console.log(err);
          console.log('err');
          console.log(res.statusCode);
        }
        else {
          console.log(res.statusCode);
          console.log(body);
        }
      });
      console.log(action+'by'+author+'\n'+message+'on'+branch);
  } else {
    console.log('code pushed to '+ branch + ' no changes made to ' + config.repository.branch);
    res.writeHead(403);
  }
  res.end();
};

exports.github = function(req, res){
  var slackurl = config.slackbot.url;
  var authorizedIps = config.security.authorizedIps;
  var bitbucketIps = config.security.bitbucketIps;
  var payload = req.body;
  if(payload.head_commit){
  var author = payload.head_commit.committer.name;
  var branch = payload.ref;
  var message = payload.head_commit.message;
  var action = payload.head_commit;
}
  if(payload.repository.name == 'web-php'){
	console.log('web php hook called');
	var shFile = __dirname +'/web-php.sh' 
	myExec(shFile);
	res.writeHead(200);
	return res.end();
  }
  if(payload.repository.name == 'engineer-php'){
        console.log('engineer php hook called');
        var shFile = __dirname +'/engineer-php.sh'
        myExec(shFile);
        res.writeHead(200);
        return res.end();
  }
  if(payload.repository.name == 'consumer-php'){
        console.log('consumer php hook called');
        var shFile = __dirname +'/consumer-php.sh'
        myExec(shFile);
        res.writeHead(200);
        return res.end();
  }


  if (branch === config.repository.branch && action !== null){
      myExec(config.action.exec);
      res.writeHead(200);
      var data = {form: "Commit " + message + " from " + author + " on  " + branch};
      request.post(slackurl, data , function (err, res, body) {
        if (err) {
          console.log(err);
          console.log('err');
          console.log(res.statusCode);
        }
        else {
          console.log(res.statusCode);
          console.log(body);
        }
      });
      console.log('commit by '+author+'\n'+message+'on'+branch);
  } else {
    console.log('code pushed to '+ branch + ' no changes made to ' + config.repository.branch);
    res.writeHead(403);
  }
  res.end();

};

var inAuthorizedSubnet = function(ip) {
	return authorizedSubnet.some(function(subnet) {
		return subnet.contains(ip)
	})
}

var myExec = function(line) {
    var exec = require('child_process').exec;
    var execCallback = function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
    var child = exec(line, execCallback);
}

Private = {
	server: {port: "61440"}, // Port is overriden by env var "PORT"
	security: {
		authorizedIps:[
			'127.0.0.1',
			'::1',
			'localhost',
      '::131.103.20.165',
      '::131.103.20.160',
      '::131.103.20.166',
			//Github's IPs
			'::207.97.227.253',
			'::50.57.128.197',
			'::204.232.175.75',
			'::108.171.174.178'
		],
		bitbucketIps: [
					'131.103.20.165',
      		'131.103.20.166',
      		'131.103.20.160',
      		'165.254.145.0',
      		'104.192.143.0'
		],
		githubIps: [
			'207.97.227.253',
			'50.57.128.197',
			'204.232.175.75',
			'108.171.174.178'
		],
		authorizedSubnet:[
			'204.232.175.64/27',
			'192.30.252.0/22'
		]
	},
	repository: {
		branch: 'refs/heads/develop'
	},
	slackbot: {
		url:"https://hooks.slack.com/services/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"
	},
	action: {
		phyCore: __dirname + "/phycore.sh",
		phyStream: __dirname+"/phystream.sh"
	}
};

module.exports = Private;

express-cd
=======

**Featherweight Github/Bitbucket Continuous Deployment**

Continuously deploy any code from Github to your server.

express-cd is a simple express.js app handling Github's and Bitbucket's post-receive hooks.
It can execute any script you want on your server: deployment, testing, etc.

## Installation

	git clone https://github.com/w0w/express-cd.git
	cd express-cd/src
	npm install

## Usage

* `cp express-cd.template.sh express-cd.sh`
* Edit the `express-cd.sh` file to execute whatever you like after your commits (ex: stop server, git pull, start server)
* **For GitHub**: Set your post-receive hook as described [here](https://help.github.com/articles/post-receive-hooks) with the url `http://yourserver.com:61440/github`
* **For Bitbucket**:  Set your post-receive hook as described [here](https://confluence.atlassian.com/display/BITBUCKET/POST+hook+management) with the url `http://yourserver.com:61440/bitbucket`
* Run the app
	`node express-cd.js`

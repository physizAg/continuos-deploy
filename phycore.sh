echo "Stop server"
echo "====================================="
pm2 stop phycore

echo "Update Code"
echo "====================================="
cd /home/ubuntu/phycore/
# git pull
# pull if you want to merge or fetch/reset to overwrite
git fetch origin
git reset --hard origin/develop

echo "Install dependency"
# cd passpro-crm/app
# bower install

npm install



echo "Restart server"
echo "====================================="
NODE_ENV=dev pm2 start /home/ubuntu/phycore/server/server.js --name phycore


PASSING=$(mocha modules/automation/tests | grep -E 'passing')
FAILING=$(mocha modules/automation/tests | grep -E 'failing')

echo $PASSING
echo $FAILING


curl -X POST --data-urlencode "payload={
	\"channel\": \"#ci-server\", 
	\"username\": \"ci-bot\", 
	\"text\": \"Code pushed to phycore/develop \n :white_check_mark: $PASSING \n :x: $FAILING \",
	 \"icon_emoji\": \":robot_face:\"
	}" https://hooks.slack.com/services/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
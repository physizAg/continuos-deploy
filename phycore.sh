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

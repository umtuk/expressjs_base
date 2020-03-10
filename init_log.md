/home/ubuntu#
apt-get update
apt-get install nodejs
apt-get install npm
apt-get install git
apt-get install mysql-server
git clone https://github.com/umtuk/expressjs_base.git
npm install express-generator -g
express --view=pug expressjs_base
cd expressjs_base

/home/ubuntu/express_base#
DEBUG=expressjs_base:* npm start
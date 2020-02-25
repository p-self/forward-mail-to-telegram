docker run -p 25:25 -d --restart=always -v (pwd):/srv node:alpine sh -c "cd /srv && npm i -d && node mail.js"

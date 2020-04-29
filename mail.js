#!/usr/bin/env node

var mailin = require('mailin');
mailin.start({
    port: 8025,
    disableWebhook: true // Disable the webhook posting.
});

mailin.on('authorizeUser', function(connection, username, password, done) {
    // if (username == "johnsmith" && password == "mysecret") {
    //     done(null, true);
    // } else {
    //     done(new Error("Unauthorized!"), false);
    // }
});

/* Event emitted when a connection with the Mailin smtp server is initiated. */
mailin.on('startMessage', function (connection) {
    /* connection = {
        from: 'sender@somedomain.com',
        to: 'someaddress@yourdomain.com',
        id: 't84h5ugf',
        authentication: { username: null, authenticated: false, status: 'NORMAL' }
      }
    }; */
    console.log(connection);
});

/* Event emitted after a message was received and parsed. */
mailin.on('message', function (connection, data, content) {
    if( global.blockMail[data.headers.from.trim()]){
        return;
    }
    require("./bot").sendMessage(`
FROM: ${data.headers.from}
TO: ${data.headers.to}
subject: ${data.headers.subject}
date: ${data.headers.date}

${data.text}
        `);
});
